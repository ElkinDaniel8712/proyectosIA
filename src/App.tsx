import React, { useState, useEffect } from "react";
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

import {
  Project,
  FormAnswers,
  AIAnalysis,
  ProjectScore,
  ProjectComment,
  UserProfile,
  UserRole,
  ProjectAttachment,
  ProjectStatus,
} from "./types";

import { INITIAL_QUESTIONS, FormQuestionConfig } from "./lib/initialQuestions";
import { calculateProjectScore } from "./scoring";

import {
  loadAllProjects,
  persistProject,
  removeProject,
  replaceCatalogWithProjects,
  bulkAddOrUpdateProjects,
  clearCatalog,
  checkDatabaseHealth,
  DatabaseDiagnostics,
} from "./lib/projectRepository";
import DatabaseStatusModal from "./components/DatabaseStatusModal";

import AuthScreen from "./components/AuthScreen";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import InitiativeForm from "./components/InitiativeForm";
import MyInitiatives from "./components/MyInitiatives";
import InitiativeDetail from "./components/InitiativeDetail";
import ProjectRanking from "./components/ProjectRanking";
import InitiativeComparator from "./components/InitiativeComparator";
import AdminPanel from "./components/AdminPanel";
import UserGuides from "./components/UserGuides";

import {
  Users,
  Sliders,
  Settings,
  History,
  Shield,
  Clock,
  Sparkles,
  Compass,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Database,
} from "lucide-react";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbDiagnostics, setDbDiagnostics] = useState<DatabaseDiagnostics | null>(null);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  // Nav views state
  const [activeView, setActiveView] = useState("inicio");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Selected project sub-data for detail view
  const [currentComments, setCurrentComments] = useState<ProjectComment[]>([]);

  // Administrative config weights
  const [customWeights, setCustomWeights] = useState({
    importance: 0.4,
    viability: 0.35,
    ease: 0.25,
  });
  const [scoringVersion, setScoringVersion] = useState("v1");

  // Admin section: lists of users and activity logs
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [questions, setQuestions] = useState<FormQuestionConfig[]>([]);

  // Safety timeout: never remain on loading screen indefinitely
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const isElkinAdmin = 
          firebaseUser.email?.toLowerCase().includes("elkin.zapata") ||
          firebaseUser.uid === "admin_elkin_uid_2026";

        if (isElkinAdmin) {
          const adminProfile: UserProfile = {
            id: firebaseUser.uid || "admin_elkin_uid_2026",
            name: "Elkin Zapata",
            email: firebaseUser.email || "elkin.zapata@grupogtd.com",
            role: "Administrador",
            area: "Tecnología",
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setUserProfile(adminProfile);
          setActiveView("nueva");
          setLoading(false);

          // Background firestore sync
          try {
            setDoc(doc(db, "users", adminProfile.id), adminProfile, { merge: true }).catch(() => {});
            setDoc(doc(db, "users", "admin_elkin_uid_2026"), adminProfile, { merge: true }).catch(() => {});
          } catch (e) {}
          return;
        }

        // Load or create profile in firestore for other users
        try {
          const profileRef = doc(db, "users", firebaseUser.uid);
          const profileSnap = await getDoc(profileRef);

          let profile: UserProfile;
          if (profileSnap.exists()) {
            profile = profileSnap.data() as UserProfile;
            setUserProfile(profile);
          } else {
            profile = {
              id: firebaseUser.uid,
              name: firebaseUser.email?.split("@")[0] || "Usuario",
              email: firebaseUser.email || "",
              role: "Solicitante",
              area: "Operaciones",
              active: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setDoc(profileRef, profile).catch(() => {});
            setUserProfile(profile);
          }

          if (profile.email === "visitante@gtd.co" || profile.email === "visitante@claro.com.co") {
            setActiveView("nueva");
          } else {
            setActiveView("inicio");
          }
        } catch (dbErr) {
          console.warn("Could not query user profile:", dbErr);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setProjects([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch weights configuration from Firestore on mount
  useEffect(() => {
    if (!user) return;
    const loadWeights = async () => {
      try {
        const configRef = doc(db, "configurations", "weights");
        const configSnap = await getDoc(configRef);
        if (configSnap.exists()) {
          const data = configSnap.data();
          setCustomWeights({
            importance: data.importance ?? 0.4,
            viability: data.viability ?? 0.35,
            ease: data.ease ?? 0.25,
          });
          if (data.version) setScoringVersion(data.version);
        }
      } catch (err) {
        console.warn("Configurations bucket missing, utilizing default weights.");
      }
    };
    loadWeights();
  }, [user]);

  // Load questions configuration from Firestore, or pre-populate if empty
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      query(collection(db, "questions_config"), orderBy("step", "asc"), orderBy("order", "asc")),
      async (snapshot) => {
        if (snapshot.empty) {
          try {
            for (const q of INITIAL_QUESTIONS) {
              await setDoc(doc(db, "questions_config", q.id), q);
            }
          } catch (err) {
            console.error("Error pre-populating questions_config:", err);
          }
        } else {
          const qs: FormQuestionConfig[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as FormQuestionConfig;
            if (docSnap.id === "trigger") {
              deleteDoc(doc(db, "questions_config", "trigger")).catch(console.error);
              // Do not add trigger question to questions list
            } else if (
              docSnap.id === "processOwner" &&
              (data.label !== "Correo solicitante" || data.placeholder !== "solicitante@empresa.com")
            ) {
              const updated: FormQuestionConfig = {
                ...data,
                label: "Correo solicitante",
                helpText: "Correo del solicitante o experto funcional del proceso.",
                placeholder: "solicitante@empresa.com",
              };
              setDoc(doc(db, "questions_config", "processOwner"), updated, { merge: true }).catch(console.error);
              qs.push(updated);
            } else if (
              docSnap.id === "sponsor" &&
              (data.type !== "text" || !data.placeholder || data.placeholder.includes("@"))
            ) {
              const updated: FormQuestionConfig = {
                ...data,
                type: "text",
                placeholder: "Ej. Carlos Mendoza",
                helpText: "Nombre del líder del área con potestad para autorizar e impulsar la iniciativa.",
              };
              setDoc(doc(db, "questions_config", "sponsor"), updated, { merge: true }).catch(console.error);
              qs.push(updated);
            } else {
              qs.push(data);
            }
          });
          setQuestions(qs);
        }
      },
      (err) => {
        console.error("Error in questions_config listener:", err);
      }
    );
    return () => unsubscribe();
  }, [user]);

  // Real-time and resilient loader for projects
  useEffect(() => {
    if (!user) return;

    // 1. Immediately load persistent projects from server and local storage
    loadAllProjects()
      .then((projs) => {
        if (projs && projs.length > 0) {
          setProjects(projs);
        }
      })
      .catch((err) => {
        console.warn("loadAllProjects notice:", err);
      });

    // 2. Perform live database diagnostics
    checkDatabaseHealth().then((diag) => {
      setDbDiagnostics(diag);
    }).catch(() => {});

    // 3. Listen to projects on Firestore if available
    try {
      const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        projectsQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const projs: Project[] = [];
            snapshot.forEach((d) => {
              projs.push({ id: d.id, ...d.data() } as Project);
            });
            setProjects(projs);
          }
        },
        (err) => {
          console.info("Firestore cloud connection notice (active GTD persistent storage):", err.message);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn("Could not attach firestore snapshot:", e);
    }
  }, [user]);

  // Listen to comments for selected project
  useEffect(() => {
    if (!selectedProjectId) {
      setCurrentComments([]);
      return;
    }

    const commentsQuery = query(
      collection(db, "projects", selectedProjectId, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      commentsQuery,
      (snapshot) => {
        const comms: ProjectComment[] = [];
        snapshot.forEach((d) => {
          comms.push({ id: d.id, ...d.data() } as ProjectComment);
        });
        setCurrentComments(comms);
      },
      (err) => {
        console.warn("Firestore comments snapshot stream notice:", err);
      }
    );

    return () => unsubscribe();
  }, [selectedProjectId]);

  // Fetch admin data (Users & Logs) when activeView is administrative
  useEffect(() => {
    if (!user || !userProfile || userProfile.role !== "Administrador") return;

    const loadAdminData = async () => {
      try {
        // Fetch users
        const usersSnap = await getDocs(collection(db, "users"));
        const us: UserProfile[] = [];
        usersSnap.forEach((d) => {
          us.push(d.data() as UserProfile);
        });
        setAllUsers(us);

        // Fetch logs
        const logsSnap = await getDocs(query(collection(db, "audit_logs"), orderBy("timestamp", "desc")));
        const lg: any[] = [];
        logsSnap.forEach((d) => {
          lg.push({ id: d.id, ...d.data() });
        });
        setAuditLogs(lg);
      } catch (err) {
        console.error("Error loading administrative data:", err);
      }
    };

    if (activeView === "administracion" || activeView === "historial") {
      loadAdminData();
    }
  }, [user, userProfile, activeView]);

  // Helper to log audit events
  const writeAuditLog = async (action: string, details: string) => {
    try {
      await addDoc(collection(db, "audit_logs"), {
        userEmail: userProfile?.email || "anon@claro.com.co",
        userName: userProfile?.name || "Anónimo",
        role: userProfile?.role || "Solicitante",
        action,
        details,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to write audit log:", err);
    }
  };

  // Auth logout handler
  const handleLogout = async () => {
    await writeAuditLog("Cierre de sesión", "Cierre de sesión exitoso");
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  // Simulated role swapper for frictionless multi-role validation
  const handleChangeSimulatedRole = async (newRole: UserRole) => {
    if (!userProfile) return;
    const updated = { ...userProfile, role: newRole, updatedAt: new Date().toISOString() };
    setUserProfile(updated);
    // Persist role simulator change in Firestore
    await updateDoc(doc(db, "users", userProfile.id), { role: newRole });
    await writeAuditLog("Cambio de Rol Simulado", `Cambio al rol de: ${newRole}`);
  };

  // CORE BACKEND INTEGRATIONS & API CALLS

  // Save draft
  const handleSaveDraft = async (answers: FormAnswers, attachments: ProjectAttachment[]): Promise<string> => {
    if (!userProfile) throw new Error("No hay perfil de usuario activo");

    const fallbackId = editingProject ? editingProject.id : `draft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const draftData = {
      initiativeName: answers.initiativeName || "Borrador sin título",
      area: answers.area || "Operaciones",
      otherArea: answers.otherArea || "",
      processOwner: answers.processOwner || "",
      sponsor: answers.sponsor || "",
      status: "Borrador" as ProjectStatus,
      answers,
      attachments,
      createdBy: userProfile.email,
      requesterId: userProfile.id,
      requesterEmail: userProfile.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let docId = fallbackId;
    try {
      if (editingProject) {
        await setDoc(doc(db, "projects", editingProject.id), draftData, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, "projects"), draftData);
        docId = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore draft save notice, using resilient local state:", err);
    }

    const savedDraft: Project = { id: docId, ...draftData };
    persistProject(savedDraft).catch((e) => console.warn("persistProject draft notice:", e));

    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === docId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = savedDraft;
        return updated;
      }
      return [savedDraft, ...prev];
    });

    writeAuditLog("Guardar Borrador", `Borrador guardado: ${answers.initiativeName}`).catch(() => {});
    setEditingProject(null);
    
    const isVisitorUser = Boolean(
      userProfile && (
        userProfile.role === "Visitante" ||
        userProfile.email?.toLowerCase().includes("visitante") ||
        userProfile.id?.startsWith("visitor_")
      )
    );

    if (isVisitorUser) {
      setActiveView("nueva");
    } else {
      setActiveView("mis");
    }
    return docId;
  };

  // Submit initiative for scoring and AI analysis
  const handleSubmitInitiative = async (answers: FormAnswers, attachments: ProjectAttachment[]): Promise<Project> => {
    if (!userProfile) throw new Error("No hay perfil de usuario activo");

    const fallbackId = editingProject ? editingProject.id : `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 1. Save initial project state in Firestore as "Pendiente de análisis de IA"
    const projectPayload: Omit<Project, "id"> = {
      initiativeName: answers.initiativeName || "Iniciativa sin título",
      area: answers.area || "Operaciones",
      otherArea: answers.otherArea || "",
      processOwner: answers.processOwner || "",
      sponsor: answers.sponsor || "",
      status: "Pendiente de análisis de IA",
      answers,
      attachments,
      createdBy: userProfile.email,
      requesterId: userProfile.id,
      requesterEmail: userProfile.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let projectId = fallbackId;
    try {
      if (editingProject) {
        await setDoc(doc(db, "projects", editingProject.id), projectPayload, { merge: true });
      } else {
        const docRef = await addDoc(collection(db, "projects"), projectPayload);
        projectId = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore project payload notice, using resilient local save:", err);
    }

    writeAuditLog("Enviar Iniciativa", `Iniciativa enviada para priorización: ${answers.initiativeName}`).catch(() => {});

    // 2. Fetch score from local Express endpoint /api/calculate-score
    let scoreObj: ProjectScore | null = null;
    try {
      const scoreRes = await fetch("/api/calculate-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          answers,
          weights: customWeights,
          scoringVersion,
        }),
      });
      if (scoreRes.ok) {
        scoreObj = await scoreRes.json();
      }
    } catch (err) {
      console.warn("Server score endpoint notice, using local calculation fallback:", err);
    }

    if (!scoreObj) {
      scoreObj = calculateProjectScore(projectId, answers, customWeights, scoringVersion);
    }

    // 3. Call server endpoint /api/analyze-initiative to get Gemini AI analysis
    let aiAnalysisObj: AIAnalysis | null = null;
    let finalStatus: ProjectStatus = "Analizado por IA";

    try {
      const aiRes = await fetch("/api/analyze-initiative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          answers,
          score: scoreObj,
        }),
      });

      if (aiRes.ok) {
        const result = await aiRes.json();
        if (result.success) {
          aiAnalysisObj = {
            id: `analysis_${projectId}_${Date.now()}`,
            projectId,
            rawResponse: result.rawResponse,
            structuredAnalysis: result.analysis,
            analyzedAt: new Date().toISOString(),
          };
        } else {
          finalStatus = "Pendiente de análisis de IA";
          console.warn("AI Analysis returned error:", result.error);
        }
      } else {
        finalStatus = "Pendiente de análisis de IA";
      }
    } catch (err) {
      finalStatus = "Pendiente de análisis de IA";
      console.warn("Error fetching AI analysis:", err);
    }

    // 4. Update the project in Firestore with calculated scores, AI analysis
    const finalUpdate: Partial<Project> = {
      status: finalStatus,
      score: scoreObj || undefined,
      category: scoreObj?.category || "Mantener en backlog",
      riskLevel: aiAnalysisObj?.structuredAnalysis?.nivelRiesgo || (scoreObj?.restrictions && scoreObj.restrictions.length > 0 ? "alto" : "bajo"),
      recommendedSolutionType: aiAnalysisObj?.structuredAnalysis?.tipoSolucionRecomendada || undefined,
      analysis: aiAnalysisObj || undefined,
      updatedAt: new Date().toISOString(),
    };

    if (finalStatus === "Analizado por IA") {
      finalUpdate.submittedAt = new Date().toISOString();
    }

    const fullProject: Project = {
      id: projectId,
      ...projectPayload,
      ...finalUpdate,
    };

    try {
      await persistProject(fullProject);
    } catch (err) {
      console.warn("Could not persist full project, updating local memory:", err);
    }

    // Always update local projects array so UI updates instantly
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === projectId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = fullProject;
        return updated;
      }
      return [fullProject, ...prev];
    });

    // 5. Write system comment
    if (finalStatus === "Analizado por IA" && scoreObj) {
      try {
        const systemCommentRef = collection(db, "projects", projectId, "comments");
        await addDoc(systemCommentRef, {
          projectId,
          authorName: "Consultor de IA Gemini",
          authorEmail: "gemini-consultant@gtd.co",
          text: `Iniciativa analizada automáticamente. Puntaje obtenido: ${scoreObj.totalScore}/100. Categoría asignada: '${scoreObj.category}'.`,
          type: "status_change",
          createdAt: new Date().toISOString(),
        });
      } catch (commentErr) {
        console.warn("Could not write system comment:", commentErr);
      }
    }

    writeAuditLog("Análisis Completado", `Priorización y análisis de IA completados para: ${answers.initiativeName}`).catch(() => {});
    setEditingProject(null);

    // Auto-navigate
    const isVisitorUser = Boolean(
      userProfile && (
        userProfile.role === "Visitante" ||
        userProfile.email?.toLowerCase().includes("visitante") ||
        userProfile.id?.startsWith("visitor_")
      )
    );

    if (isVisitorUser) {
      setActiveView("nueva");
    } else if (userProfile?.role === "Solicitante") {
      setActiveView("mis");
    } else {
      setActiveView("ranking");
    }

    return fullProject;
  };

  // Individual Initiative controls: Re-process with Gemini
  const handleReprocessAI = async () => {
    if (!selectedProjectId) return;
    const proj = projects.find((p) => p.id === selectedProjectId);
    if (!proj) return;

    // Call submit initiative flow which recalculates score & Gemini analysis
    await handleSubmitInitiative(proj.answers, proj.attachments || []);
  };

  // Post observational/feedback comment
  const handlePostComment = async (text: string, type: ProjectComment["type"]) => {
    if (!selectedProjectId || !userProfile) return;
    try {
      await addDoc(collection(db, "projects", selectedProjectId, "comments"), {
        projectId: selectedProjectId,
        authorName: userProfile.name,
        authorEmail: userProfile.email,
        text,
        type,
        createdAt: new Date().toISOString(),
      });
      await writeAuditLog("Postear Comentario", `Nuevo comentario en proyecto: ${selectedProjectId}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Change project status manually (Aprobar piloto, rechazar, etc.)
  const handleUpdateStatus = async (newStatus: ProjectStatus, reason: string) => {
    if (!selectedProjectId || !userProfile) return;
    try {
      const proj = projects.find((p) => p.id === selectedProjectId);
      if (proj) {
        const updated: Project = { ...proj, status: newStatus, updatedAt: new Date().toISOString() };
        persistProject(updated).catch(() => {});
        setProjects((prev) => prev.map((p) => (p.id === selectedProjectId ? updated : p)));
      }

      const projRef = doc(db, "projects", selectedProjectId);
      await updateDoc(projRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });

      // Write trace comment
      await addDoc(collection(db, "projects", selectedProjectId, "comments"), {
        projectId: selectedProjectId,
        authorName: userProfile.name,
        authorEmail: userProfile.email,
        text: `Cambio de estado a '${newStatus}'. Motivo: ${reason}`,
        type: "status_change",
        createdAt: new Date().toISOString(),
      });

      await writeAuditLog("Cambio de Estado", `Proyecto ${selectedProjectId} cambiado a estado: ${newStatus}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete initiative / form submission
  const handleDeleteProject = async (projectId: string) => {
    const projToDelete = projects.find((p) => p.id === projectId);
    const title = projToDelete?.initiativeName || projectId;

    try {
      await removeProject(projectId);
      await writeAuditLog("Eliminar Formulario", `Formulario/Iniciativa eliminada: ${title}`);
    } catch (err) {
      console.error("Error deleting project:", err);
    }

    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
    if (editingProject?.id === projectId) {
      setEditingProject(null);
    }
  };

  // Import real projects handler (e.g. from Excel, CSV or paste)
  const handleImportRealProjects = async (newProjects: Project[], replaceAll: boolean) => {
    try {
      if (replaceAll) {
        const updated = await replaceCatalogWithProjects(newProjects);
        setProjects(updated);
        await writeAuditLog("Importación Proyectos Reales", `Reemplazados ${updated.length} proyectos reales en el catálogo.`);
      } else {
        const updated = await bulkAddOrUpdateProjects(newProjects);
        setProjects(updated);
        await writeAuditLog("Importación Proyectos Reales", `Agregados ${newProjects.length} proyectos reales.`);
      }
    } catch (err) {
      console.error("Error en importación de proyectos reales:", err);
    }
  };

  // Clear all projects to start fresh with real data
  const handleClearAllProjects = async () => {
    try {
      await clearCatalog();
      setProjects([]);
      setSelectedProjectId(null);
      await writeAuditLog("Limpieza de Catálogo", "Vaciados proyectos de prueba para iniciar con datos reales.");
    } catch (err) {
      console.error("Error al vaciar catálogo:", err);
    }
  };

  // Side-panel explanatory query: ¿Por qué ocupa esta posición?
  const handleWhyPositionRequested = async (
    project: Project,
    rankPos: number,
    totalCount: number,
    nextProjName?: string,
    prevProjName?: string
  ): Promise<any> => {
    const response = await fetch("/api/why-position", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project,
        rankPosition: rankPos,
        totalProjectsCount: totalCount,
        nextProjectName: nextProjName,
        prevProjectName: prevProjName,
      }),
    });
    if (!response.ok) {
      throw new Error("No se pudo conectar con el servicio de análisis de ranking.");
    }
    const result = await response.json();
    return result;
  };

  // Side-by-side comparative query with Gemini
  const handleCompareRequested = async (selectedProjects: Project[]): Promise<any> => {
    const response = await fetch("/api/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: selectedProjects }),
    });
    if (!response.ok) {
      throw new Error("No se pudo conectar con el servicio de comparación de Gemini.");
    }
    const result = await response.json();
    return result;
  };

  // Toggle user active status (Administrador panel)
  const handleToggleUserStatus = async (userId: string, currentActive: boolean) => {
    try {
      await updateDoc(doc(db, "users", userId), { active: !currentActive });
      setAllUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, active: !currentActive } : u))
      );
      await writeAuditLog("Modificar Usuario", `Estado de usuario cambiado: ${userId}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Save modified weights configuration (Administrador panel)
  const handleSaveWeights = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const total = customWeights.importance + customWeights.viability + customWeights.ease;
      if (Math.abs(total - 1.0) > 0.001) {
        alert("La suma de los pesos de importancia, viabilidad y facilidad debe ser exactamente igual a 1.0 (100%).");
        return;
      }

      await setDoc(doc(db, "configurations", "weights"), {
        ...customWeights,
        version: scoringVersion,
        updatedAt: new Date().toISOString(),
        updatedBy: userProfile?.email || "anon",
      });

      alert("Configuración de ponderaciones guardada exitosamente en Firestore.");
      await writeAuditLog("Cambiar Ponderaciones", `Nuevas ponderaciones: Imp:${customWeights.importance}, Via:${customWeights.viability}, Fac:${customWeights.ease}`);
    } catch (err: any) {
      alert(`Error al guardar configuración: ${err.message}`);
    }
  };

  const handleAuthSuccess = async (authUser: any) => {
    if (!authUser) return;
    setUser(authUser);
    
    const isElkinAdmin = 
      authUser.email?.toLowerCase().includes("elkin.zapata") ||
      authUser.uid === "admin_elkin_uid_2026";

    if (isElkinAdmin) {
      const adminProfile: UserProfile = {
        id: authUser.uid || "admin_elkin_uid_2026",
        name: "Elkin Zapata",
        email: authUser.email || "elkin.zapata@grupogtd.com",
        role: "Administrador",
        area: "Tecnología",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUserProfile(adminProfile);
      setActiveView("nueva");
      setLoading(false);

      try {
        setDoc(doc(db, "users", adminProfile.id), adminProfile, { merge: true }).catch(() => {});
        setDoc(doc(db, "users", "admin_elkin_uid_2026"), adminProfile, { merge: true }).catch(() => {});
      } catch (e) {}
      return;
    }

    let profile: UserProfile | null = null;
    try {
      const profileRef = doc(db, "users", authUser.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        profile = profileSnap.data() as UserProfile;
      }
    } catch (err) {
      console.warn("Could not load user profile from Firestore:", err);
    }

    if (!profile) {
      const email = authUser.email || "visitante@gtd.co";
      const isVisitor = email.toLowerCase().includes("visitante") || authUser.uid === "visitor_guest_id_2026";
      
      profile = {
        id: authUser.uid || "visitor_guest_id_2026",
        name: isVisitor ? "Visitante" : (email.split("@")[0] || "Usuario"),
        email: email,
        role: isVisitor ? "Visitante" : "Solicitante",
        area: "Operaciones",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      try {
        await setDoc(doc(db, "users", profile.id), profile, { merge: true });
      } catch (e) {
        console.warn("Could not save profile to Firestore:", e);
      }
    }

    const isVisitorAccount = profile.email?.toLowerCase().includes("visitante") || profile.role === "Visitante" || profile.id?.startsWith("visitor_");
    if (isVisitorAccount) {
      profile.role = "Visitante";
    }

    setUserProfile(profile);
    if (isVisitorAccount) {
      setActiveView("nueva");
    } else {
      setActiveView("inicio");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Cargando GTD.IA...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  const isVisitorUser = Boolean(
    userProfile && (
      userProfile.role === "Visitante" ||
      userProfile.email?.toLowerCase().includes("visitante") ||
      userProfile.id?.startsWith("visitor_")
    )
  );

  const effectiveView = isVisitorUser && activeView !== "nueva" && activeView !== "guias" ? "nueva" : activeView;
  const effectiveSelectedProjectId = isVisitorUser ? null : selectedProjectId;

  // Selected project mapping
  const selectedProject = projects.find((p) => p.id === effectiveSelectedProjectId);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex flex-row transition-colors duration-200">
      
      {/* Sidebar navigation */}
      <Sidebar
        activeView={effectiveView}
        onNavigate={(view) => {
          if (isVisitorUser && view !== "nueva" && view !== "guias") {
            setActiveView("nueva");
          } else {
            setActiveView(view);
          }
          setSelectedProjectId(null);
          setEditingProject(null);
        }}
        userProfile={userProfile}
        onLogout={handleLogout}
        onChangeSimulatedRole={handleChangeSimulatedRole}
        onOpenDatabaseStatus={() => setIsDbModalOpen(true)}
      />

      {/* Main viewport */}
      <main className="flex-grow overflow-y-auto h-screen relative flex flex-col bg-zinc-950">
        
        {/* Global System & Database Health Header */}
        <header className="px-6 py-2.5 bg-zinc-900/80 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-zinc-200">Radar de Iniciativas GTD</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">
              <strong className="text-zinc-100 font-bold">{projects.length}</strong> iniciativas activas
            </span>
          </div>

          <button
            onClick={() => setIsDbModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700/60 text-xs font-semibold text-zinc-200 transition-all cursor-pointer shadow-sm"
            title="Verificar disponibilidad y estado de la base de datos"
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-zinc-400">Base de Datos:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Modo Seguro GTD
            </span>
          </button>
        </header>
        {effectiveSelectedProjectId && selectedProject ? (
          <div className="py-2 relative">
            <div className="px-6 pt-4 max-w-5xl mx-auto">
              <button
                onClick={() => {
                  setSelectedProjectId(null);
                  if (userProfile?.role === "Solicitante") {
                    setActiveView("mis");
                  } else {
                    setActiveView("ranking");
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
              >
                ← Regresar al listado
              </button>
            </div>
            <InitiativeDetail
              project={selectedProject}
              analysis={selectedProject.analysis || null}
              score={selectedProject.score || null}
              comments={currentComments}
              userProfile={userProfile}
              onPostComment={handlePostComment}
              onUpdateStatus={handleUpdateStatus}
              onReprocessAI={handleReprocessAI}
              onDeleteProject={handleDeleteProject}
            />
          </div>
        ) : (
          <>
            {/* VIEW: INICIO / DASHBOARD */}
            {effectiveView === "inicio" && (
              <Dashboard
                projects={projects}
                onSelectProject={(id) => setSelectedProjectId(id)}
              />
            )}

            {/* VIEW: NUEVA INICIATIVA / FORM */}
            {effectiveView === "nueva" && (
              <InitiativeForm
                userProfile={userProfile}
                onSaveDraft={handleSaveDraft}
                onSubmitIncentive={handleSubmitInitiative}
                initialAnswers={editingProject?.answers}
                initialAttachments={editingProject?.attachments}
                questions={questions}
              />
            )}

            {/* VIEW: MIS INICIATIVAS */}
            {effectiveView === "mis" && (
              <MyInitiatives
                projects={
                  userProfile?.role === "Administrador"
                    ? projects
                    : projects.filter((p) => p.requesterEmail === userProfile?.email)
                }
                onSelectProject={(id) => setSelectedProjectId(id)}
                onEditDraft={(proj) => {
                  setEditingProject(proj);
                  setActiveView("nueva");
                }}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {/* VIEW: ANALISIS DE INICIATIVAS (Evaluadores / Admins) */}
            {effectiveView === "analisis" && (
              <div className="p-6 max-w-6xl mx-auto space-y-6">
                <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Mesa de Evaluación y Análisis de IA
                  </h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Revise los cálculos del algoritmo, consulte los dictámenes del modelo generativo y emita conceptos o aprobaciones.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {projects
                    .filter((p) => p.status !== "Borrador")
                    .map((project) => (
                      <div
                        key={project.id}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                                {project.area}
                              </span>
                              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mt-0.5">
                                {project.initiativeName}
                              </h3>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              project.status === "Analizado por IA"
                                ? "bg-emerald-50 text-emerald-700 border"
                                : "bg-amber-50 text-amber-700 border"
                            }`}>
                              {project.status}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-500 line-clamp-2">
                            {project.answers.currentProblem}
                          </p>

                          <div className="flex items-center gap-4 text-[10px] text-zinc-400 pt-2 border-t border-zinc-100">
                            <span>Score: <b>{project.score?.totalScore ?? "No calculado"}/100</b></span>
                            <span>Categoría: <b>{project.category || "No determinada"}</b></span>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => setSelectedProjectId(project.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] cursor-pointer shadow-sm transition-all"
                          >
                            Evaluar Ficha
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* VIEW: RANKING */}
            {effectiveView === "ranking" && (
              <ProjectRanking
                projects={projects}
                onSelectProject={(id) => setSelectedProjectId(id)}
                userEmail={userProfile?.email}
                onWhyPositionRequested={handleWhyPositionRequested}
                onDeleteProject={handleDeleteProject}
                onImportRealProjects={handleImportRealProjects}
                onClearAllProjects={handleClearAllProjects}
              />
            )}

            {/* VIEW: COMPARADOR */}
            {effectiveView === "comparador" && (
              <InitiativeComparator
                projects={projects}
                onCompareRequested={handleCompareRequested}
              />
            )}

            {/* VIEW: ADMINISTRACION (PANEL DE CONTROL ADMINISTRATIVO) */}
            {effectiveView === "administracion" && (
              <AdminPanel
                questions={questions}
                allUsers={allUsers}
                userProfile={userProfile}
                onToggleUserStatus={handleToggleUserStatus}
                writeAuditLog={writeAuditLog}
              />
            )}

            {/* VIEW: CONFIGURACION (WEIGHTS SETTINGS) */}
            {effectiveView === "configuracion" && (
              <div className="p-6 max-w-3xl mx-auto space-y-6">
                <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Configuración de Priorización
                  </h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Ajuste los pesos del algoritmo matemático de scoring y configure los parámetros de auditoría.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-zinc-400" />
                    Ponderaciones de las Dimensiones
                  </h3>

                  <form onSubmit={handleSaveWeights} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-700">Importancia (Peso)</label>
                        <input
                          type="number"
                          step="0.05"
                          min="0.0"
                          max="1.0"
                          required
                          value={customWeights.importance}
                          onChange={(e) => setCustomWeights((prev) => ({ ...prev, importance: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-700">Viabilidad (Peso)</label>
                        <input
                          type="number"
                          step="0.05"
                          min="0.0"
                          max="1.0"
                          required
                          value={customWeights.viability}
                          onChange={(e) => setCustomWeights((prev) => ({ ...prev, viability: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-700">Facilidad (Peso)</label>
                        <input
                          type="number"
                          step="0.05"
                          min="0.0"
                          max="1.0"
                          required
                          value={customWeights.ease}
                          onChange={(e) => setCustomWeights((prev) => ({ ...prev, ease: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="block text-xs font-bold text-zinc-700">Identificador de Versión de Fórmula</label>
                      <input
                        type="text"
                        required
                        value={scoringVersion}
                        onChange={(e) => setScoringVersion(e.target.value)}
                        placeholder="v1"
                        className="w-full max-w-xs px-3 py-2 rounded-xl border text-xs"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        Guardar Ponderaciones
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* VIEW: HISTORIAL DE CAMBIOS (AUDIT LOGS) */}
            {effectiveView === "historial" && (
              <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Trazabilidad de Auditoría del Sistema
                  </h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Bitácora histórica cronológica e inmutable de eventos de gobernanza e interacciones (Sección 10).
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                    <History className="w-4 h-4 text-zinc-400" />
                    Bitácora de Eventos Recientes
                  </h3>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {auditLogs.length === 0 ? (
                      <p className="text-center text-xs text-zinc-400 py-10">No hay registros de auditoría registrados.</p>
                    ) : (
                      auditLogs.map((log) => (
                        <div key={log.id} className="p-3 bg-zinc-50 dark:bg-zinc-800/20 rounded-xl border border-zinc-200/40 text-xs flex justify-between gap-4">
                          <div className="space-y-1 flex-1">
                            <span className="font-bold text-zinc-800 dark:text-zinc-200">{log.action}</span>
                            <p className="text-[11px] text-zinc-600 leading-relaxed">{log.details}</p>
                            <span className="text-[10px] text-zinc-400">Por: {log.userName} ({log.userEmail}) • {log.role}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 shrink-0 font-medium">
                            {new Date(log.timestamp).toLocaleString("es-CO")}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: GUÍAS DE USUARIO */}
            {effectiveView === "guias" && (
              <UserGuides userProfile={userProfile} />
            )}
          </>
        )}
      </main>

      {/* Database diagnostics modal */}
      <DatabaseStatusModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
        diagnostics={dbDiagnostics}
        onRefresh={async () => {
          const diag = await checkDatabaseHealth();
          setDbDiagnostics(diag);
          const projs = await loadAllProjects();
          setProjects(projs);
        }}
      />
    </div>
  );
}
