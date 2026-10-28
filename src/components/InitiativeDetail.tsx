import React, { useState } from "react";
import { Project, AIAnalysis, ProjectScore, ProjectComment, UserProfile, ProjectStatus } from "../types";
import { calculateProjectScore } from "../scoring";
import { calculateProjectKPIs } from "../utils/kpiCalculator";
import { classifyProjectTechnologies } from "../utils/technologyClassifier";
import { ProcessFlowchart } from "./ProcessFlowchart";
import {
  Shield,
  Clock,
  Sparkles,
  List,
  Target,
  FileText,
  AlertTriangle,
  Send,
  MessageSquare,
  RefreshCw,
  CheckCircle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Trash2,
  Award,
  Zap,
  Cpu,
  Layers,
  FileDown,
} from "lucide-react";
import { exportProjectToDocx } from "../utils/exportProjectDocx";
import ReactMarkdown from "react-markdown";
import { INITIAL_QUESTIONS } from "../lib/initialQuestions";

const getQuestionLabel = (key: string): string => {
  const q = INITIAL_QUESTIONS.find((item) => item.id === key);
  if (q) return q.label;

  const customMap: Record<string, string> = {
    steps: "Mapeo de Pasos",
    id: "ID de la Iniciativa",
    requesterId: "ID del Solicitante",
    requesterEmail: "Correo del Solicitante",
    createdBy: "Creado Por",
    createdAt: "Fecha de Creación",
    updatedAt: "Fecha de Actualización",
    submittedAt: "Fecha de Envío",
    isDemo: "Es Demo",
    score: "Puntaje",
    category: "Categoría",
    riskLevel: "Nivel de Riesgo",
    recommendedSolutionType: "Tipo de Solución Recomendada",
    status: "Estado",
    initiativeName: "Nombre de la iniciativa o caso de uso",
    processOwner: "Correo solicitante",
    sponsor: "¿Quién es el líder del área que respalda la iniciativa? (Sponsor)",
    processActivity: "¿Qué proceso o actividad desea mejorar?",
    currentProblem: "¿Qué problema ocurre actualmente en este proceso?",
    trigger: "¿Cuál es el detonante (trigger) que da inicio a este proceso?",
    finalResult: "¿Cuál es el resultado final esperado actualmente?",
    standardizationLevel: "¿Cuál es el nivel de estandarización del proceso?",
    frequency: "¿Con qué frecuencia se ejecuta este proceso?",
    monthlyCases: "Casos o transacciones que se gestionan al mes",
    timePerCase: "Tiempo promedio que toma procesar un solo caso",
    timeUnit: "Unidad de medida del tiempo",
    peopleInvolved: "Número de personas que participan en el proceso",
    reworkFrequency: "Frecuencia de reprocesos o corrección de errores",
    affectedGroup: "¿Quién se ve principalmente afectado por las ineficiencias o retrasos?",
    errorConsequences: "¿Cuáles son las consecuencias ante retrasos o errores en la ejecución?",
    hasDeadline: "¿Existe una fecha o plazo obligatorio para completar el proceso?",
    canEstimateEconomicImpact: "¿Es posible estimar o calcular el impacto económico anual de esta ineficiencia?",
    annualValueCop: "Impacto económico estimado anual (en COP)",
    impactType: "Tipo de impacto esperado",
    economicExplanation: "Detalle o justificación del impacto económico estimado",
    expectedOutcome: "¿Cuál es el resultado medible esperado con la solución?",
    autonomyLevel: "¿Qué nivel de autonomía se espera de la solución?",
    escalationRule: "¿Cuál debe ser la regla de escalamiento si el sistema no puede resolver un caso?",
    dataOrganization: "¿Cómo se encuentra organizada la información del proceso?",
    availableExamples: "¿Se cuenta con ejemplos reales y completos de casos exitosos y fallidos?",
    errorImpactLevel: "¿Cuál sería el nivel de impacto si la solución automatizada comete un error?",
    hasAccessAuthorization: "¿Se cuenta con autorización o viabilidad para acceder a los sistemas necesarios?",
    canObtainAutomatically: "¿Es posible obtener la información de entrada de forma automática?",
    hasDocumentation: "¿Se cuenta con documentación actualizada del proceso?",
    expertAvailability: "¿Cuál es la disponibilidad semanal del experto para apoyar el proyecto?",
    pilotAuthorization: "¿Existe autorización para realizar un piloto controlado con casos reales?",
    safeTestingEnvironment: "¿Existe un ambiente seguro (pruebas/sandbox) para ensayar la solución?",
    successMetric: "Métrica principal para medir el éxito de la solución",
  };

  if (customMap[key]) return customMap[key];

  const spaced = key.replace(/([A-Z])/g, " $1");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

interface InitiativeDetailProps {
  project: Project;
  analysis: AIAnalysis | null;
  score: ProjectScore | null;
  comments: ProjectComment[];
  userProfile: UserProfile | null;
  onPostComment: (text: string, type: ProjectComment["type"]) => Promise<void>;
  onUpdateStatus: (newStatus: ProjectStatus, reason: string) => Promise<void>;
  onReprocessAI: () => Promise<void>;
  onDeleteProject?: (projectId: string) => void;
}

export default function InitiativeDetail({
  project,
  analysis,
  score,
  comments,
  userProfile,
  onPostComment,
  onUpdateStatus,
  onReprocessAI,
  onDeleteProject,
}: InitiativeDetailProps) {
  const [activeTab, setActiveTab] = useState("resumen");
  const [commentText, setCommentText] = useState("");
  const [overrideReason, setOverrideReason] = useState("");
  const [reprocessing, setReprocessing] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [exportingDocx, setExportingDocx] = useState(false);

  const handleExportDocx = async () => {
    try {
      setExportingDocx(true);
      await exportProjectToDocx(project);
    } catch (err) {
      console.error("Error al exportar ficha a Word:", err);
      alert("Hubo un error al generar el archivo de Word. Por favor intente nuevamente.");
    } finally {
      setExportingDocx(false);
    }
  };

  const isEvaluatorOrAdmin = userProfile?.role === "Evaluador" || userProfile?.role === "Administrador";
  const isAdmin = userProfile?.role === "Administrador";

  const tabs = [
    { id: "resumen", label: "Resumen", icon: Sparkles },
    { id: "kpis", label: "KPIs de Éxito", icon: Award },
    { id: "flowchart", label: "Descripción Proceso (AS-IS / TO-BE)", icon: FileText },
    { id: "puntos", label: "Puntos Clave", icon: Target },
    { id: "originales", label: "Respuestas", icon: List },
    { id: "puntajes", label: "Puntajes", icon: TrendingUp },
    { id: "recomendaciones", label: "Recomendaciones", icon: FileText },
    { id: "historial", label: "Historial & Feedback", icon: Clock },
  ];

  const getSolutionTypeLabel = (type?: string) => {
    if (!type) return "No determinado";
    return type.replace(/_/g, " ").toUpperCase();
  };

  const getRiskColor = (level?: string) => {
    if (level === "critico") return "text-red-600 bg-red-100 border-red-200 dark:bg-red-950/40 dark:text-red-400";
    if (level === "alto") return "text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400";
    if (level === "medio") return "text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400";
    return "text-green-600 bg-green-50 border-green-100 dark:bg-green-950/20 dark:text-green-400";
  };

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await onPostComment(commentText, "general");
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChangeWithComment = async (newStatus: ProjectStatus) => {
    const reason = prompt(`Escriba el motivo del cambio de estado a '${newStatus}':`);
    if (reason === null) return; // User cancelled
    if (!reason.trim()) {
      alert("El motivo es obligatorio.");
      return;
    }

    setStatusUpdating(true);
    try {
      await onUpdateStatus(newStatus, reason);
    } catch (err) {
      console.error(err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleTriggerReprocess = async () => {
    setReprocessing(true);
    try {
      await onReprocessAI();
      alert("Análisis de Gemini completado con éxito.");
    } catch (err: any) {
      alert(`Error al reprocesar: ${err.message}`);
    } finally {
      setReprocessing(false);
    }
  };

  const structured = analysis?.structuredAnalysis;
  const activeScore = (score && score.totalScore > 0) ? score : calculateProjectScore(project.id, project.answers);

  // Dynamic calculations from form answers
  const casesPerMonth = Number(project.answers.monthlyCases) || 0;
  const rawTime = Number(project.answers.timePerCase) || 0;
  const timeUnit = project.answers.timeUnit || "Minutos";
  const minutesPerCase = timeUnit === "Horas" ? rawTime * 60 : timeUnit === "Días laborales" ? rawTime * 8 * 60 : rawTime;
  const calculatedAnnualHours = Math.round((casesPerMonth * minutesPerCase * 12) / 60);

  // Fallbacks for display
  const problemText = structured?.problemaPrincipal || project.answers.currentProblem || "No especificado";
  const outcomeText = structured?.resultadoEsperado || project.answers.expectedOutcome || "No especificado";
  const solutionType = project.recommendedSolutionType || structured?.tipoSolucionRecomendada || (project.answers.standardizationLevel?.includes("siempre") ? "automatizacion_tradicional" : project.answers.autonomyLevel?.startsWith("5") ? "agente_autonomo" : "asistente_ia");
  const agentAptitude = structured?.aptitudParaAgente || (project.answers.autonomyLevel?.startsWith("1") ? "baja" : "alta");
  const confidenceScore = structured?.confianzaAnalisis ?? 90;
  const estimatedComplexity = structured?.complejidadEstimada || ((project.answers.dataSources || []).length > 3 ? "alta" : "media");
  const riskLevel = structured?.nivelRiesgo || project.riskLevel || (activeScore.restrictions.length > 0 ? "alto" : "bajo");

  const executiveSummaryText = structured?.resumenEjecutivo || `Iniciativa '${project.initiativeName}' del área de ${project.area}. Busca resolver ${project.answers.currentProblem || "la problemática operativa"} en el proceso de ${project.answers.processActivity || "gestión"}. Presenta una demanda estimada de ${casesPerMonth} casos/mes (${calculatedAnnualHours} h/año).`;

  const solutionJustification = structured?.justificacionTipoSolucion || `Recomendación basada en el nivel de estandarización actual ('${project.answers.standardizationLevel || "Estándar"}') y la autonomía requerida ('${project.answers.autonomyLevel || "Bajo supervisión"}').`;

  const nextStepText = structured?.siguientePasoRecomendado || `Coordinar sesión técnica con el experto funcional (${project.answers.processOwner || "Líder funcional"}) para definir la arquitectura del piloto.`;

  const benefitsList = (structured?.beneficiosEsperados && structured.beneficiosEsperados.length > 0)
    ? structured.beneficiosEsperados
    : [
        `Reducción significativa del tiempo por caso (${rawTime} ${timeUnit}).`,
        `Optimización de las ${calculatedAnnualHours} horas anuales invertidas.`,
        project.answers.expectedOutcome || "Mayor precisión y calidad en las entregas."
      ];

  const risksList = (structured?.riesgosImplementacion && structured.riesgosImplementacion.length > 0)
    ? structured.riesgosImplementacion
    : [
        project.answers.errorConsequences ? `Mitigar: ${project.answers.errorConsequences}` : "Disponibilidad de un ambiente de pruebas controlado.",
        "Monitoreo de adopción por parte del equipo funcional."
      ];

  const dependenciesList = (structured?.dependencias && structured.dependencias.length > 0)
    ? structured.dependencias
    : (Array.isArray(project.answers.dataSources) && project.answers.dataSources.length > 0 ? project.answers.dataSources : ["Sistemas de información del área"]);

  const missingInfoList = (structured?.informacionFaltante && structured.informacionFaltante.length > 0)
    ? structured.informacionFaltante
    : [project.answers.hasDocumentation === "No existe documentación" ? "Documentación detallada paso a paso." : "Muestras de datos de prueba adicionales."];

  const calculatedKPIs = calculateProjectKPIs(project);
  const classifiedTechnologies = classifyProjectTechnologies(project);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-zinc-950 min-h-screen text-zinc-200">
      {/* Title block with status controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
            Proyecto ID: {project.id} • Área: {project.area}
          </span>
          <h1 className="text-3xl font-black text-white uppercase italic mt-1.5">
            {project.initiativeName}
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-1">
            Solicitante: <span className="text-blue-400 font-mono font-bold">{project.requesterEmail}</span>
          </p>
        </div>

        {/* Action Controls for Evaluators and Admins */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={handleExportDocx}
            disabled={exportingDocx}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-blue-950/50 hover:bg-blue-900/60 border border-blue-800/60 hover:border-blue-600/80 text-blue-300 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm disabled:opacity-50"
            title="Exportar ficha técnica completa a archivo de Word (.docx)"
          >
            <FileDown className={`w-3.5 h-3.5 text-blue-400 ${exportingDocx ? "animate-bounce" : ""}`} />
            <span>{exportingDocx ? "Generando Word..." : "Descargar Word (.docx)"}</span>
          </button>
          {isEvaluatorOrAdmin && (
            <>
              <button
                onClick={handleTriggerReprocess}
                disabled={reprocessing}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-500 ${reprocessing ? "animate-spin" : ""}`} />
                {reprocessing ? "Reprocesando..." : "Reprocesar IA"}
              </button>

              <button
                onClick={() => handleStatusChangeWithComment("Aprobado para piloto")}
                disabled={statusUpdating}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Aprobar Piloto
              </button>

              <button
                onClick={() => handleStatusChangeWithComment("Rechazado")}
                disabled={statusUpdating}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-950/30 hover:bg-rose-950/50 text-rose-400 border border-rose-900/40 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                Rechazar
              </button>

              {/* Advanced Status Drops */}
              <select
                value={project.status}
                disabled={statusUpdating}
                onChange={(e) => handleStatusChangeWithComment(e.target.value as ProjectStatus)}
                className="text-xs px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 font-bold uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option disabled>Cambiar Estado...</option>
                <option value="Pendiente de revisión">Pendiente de revisión</option>
                <option value="Información adicional requerida">Información adicional req.</option>
                <option value="Priorizado">Priorizado</option>
                <option value="En piloto">En piloto</option>
                <option value="Implementado">Implementado</option>
                <option value="En backlog">En backlog</option>
                <option value="Archivado">Archivado</option>
              </select>
            </>
          )}

          {onDeleteProject && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-900/50 hover:border-rose-800 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm"
              title="Eliminar este formulario/iniciativa"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Eliminar
            </button>
          )}
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-zinc-800 overflow-x-auto gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-[10px] font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "border-blue-500 text-blue-400 bg-zinc-900 rounded-t-xl"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-xl min-h-[350px]">
        
        {/* PANEL: RESUMEN */}
        {activeTab === "resumen" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Solución Recomendada</span>
                <p className="text-sm font-black text-blue-400 truncate uppercase tracking-wider">
                  {getSolutionTypeLabel(solutionType)}
                </p>
              </div>

              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Aptitud de Agente</span>
                <p className="text-sm font-black text-zinc-200 truncate uppercase tracking-wider">
                  {agentAptitude}
                </p>
              </div>

              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Confianza del Análisis</span>
                <p className="text-sm font-black text-emerald-400 truncate">
                  {confidenceScore}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Complejidad Estimada</span>
                <p className="text-sm font-black text-zinc-300 uppercase">
                  {estimatedComplexity}
                </p>
              </div>

              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Nivel de Riesgo</span>
                <p className={`text-sm font-black uppercase ${
                  riskLevel.toLowerCase().includes("crit") || riskLevel.toLowerCase().includes("alt")
                    ? "text-rose-400"
                    : riskLevel.toLowerCase().includes("med")
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}>
                  {riskLevel}
                </p>
              </div>

              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Sponsor de Área</span>
                <p className="text-xs font-bold text-zinc-300 truncate">
                  {project.sponsor || "No asignado"}
                </p>
              </div>
            </div>

            {/* Executive Summary Markdown */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                Resumen Ejecutivo por Gemini IA
              </h3>
              <div className="p-5 bg-blue-950/10 border border-blue-900/30 rounded-2xl text-xs text-zinc-300 leading-relaxed">
                {executiveSummaryText}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">
                  Justificación del tipo de solución
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                  {solutionJustification}
                </p>
              </div>

              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">
                  Siguiente paso recomendado
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                  {nextStepText}
                </p>
              </div>
            </div>

            {/* Tecnologías / Soluciones Aplicables */}
            <div className="p-5 bg-gradient-to-br from-purple-950/20 to-zinc-950 border border-purple-800/30 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400">
                  <Cpu className="w-4 h-4 text-purple-400" />
                </span>
                <div>
                  <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider">Tecnologías / Soluciones Aplicables</h4>
                  <p className="text-[10px] text-zinc-400">Clasificación de tecnologías evaluadas para este caso según la información del formulario e IA</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {classifiedTechnologies.map((tech) => (
                  <div
                    key={tech.name}
                    className={`p-3.5 rounded-xl border transition-all ${
                      tech.applied
                        ? tech.badgeColor
                        : "border-zinc-800/50 bg-zinc-950/30 opacity-40 text-zinc-500"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-wider font-mono flex items-center gap-1.5">
                        {tech.applied ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                        )}
                        {tech.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          tech.applied ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50" : "bg-zinc-900 text-zinc-600"
                        }`}
                      >
                        {tech.applied ? "Aplica" : "No aplica"}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-tight mt-2">{tech.description}</p>
                    {tech.name === "Otras" && tech.applied && tech.detailsIfOther && (
                      <div className="mt-2 pt-1.5 border-t border-pink-800/40 text-[10px] text-pink-300 font-mono font-medium">
                        <span className="font-bold uppercase text-pink-400 block text-[9px]">Especificación:</span>
                        {tech.detailsIfOther}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Google Enterprise & Vertex AI Integration */}
            <div className="p-5 bg-gradient-to-br from-emerald-950/20 to-teal-950/10 border border-emerald-800/20 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">Alineación Google Workspace & Vertex AI</h4>
                  <p className="text-[10px] text-zinc-500">Evaluación de integración y aceleración en el ecosistema corporativo</p>
                </div>
                <span className="ml-auto px-2.5 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 rounded-full text-[10px] font-black uppercase">
                  Viabilidad: {structured?.integracionGoogleYVertex?.viabilidadGoogle || "alta"}
                </span>
              </div>
              
              <p className="text-xs text-zinc-300 leading-relaxed">
                {structured?.integracionGoogleYVertex?.justificacion || 
                  "Esta iniciativa corporativa de Claro es ideal para ser desplegada e integrada de forma nativa en el ecosistema de Google Enterprise, utilizando APIs de Workspace para entrada/salida de datos y agentes conversacionales o modelos multimodales en Vertex AI para el razonamiento y procesamiento de documentos."}
              </p>

              <div className="pt-1 flex flex-wrap gap-1.5">
                {(structured?.integracionGoogleYVertex?.serviciosRecomendados || ["Vertex AI Agent Builder", "Google Workspace APIs", "Document AI"]).map((service, sIdx) => (
                  <span key={sIdx} className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 font-mono rounded-md">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Diagrama de Flujo Banner */}
            <div className="p-5 bg-gradient-to-br from-purple-950/30 to-blue-950/20 border border-purple-800/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400">
                  <Layers className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider">Diagrama de Flujo de Proceso (AS-IS / TO-BE)</h4>
                  <p className="text-[11px] text-zinc-400">Diagrama secuencial interactivo derivado de la información cargada en el formulario y la IA.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("flowchart")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                Ver Diagrama de Flujo Completo →
              </button>
            </div>

            {/* KPIs de Éxito en Ficha Técnica */}
            <div className="p-5 bg-gradient-to-br from-blue-950/30 to-indigo-950/20 border border-blue-800/30 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400">
                    <Award className="w-4 h-4 text-blue-400" />
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider">KPIs de Éxito & Métricas de Impacto</h4>
                    <p className="text-[10px] text-zinc-400">Indicadores clave de rendimiento calculados por IA basados en el formulario</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("kpis")}
                  className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider underline cursor-pointer"
                >
                  Ver todos los KPIs →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {calculatedKPIs.slice(0, 3).map((kpi) => (
                  <div key={kpi.id} className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{kpi.category}</span>
                      <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 font-mono font-extrabold text-[10px] rounded-md shrink-0">
                        {kpi.targetNumeric}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white line-clamp-1">{kpi.indicator}</p>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      <span className="text-zinc-500">Actual:</span> {kpi.currentValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL: KPIS DE ÉXITO */}
        {activeTab === "kpis" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-black text-white uppercase tracking-wider">
                    KPIs de Éxito & Métricas Numéricas de Impacto
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Lista de indicadores clave y metas proyectadas calculadas con IA con base en la información diligenciada en el formulario.
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-950/50 border border-blue-800/40 text-blue-400 text-xs font-mono font-bold rounded-full">
                {calculatedKPIs.length} Indicadores Estimados
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {calculatedKPIs.map((kpi) => (
                <div
                  key={kpi.id}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 space-y-3 transition-all shadow-md relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-3">
                    <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest rounded-lg">
                      {kpi.category}
                    </span>
                    <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono font-black text-xs rounded-full shadow-sm">
                      {kpi.targetNumeric}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {kpi.indicator}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase font-bold block">Valor Actual (Línea Base)</span>
                      <span className="text-zinc-300 font-bold block mt-0.5">{kpi.currentValue}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-500 uppercase font-bold block">Meta Numérica IA</span>
                      <span className="text-emerald-400 font-extrabold block mt-0.5">{kpi.targetValue}</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[9px] text-zinc-500 uppercase font-bold font-mono block">Impacto Esperado</span>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">{kpi.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL: DIAGRAMA DE FLUJO */}
        {activeTab === "flowchart" && (
          <ProcessFlowchart project={project} />
        )}

        {/* PANEL: PUNTOS CLAVE */}
        {activeTab === "puntos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">Problema Principal</span>
                <p className="text-xs text-zinc-300 leading-relaxed">{problemText}</p>
              </div>

              <div className="space-y-2 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">Resultado Esperado</span>
                <p className="text-xs text-zinc-300 leading-relaxed">{outcomeText}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 text-xs font-mono">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Volumen Mensual</span>
                <p className="font-extrabold text-white text-sm italic mt-1">{casesPerMonth} casos/mes</p>
              </div>

              <div className="space-y-1 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 text-xs font-mono">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Esfuerzo Anual Estimado</span>
                <p className="font-extrabold text-white text-sm italic mt-1">{calculatedAnnualHours} horas/año</p>
              </div>

              <div className="space-y-1 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 text-xs font-mono">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Impacto Económico</span>
                <p className="font-extrabold text-blue-400 text-sm italic mt-1">
                  {project.answers.annualValueCop
                    ? `COP ${Number(project.answers.annualValueCop).toLocaleString("es-CO")}/año (${project.answers.impactType || "Ahorro"})`
                    : `COP 0/año (${project.answers.canEstimateEconomicImpact || "Sin estimación"})`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">Beneficios esperados</span>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                  {benefitsList.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">Riesgos de Implementación</span>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                  {risksList.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-zinc-800 pt-4">
              <div className="space-y-2 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">Dependencias técnicas</span>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                  {dependenciesList.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">Información Faltante</span>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                  {missingInfoList.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: RESPUESTAS ORIGINALES */}
        {activeTab === "originales" && (
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono pb-2 border-b border-zinc-800">
              Formulario de Respuestas Originales Completo
            </h3>
            
            {Object.entries(project.answers).map(([key, val]) => {
              if (key === "steps" && Array.isArray(val)) {
                return (
                  <div key={key} className="space-y-2 text-xs border-b border-zinc-800 pb-4">
                    <span className="font-bold text-zinc-500 uppercase tracking-wider font-mono">Mapeo de Pasos:</span>
                    <div className="space-y-2">
                      {val.map((s: any) => (
                        <div key={s.number} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
                          <span className="font-bold text-blue-400 font-mono">Paso {s.number}:</span> {s.description} • <span className="text-zinc-500">Resp: {s.responsible} ({s.system})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (typeof val === "object" && val !== null) {
                return (
                  <div key={key} className="space-y-1 text-xs border-b border-zinc-800 pb-4">
                    <span className="font-bold text-zinc-500 uppercase tracking-wider font-mono">{getQuestionLabel(key)}:</span>
                    <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-[10px] text-zinc-400 font-mono">{JSON.stringify(val, null, 2)}</pre>
                  </div>
                );
              }

              return (
                <div key={key} className="space-y-1 text-xs border-b border-zinc-800 pb-3">
                  <span className="font-bold text-zinc-500 uppercase tracking-wider font-mono">{getQuestionLabel(key)}:</span>
                  <p className="text-zinc-300 font-medium">{String(val || "No especificado")}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* PANEL: PUNTAJES */}
        {activeTab === "puntajes" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Puntaje Total</span>
                <p className="text-3xl font-black text-blue-400 italic mt-1">
                  {activeScore?.totalScore ?? project.currentRank ?? "0"}/100
                </p>
              </div>

              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Importancia (40%)</span>
                <p className="text-2xl font-bold text-zinc-200 mt-1">
                  {activeScore?.importanceScore ?? 0}/100
                </p>
              </div>

              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Viabilidad (35%)</span>
                <p className="text-2xl font-bold text-zinc-200 mt-1">
                  {activeScore?.viabilityScore ?? 0}/100
                </p>
              </div>

              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Facilidad (25%)</span>
                <p className="text-2xl font-bold text-zinc-200 mt-1">
                  {activeScore?.easeScore ?? 0}/100
                </p>
              </div>
            </div>

            {/* Restrictions Alerts section 17 */}
            {activeScore?.restrictions && activeScore.restrictions.length > 0 && (
              <div className="p-5 bg-rose-950/20 border border-rose-900/40 rounded-2xl text-xs text-rose-300 space-y-2">
                <div className="flex items-center gap-2 font-bold uppercase tracking-widest font-mono">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Alerta: Requiere Revisión Especializada (Sección 17)
                </div>
                <p className="text-[11px] leading-relaxed font-medium">
                  Esta iniciativa activa reglas de control de riesgos y seguridad. No califica automáticamente como Quick Win directo y requiere auditoría de los siguientes aspectos:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  {activeScore.restrictions.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed breakdowns for scoring */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                Desglose Detallado del Cálculo de Puntuación
              </h3>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {/* Importancia Breakdown */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">Dimensión: Importancia</span>
                  {activeScore?.factorBreakdown?.importance?.map((item, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs flex justify-between gap-4 items-start">
                      <div className="space-y-0.5">
                        <span className="font-bold text-zinc-200">{item.factor}</span>
                        <p className="text-[11px] text-zinc-500">Respuesta: {item.userAnswer}</p>
                        <p className="text-[10px] text-blue-400 font-mono mt-1">{item.explanation}</p>
                      </div>
                      <span className="font-mono text-zinc-400 shrink-0">{item.scoreObtained} / {item.maxScore} pts</span>
                    </div>
                  ))}
                </div>

                {/* Viabilidad Breakdown */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">Dimensión: Viabilidad</span>
                  {activeScore?.factorBreakdown?.viability?.map((item, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs flex justify-between gap-4 items-start">
                      <div className="space-y-0.5">
                        <span className="font-bold text-zinc-200">{item.factor}</span>
                        <p className="text-[11px] text-zinc-500">Respuesta: {item.userAnswer}</p>
                        <p className="text-[10px] text-blue-400 font-mono mt-1">{item.explanation}</p>
                      </div>
                      <span className="font-mono text-zinc-400 shrink-0">{item.scoreObtained} / {item.maxScore} pts</span>
                    </div>
                  ))}
                </div>

                {/* Ease Breakdown */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">Dimensión: Facilidad de Implementación</span>
                  {activeScore?.factorBreakdown?.ease?.map((item, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs flex justify-between gap-4 items-start">
                      <div className="space-y-0.5">
                        <span className="font-bold text-zinc-200">{item.factor}</span>
                        <p className="text-[11px] text-zinc-500">Respuesta: {item.userAnswer}</p>
                        <p className="text-[10px] text-blue-400 font-mono mt-1">{item.explanation}</p>
                      </div>
                      <span className="font-mono text-zinc-400 shrink-0">{item.scoreObtained} / {item.maxScore} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: RECOMENDACIONES */}
        {activeTab === "recomendaciones" && (
          <div className="space-y-5">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
              Análisis Estratégico y Recomendaciones de Implementación
            </h3>

            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-5">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Alcance inicial sugerido</span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Basado en las respuestas del proceso, Gemini sugiere un enfoque iterativo comenzando por un piloto enfocado en "{project.answers.processActivity}" limitando la autonomía a borradores o validación guiada.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">Recomendaciones del Consultor de IA</span>
                <div className="space-y-2">
                  {structured?.recomendaciones?.map((rec, i) => (
                    <div key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                      <span className="text-blue-500 font-extrabold">•</span>
                      <span>{rec}</span>
                    </div>
                  )) || <p className="text-xs text-zinc-500">Recomendaciones detalladas no calculadas.</p>}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">Preguntas de Auditoría para el Área</span>
                <div className="space-y-2.5">
                  {structured?.preguntasParaElArea?.map((q, i) => (
                    <div key={i} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-900 p-3 border border-zinc-800 rounded-xl">
                      <span className="text-blue-500 font-extrabold shrink-0 font-mono">P{i+1}:</span>
                      <span>{q}</span>
                    </div>
                  )) || <p className="text-xs text-zinc-500">Preguntas de validación no calculadas.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: HISTORIAL & COMENTARIOS */}
        {activeTab === "historial" && (
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
              Trazabilidad y Comentarios del Proyecto (Sección 10)
            </h3>

            {/* Change History Timeline */}
            <div className="relative border-l border-zinc-850 pl-4 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-zinc-200">Iniciativa Creada</span>
                <p className="text-[9px] text-zinc-500 font-mono">Fecha: {new Date(project.createdAt).toLocaleString("es-CO")}</p>
                <p className="text-zinc-400">Estado inicial asignado automáticamente: Borrador.</p>
              </div>

              {project.submittedAt && (
                <div className="space-y-1">
                  <span className="font-bold text-zinc-200">Iniciativa Enviada</span>
                  <p className="text-[9px] text-zinc-500 font-mono">Fecha: {new Date(project.submittedAt).toLocaleString("es-CO")}</p>
                  <p className="text-zinc-400">Se calcula la puntuación y se genera el análisis de Gemini.</p>
                </div>
              )}

              {comments
                .filter((c) => c.type === "status_change" || c.type === "admin_override")
                .map((log) => (
                  <div key={log.id} className="space-y-1">
                    <span className="font-bold text-zinc-200">{log.text}</span>
                    <p className="text-[9px] text-zinc-500 font-mono">Fecha: {new Date(log.createdAt).toLocaleString("es-CO")} • Por: {log.authorName}</p>
                  </div>
                ))}
            </div>

            {/* Conversation Comments block */}
            <div className="border-t border-zinc-800 pt-5 space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-zinc-500" />
                Mesa de Trabajo / Feedback Funcional
              </h4>

              {/* Comments list */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                {comments.filter(c => c.type === "general" || c.type === "additional_info_requested").length === 0 ? (
                  <p className="text-center text-[11px] text-zinc-500 py-6 bg-zinc-950 border border-dashed border-zinc-800 rounded-2xl">
                    No hay comentarios funcionales aún en esta iniciativa.
                  </p>
                ) : (
                  comments
                    .filter(c => c.type === "general" || c.type === "additional_info_requested")
                    .map((comm) => (
                      <div key={comm.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs space-y-1">
                        <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono">
                          <span className="font-bold text-zinc-300">{comm.authorName} ({comm.authorEmail})</span>
                          <span>{new Date(comm.createdAt).toLocaleString("es-CO")}</span>
                        </div>
                        <p className="text-zinc-300 font-medium">{comm.text}</p>
                      </div>
                    ))
                )}
              </div>

              {/* Add Comment form */}
              <form onSubmit={handleSendComment} className="flex gap-2.5">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Agregar una observación o solicitar más detalles..."
                  className="flex-1 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5 text-blue-500" />
                  Comentar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-950/50 border border-rose-900/50 rounded-2xl text-rose-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white uppercase tracking-tight">
                  ¿Eliminar Formulario?
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Está a punto de eliminar de forma permanente la iniciativa{" "}
                  <strong className="text-white">"{project.initiativeName}"</strong>.
                  Esta acción borrará de Firestore la ficha técnica, los análisis de IA y la trazabilidad asociada.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  if (onDeleteProject) {
                    await onDeleteProject(project.id);
                  }
                  setShowDeleteModal(false);
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-rose-600/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
