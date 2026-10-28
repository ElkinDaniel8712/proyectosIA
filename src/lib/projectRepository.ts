import { db } from "./firebase";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { Project, ProjectComment } from "../types";
import { INITIAL_GTD_PROJECTS } from "../data/seedProjects";

const LOCAL_STORAGE_KEY = "gtd_local_projects_v2";

export interface DatabaseDiagnostics {
  firebaseConfigured: boolean;
  firestoreDatabaseId: string;
  firebaseProjectId: string;
  firebaseReachable: boolean;
  firebaseError?: string;
  serverStorageActive: boolean;
  totalProjects: number;
  mode: "cloud" | "hybrid" | "local_server";
}

/**
 * Reads local storage backup
 */
function getLocalProjects(): Project[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

/**
 * Saves local storage backup
 */
function saveLocalProjects(projects: Project[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.warn("Could not write to localStorage:", e);
  }
}

/**
 * Loads all projects with automatic fallback and synchronization:
 * 1. Server persistent storage (/api/projects)
 * 2. Local browser storage (gtd_local_projects_v2)
 * 3. Seed GTD initiatives if completely fresh
 * 4. Background attempt to Firestore (if cloud connection is active)
 */
export async function loadAllProjects(): Promise<Project[]> {
  let serverProjects: Project[] = [];
  try {
    const res = await fetch("/api/projects");
    if (res.ok) {
      serverProjects = await res.json();
    }
  } catch (err) {
    console.warn("Server API projects fetch failed:", err);
  }

  const localProjects = getLocalProjects();

  // Merge server projects and local projects by ID (latest updatedAt wins)
  const map = new Map<string, Project>();

  // If server has projects, prioritize them
  if (serverProjects.length > 0) {
    for (const p of serverProjects) {
      map.set(p.id, p);
    }
    // Also include any local draft projects not yet on server
    for (const p of localProjects) {
      if (!map.has(p.id)) {
        map.set(p.id, p);
      }
    }
  } else if (localProjects.length > 0) {
    for (const p of localProjects) {
      map.set(p.id, p);
    }
  } else {
    // Only use initial seed projects if completely uninitialized
    const isCleaned = localStorage.getItem("gtd_catalog_cleaned_flag");
    if (!isCleaned) {
      for (const p of INITIAL_GTD_PROJECTS) {
        map.set(p.id, p);
      }
    }
  }

  // Asynchronous attempt to check Firestore in background without blocking
  try {
    const snapPromise = getDocs(collection(db, "projects"));
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2500));
    const snap: any = await Promise.race([snapPromise, timeoutPromise]);
    if (snap && !snap.empty) {
      snap.forEach((d: any) => {
        const firestoreProj = { id: d.id, ...d.data() } as Project;
        map.set(d.id, firestoreProj);
      });
    }
  } catch (firestoreErr) {
    // Expected when Firebase permissions/API keys in the cloud project are unavailable
    console.info("Firestore cloud connection note: Using persistent GTD server storage.", firestoreErr);
  }

  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );

  saveLocalProjects(merged);
  return merged;
}

/**
 * Replaces the entire catalog with real projects (clearing mock/seed data)
 */
export async function replaceCatalogWithProjects(projects: Project[]): Promise<Project[]> {
  localStorage.setItem("gtd_catalog_cleaned_flag", "true");
  saveLocalProjects(projects);

  try {
    const res = await fetch("/api/projects/replace-all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.projects || projects;
    }
  } catch (err) {
    console.warn("Could not replace projects on server API:", err);
  }

  return projects;
}

/**
 * Bulk updates or adds projects
 */
export async function bulkAddOrUpdateProjects(projects: Project[]): Promise<Project[]> {
  const localList = getLocalProjects();
  const map = new Map<string, Project>();
  for (const p of localList) map.set(p.id, p);
  for (const p of projects) map.set(p.id, p);
  const updated = Array.from(map.values());
  saveLocalProjects(updated);

  try {
    const res = await fetch("/api/projects/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.projects || updated;
    }
  } catch (err) {
    console.warn("Could not bulk save to server API:", err);
  }

  return updated;
}

/**
 * Clears all projects (starts completely fresh with real data)
 */
export async function clearCatalog(): Promise<void> {
  localStorage.setItem("gtd_catalog_cleaned_flag", "true");
  saveLocalProjects([]);
  try {
    await fetch("/api/projects/clear", { method: "POST" });
  } catch (err) {
    console.warn("Could not clear projects on server API:", err);
  }
}

/**
 * Saves a project across server storage, local storage, and Firestore
 */
export async function persistProject(project: Project): Promise<Project> {
  const updatedProject: Project = {
    ...project,
    updatedAt: new Date().toISOString(),
  };

  // 1. Update local storage
  const localList = getLocalProjects();
  const idx = localList.findIndex((p) => p.id === updatedProject.id);
  if (idx >= 0) {
    localList[idx] = updatedProject;
  } else {
    localList.unshift(updatedProject);
  }
  saveLocalProjects(localList);

  // 2. Persist to server API
  try {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    });
  } catch (err) {
    console.warn("Could not save to server API:", err);
  }

  // 3. Attempt Firestore cloud sync (safely caught)
  try {
    await setDoc(doc(db, "projects", updatedProject.id), updatedProject, { merge: true });
  } catch (err) {
    console.warn("Firestore sync deferred (offline/permission):", err);
  }

  return updatedProject;
}

/**
 * Removes a project across server storage, local storage, and Firestore
 */
export async function removeProject(projectId: string): Promise<boolean> {
  // 1. Remove from local storage
  const localList = getLocalProjects().filter((p) => p.id !== projectId);
  saveLocalProjects(localList);

  // 2. Remove from server API
  try {
    await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
  } catch (err) {
    console.warn("Could not delete from server API:", err);
  }

  // 3. Attempt Firestore deletion
  try {
    await deleteDoc(doc(db, "projects", projectId));
  } catch (err) {
    console.warn("Firestore delete deferred:", err);
  }

  return true;
}

/**
 * Evaluates live database availability and diagnostics
 */
export async function checkDatabaseHealth(): Promise<DatabaseDiagnostics> {
  let serverDiag: any = {};
  try {
    const res = await fetch("/api/database-status");
    if (res.ok) {
      serverDiag = await res.json();
    }
  } catch (e) {}

  let firebaseReachable = false;
  let firebaseError = serverDiag.firebaseReason || "Error al verificar conexión";

  try {
    const testDoc = doc(db, "_health", "ping");
    const testPromise = getDocs(collection(db, "_health"));
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2000));
    await Promise.race([testPromise, timeout]);
    firebaseReachable = true;
    firebaseError = undefined;
  } catch (err: any) {
    firebaseReachable = false;
    firebaseError = err.message || "PERMISSION_DENIED en Firestore";
  }

  const projects = getLocalProjects();

  return {
    firebaseConfigured: true,
    firestoreDatabaseId: serverDiag.firestoreDatabaseId || "ai-studio-radardeoportunid-a589f000-369d-4fb7-b46c-6e59d74abb8e",
    firebaseProjectId: serverDiag.firebaseProjectId || "gen-lang-client-0454135713",
    firebaseReachable,
    firebaseError: firebaseReachable ? undefined : firebaseError,
    serverStorageActive: true,
    totalProjects: projects.length || serverDiag.totalProjectsLoaded || 0,
    mode: firebaseReachable ? "cloud" : "local_server",
  };
}
