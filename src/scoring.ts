import { FormAnswers, ProjectScore, FactorBreakdownItem } from "./types";

export const DEFAULT_WEIGHTS = {
  importance: 0.40,
  viability: 0.35,
  ease: 0.25,
};

export function calculateProjectScore(
  projectId: string,
  answers: FormAnswers,
  weights = DEFAULT_WEIGHTS,
  scoringVersion = "v1"
): ProjectScore {
  // --- 1. IMPORTANCE SCORE (Max 100 pts) ---
  const importanceBreakdown: FactorBreakdownItem[] = [];

  // 1.1 Esfuerzo humano anual (max 25 pts)
  let minutesPerCase = answers.timePerCase || 0;
  if (answers.timeUnit === "Horas") {
    minutesPerCase = (answers.timePerCase || 0) * 60;
  } else if (answers.timeUnit === "Días laborales") {
    minutesPerCase = (answers.timePerCase || 0) * 8 * 60;
  }

  const annualHours = ((answers.monthlyCases || 0) * minutesPerCase * 12) / 60;
  let annualEffortPoints = 5;
  if (annualHours < 100) {
    annualEffortPoints = 5;
  } else if (annualHours >= 100 && annualHours < 500) {
    annualEffortPoints = 10;
  } else if (annualHours >= 500 && annualHours < 1000) {
    annualEffortPoints = 15;
  } else if (annualHours >= 1000 && annualHours < 2500) {
    annualEffortPoints = 20;
  } else if (annualHours >= 2500) {
    annualEffortPoints = 25;
  }

  importanceBreakdown.push({
    factor: "Esfuerzo humano anual",
    userAnswer: `${answers.monthlyCases || 0} casos/mes, ${answers.timePerCase || 0} ${answers.timeUnit || "Minutos"}/caso. Equivale a ${annualHours.toLocaleString("es-CO", { maximumFractionDigits: 1 })} h/año.`,
    scoreObtained: annualEffortPoints,
    maxScore: 25,
    explanation: `Asignado según volumen e inversión de tiempo anual (${annualHours.toFixed(1)} h/año).`,
  });

  // 1.2 Frecuencia de reprocesos (max 15 pts)
  let reworkPoints = 5;
  if (answers.reworkFrequency?.includes("Más del 15")) {
    reworkPoints = 15;
  } else if (answers.reworkFrequency?.includes("5 % y el 15")) {
    reworkPoints = 10;
  } else {
    reworkPoints = 5;
  }

  importanceBreakdown.push({
    factor: "Frecuencia de reprocesos",
    userAnswer: answers.reworkFrequency || "Menos del 5 % de los casos",
    scoreObtained: reworkPoints,
    maxScore: 15,
    explanation: `Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución.`,
  });

  // 1.3 Consecuencias del problema (max 25 pts)
  const consequenceScores: Record<string, number> = {
    "Retrasos en la atención": 5,
    "Errores en la información": 6,
    "Reprocesos": 5,
    "Sobrecostos": 8,
    "Pérdida o retraso de ingresos": 10,
    "Incumplimiento de tiempos acordados": 7,
    "Afectación a clientes": 8,
    "Riesgo contractual": 9,
    "Riesgo regulatorio": 10,
    "Riesgo de seguridad": 10,
    "Dependencia de una persona específica": 5,
    "Dificultad para atender un mayor volumen": 6,
  };

  let consequencesPoints = 0;
  (answers.consequences || []).forEach((c) => {
    consequencesPoints += consequenceScores[c] || 0;
  });
  if ((answers.consequences || []).includes("Otra") && answers.otherConsequencesDescription) {
    consequencesPoints += 5;
  }

  if (answers.errorConsequences && answers.errorConsequences.trim().length > 0) {
    const text = answers.errorConsequences.toLowerCase();
    if (text.includes("retraso") || text.includes("tiempo") || text.includes("demora")) consequencesPoints += 4;
    if (text.includes("error") || text.includes("fallo") || text.includes("imprecisión")) consequencesPoints += 5;
    if (text.includes("costo") || text.includes("dinero") || text.includes("multa")) consequencesPoints += 6;
    if (text.includes("cliente") || text.includes("usuario")) consequencesPoints += 5;
    if (text.includes("riesgo") || text.includes("seguridad") || text.includes("legal")) consequencesPoints += 6;
    if (consequencesPoints === 0) consequencesPoints = 10;
  } else if (consequencesPoints === 0) {
    consequencesPoints = 8;
  }

  consequencesPoints = Math.min(Math.max(consequencesPoints, 8), 25);

  importanceBreakdown.push({
    factor: "Consecuencias e impacto operativo",
    userAnswer: answers.errorConsequences || (answers.consequences || []).join(", ") || "No detallado",
    scoreObtained: consequencesPoints,
    maxScore: 25,
    explanation: `Evaluación de la severidad operativa, retrasos y riesgos reportados.`,
  });

  // 1.4 Alcance de la afectación (max 15 pts)
  const affectedScores: Record<string, number> = {
    "Clientes externos": 15,
    "Toda la compañía": 15,
    "Otras áreas de la empresa": 10,
    "Proveedores o aliados externos": 8,
    "Usuarios internos del área": 5,
  };
  const affectedPoints = affectedScores[answers.affectedGroup] || 5;

  importanceBreakdown.push({
    factor: "Alcance de la afectación",
    userAnswer: answers.affectedGroup || "No especificado",
    scoreObtained: affectedPoints,
    maxScore: 15,
    explanation: `Puntuación basada en quién se ve afectado principalmente por el problema.`,
  });

  // 1.5 Impacto económico (max 20 pts)
  let baseEconomicPoints = 0;
  const annualCop = Number(answers.annualValueCop) || 0;
  if (!answers.canEstimateEconomicImpact || answers.canEstimateEconomicImpact === "No existe un cálculo" || annualCop <= 0) {
    baseEconomicPoints = 4;
  } else if (annualCop < 50000000) {
    baseEconomicPoints = 8;
  } else if (annualCop >= 50000000 && annualCop < 250000000) {
    baseEconomicPoints = 12;
  } else if (annualCop >= 250000000 && annualCop < 1000000000) {
    baseEconomicPoints = 16;
  } else if (annualCop >= 1000000000) {
    baseEconomicPoints = 20;
  }

  let evidenceMultiplier = 0.5;
  if (answers.canEstimateEconomicImpact === "Sí, está documentado y auditado") {
    evidenceMultiplier = 1.0;
  } else if (answers.canEstimateEconomicImpact === "Sí, se puede estimar") {
    evidenceMultiplier = 0.8;
  } else {
    evidenceMultiplier = 0.4;
  }

  const finalEconomicPoints = Math.max(4, Math.round(baseEconomicPoints * evidenceMultiplier));

  importanceBreakdown.push({
    factor: "Impacto económico",
    userAnswer: `${answers.canEstimateEconomicImpact || "Sin estimación"}${annualCop > 0 ? ` - COP ${annualCop.toLocaleString("es-CO")}/año (${answers.impactType || "General"})` : ""}`,
    scoreObtained: finalEconomicPoints,
    maxScore: 20,
    explanation: `Puntos base (${baseEconomicPoints}) ajustados por nivel de certidumbre (${Math.round(evidenceMultiplier * 100)}%).`,
  });

  const importanceScore = importanceBreakdown.reduce((sum, item) => sum + item.scoreObtained, 0);


  // --- 2. VIABILITY SCORE (Max 100 pts) ---
  const viabilityBreakdown: FactorBreakdownItem[] = [];

  // 2.1 Estandarización del proceso (max 25 pts)
  const standardizationScores: Record<string, number> = {
    "Está altamente automatizado y estandarizado": 25,
    "Está documentado y siempre se ejecuta de la misma manera": 20,
    "Está parcialmente estandarizado pero tiene muchas excepciones": 12,
    "No está estandarizado y cada persona lo realiza de forma diferente": 5,
  };
  const standardizationPoints = standardizationScores[answers.standardizationLevel] || 5;

  viabilityBreakdown.push({
    factor: "Estandarización del proceso",
    userAnswer: answers.standardizationLevel || "No definido",
    scoreObtained: standardizationPoints,
    maxScore: 25,
    explanation: `Procesos estandarizados reducen excepciones y facilitan la lógica de software.`,
  });

  // 2.2 Documentación del proceso (max 15 pts)
  const docScores: Record<string, number> = {
    "Sí, está completa y actualizada": 15,
    "Existe pero está desactualizada": 8,
    "No existe documentación": 2,
  };
  const docPoints = docScores[answers.hasDocumentation] || 5;

  viabilityBreakdown.push({
    factor: "Documentación disponible",
    userAnswer: answers.hasDocumentation || "No especificado",
    scoreObtained: docPoints,
    maxScore: 15,
    explanation: `Manuales y documentación reducen el tiempo de levantamiento funcional.`,
  });

  // 2.3 Organización de la información (max 20 pts)
  const organizationScores: Record<string, number> = {
    "Centralizada en un solo sistema": 20,
    "Distribuida en múltiples sistemas u hojas de cálculo": 15,
    "Archivos de texto, correos o PDFs sin estructura clara": 10,
    "Formato mixto (digital, físico y verbal)": 5,
  };
  const organizationPoints = organizationScores[answers.dataOrganization] || 5;

  viabilityBreakdown.push({
    factor: "Organización de la información",
    userAnswer: answers.dataOrganization || "No definido",
    scoreObtained: organizationPoints,
    maxScore: 20,
    explanation: `La centralización y estructuración de los datos facilita el procesamiento.`,
  });

  // 2.4 Ejemplos disponibles (max 20 pts)
  const examplesScores: Record<string, number> = {
    "Sí, más de 100 casos": 20,
    "Sí, entre 20 y 100 casos": 15,
    "Sí, menos de 20 casos": 10,
    "No se cuenta con ejemplos": 2,
  };
  const examplesPoints = examplesScores[answers.availableExamples] || 2;

  viabilityBreakdown.push({
    factor: "Ejemplos de entrenamiento/pruebas",
    userAnswer: answers.availableExamples || "No especificado",
    scoreObtained: examplesPoints,
    maxScore: 20,
    explanation: `Disponer de casos reales anteriores acelera la validación y pruebas.`,
  });

  // 2.5 Alineación Google Enterprise & Vertex AI (max 20 pts)
  let googleVertexPoints = 5;
  const dataSourcesText = ((answers.dataSources || []).join(" ") + " " + (answers.otherDataSource || "")).toLowerCase();
  const dataTypeText = ((answers.dataType || []).join(" ") + " " + (answers.otherDataType || "")).toLowerCase();
  const generalText = `${answers.initiativeName || ""} ${answers.processActivity || ""} ${answers.currentProblem || ""} ${answers.expectedOutcome || ""}`.toLowerCase();

  const hasWorkspaceIndicators = 
    dataSourcesText.includes("drive") || 
    dataSourcesText.includes("sheet") || 
    dataSourcesText.includes("gmail") || 
    dataSourcesText.includes("correo") || 
    dataSourcesText.includes("documento") || 
    dataSourcesText.includes("excel") || 
    dataSourcesText.includes("word") ||
    generalText.includes("drive") || 
    generalText.includes("sheet") || 
    generalText.includes("correo") || 
    generalText.includes("gmail");

  if (hasWorkspaceIndicators) googleVertexPoints += 8;

  const isAgenticLevel = answers.autonomyLevel && !answers.autonomyLevel.startsWith("1");
  if (isAgenticLevel) googleVertexPoints += 7;

  googleVertexPoints = Math.min(googleVertexPoints, 20);

  viabilityBreakdown.push({
    factor: "Alineación Google Enterprise & Vertex AI",
    userAnswer: `Workspace: ${hasWorkspaceIndicators ? "Apto" : "Estándar"}, Agente/IA: ${isAgenticLevel ? "Apto" : "Básico"}`,
    scoreObtained: googleVertexPoints,
    maxScore: 20,
    explanation: `Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente.`,
  });

  const viabilityScore = viabilityBreakdown.reduce((sum, item) => sum + item.scoreObtained, 0);


  // --- 3. EASE OF IMPLEMENTATION SCORE (Max 100 pts) ---
  const easeBreakdown: FactorBreakdownItem[] = [];

  // 3.1 Cantidad de fuentes o sistemas (max 25 pts)
  const systemCount = (answers.dataSources || []).length;
  let systemPoints = 10;
  if (systemCount <= 1) systemPoints = 25;
  else if (systemCount === 2) systemPoints = 20;
  else if (systemCount === 3) systemPoints = 15;
  else if (systemCount >= 4) systemPoints = 10;

  if ((answers.dataSources || []).includes("Conocimiento de las personas")) {
    systemPoints = Math.max(5, systemPoints - 5);
  }

  easeBreakdown.push({
    factor: "Cantidad de sistemas y fuentes",
    userAnswer: (answers.dataSources || []).join(", ") + (answers.otherDataSource ? ` (${answers.otherDataSource})` : "") || "Por definir",
    scoreObtained: systemPoints,
    maxScore: 25,
    explanation: `Menor número de fuentes simplifica las integraciones de datos.`,
  });

  // 3.2 Extracción automática de información (max 25 pts)
  const autoScores: Record<string, number> = {
    "Sí, los sistemas ya permiten integraciones automáticas": 25,
    "Parcialmente viable": 15,
    "No se puede obtener automáticamente": 5,
  };
  const autoPoints = autoScores[answers.canObtainAutomatically] || 5;

  easeBreakdown.push({
    factor: "Extracción automática de información",
    userAnswer: answers.canObtainAutomatically || "No especificado",
    scoreObtained: autoPoints,
    maxScore: 25,
    explanation: `Disponibilidad de conectores o APIs acelera la implementación.`,
  });

  // 3.3 Sensibilidad de la información (max 25 pts)
  let sensitivityPoints = 25;
  const sensitivityDiscounts: Record<string, number> = {
    "Información interna": 2,
    "Información confidencial": 4,
    "Datos personales": 5,
    "Información de clientes": 4,
    "Información financiera": 6,
    "Contratos": 4,
    "Información comercial sensible": 4,
    "Credenciales o contraseñas": 12,
    "Información regulada": 8,
  };

  (answers.dataType || []).forEach((type) => {
    sensitivityPoints -= (sensitivityDiscounts[type] || 0);
  });
  sensitivityPoints = Math.max(5, sensitivityPoints);

  easeBreakdown.push({
    factor: "Seguridad y sensibilidad de datos",
    userAnswer: (answers.dataType || []).join(", ") + (answers.otherDataType ? ` (${answers.otherDataType})` : "") || "Información general",
    scoreObtained: sensitivityPoints,
    maxScore: 25,
    explanation: `Gobernanza y requerimientos de seguridad según el tipo de datos procesados.`,
  });

  // 3.4 Nivel de autonomía solicitado (max 25 pts)
  const autonomyScores: Record<string, number> = {
    "1. Solo consultar y mostrar información": 25,
    "2. Generar sugerencias o borradores que un humano debe revisar": 22,
    "3. Ejecutar acciones sencillas de forma automática": 18,
    "4. Tomar decisiones bajo reglas estrictas de negocio": 14,
    "5. Operar de forma autónoma con supervisión periódica": 10,
    "6. Autonomía total para resolver de extremo a extremo": 6,
  };
  const autonomyPoints = autonomyScores[answers.autonomyLevel] || 18;

  easeBreakdown.push({
    factor: "Nivel de autonomía solicitado",
    userAnswer: answers.autonomyLevel || "Bajo supervisión",
    scoreObtained: autonomyPoints,
    maxScore: 25,
    explanation: `Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial.`,
  });

  const easeScore = easeBreakdown.reduce((sum, item) => sum + item.scoreObtained, 0);


  // --- 4. TOTAL SCORE CALCULATION ---
  const totalScore = parseFloat(
    (
      importanceScore * weights.importance +
      viabilityScore * weights.viability +
      easeScore * weights.ease
    ).toFixed(2)
  );

  // --- 5. EXCLUSION RULES AND CRITICAL ALERTS ---
  const restrictions: string[] = [];

  if ((answers.dataType || []).includes("Credenciales o contraseñas")) {
    restrictions.push("Manejo de credenciales o contraseñas directas.");
  }
  if ((answers.dataType || []).includes("Información financiera")) {
    restrictions.push("Manejo de información financiera sensible.");
  }
  if ((answers.dataType || []).includes("Datos personales")) {
    restrictions.push("Tratamiento de datos personales (Habeas Data).");
  }

  // --- 6. AUTOMATIC CATEGORIZATION ---
  let category = "Mantener en backlog";

  if (restrictions.length > 0) {
    category = "Requiere revisión especializada";
  } else if (importanceScore >= 60 && viabilityScore >= 55 && easeScore >= 55) {
    category = "Quick Win";
  } else if (importanceScore >= 45 && viabilityScore >= 55) {
    category = "Piloto de aprendizaje";
  } else if (importanceScore >= 60) {
    category = "Proyecto estratégico";
  } else if (importanceScore >= 45 && viabilityScore < 45) {
    category = "Preparar antes de implementar";
  } else {
    category = totalScore >= 50 ? "Piloto de aprendizaje" : "Mantener en backlog";
  }

  return {
    id: `score_${projectId}_${Date.now()}`,
    projectId,
    scoringVersion,
    importanceScore,
    viabilityScore,
    easeScore,
    totalScore,
    factorBreakdown: {
      importance: importanceBreakdown,
      viability: viabilityBreakdown,
      ease: easeBreakdown,
    },
    restrictions,
    category,
    calculatedAt: new Date().toISOString(),
  };
}
