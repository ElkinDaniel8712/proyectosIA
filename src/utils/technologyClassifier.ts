import { Project, FormAnswers, StructuredAnalysisJSON } from "../types";

export interface TechnologyItem {
  name: "IA agéntica" | "Automatización" | "IA Predictiva" | "Front End Web" | "RPA" | "Otras";
  applied: boolean;
  badgeColor: string;
  description: string;
  detailsIfOther?: string;
}

export function classifyProjectTechnologies(project: Project): TechnologyItem[] {
  const answers: Partial<FormAnswers> = project.answers || {};
  const structured: StructuredAnalysisJSON | undefined = project.analysis?.structuredAnalysis;
  
  const textCorpus = [
    project.initiativeName || "",
    answers.initiativeName || "",
    answers.processActivity || "",
    answers.currentProblem || "",
    answers.finalResult || "",
    answers.expectedOutcome || "",
    answers.economicExplanation || "",
    answers.dataOrganization || "",
    structured?.resumenEjecutivo || "",
    structured?.problemaPrincipal || "",
    structured?.resultadoEsperado || "",
    structured?.justificacionTipoSolucion || "",
  ].join(" ").toLowerCase();

  // If structured analysis from AI already provided explicit tecnología options, check it first
  const aiTecnologias = structured?.tecnologiasAplicables;

  // 1. IA Agéntica
  const isAiAgentic = (() => {
    if (aiTecnologias) {
      const found = aiTecnologias.find(t => t.opcion === "IA agéntica");
      if (found) return found.aplica;
    }
    const solType = structured?.tipoSolucionRecomendada || "";
    if (solType.includes("agente") || solType === "asistente_ia") return true;
    if (structured?.aptitudParaAgente === "alta" || structured?.aptitudParaAgente === "media") return true;
    const autonomy = answers.autonomyLevel || "";
    if (autonomy.includes("2.") || autonomy.includes("3.") || autonomy.includes("4.") || autonomy.includes("5.") || autonomy.includes("6.")) return true;
    return textCorpus.includes("agente") || textCorpus.includes("asistente") || textCorpus.includes("ia") || textCorpus.includes("copilot") || textCorpus.includes("llm");
  })();

  // 2. Automatización
  const isAutomation = (() => {
    if (aiTecnologias) {
      const found = aiTecnologias.find(t => t.opcion === "Automatización");
      if (found) return found.aplica;
    }
    const solType = structured?.tipoSolucionRecomendada || "";
    if (solType.includes("automatizacion") || solType.includes("flujo") || solType.includes("agente")) return true;
    const std = answers.standardizationLevel || "";
    if (std.includes("documentado") || std.includes("estandarizado")) return true;
    return textCorpus.includes("automatiz") || textCorpus.includes("flujo") || textCorpus.includes("workflow") || textCorpus.includes("notificac");
  })();

  // 3. IA Predictiva
  const isPredictive = (() => {
    if (aiTecnologias) {
      const found = aiTecnologias.find(t => t.opcion === "IA Predictiva");
      if (found) return found.aplica;
    }
    return textCorpus.includes("predict") || textCorpus.includes("predecir") || textCorpus.includes("pronóstico") || 
           textCorpus.includes("patrón") || textCorpus.includes("patrones") || textCorpus.includes("score") || 
           textCorpus.includes("clasificac") || textCorpus.includes("riesgo") || textCorpus.includes("anomalía") ||
           textCorpus.includes("machine learning") || textCorpus.includes("proyección");
  })();

  // 4. Front End Web
  const isFrontEnd = (() => {
    if (aiTecnologias) {
      const found = aiTecnologias.find(t => t.opcion === "Front End Web");
      if (found) return found.aplica;
    }
    return textCorpus.includes("web") || textCorpus.includes("portal") || textCorpus.includes("pantalla") || 
           textCorpus.includes("interfaz") || textCorpus.includes("dashboard") || textCorpus.includes("formulario") ||
           textCorpus.includes("cliente") || textCorpus.includes("usuario") || textCorpus.includes("vista");
  })();

  // 5. RPA
  const isRPA = (() => {
    if (aiTecnologias) {
      const found = aiTecnologias.find(t => t.opcion === "RPA");
      if (found) return found.aplica;
    }
    const dataOrg = answers.dataOrganization || "";
    return textCorpus.includes("rpa") || textCorpus.includes("robot") || textCorpus.includes("excel") || 
           textCorpus.includes("macro") || textCorpus.includes("copiar y pegar") || textCorpus.includes("legado") || 
           textCorpus.includes("sap") || dataOrg.includes("hojas de cálculo") || textCorpus.includes("sin api");
  })();

  // 6. Otras
  const isOther = (() => {
    if (aiTecnologias) {
      const found = aiTecnologias.find(t => t.opcion === "Otras");
      if (found) return found.aplica;
    }
    return textCorpus.includes("pdf") || textCorpus.includes("ocr") || textCorpus.includes("escane") || 
           textCorpus.includes("imagen") || textCorpus.includes("api") || textCorpus.includes("whatsapp") ||
           textCorpus.includes("correo") || textCorpus.includes("nlp") || textCorpus.includes("visión");
  })();

  // Build specific details for "Otras" if applicable
  const otherDetailsList: string[] = [];
  if (textCorpus.includes("pdf") || textCorpus.includes("ocr") || textCorpus.includes("escane") || textCorpus.includes("imagen")) {
    otherDetailsList.push("OCR / Reconocimiento de Documentos y PDFs");
  }
  if (textCorpus.includes("api") || textCorpus.includes("webhook") || textCorpus.includes("rest")) {
    otherDetailsList.push("Integración de APIs y Webhooks REST");
  }
  if (textCorpus.includes("whatsapp") || textCorpus.includes("correo") || textCorpus.includes("email")) {
    otherDetailsList.push("Omnicanalidad (WhatsApp / Email Parser)");
  }
  if (textCorpus.includes("nlp") || textCorpus.includes("texto") || textCorpus.includes("lenguaje")) {
    otherDetailsList.push("Procesamiento de Lenguaje Natural (NLP)");
  }
  if (otherDetailsList.length === 0 && isOther) {
    otherDetailsList.push("Integraciones de servicios cloud & conectores personalizados");
  }

  const results: TechnologyItem[] = [
    {
      name: "IA agéntica",
      applied: isAiAgentic,
      badgeColor: "border-purple-500/50 bg-purple-950/40 text-purple-300",
      description: "Agentes autónomos con capacidad de razonamiento, toma de decisiones y ejecución de acciones.",
    },
    {
      name: "Automatización",
      applied: isAutomation,
      badgeColor: "border-blue-500/50 bg-blue-950/40 text-blue-300",
      description: "Flujos de trabajo orquestados, reglas de negocio e integración entre sistemas.",
    },
    {
      name: "IA Predictiva",
      applied: isPredictive,
      badgeColor: "border-amber-500/50 bg-amber-950/40 text-amber-300",
      description: "Modelos analíticos de estimación, clasificación de datos y detección de patrones.",
    },
    {
      name: "Front End Web",
      applied: isFrontEnd,
      badgeColor: "border-cyan-500/50 bg-cyan-950/40 text-cyan-300",
      description: "Portales de usuario, tableros interactivos y formularios de captura o gestión.",
    },
    {
      name: "RPA",
      applied: isRPA,
      badgeColor: "border-emerald-500/50 bg-emerald-950/40 text-emerald-300",
      description: "Robótica de procesos para interacción directa con aplicaciones o sistemas legados.",
    },
    {
      name: "Otras",
      applied: isOther,
      badgeColor: "border-pink-500/50 bg-pink-950/40 text-pink-300",
      description: "Otras tecnologías especializadas aplicables al caso de uso.",
      detailsIfOther: otherDetailsList.join(", "),
    },
  ];

  return results;
}
