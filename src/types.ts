export interface Step {
  number: number;
  description: string;
  responsible: string;
  system: string;
}

export interface IndicatorData {
  indicator: string;
  currentValue: string;
  targetValue: string;
  unit: string;
  source: string;
}

export interface FormAnswers {
  // Sección 1
  initiativeName: string;
  area: string;
  otherArea?: string;
  processOwner: string;
  sponsor: string;
  processActivity: string;
  
  // Sección 2
  currentProblem: string;
  steps?: Step[];
  trigger: string;
  finalResult: string;
  standardizationLevel: string;
  
  // Sección 3
  frequency: string;
  monthlyCases: number;
  timePerCase: number;
  timeUnit: "Minutos" | "Horas" | "Días laborales";
  peopleInvolved: number;
  reworkFrequency: string;
  
  // Sección 4
  consequences: string[];
  otherConsequencesDescription?: string;
  affectedGroup: string;
  errorConsequences: string;
  hasDeadline?: string;
  deadlineDate?: string;
  deadlineExplanation?: string;
  deadlineEvidence?: string;
  canEstimateEconomicImpact: string;
  annualValueCop?: number;
  impactType?: string;
  economicExplanation?: string;
  
  // Sección 5
  expectedSolutionActions?: string[];
  otherSolutionAction?: string;
  expectedOutcome: string;
  autonomyLevel: string;
  mandatoryHumanIntervention?: string[];
  escalationRule?: string;
  
  // Sección 6
  dataSources: string[];
  otherDataSource?: string;
  dataOrganization: string;
  availableExamples: string;
  dataType: string[];
  otherDataType?: string;
  errorImpactLevel?: string;
  hasAccessAuthorization?: string;
  canObtainAutomatically: string;
  hasDocumentation: string;
  
  // Deprecated/Removed
  expertAvailability?: string;
  pilotAuthorization?: string;
  pilotConditions?: string;
  safeTestingEnvironment?: string;
  successMetric?: string;
  metricDetails?: IndicatorData;

  // Flexible indexing for dynamic custom fields
  [key: string]: any;
}

export type ProjectStatus =
  | "Borrador"
  | "Enviado"
  | "Pendiente de análisis de IA"
  | "Analizado por IA"
  | "Pendiente de revisión"
  | "Información adicional requerida"
  | "Priorizado"
  | "Aprobado para piloto"
  | "En piloto"
  | "Implementado"
  | "En backlog"
  | "Rechazado"
  | "Archivado";

export interface ProjectAttachment {
  name: string;
  type: string;
  size: number;
  userEmail: string;
  uploadedAt: string;
  classification: string;
}

export interface Project {
  id: string;
  initiativeName: string;
  area: string;
  otherArea?: string;
  requesterId: string;
  requesterEmail: string;
  processOwner: string;
  sponsor: string;
  status: ProjectStatus;
  answers: FormAnswers;
  attachments?: ProjectAttachment[];
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  currentAnalysisId?: string;
  currentScoreId?: string;
  currentRank?: number;
  category?: string;
  riskLevel?: string;
  recommendedSolutionType?: string;
  isDemo?: boolean;
  score?: ProjectScore;
  analysis?: AIAnalysis;
  createdBy?: string;
}

export interface AIAnalysis {
  id: string;
  projectId: string;
  model?: string;
  promptVersion?: string;
  structuredAnalysis: StructuredAnalysisJSON;
  confidence?: number;
  createdAt?: string;
  createdBy?: string;
  status?: "success" | "failed";
  errorMessage?: string;
  rawResponse?: string;
  analyzedAt?: string;
}

export interface StructuredAnalysisJSON {
  resumenEjecutivo: string;
  problemaPrincipal: string;
  procesoActual: string;
  consecuenciasPrincipales: string[];
  volumenYEsfuerzo: {
    casosMensuales: number;
    minutosPorCaso: number;
    horasAnualesEstimadas: number;
    personasParticipantes: number;
    nivelReproceso: string;
  };
  impacto: {
    descripcion: string;
    impactoEconomicoReportado: number;
    tipoImpactoEconomico: string;
    nivelEvidencia: "documentado" | "estimado" | "no disponible";
    afectacionClientes: string;
    riesgosActuales: string[];
  };
  resultadoEsperado: string;
  tipoSolucionRecomendada:
    | "automatizacion_tradicional"
    | "flujo_trabajo"
    | "asistente_ia"
    | "agente_con_aprobacion"
    | "agente_parcialmente_autonomo"
    | "agente_autonomo"
    | "mejora_proceso";
  justificacionTipoSolucion?: string;
  aptitudParaAgente?: "alta" | "media" | "baja" | "no_recomendado";
  complejidadEstimada?: "baja" | "media" | "alta" | "muy_alta";
  nivelRiesgo?: "bajo" | "medio" | "alto" | "critico";
  beneficiosEsperados?: string[];
  riesgosImplementacion?: string[];
  dependencias?: string[];
  informacionFaltante?: string[];
  preguntasParaElArea?: string[];
  recomendaciones?: string[];
  siguientePasoRecomendado?: string;
  confianzaAnalisis?: number;
  kpisDeExito?: {
    indicador: string;
    valorActual: string;
    metaNumerica: string;
    impactoEsperado: string;
  }[];
  tecnologiasAplicables?: {
    opcion: "IA agéntica" | "Automatización" | "IA Predictiva" | "Front End Web" | "RPA" | "Otras";
    aplica: boolean;
    detalle?: string;
  }[];
  integracionGoogleYVertex?: {
    viabilidadGoogle: "alta" | "media" | "baja";
    serviciosRecomendados: string[];
    justificacion: string;
  };
  evidencias?: {
    preguntaId: string;
    respuestaOriginal: string;
    interpretacion: string;
  }[];
  [key: string]: any;
}

export interface FactorBreakdownItem {
  factor: string;
  userAnswer: string;
  scoreObtained: number;
  maxScore: number;
  explanation: string;
}

export interface ProjectScore {
  id: string;
  projectId: string;
  scoringVersion: string;
  importanceScore: number;
  viabilityScore: number;
  easeScore: number;
  totalScore: number;
  factorBreakdown: {
    importance: FactorBreakdownItem[];
    viability: FactorBreakdownItem[];
    ease: FactorBreakdownItem[];
  };
  restrictions: string[];
  category: string;
  calculatedAt: string;
}

export interface ScoringWeights {
  importance: number; // e.g., 0.40
  viability: number;  // e.g., 0.35
  ease: number;       // e.g., 0.25
}

export interface ScoringConfiguration {
  id: string;
  version: string;
  weights: ScoringWeights;
  active: boolean;
  createdAt: string;
  createdBy: string;
}

export interface RankingSnapshot {
  id: string;
  scoringVersion: string;
  createdAt: string;
  createdBy: string;
  reason: string;
  rankedProjects: {
    projectId: string;
    initiativeName: string;
    area: string;
    totalScore: number;
    importanceScore: number;
    viabilityScore: number;
    easeScore: number;
    rankPosition: number;
    category: string;
    status: ProjectStatus;
  }[];
}

export interface ProjectComment {
  id: string;
  projectId: string;
  authorId: string;
  authorEmail: string;
  authorName: string;
  text: string;
  type: "general" | "additional_info_requested" | "status_change" | "admin_override";
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: "project" | "scoringConfiguration" | "user" | "ranking";
  entityId: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
  timestamp: string;
}

export type UserRole = "Solicitante" | "Evaluador" | "Administrador" | "Visitante";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  area: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
