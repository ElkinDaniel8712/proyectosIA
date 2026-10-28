import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
} from "docx";
import { Project } from "../types";
import { calculateProjectScore } from "../scoring";

// Colors for Grupo GTD Corporate Palette
const COLOR_PRIMARY = "0A2540"; // Navy blue
const COLOR_ACCENT = "0284C7"; // GTD Tech blue
const COLOR_TEXT = "1F2937"; // Dark text
const COLOR_MUTED = "64748B"; // Slate gray
const COLOR_BG_HEADER = "0A2540"; // Header fill
const COLOR_BG_LIGHT = "F8FAFC"; // Light background
const COLOR_BG_SHADED = "F1F5F9"; // Subtle border fill
const COLOR_BORDER = "CBD5E1"; // Subtle border
const COLOR_SUCCESS = "059669"; // Green

/**
 * Creates a clean table cell border configuration
 */
const tableBorders = {
  top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
};

/**
 * Helper to build a clean section title in the Word Document
 */
function createSectionHeader(title: string, subtitle?: string): Paragraph[] {
  const paras: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 280, after: 80 },
      border: {
        bottom: {
          color: COLOR_ACCENT,
          space: 4,
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          color: COLOR_PRIMARY,
          size: 24, // 12pt
          font: "Calibri",
        }),
      ],
    }),
  ];

  if (subtitle) {
    paras.push(
      new Paragraph({
        spacing: { before: 40, after: 140 },
        children: [
          new TextRun({
            text: subtitle,
            italics: true,
            color: COLOR_MUTED,
            size: 19, // 9.5pt
            font: "Calibri",
          }),
        ],
      })
    );
  }

  return paras;
}

/**
 * Helper to build a 2-column key-value row for tables
 */
function createKeyValueRow(label: string, value: string | number | undefined, isEven = false): TableRow {
  const displayVal = value !== undefined && value !== null && value !== "" ? String(value) : "No especificado";
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 32, type: WidthType.PERCENTAGE },
        shading: { fill: isEven ? COLOR_BG_LIGHT : COLOR_BG_SHADED, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        borders: tableBorders,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: label,
                bold: true,
                color: COLOR_PRIMARY,
                size: 20, // 10pt
                font: "Calibri",
              }),
            ],
          }),
        ],
      }),
      new TableCell({
        width: { size: 68, type: WidthType.PERCENTAGE },
        shading: { fill: isEven ? "FFFFFF" : COLOR_BG_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        borders: tableBorders,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: displayVal,
                color: COLOR_TEXT,
                size: 20, // 10pt
                font: "Calibri",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

/**
 * Builds and downloads a professional Word (.docx) document for any Grupo GTD project
 */
export async function exportProjectToDocx(project: Project): Promise<void> {
  const answers = project.answers || ({} as any);
  const score =
    project.score && project.score.totalScore > 0
      ? project.score
      : calculateProjectScore(project.id, answers);

  const structured = project.analysis?.structuredAnalysis;

  // Operational metrics
  const monthlyCases = Number(answers.monthlyCases) || 0;
  const timePerCase = Number(answers.timePerCase) || 0;
  const timeUnit = answers.timeUnit || "Minutos";
  const minutesPerCase =
    timeUnit === "Horas"
      ? timePerCase * 60
      : timeUnit === "Días laborales"
      ? timePerCase * 8 * 60
      : timePerCase;
  const annualHours = Math.round((monthlyCases * minutesPerCase * 12) / 60);

  // Economic impact string
  const annualCopFormatted =
    answers.annualValueCop !== undefined && answers.annualValueCop !== null && Number(answers.annualValueCop) > 0
      ? `$${Number(answers.annualValueCop).toLocaleString("es-CO")} COP / año`
      : "Pendiente de auditoría económica formal (Fase de factibilidad / Gerencia de Proyectos)";

  const exportDate = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create Document sections
  const doc = new Document({
    creator: "Grupo GTD - Radar de Oportunidades IA",
    title: `Ficha Técnica - ${project.initiativeName}`,
    description: "Ficha oficial de priorización técnica y evaluación de iniciativa IA de Grupo GTD",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1200,
              bottom: 1200,
              left: 1200,
              right: 1200,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "GRUPO GTD • RADAR DE OPORTUNIDADES IA Y AUTOMATIZACIÓN",
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri",
                    bold: true,
                  }),
                  new TextRun({
                    text: "  |  DOCUMENTO CONFIDENCIAL",
                    size: 16,
                    color: COLOR_ACCENT,
                    font: "Calibri",
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.BOTH,
                children: [
                  new TextRun({
                    text: `${project.id} • ${project.initiativeName.substring(0, 50)}`,
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri",
                  }),
                  new TextRun({
                    text: "\t\tPágina ",
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: COLOR_PRIMARY,
                    bold: true,
                    font: "Calibri",
                  }),
                  new TextRun({
                    text: " de ",
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri",
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: COLOR_PRIMARY,
                    bold: true,
                    font: "Calibri",
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // 1. BANNER INSTITUCIONAL GTD
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 80 },
            children: [
              new TextRun({
                text: "GRUPO GTD",
                bold: true,
                size: 32, // 16pt
                color: COLOR_PRIMARY,
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 120 },
            children: [
              new TextRun({
                text: "GERENCIA DE TECNOLOGÍA, TRANSFORMACIÓN DIGITAL & OPERACIONES",
                size: 18,
                color: COLOR_MUTED,
                font: "Calibri",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 200 },
            border: {
              bottom: {
                color: COLOR_PRIMARY,
                size: 18,
                style: BorderStyle.SINGLE,
                space: 4,
              },
            },
            children: [
              new TextRun({
                text: "FICHA TÉCNICA Y EVALUACIÓN DE INICIATIVA DE IA",
                bold: true,
                size: 28, // 14pt
                color: COLOR_ACCENT,
                font: "Calibri",
              }),
            ],
          }),

          // TÍTULO DEL PROYECTO
          new Paragraph({
            spacing: { before: 120, after: 100 },
            children: [
              new TextRun({
                text: project.initiativeName,
                bold: true,
                size: 26, // 13pt
                color: COLOR_PRIMARY,
                font: "Calibri",
              }),
            ],
          }),

          // TABLA DE CONTROL DE IDENTIFICACIÓN
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createKeyValueRow("ID del Proyecto", project.id, false),
              createKeyValueRow("Área / Gerencia", project.area, true),
              createKeyValueRow(
                "Correo solicitante",
                answers.processOwner || project.requesterEmail || project.createdBy || "No registrado",
                false
              ),
              createKeyValueRow(
                "¿Quién es el líder del área que respalda la iniciativa?",
                answers.sponsor || project.sponsor || "Por Asignar",
                true
              ),
              createKeyValueRow("Estado del Proyecto", project.status, false),
              createKeyValueRow("Fecha de Emisión", exportDate, true),
            ],
          }),

          // 2. RESUMEN EJECUTIVO Y SCORING
          ...createSectionHeader(
            "1. Resumen Ejecutivo y Matriz de Priorización",
            "Diagnóstico sintetizado y ponderación matemática del modelo de selección"
          ),

          // Texto de resumen ejecutivo
          new Paragraph({
            spacing: { before: 60, after: 160 },
            children: [
              new TextRun({
                text:
                  structured?.resumenEjecutivo ||
                  `Iniciativa del área de ${project.area} destinada a resolver ineficiencias en '${answers.processActivity || "el proceso operativo"}'. Tiene un potencial impacto anual de ${annualHours.toLocaleString("es-CO")} horas de esfuerzo humano y ${annualCopFormatted}.`,
                size: 21,
                color: COLOR_TEXT,
                font: "Calibri",
              }),
            ],
          }),

          // TABLA DE SCORING PONDERADO
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 100, right: 100 },
                    borders: tableBorders,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "SCORE TOTAL",
                            bold: true,
                            color: "FFFFFF",
                            size: 18,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: `\n${score.totalScore}/100`,
                            bold: true,
                            color: "38BDF8", // Sky blue
                            size: 32,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_SHADED, type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 100, right: 100 },
                    borders: tableBorders,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "IMPORTANCIA (40%)",
                            bold: true,
                            color: COLOR_PRIMARY,
                            size: 16,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: `\n${score.importanceScore} pts`,
                            bold: true,
                            color: COLOR_ACCENT,
                            size: 24,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_SHADED, type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 100, right: 100 },
                    borders: tableBorders,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "VIABILIDAD (35%)",
                            bold: true,
                            color: COLOR_PRIMARY,
                            size: 16,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: `\n${score.viabilityScore} pts`,
                            bold: true,
                            color: COLOR_ACCENT,
                            size: 24,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_SHADED, type: ShadingType.CLEAR },
                    margins: { top: 120, bottom: 120, left: 100, right: 100 },
                    borders: tableBorders,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "FACILIDAD (25%)",
                            bold: true,
                            color: COLOR_PRIMARY,
                            size: 16,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: `\n${score.easeScore} pts`,
                            bold: true,
                            color: COLOR_ACCENT,
                            size: 24,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Resumen de Clasificación en párrafo
          new Paragraph({
            spacing: { before: 140, after: 80 },
            children: [
              new TextRun({ text: "• Categoría de Implementación: ", bold: true, color: COLOR_PRIMARY, size: 20 }),
              new TextRun({ text: score.category || "Pendiente de clasificar", color: COLOR_TEXT, size: 20 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 80 },
            children: [
              new TextRun({ text: "• Tipo de Solución Recomendada: ", bold: true, color: COLOR_PRIMARY, size: 20 }),
              new TextRun({
                text: project.recommendedSolutionType || structured?.tipoSolucionRecomendada || "Asistente IA",
                color: COLOR_TEXT,
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 40, after: 140 },
            children: [
              new TextRun({ text: "• Nivel de Riesgo Operativo: ", bold: true, color: COLOR_PRIMARY, size: 20 }),
              new TextRun({ text: project.riskLevel || structured?.nivelRiesgo || "Bajo", color: COLOR_TEXT, size: 20 }),
            ],
          }),

          // 3. DIAGNÓSTICO DEL PROBLEMA
          ...createSectionHeader(
            "2. Diagnóstico del Proceso y Problemática Actual",
            "Detalle de la situación actual, causas raíz y alcance del proceso"
          ),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createKeyValueRow("Proceso o Actividad a Mejorar", answers.processActivity, false),
              createKeyValueRow("Problema Actual Reportado", answers.currentProblem, true),
              createKeyValueRow("Disparador (Trigger) del Proceso", answers.trigger, false),
              createKeyValueRow("Resultado Esperado Actual", answers.finalResult, true),
              createKeyValueRow("Nivel de Estandarización", answers.standardizationLevel, false),
            ],
          }),

          // 4. VOLUMETRÍA Y ESFUERZO HUMANO
          ...createSectionHeader(
            "3. Dimensionamiento Operativo y Esfuerzo Humano",
            "Métricas cuantitativas de carga de trabajo, tiempos e impacto en el equipo"
          ),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createKeyValueRow("Frecuencia de Ejecución", answers.frequency, false),
              createKeyValueRow("Volumen Mensual de Casos", `${monthlyCases.toLocaleString("es-CO")} casos/mes`, true),
              createKeyValueRow("Tiempo Promedio por Caso", `${timePerCase} ${timeUnit}`, false),
              createKeyValueRow(
                "Esfuerzo Humano Estimado Anual",
                `${annualHours.toLocaleString("es-CO")} horas / año`,
                true
              ),
              createKeyValueRow("Personas Involucradas", `${answers.peopleInvolved || 0} colaboradores`, false),
              createKeyValueRow("Frecuencia de Reprocesos", answers.reworkFrequency, true),
              createKeyValueRow("Grupo o Audiencia Afectada", answers.affectedGroup, false),
              createKeyValueRow("Consecuencias de Retrasos / Errores", answers.errorConsequences, true),
            ],
          }),

          // 5. EVALUACIÓN FINANCIERA
          ...createSectionHeader(
            "4. Evaluación Financiera y Beneficio Económico",
            "Cuantificación del ahorro proyectado y justificación de retorno de inversión"
          ),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createKeyValueRow("Impacto Económico Estimado", annualCopFormatted, false),
              createKeyValueRow("Nivel de Evidencia / Cálculo", answers.canEstimateEconomicImpact, true),
              createKeyValueRow("Tipo de Impacto", answers.impactType, false),
              createKeyValueRow("Justificación y Detalle Económico", answers.economicExplanation, true),
            ],
          }),

          // 6. SOLUCIÓN TECNOLÓGICA ESPERADA
          ...createSectionHeader(
            "5. Requerimientos de la Solución y Fuentes de Información",
            "Arquitectura esperada de la solución, nivel de autonomía e integraciones"
          ),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createKeyValueRow("Resultado Medible Esperado", answers.expectedOutcome, false),
              createKeyValueRow("Nivel de Autonomía Requerido", answers.autonomyLevel, true),
              createKeyValueRow(
                "Fuentes de Información y Sistemas",
                Array.isArray(answers.dataSources) ? answers.dataSources.join(", ") : answers.dataSources,
                false
              ),
              createKeyValueRow("Organización de la Información", answers.dataOrganization, true),
              createKeyValueRow(
                "Tipos de Datos Manipulados",
                Array.isArray(answers.dataType) ? answers.dataType.join(", ") : answers.dataType,
                false
              ),
              createKeyValueRow("Disponibilidad de Documentación", answers.hasDocumentation, true),
              createKeyValueRow("Obtención Automática de Datos", answers.canObtainAutomatically, false),
            ],
          }),

          // 7. ANÁLISIS DE INTELIGENCIA ARTIFICIAL (GEMINI)
          ...createSectionHeader(
            "6. Dictamen Técnico y Recomendaciones de Inteligencia Artificial",
            "Análisis estructurado por Gemini para la Mesa de Evaluación de GTD"
          ),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              createKeyValueRow(
                "Justificación del Tipo de Solución",
                structured?.justificacionTipoSolucion || "Solución alineada con los requisitos de negocio de GTD.",
                false
              ),
              createKeyValueRow(
                "Justificación del Nivel de Riesgo",
                structured?.justificacionNivelRiesgo || "Riesgo evaluado según dependencias operativas y criticidad de red.",
                true
              ),
              createKeyValueRow(
                "Restricciones Identificadas",
                Array.isArray(structured?.restriccionesIdentificadas)
                  ? structured.restriccionesIdentificadas.join("; ")
                  : "No se identificaron restricciones críticas.",
                false
              ),
              createKeyValueRow(
                "Recomendaciones de Implementación",
                Array.isArray(structured?.recomendacionesImplementacion)
                  ? structured.recomendacionesImplementacion.join("; ")
                  : "Iniciar con prueba de concepto (PoC) en ambiente de pruebas.",
                true
              ),
            ],
          }),

          // 8. CONTROL DE FIRMAS Y APROBACIONES
          ...createSectionHeader("7. Control de Aprobación y Firmas", "Validación formal de sponsor y mesa de proyectos"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    margins: { top: 400, bottom: 200, left: 100, right: 100 },
                    borders: tableBorders,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "_____________________________\n",
                            color: COLOR_MUTED,
                            size: 18,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text:
                              answers.processOwner ||
                              project.requesterEmail ||
                              project.createdBy ||
                              "Correo Solicitante",
                            bold: true,
                            size: 18,
                            color: COLOR_PRIMARY,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: "\nCorreo Solicitante (Ingreso de Formulario)",
                            size: 16,
                            color: COLOR_MUTED,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    margins: { top: 400, bottom: 200, left: 100, right: 100 },
                    borders: tableBorders,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "_____________________________\n",
                            color: COLOR_MUTED,
                            size: 18,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: answers.sponsor || project.sponsor || "Patrocinador de Área",
                            bold: true,
                            size: 18,
                            color: COLOR_PRIMARY,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: "\nPatrocinador de Área (Sponsor)",
                            size: 16,
                            color: COLOR_MUTED,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    margins: { top: 400, bottom: 200, left: 100, right: 100 },
                    borders: tableBorders,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "_____________________________\n",
                            color: COLOR_MUTED,
                            size: 18,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: "Comité de Transformación IA",
                            bold: true,
                            size: 18,
                            color: COLOR_PRIMARY,
                            font: "Calibri",
                          }),
                          new TextRun({
                            text: "\nGrupo GTD",
                            size: 16,
                            color: COLOR_MUTED,
                            font: "Calibri",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Pack and trigger download
  const blob = await Packer.toBlob(doc);
  const cleanId = (project.id || "iniciativa").replace(/[^a-zA-Z0-9_-]/g, "_");
  const cleanName = (project.initiativeName || "GTD")
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .substring(0, 40);

  const fileName = `GTD_Ficha_${cleanId}_${cleanName}.docx`;

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}
