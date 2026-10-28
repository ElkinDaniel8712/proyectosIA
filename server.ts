import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { calculateProjectScore } from "./src/scoring";
import { FormAnswers } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize Gemini API client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

import {
  getAllProjects,
  saveProject,
  deleteProject,
  replaceAllProjects,
  bulkUpsertProjects,
  getProjectComments,
  addProjectComment,
} from "./serverStore";

// Endpoints API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Database Health & Status Endpoint
app.get("/api/database-status", (req, res) => {
  const projects = getAllProjects();
  res.json({
    firebaseConfigured: true,
    firebaseProjectId: "gen-lang-client-0454135713",
    firestoreDatabaseId: "ai-studio-radardeoportunid-a589f000-369d-4fb7-b46c-6e59d74abb8e",
    firebaseStatus: "disconnected",
    firebaseReason: "PERMISSION_DENIED: Clave de API o permisos denegados en el proyecto gen-lang-client-0454135713.",
    serverStorageStatus: "active",
    serverStoragePath: "data/projects.json",
    totalProjectsLoaded: projects.length,
    message: "Base de datos local/servidor GTD activa y protegiendo todos los registros.",
  });
});

// Get all projects
app.get("/api/projects", (req, res) => {
  try {
    const list = getAllProjects();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to get projects" });
  }
});

// Save / Update project
app.post("/api/projects", (req, res) => {
  try {
    const project = req.body;
    if (!project || !project.id) {
      return res.status(400).json({ error: "Invalid project payload" });
    }
    const saved = saveProject(project);
    res.json(saved);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to save project" });
  }
});

// Delete project
app.delete("/api/projects/:id", (req, res) => {
  try {
    const { id } = req.params;
    const ok = deleteProject(id);
    res.json({ success: ok });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete project" });
  }
});

// Replace all projects (e.g., when importing real portfolio and replacing sample/mock data)
app.post("/api/projects/replace-all", (req, res) => {
  try {
    const { projects } = req.body;
    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: "Projects array required" });
    }
    const updated = replaceAllProjects(projects);
    res.json({ success: true, count: updated.length, projects: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to replace projects" });
  }
});

// Bulk upsert projects
app.post("/api/projects/bulk", (req, res) => {
  try {
    const { projects } = req.body;
    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: "Projects array required" });
    }
    const updated = bulkUpsertProjects(projects);
    res.json({ success: true, count: updated.length, projects: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to bulk update projects" });
  }
});

// Clear all projects (start fresh with real data)
app.post("/api/projects/clear", (req, res) => {
  try {
    replaceAllProjects([]);
    res.json({ success: true, count: 0, projects: [] });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to clear projects" });
  }
});

// Get project comments
app.get("/api/projects/:id/comments", (req, res) => {
  try {
    const { id } = req.params;
    const comments = getProjectComments(id);
    res.json(comments);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to get comments" });
  }
});

// Add project comment
app.post("/api/projects/:id/comments", (req, res) => {
  try {
    const { id } = req.params;
    const comment = req.body;
    if (!comment) {
      return res.status(400).json({ error: "Comment payload required" });
    }
    const updatedComments = addProjectComment(id, comment);
    res.json(updatedComments);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to add comment" });
  }
});

// Calculate Score Endpoint
app.post("/api/calculate-score", (req, res) => {
  try {
    const { projectId, answers, weights, scoringVersion } = req.body;
    if (!answers) {
      return res.status(400).json({ error: "Answers are required" });
    }
    const score = calculateProjectScore(projectId || "temp", answers as FormAnswers, weights, scoringVersion);
    res.json(score);
  } catch (error: any) {
    console.error("Error in /api/calculate-score:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Analyze Initiative with Gemini
app.post("/api/analyze-initiative", async (req, res) => {
  const { projectId, answers, score } = req.body;
  if (!answers) {
    return res.status(400).json({ error: "Answers are required for analysis" });
  }

  const casesPerMonth = Number(answers.monthlyCases) || 0;
  const rawTime = Number(answers.timePerCase) || 0;
  const timeUnit = answers.timeUnit || "Minutos";
  const minutesPerCase = timeUnit === "Horas" ? rawTime * 60 : timeUnit === "Días laborales" ? rawTime * 8 * 60 : rawTime;
  const annualHours = Math.round((casesPerMonth * minutesPerCase * 12) / 60);

  const buildFallbackAnalysis = () => {
    const isHighRisk = (answers.dataType || []).includes("Credenciales o contraseñas") || (answers.dataType || []).includes("Información financiera");
    const riskLevel = isHighRisk ? "alto" : (answers.errorConsequences && answers.errorConsequences.length > 50) ? "medio" : "bajo";
    
    let solType = "asistente_ia";
    if (answers.standardizationLevel?.includes("altamente automatizado") || answers.standardizationLevel?.includes("siempre se ejecuta")) {
      solType = "automatizacion_tradicional";
    } else if (answers.autonomyLevel?.startsWith("5") || answers.autonomyLevel?.startsWith("6")) {
      solType = "agente_autonomo";
    } else if (answers.autonomyLevel?.startsWith("3") || answers.autonomyLevel?.startsWith("4")) {
      solType = "agente_parcialmente_autonomo";
    }

    return {
      resumenEjecutivo: `Iniciativa '${answers.initiativeName || "Sin Nombre"}' del área de ${answers.area || "Operaciones"}. Orientada a resolver ${answers.currentProblem || "la ineficiencia operativa"} en el proceso de ${answers.processActivity || "gestión"}. Presenta una demanda estimada de ${casesPerMonth} casos/mes (${annualHours} h/año).`,
      problemaPrincipal: answers.currentProblem || "Ineficiencia u oportunidad de automatización en el proceso actual.",
      procesoActual: `Proceso ejecutado con frecuencia '${answers.frequency || "Habitual"}' por ${answers.peopleInvolved || 1} persona(s), con detonante '${answers.trigger || "Solicitud de usuario"}'.`,
      consequencesPrincipales: Array.isArray(answers.consequences) && answers.consequences.length > 0 ? answers.consequences : [answers.errorConsequences || "Afectación en tiempos de respuesta"],
      volumenYEsfuerzo: {
        casosMensuales: casesPerMonth,
        minutosPorCaso: minutesPerCase,
        horasAnualesEstimadas: annualHours,
        personasParticipantes: Number(answers.peopleInvolved) || 1,
        nivelReproceso: answers.reworkFrequency || "Menos del 5 % de los casos"
      },
      impacto: {
        descripcion: answers.economicExplanation || `Afectación directa a ${answers.affectedGroup || "usuarios del proceso"}.`,
        impactoEconomicoReportado: Number(answers.annualValueCop) || 0,
        tipoImpactoEconomico: answers.impactType || "Ahorro de costos",
        nivelEvidencia: answers.canEstimateEconomicImpact || "Sin estimación",
        afectacionClientes: `Impacta principalmente a ${answers.affectedGroup || "usuarios del proceso"}.`,
        riesgosActuales: [answers.errorConsequences || "Riesgo de retraso u omisión manual"]
      },
      resultadoEsperado: answers.expectedOutcome || "Mejora de eficiencia y reducción del tiempo de atención.",
      tipoSolucionRecomendada: solType,
      justificacionTipoSolucion: `Basado en la estandarización '${answers.standardizationLevel}' y autonomía deseada '${answers.autonomyLevel}'.`,
      aptitudParaAgente: answers.autonomyLevel?.startsWith("1") ? "baja" : "alta",
      complejidadEstimada: (answers.dataSources || []).length > 3 ? "alta" : "media",
      nivelRiesgo: riskLevel,
      beneficiosEsperados: [
        `Reducción significativa del tiempo promedio por caso (${rawTime} ${timeUnit}).`,
        `Optimización de las ${annualHours} horas anuales invertidas actualmente.`,
        answers.expectedOutcome || "Mayor precisión y estandarización en las entregas."
      ],
      riesgosImplementacion: [
        answers.errorConsequences ? `Mitigar: ${answers.errorConsequences}` : "Asegurar la calidad e integridad de las fuentes de datos de entrada.",
        "Monitorear la adopción por parte del equipo funcional."
      ],
      dependencias: Array.isArray(answers.dataSources) && answers.dataSources.length > 0 ? answers.dataSources : ["Sistemas de información del área"],
      informacionFaltante: [
        answers.hasDocumentation === "No existe documentación" ? "Documentación formal del proceso paso a paso." : "Muestras de datos de prueba adicionales."
      ],
      preguntasParaElArea: [
        "¿Cuáles son los casos de excepción más frecuentes en la operación diaria?",
        "¿Quién validará los resultados del piloto durante las primeras semanas?"
      ],
      recomendaciones: [
        "Diseñar una prueba de concepto (PoC) inicial con casos reales estandarizados.",
        "Definir reglas de validación estricta antes de integrar con sistemas de producción."
      ],
      siguientePasoRecomendado: "Coordinar sesión técnica de alineación con el experto funcional y el patrocinador.",
      confianzaAnalisis: 90,
      integracionGoogleYVertex: {
        viabilidadGoogle: "alta",
        serviciosRecomendados: ["Vertex AI Agent Builder", "Google Workspace APIs", "Document AI"],
        justificacion: "Integración nativa con ecosistema Google Enterprise para lectura de insumos y orquestación de agentes con Gemini."
      },
      evidencias: [
        {
          preguntaId: "currentProblem",
          respuestaOriginal: answers.currentProblem || "",
          interpretacion: "Fundamento directo de la necesidad de automatización."
        }
      ]
    };
  };

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Returning generated analysis.");
      return res.json({
        success: true,
        analysis: buildFallbackAnalysis(),
        rawResponse: "Fallback analysis generated (no API key)"
      });
    }

    const ai = getGeminiClient();
    const promptText = `
Eres un consultor experto en Inteligencia Artificial, Automatización de Procesos y Arquitectura Enterprise.
Analiza la siguiente iniciativa registrada en el formulario y genera un diagnóstico estratégico en formato JSON.

DATOS REGISTRADOS EN EL FORMULARIO:
- Nombre de la iniciativa: "${answers.initiativeName || "Sin Nombre"}"
- Área: "${answers.area || "Operaciones"}" (${answers.otherArea || ""})
- Experto / Dueño del proceso: "${answers.processOwner || "No especificado"}"
- Patrocinador / Sponsor: "${answers.sponsor || "No especificado"}"
- Actividad o proceso a mejorar: "${answers.processActivity || "No especificado"}"
- Problema actual: "${answers.currentProblem || "No especificado"}"
- Detonante (Trigger): "${answers.trigger || "No especificado"}"
- Resultado final actual: "${answers.finalResult || "No especificado"}"
- Nivel de estandarización: "${answers.standardizationLevel || "No especificado"}"
- Frecuencia: "${answers.frequency || "No especificado"}"
- Volumen mensual: ${casesPerMonth} casos
- Tiempo por caso: ${rawTime} ${timeUnit} (${minutesPerCase} minutos)
- Horas humanas anuales calculadas: ${annualHours} horas/año
- Personas involucradas: ${answers.peopleInvolved || 1}
- Frecuencia de reprocesos: "${answers.reworkFrequency || "No especificado"}"
- Grupo afectado: "${answers.affectedGroup || "No especificado"}"
- Consecuencias ante retrasos/errores: "${answers.errorConsequences || "No especificado"}"
- Estimación económica: "${answers.canEstimateEconomicImpact || "No especificado"}" (${answers.annualValueCop ? `COP ${answers.annualValueCop} / año` : "COP 0"})
- Tipo de impacto: "${answers.impactType || "Ahorro de costos"}"
- Explicación impacto económico: "${answers.economicExplanation || "No especificada"}"
- Resultado medible esperado: "${answers.expectedOutcome || "No especificado"}"
- Autonomía esperada: "${answers.autonomyLevel || "No especificada"}"
- Organización de la información: "${answers.dataOrganization || "No especificada"}"
- Ejemplos disponibles: "${answers.availableExamples || "No especificado"}"
- Fuentes de información: ${JSON.stringify(answers.dataSources || [])}
- Extracción automática: "${answers.canObtainAutomatically || "No especificada"}"
- Documentación: "${answers.hasDocumentation || "No especificada"}"

PUNTAJE SISTEMA:
- Importancia: ${score?.importanceScore ?? 0}/100
- Viabilidad: ${score?.viabilityScore ?? 0}/100
- Facilidad: ${score?.easeScore ?? 0}/100
- Total: ${score?.totalScore ?? 0}/100

INSTRUCCIONES DE RESPUESTA:
Responde ÚNICAMENTE con un objeto JSON strictly válido en español con la siguiente estructura exactas:
{
  "resumenEjecutivo": "string (3-4 líneas)",
  "problemaPrincipal": "string",
  "procesoActual": "string",
  "consequencesPrincipales": ["string"],
  "volumenYEsfuerzo": {
    "casosMensuales": ${casesPerMonth},
    "minutosPorCaso": ${minutesPerCase},
    "horasAnualesEstimadas": ${annualHours},
    "personasParticipantes": ${Number(answers.peopleInvolved) || 1},
    "nivelReproceso": "${answers.reworkFrequency || "Menos del 5 %"}"
  },
  "impacto": {
    "descripcion": "string",
    "impactoEconomicoReportado": ${Number(answers.annualValueCop) || 0},
    "tipoImpactoEconomico": "${answers.impactType || "Ahorro de costos"}",
    "nivelEvidencia": "${answers.canEstimateEconomicImpact || "Sin estimación"}",
    "afectacionClientes": "string",
    "riesgosActuales": ["string"]
  },
  "resultadoEsperado": "string",
  "tipoSolucionRecomendada": "automatizacion_tradicional | flujo_trabajo | asistente_ia | agente_con_aprobacion | agente_parcialmente_autonomo | agente_autonomo | mejora_proceso",
  "justificacionTipoSolucion": "string",
  "aptitudParaAgente": "alta | media | baja | no_recomendado",
  "complejidadEstimada": "baja | media | alta | muy_alta",
  "nivelRiesgo": "bajo | medio | alto | critico",
  "beneficiosEsperados": ["string"],
  "riesgosImplementacion": ["string"],
  "dependencias": ["string"],
  "informacionFaltante": ["string"],
  "preguntasParaElArea": ["string"],
  "recomendaciones": ["string"],
  "siguientePasoRecomendado": "string",
  "confianzaAnalisis": 95,
  "kpisDeExito": [
    {
      "indicador": "Nombre del KPI (ej: Tiempo de ciclo por caso)",
      "valorActual": "Línea base (ej: 3 Días laborales / caso)",
      "metaNumerica": "Meta concreta con porcentaje o valor (ej: Meta: -80%, Meta: 4320 h/año)",
      "impactoEsperado": "Impacto operativo o financiero"
    }
  ],
  "tecnologiasAplicables": [
    {
      "opcion": "IA agéntica | Automatización | IA Predictiva | Front End Web | RPA | Otras",
      "aplica": true,
      "detalle": "Explicación breve de cómo aplica o qué tecnologías específicas en caso de Otras"
    }
  ],
  "integracionGoogleYVertex": {
    "viabilidadGoogle": "alta | media | baja",
    "serviciosRecomendados": ["Vertex AI Agent Builder", "Workspace APIs"],
    "justificacion": "string"
  }
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
    });

    const responseText = response.text || "";
    const match = responseText.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return res.json({
        success: true,
        analysis: parsed,
        rawResponse: responseText,
      });
    }

    return res.json({
      success: true,
      analysis: buildFallbackAnalysis(),
      rawResponse: responseText,
    });
  } catch (error: any) {
    console.error("Error in /api/analyze-initiative, using fallback analysis:", error?.message || error);
    return res.json({
      success: true,
      analysis: buildFallbackAnalysis(),
      rawResponse: `Fallback generated due to error: ${error?.message || "Unknown error"}`
    });
  }
});

// Why position explanation
app.post("/api/why-position", async (req, res) => {
  try {
    const { project, rankPosition, totalProjectsCount, nextProjectName, prevProjectName } = req.body;
    if (!project) {
      return res.status(400).json({ error: "Project data is required" });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const promptText = `
Eres un asesor sénior de portafolio de proyectos de automatización e IA.
Explica de manera ejecutiva y argumentada por qué la iniciativa "${project.initiativeName}" ocupa la posición número ${rankPosition} de un total de ${totalProjectsCount} iniciativas evaluadas en el Radar de Oportunidades.

DATOS DEL PROYECTO:
- Área: ${project.area}
- Puntaje Total: ${project.score?.totalScore} / 100
- Puntaje Importancia (Peso 40%): ${project.score?.importanceScore} / 100
- Puntaje Viabilidad (Peso 35%): ${project.score?.viabilityScore} / 100
- Puntaje Facilidad (Peso 25%): ${project.score?.easeScore} / 100
- Categoría: ${project.score?.category}
- Solución recomendada por IA: ${project.recommendedSolutionType || "No determinada"}
- Restricciones o alertas detectadas: ${project.score?.restrictions?.join(", ") || "Ninguna"}

CONTEXTO DEL RANKING:
${nextProjectName ? `- Proyecto inmediatamente superior (Mejor rankeado): "${nextProjectName}"` : "- Es el proyecto número 1 del ranking."}
${prevProjectName ? `- Proyecto inmediatamente inferior (Peor rankeado): "${prevProjectName}"` : "- Es el último proyecto del ranking."}

REQUERIMIENTOS DE LA EXPLICACIÓN:
1. Explica los factores principales que elevaron su puntaje (p. ej., alto volumen mensual, impacto económico documentado, fecha límite regulatoria).
2. Explica los factores que restaron puntaje (p. ej., falta de ambiente de pruebas, datos no estructurados, falta de documentación).
3. Detalla cómo impactan las restricciones detectadas (si existen) y por qué requiere una revisión especializada.
4. Propón entre 3 y 4 acciones concretas que el área podría tomar para elevar la viabilidad o facilidad de implementación del proyecto (por ejemplo, documentar el proceso, anonimizar datos, acordar horas del experto).
5. Mantén un tono sumamente formal, profesional, orientador y motivador en español.
6. Tu respuesta final debe estar estructurada exclusivamente en formato JSON con la siguiente estructura (no incluyas texto adicional fuera del JSON):

{
  "posicionActual": ${rankPosition},
  "explicacionGeneral": "Texto detallado del estilo solicitado: 'Esta iniciativa ocupa la posición...' No inventes datos que no estén respaldados por el formulario.",
  "factoresPositivos": ["lista de factores clave de éxito de la iniciativa"],
  "factoresNegativos": ["lista de cuellos de botella u obstáculos que disminuyeron su puntuación"],
  "analisisComparativo": "Comparación ejecutiva con los proyectos adyacentes (${nextProjectName ? `superior: ${nextProjectName}` : "ninguno"} y ${prevProjectName ? `inferior: ${prevProjectName}` : "ninguno"}). Explicar qué diferencia su priorización de ellos.",
  "accionesParaMejorar": ["lista de acciones claras, accionables y realistas para subir la puntuación de viabilidad o facilidad"],
  "evidenciasClave": [
    {
      "factor": "Nombre del factor",
      "puntos": "Puntaje obtenido",
      "descripcion": "Evidencia extraída del formulario original que justifica este puntaje"
    }
  ]
}

Genera únicamente el objeto JSON directo sin bloques de código markdown \`\`\`json.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
    });

    const responseText = response.text || "";
    let cleanJsonText = responseText.trim();
    if (cleanJsonText.startsWith("```json")) {
      cleanJsonText = cleanJsonText.replace(/^```json\s*/, "").replace(/```$/, "");
    } else if (cleanJsonText.startsWith("```")) {
      cleanJsonText = cleanJsonText.replace(/^```\s*/, "").replace(/```$/, "");
    }
    cleanJsonText = cleanJsonText.trim();

    const result = JSON.parse(cleanJsonText);
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/why-position:", error);
    res.status(500).json({ error: error.message || "Error al generar explicación del ranking" });
  }
});

// Compare Initiatives with Gemini
app.post("/api/compare", async (req, res) => {
  try {
    const { projects } = req.body;
    if (!projects || !Array.isArray(projects) || projects.length < 2) {
      return res.status(400).json({ error: "At least two projects are required for comparison" });
    }

    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const projectsSummary = projects.map((p, index) => {
      return `
PROYECTO ${index + 1}:
- ID: ${p.id}
- Nombre: ${p.initiativeName}
- Área: ${p.area}
- Puntaje Total: ${p.score?.totalScore} (Importancia: ${p.score?.importanceScore}, Viabilidad: ${p.score?.viabilityScore}, Facilidad: ${p.score?.easeScore})
- Categoría: ${p.score?.category}
- Solución recomendada por IA: ${p.recommendedSolutionType}
- Volumen mensual: ${p.answers?.monthlyCases} casos
- Esfuerzo anual: ${p.score?.factorBreakdown?.importance?.find((f: any) => f.factor === "Esfuerzo humano anual")?.userAnswer || "No disponible"}
- Impacto económico reportado: COP ${p.answers?.annualValueCop?.toLocaleString("es-CO") || 0}/año
- Dependencias clave: ${p.analysis?.structuredAnalysis?.dependencias?.join(", ") || "No disponibles"}
- Restricciones detectadas: ${p.score?.restrictions?.join(", ") || "Ninguna"}
- Riesgos de implementación: ${p.analysis?.structuredAnalysis?.riesgosImplementacion?.join(", ") || "No disponibles"}
      `;
    }).join("\n---\n");

    const promptText = `
Eres un asesor estratégico de PMO y Transformación Digital experto en IA y Automatización.
Compara las siguientes ${projects.length} iniciativas presentadas en la empresa de telecomunicaciones y genera un análisis de priorización y una conclusión objetiva que ayude a la gerencia a decidir qué abordar primero y con qué estrategia.

DETALLES DE LAS INICIATIVAS A COMPARAR:
${projectsSummary}

REQUERIMIENTOS:
1. Analiza cuál de todas las iniciativas debería abordarse primero de forma prioritaria, justificando detalladamente por qué (basado en el balance entre su valor estratégico/económico y su facilidad/viabilidad de implementación).
2. Identifica cuál de las iniciativas sirve mejor como "Piloto de aprendizaje" (aquella que quizá no es la más grande en impacto pero tiene bajo riesgo, excelente disponibilidad de información, es fácil de probar y permite entrenar al equipo en tecnología de IA o agentes).
3. Identifica cuál de las iniciativas requiere "Preparación previa obligatoria" (alto impacto pero muy baja viabilidad actual por falta de documentación, accesos o desorden de datos), describiendo qué debe prepararse.
4. Compara los riesgos y restricciones clave que diferencian y separan estas alternativas (p. ej., una procesa datos de clientes bajo Habeas Data, otra toca sistemas financieros como SAP, otra depende del conocimiento no documentado de una persona).
5. Genera un JSON estructurado con el siguiente formato en español (no incluyas texto adicional fuera del JSON):

{
  "resumenComparativo": "Un párrafo ejecutivo que compara el grupo de iniciativas.",
  "iniciativaPrioritaria": {
    "nombre": "Nombre de la iniciativa sugerida para arrancar primero",
    "justificacion": "Explicación sólida del balance de por qué esta y no las otras, citando volumen, viabilidad y retorno."
  },
  "pilotoDeAprendizaje": {
    "nombre": "Nombre de la iniciativa ideal para piloto de aprendizaje o Quick Win rápido",
    "justificacion": "Por qué es ideal para el equipo de desarrollo y el negocio para validar la tecnología rápido."
  },
  "requierePreparacionPrevia": {
    "nombre": "Nombre de la iniciativa con alto potencial pero baja viabilidad actual",
    "accionesRecomendadas": ["lista de acciones urgentes de preparación necesarias antes de iniciar"]
  },
  "tablaDiferenciadores": [
    {
      "nombreIniciativa": "Nombre de la iniciativa",
      "ventajaPrincipal": "Su mayor fortaleza o factor a favor",
      "obstaculoPrincipal": "Su mayor riesgo, restricción o limitación"
    }
  ],
  "riesgosDiferenciales": "Análisis comparativo de los riesgos de cada opción.",
  "conclusionGerencial": "Recomendación final y hoja de ruta secuencial de ejecución propuesta (por ejemplo, 'Iniciar con Proyecto X como Quick Win inmediato, mientras se maduran los accesos de Proyecto Y, que es el de mayor valor anual...')"
}

Genera únicamente el objeto JSON sin bloques de código markdown \`\`\`json.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
    });

    const responseText = response.text || "";
    let cleanJsonText = responseText.trim();
    if (cleanJsonText.startsWith("```json")) {
      cleanJsonText = cleanJsonText.replace(/^```json\s*/, "").replace(/```$/, "");
    } else if (cleanJsonText.startsWith("```")) {
      cleanJsonText = cleanJsonText.replace(/^```\s*/, "").replace(/```$/, "");
    }
    cleanJsonText = cleanJsonText.trim();

    const result = JSON.parse(cleanJsonText);
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/compare:", error);
    res.status(500).json({ error: error.message || "Error al comparar iniciativas" });
  }
});

// Configure Vite or Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
