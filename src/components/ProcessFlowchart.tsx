import React, { useState, useRef } from "react";
import { Project, FormAnswers, StructuredAnalysisJSON } from "../types";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  ArrowDown,
  Bot,
  UserCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  Layers,
  Database,
  Send,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Download,
  FileImage,
  FileCode,
  Loader2,
  Check,
  Copy,
  BookOpen,
  ArrowRight,
  RefreshCw
} from "lucide-react";

interface ProcessFlowchartProps {
  project: Project;
}

export interface FlowNode {
  id: string;
  stepNumber: number;
  title: string;
  subtitle?: string;
  description: string;
  type: "input" | "process" | "bottleneck" | "ai" | "validation" | "output" | "preprocessing" | "integration";
  metric?: string;
  badge?: string;
  technologies?: string[];
  details?: string[];
  benefit?: string;
  icon: any;
}

export const ProcessFlowchart: React.FC<ProcessFlowchartProps> = ({ project }) => {
  const [activeDisplay, setActiveDisplay] = useState<"diagram" | "narrative" | "both">("narrative");
  const [viewMode, setViewMode] = useState<"sideBySide" | "asis" | "tobe">("sideBySide");
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>("tobe-3");
  const [isDownloading, setIsDownloading] = useState<"png" | "pdf" | "md" | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const flowchartRef = useRef<HTMLDivElement>(null);
  const asIsRef = useRef<HTMLTextAreaElement>(null);
  const toBeRef = useRef<HTMLTextAreaElement>(null);

  const answers: Partial<FormAnswers> = project.answers || {};
  const structured: StructuredAnalysisJSON | undefined = project.analysis?.structuredAnalysis;
  const projectName = project.initiativeName || answers.initiativeName || "Iniciativa-IA";

  const timePerCase = answers.timePerCase || "1";
  const timeUnit = answers.timeUnit || "Horas";
  const inputFormat = answers.inputFormat || "Formulario / Correo / Archivos adjuntos";
  const processActivity = answers.processActivity || "Procesamiento y análisis manual de solicitudes o información";
  const currentProblem = answers.currentProblem || "Cuello de botella en la digitación, cálculo o revisión manual";
  const finalResult = answers.finalResult || "Entrega de informe, registro en sistema o respuesta al usuario";
  const monthlyCases = answers.monthlyCases || "Varios";

  // Build AS-IS Flow Nodes (Flujo Actual)
  const asIsNodes: FlowNode[] = [
    {
      id: "asis-1",
      stepNumber: 1,
      title: "1. Ingesta y Recepción Manual",
      description: `Formatos de entrada heterogéneos: ${inputFormat}. La información llega en formatos no estandarizados vía correo o archivos.`,
      type: "input",
      badge: `${monthlyCases} casos/mes`,
      benefit: "Sin estandarización en origen",
      icon: FileText,
    },
    {
      id: "asis-2",
      stepNumber: 2,
      title: "2. Ejecución y Digitación Manual",
      description: `El analista/operador procesa manualmente: ${processActivity}. Requiere lectura minuciosa y trascripción línea por línea.`,
      type: "process",
      metric: `Tiempo de atención: ${timePerCase} ${timeUnit} / caso`,
      icon: Clock,
    },
    {
      id: "asis-3",
      stepNumber: 3,
      title: "3. Cuello de Botella y Reprocesos",
      description: currentProblem,
      type: "bottleneck",
      badge: answers.reworkFrequency || "Alta tasa de reproceso",
      benefit: "Riesgo de falla por fatiga humana o error numérico",
      icon: AlertTriangle,
    },
    {
      id: "asis-4",
      stepNumber: 4,
      title: "4. Entrega y Cierre Manual",
      description: `Consolidación de respuesta e informe: ${finalResult}. Actualización manual en planillas o sistemas.`,
      type: "output",
      icon: Send,
    },
  ];

  // Build TO-BE Flow Nodes (Flujo Futuro Rediseñado y Completo)
  const isAgent = structured?.tipoSolucionRecomendada?.includes("agente") || 
                  answers.autonomyLevel?.includes("2.") || 
                  answers.autonomyLevel?.includes("3.") ||
                  answers.autonomyLevel?.includes("4.");

  const toBeNodes: FlowNode[] = [
    {
      id: "tobe-1",
      stepNumber: 1,
      title: "1. Ingesta Multicanal & OCR/Parsing IA",
      subtitle: "Captura Automática de Datos",
      description: `Captura centralizada e ingesta estructurada desde ${inputFormat}. Extrae texto, campos numéricos y archivos mediante visión/OCR sin digitación.`,
      type: "input",
      badge: "Cero Digitación Manual",
      technologies: ["Document AI / Vision API", "Webhooks / REST APIs", "Workspace Connectors"],
      details: [
        "Soporta PDFs, imágenes escaneadas, correos y formularios web",
        "Estandariza los datos de entrada en formato JSON estructurado",
        "Notifica errores de formato al remitente en tiempo real"
      ],
      benefit: "Reducción de tiempo de ingesta de horas a 3 segundos",
      icon: Database,
    },
    {
      id: "tobe-2",
      stepNumber: 2,
      title: "2. Pre-procesamiento & Validación de Reglas",
      subtitle: "Limpieza y Cruce de Información",
      description: "Verificación de requisitos previos, limpieza de datos duplicados y cruce automático contra bases de datos internas, CRM o ERP.",
      type: "preprocessing",
      badge: "Validación 100% Automática",
      technologies: ["Motor de Reglas de Negocio", "API de Consultas DB", "Data Cleanse Pipeline"],
      details: [
        "Verifica existencia previa del usuario o caso en la base de datos",
        "Aplica reglas de negocio obligatorias y restricciones de la organización",
        "Enriquece los datos de contexto antes de enviarlos a la IA"
      ],
      benefit: "Eliminación completa de errores por datos incompletos",
      icon: ShieldCheck,
    },
    {
      id: "tobe-3",
      stepNumber: 3,
      title: isAgent ? "3. Motor Agéntico de IA & Razonamiento Contextual" : "3. Motor IA & Generación de Lógica Compleja",
      subtitle: "Procesamiento Inteligente del Caso",
      description: structured?.resumenEjecutivo 
        ? `${structured.resumenEjecutivo}` 
        : `Análisis automático, clasificación de intención, cálculo de valores y toma de decisiones para: ${processActivity}`,
      type: "ai",
      badge: isAgent ? "IA Agéntica Autónomica" : "IA Generativa + Workflows",
      technologies: ["Vertex AI Agent Builder", "Gemini 3.6 Flash / Pro", "LangChain / Function Calling"],
      details: [
        "Evalúa la intención del caso y aplica criterios de análisis avanzados",
        "Genera borradores de dictámenes, respuestas o cálculos matemáticos",
        "Ejecuta herramientas de consulta externas de forma autónoma"
      ],
      metric: "Procesamiento promedio: < 15 segundos",
      benefit: "Aumento de 10x en la capacidad de absorción de casos",
      icon: isAgent ? Bot : Sparkles,
    },
    {
      id: "tobe-4",
      stepNumber: 4,
      title: "4. Evaluador de Calidad & Scoring de Confianza",
      subtitle: "Guardrails de Seguridad y Precisión",
      description: "Control automático de confianza del modelo. Si la confianza es >95%, autoriza ejecución directa; si es atípico, lo canaliza a revisión.",
      type: "validation",
      badge: "Confianza > 95% = Directo",
      technologies: ["Guardrails Framework", "Confidence Scoring Model", "Audit Log Engine"],
      details: [
        "Garantiza cumplimiento normativo y ausencia de alucinaciones",
        "Asigna un nivel de riesgo (Bajo / Medio / Alto) a cada respuesta",
        "Registra la traza completa de razonamiento para auditoría"
      ],
      benefit: "Tasa de error operativo menor al 1%",
      icon: CheckCircle2,
    },
    {
      id: "tobe-5",
      stepNumber: 5,
      title: "5. Supervisión Agilizada (Human-in-the-Loop - HITL)",
      subtitle: "Aprobación Humana en Casos Atípicos",
      description: "Bandeja de entrada inteligente para analistas. Muestra la recomendación de la IA pre-diligenciada para aprobar con 1 solo clic en casos complejos.",
      type: "validation",
      badge: "Solo Excepciones (< 5%)",
      technologies: ["Portal Web de Gestión (React)", "Notificaciones Teams/Email", "One-Click Approval"],
      details: [
        "El analista no digita nada; solo valida la propuesta de la IA",
        "Alertas inmediatas para casos etiquetados con alto riesgo o valor",
        "Retroalimentación continua para reentrenar y mejorar el modelo"
      ],
      metric: "Revisión analista: Reducida de 2 horas a 30 segundos",
      benefit: "Liberación masiva de horas hombre para tareas estratégicas",
      icon: UserCheck,
    },
    {
      id: "tobe-6",
      stepNumber: 6,
      title: "6. Escritura en Sistemas Destino & Cierre de Caso",
      subtitle: "Ejecución de Acciones & Notificación",
      description: `Actualización automática de estado en ERP/CRM y entrega inmediata del resultado: ${finalResult}`,
      type: "output",
      badge: "Cierre Automático",
      technologies: ["RPA / REST APIs", "Database Webhooks", "Servicio de Notificación (Email/SMS/WhatsApp)"],
      details: [
        "Registra la transacción en las bases de datos de la compañía",
        "Envía el comprobante, informe o certificación al usuario final",
        "Actualiza los indicadores ejecutivos de gestión en tiempo real"
      ],
      metric: "Lead Time objetivo: < 3 minutos (Reducción del 85%)",
      benefit: "Respuesta inmediata y experiencia del usuario de nivel superior",
      icon: CheckCircle2,
    },
  ];

  // Executive & Concise Plain Text Descriptions for Copying
  const asIsNarrativeText = `
PROCESO ACTUAL SIN SOLUCIÓN (AS-IS) — ${projectName}

• RESUMEN OPERATIVO:
  Operación 100% manual e intensiva en esfuerzo humano, con cuellos de botella en la digitación, revisión y lectura línea por línea.

• INGESTA DE ENTRADA:
  Recepción dispersa y no estandarizada mediante: ${inputFormat}.

• EJECUCIÓN Y PROCESAMIENTO:
  El analista dedica ~${timePerCase} ${timeUnit} por caso en procesar manualmente: ${processActivity}.

• CUELLO DE BOTELLA CRÍTICO:
  ${currentProblem}. Frecuencia de reprocesos: ${answers.reworkFrequency || "Alta"}.

• CIERRE Y SALIDA:
  Consolidación manual y actualización en planillas/sistemas para: ${finalResult}.

• MÉTRICAS CLAVE:
  - Tiempo por caso: ${timePerCase} ${timeUnit}
  - Volumen mensual: ${monthlyCases} casos
  - Nivel de Automatización: 0% (Manual)
`.trim();

  const toBeNarrativeText = `
PROCESO FUTURO CON SOLUCIÓN IA (TO-BE) — ${projectName}
Tipo de Solución: ${structured?.tipoSolucionRecomendada || "Automatización Agéntica con IA"}

• RESUMEN DE LA SOLUCIÓN:
  Arquitectura automatizada de 6 etapas que elimina la digitación manual. La IA asume el 95% del trabajo y deriva solo excepciones a supervisión humana (<5%).

• ETAPAS AUTOMATIZADAS PASO A PASO:
  1. Ingesta Inteligente: OCR / Visión IA extrae datos estructurados de ${inputFormat} en <3 segundos.
  2. Pre-procesamiento: Limpieza y validación automática de reglas contra bases de datos/ERP.
  3. Motor de IA: ${structured?.resumenEjecutivo || `Razonamiento y análisis contextual para: ${processActivity}.`}
  4. Guardrails de Calidad: Evaluación automática (Confianza >95% aprueba directo).
  5. Supervisión Agilizada (HITL): Portal de gestión para aprobación en 1 clic en casos atípicos.
  6. Cierre & Escritura: Actualización automática en ERP/CRM y entrega instantánea de: ${finalResult}.

• MÉTRICAS E IMPACTO ESPERADO:
  - Lead Time Objetivo: < 3 minutos por caso (-85% de reducción)
  - Tasa de Automatización: > 95% de los casos resueltos sin digitación
  - Precisión Operativa: Error <1% gracias a Guardrails
  - Capacidad: Multiplica 10x la absorción de casos sin contratar personal
`.trim();

  const [editableAsIs, setEditableAsIs] = useState(asIsNarrativeText);
  const [editableToBe, setEditableToBe] = useState(toBeNarrativeText);

  React.useEffect(() => {
    setEditableAsIs(asIsNarrativeText);
    setEditableToBe(toBeNarrativeText);
  }, [project.id, projectName]);

  const handleCopyText = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 3000);
  };

  const handleSelectAll = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  };

  // Handler for PNG download
  const handleDownloadPNG = async () => {
    if (!flowchartRef.current) return;
    try {
      setIsDownloading("png");
      setShowDownloadMenu(false);
      const dataUrl = await toPng(flowchartRef.current, {
        cacheBust: true,
        backgroundColor: "#09090b",
        quality: 0.95,
      });
      const link = document.createElement("a");
      const safeName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      link.download = `diagrama-flujo-${safeName}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadSuccess("Imagen PNG descargada con éxito");
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error("Error al exportar PNG:", err);
    } finally {
      setIsDownloading(null);
    }
  };

  // Handler for PDF download
  const handleDownloadPDF = () => {
    try {
      setIsDownloading("pdf");
      setShowDownloadMenu(false);
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const safeName = projectName;
      doc.setFillColor(15, 15, 20);
      doc.rect(0, 0, 210, 297, "F");

      // Title header
      doc.setTextColor(168, 85, 247); // purple
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("ARQUITECTURA DE FLUJO DE PROCESO (TO-BE)", 15, 18);

      doc.setTextColor(200, 200, 210);
      doc.setFontSize(11);
      doc.text(`Iniciativa: ${safeName}`, 15, 25);
      doc.setFontSize(9);
      doc.setTextColor(140, 140, 150);
      doc.text(`Generado el ${new Date().toLocaleDateString("es-ES")} | Radar de Oportunidades IA`, 15, 30);

      doc.setDrawColor(60, 60, 80);
      doc.line(15, 33, 195, 33);

      let yPos = 40;

      // Section: TO-BE Nodes
      doc.setTextColor(234, 179, 8); // yellow/amber
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("FLUJO FUTURO REDISEÑADO CON IA (6 ETAPAS)", 15, yPos);
      yPos += 8;

      toBeNodes.forEach((node) => {
        if (yPos > 260) {
          doc.addPage();
          doc.setFillColor(15, 15, 20);
          doc.rect(0, 0, 210, 297, "F");
          yPos = 20;
        }

        // Card box
        doc.setFillColor(25, 25, 35);
        doc.setDrawColor(120, 60, 200);
        doc.roundedRect(15, yPos, 180, 28, 2, 2, "FD");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(node.title, 19, yPos + 6);

        if (node.badge) {
          doc.setFontSize(8);
          doc.setTextColor(52, 211, 153); // emerald
          doc.text(`[${node.badge}]`, 140, yPos + 6);
        }

        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(190, 190, 200);
        const splitText = doc.splitTextToSize(node.description, 170);
        doc.text(splitText, 19, yPos + 12);

        if (node.technologies && node.technologies.length > 0) {
          doc.setFontSize(7.5);
          doc.setTextColor(168, 85, 247);
          doc.text(`Tecnologías: ${node.technologies.join(" • ")}`, 19, yPos + 23);
        }

        yPos += 33;
      });

      const safeFileName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      doc.save(`diagrama-flujo-${safeFileName}.pdf`);
      setDownloadSuccess("Documento PDF descargado con éxito");
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error("Error al exportar PDF:", err);
    } finally {
      setIsDownloading(null);
    }
  };

  // Handler for Markdown / Mermaid download
  const handleDownloadMarkdown = () => {
    try {
      setIsDownloading("md");
      setShowDownloadMenu(false);

      const mermaidContent = `
# Arquitectura y Diagrama de Flujo: ${projectName}
> Generado automáticamente por Radar de Oportunidades IA

## 1. DESCRIPCIÓN NARRATIVA DEL PROCESO ACTUAL SIN SOLUCIÓN (AS-IS)
${asIsNarrativeText}

---

## 2. DESCRIPCIÓN NARRATIVA DEL PROCESO FUTURO CON SOLUCIÓN (TO-BE)
${toBeNarrativeText}

---

## 3. DIAGRAMA DE FLUJO EN CÓDIGO MERMAID (TO-BE)

\`\`\`mermaid
graph TD
    A["1. Ingesta Multicanal (${inputFormat})"] --> B["2. Pre-procesamiento & Validación Reglas"]
    B --> C["3. Motor Agéntico / IA (${isAgent ? 'Agente Autónomo' : 'Workflow IA'})"]
    C --> D{"4. Evaluador Calidad & Guardrails"}
    D -- "Confianza > 95%" --> F["6. Escritura ERP/CRM & Cierre"]
    D -- "Atípico / Riesgo" --> E["5. Aprobación Humana (HITL)"]
    E --> F
\`\`\`

---

## 4. DETALLE TÉCNICO DE ETAPAS AUTOMATIZADAS

${toBeNodes
  .map(
    (node) => `
### ${node.title}
* **Objetivo**: ${node.subtitle || ''}
* **Descripción**: ${node.description}
* **Tecnologías**: ${node.technologies?.join(", ") || "N/A"}
* **Beneficio Esperado**: ${node.benefit || "N/A"}
${node.details ? node.details.map((d) => `  - ${d}`).join("\n") : ""}
`
  )
  .join("\n")}
`;

      const blob = new Blob([mermaidContent], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const safeFileName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      link.href = url;
      link.download = `diagrama-flujo-${safeFileName}.md`;
      link.click();
      URL.revokeObjectURL(url);
      setDownloadSuccess("Archivo Markdown / Mermaid descargado con éxito");
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error("Error al exportar Markdown:", err);
    } finally {
      setIsDownloading(null);
    }
  };

  const getNodeColor = (type: FlowNode["type"]) => {
    switch (type) {
      case "input":
        return "border-blue-800/60 bg-blue-950/30 text-blue-300";
      case "preprocessing":
        return "border-cyan-800/60 bg-cyan-950/30 text-cyan-300";
      case "process":
        return "border-zinc-800 bg-zinc-900 text-zinc-300";
      case "bottleneck":
        return "border-amber-800/80 bg-amber-950/40 text-amber-300";
      case "ai":
        return "border-purple-600/80 bg-purple-950/50 text-purple-200 shadow-xl shadow-purple-950/40";
      case "validation":
        return "border-indigo-800/60 bg-indigo-950/30 text-indigo-300";
      case "output":
        return "border-emerald-800/80 bg-emerald-950/40 text-emerald-300";
      default:
        return "border-zinc-800 bg-zinc-900 text-zinc-300";
    }
  };

  const renderFlowColumn = (title: string, subtitle: string, nodes: FlowNode[], isToBe: boolean) => (
    <div className={`space-y-4 p-5 rounded-2xl border ${isToBe ? "border-purple-800/50 bg-gradient-to-b from-purple-950/20 to-zinc-950" : "border-zinc-800 bg-zinc-950/60"}`}>
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div>
          <h4 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isToBe ? "text-purple-400" : "text-amber-400"}`}>
            {isToBe ? <Sparkles className="w-4 h-4 text-purple-400" /> : <Clock className="w-4 h-4 text-amber-400" />}
            {title}
          </h4>
          <p className="text-[11px] text-zinc-400 mt-0.5">{subtitle}</p>
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-md border ${isToBe ? "bg-purple-950 border-purple-800 text-purple-300" : "bg-zinc-900 border-zinc-800 text-zinc-400"}`}>
          {isToBe ? `${nodes.length} ETAPAS AUTOMATIZADAS` : `${nodes.length} ETAPAS MANUALES`}
        </span>
      </div>

      <div className="space-y-3 relative">
        {nodes.map((node, index) => {
          const NodeIcon = node.icon;
          const isExpanded = expandedNodeId === node.id;

          return (
            <React.Fragment key={node.id}>
              <div 
                className={`p-4 rounded-xl border transition-all relative cursor-pointer hover:border-zinc-600 ${getNodeColor(node.type)}`}
                onClick={() => setExpandedNodeId(isExpanded ? null : node.id)}
              >
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-zinc-950/70 border border-zinc-800 shrink-0">
                      <NodeIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <h5 className="text-xs font-bold tracking-tight text-white">{node.title}</h5>
                      {node.subtitle && (
                        <span className="text-[10px] font-mono text-zinc-400 block">{node.subtitle}</span>
                      )}
                    </div>
                  </div>
                  {node.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-zinc-950/80 border border-zinc-800 shrink-0">
                      {node.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-zinc-300 pl-8">{node.description}</p>

                {node.metric && (
                  <div className="mt-2 pl-8 flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                    <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                    {node.metric}
                  </div>
                )}

                {/* Technologies tags for TO-BE */}
                {isToBe && node.technologies && node.technologies.length > 0 && (
                  <div className="mt-2.5 pl-8 flex flex-wrap gap-1">
                    {node.technologies.map((tech) => (
                      <span key={tech} className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-purple-300 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expandable details button */}
                {isToBe && (node.details || node.benefit) && (
                  <div className="mt-2 pl-8 pt-1 flex justify-between items-center text-[10px] text-purple-400 font-mono font-bold border-t border-purple-900/30">
                    <span>{isExpanded ? "Ocultar componentes detallados" : "Ver componentes del paso →"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                )}

                {/* Expanded Details Box */}
                {isToBe && isExpanded && (node.details || node.benefit) && (
                  <div className="mt-3 ml-8 p-3 bg-zinc-950/90 border border-purple-800/40 rounded-lg space-y-2 text-xs">
                    {node.benefit && (
                      <div className="p-2 bg-emerald-950/40 border border-emerald-800/40 rounded text-[11px] text-emerald-300 font-mono font-bold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Beneficio: {node.benefit}</span>
                      </div>
                    )}
                    {node.details && (
                      <ul className="space-y-1 text-[11px] text-zinc-300 list-disc list-inside font-sans">
                        {node.details.map((dt, i) => (
                          <li key={i}>{dt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {index < nodes.length - 1 && (
                <div className="flex justify-center py-0.5 text-zinc-600">
                  <ArrowDown className="w-4 h-4 animate-pulse text-zinc-500" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {(downloadSuccess || copiedSection) && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold rounded-xl flex items-center gap-2 animate-fade-in shadow-lg">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccess || `Copiado al portapapeles: ${copiedSection}`}</span>
        </div>
      )}

      {/* Header controls & Main Selector */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              Flujos y Descripción del Proceso (AS-IS vs TO-BE)
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Análisis comparativo completo del proceso actual sin solución y el proceso futuro rediseñado con Inteligencia Artificial.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Active Display Selector: Diagrama / Narrativa Escrita / Ambos */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveDisplay("diagram")}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeDisplay === "diagram"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Diagrama</span>
            </button>
            <button
              onClick={() => setActiveDisplay("narrative")}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeDisplay === "narrative"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Texto Redactado</span>
            </button>
            <button
              onClick={() => setActiveDisplay("both")}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeDisplay === "both"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Vista Completa</span>
            </button>
          </div>

          {/* Download Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              disabled={isDownloading !== null}
              className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Download className="w-4 h-4 text-white" />
              )}
              <span>Descargar Diagrama / Informe</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/80" />
            </button>

            {/* Dropdown Menu Options */}
            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 p-1.5 space-y-1">
                <button
                  onClick={handleDownloadPNG}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold text-zinc-200 hover:bg-purple-950/60 hover:text-purple-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileImage className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="block font-bold">Descargar Imagen PNG</span>
                    <span className="text-[10px] text-zinc-500 block font-normal">Captura visual HD del diagrama</span>
                  </div>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold text-zinc-200 hover:bg-purple-950/60 hover:text-purple-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="block font-bold">Descargar Documento PDF</span>
                    <span className="text-[10px] text-zinc-500 block font-normal">Informe en PDF con arquitectura</span>
                  </div>
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold text-zinc-200 hover:bg-purple-950/60 hover:text-purple-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="block font-bold">Descargar Texto + Mermaid (.md)</span>
                    <span className="text-[10px] text-zinc-500 block font-normal">Narrativa + Diagrama Mermaid para Word/Notion</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NARRATIVE / TEXT FIELDS SECTION (CAMPOS DE TEXTO REDACTADOS AS-IS Y TO-BE) */}
      {(activeDisplay === "narrative" || activeDisplay === "both") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800 pb-3 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-black text-white uppercase tracking-wider">
                  Campos de Texto: Descripción del Proceso (AS-IS vs TO-BE)
                </h4>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Respuestas en texto continuo para consultar, seleccionar, copiar o editar directamente en tus informes o presentaciones.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyText(`${editableAsIs}\n\n=========================================\n\n${editableToBe}`, "Ambos Campos de Texto")}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-mono text-[11px] font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Ambos Campos de Texto</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campo de Texto 1: AS-IS */}
            <div className="bg-zinc-950 border border-amber-800/50 rounded-2xl p-5 space-y-3 relative shadow-lg">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-amber-400" />
                  <div>
                    <h5 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                      Campo de Texto: Proceso SIN Solución (AS-IS)
                    </h5>
                    <span className="text-[10px] text-zinc-500 font-mono block">
                      {editableAsIs.split(/\s+/).filter(Boolean).length} palabras • {editableAsIs.length} caracteres
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelectAll(asIsRef)}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                    title="Seleccionar todo el texto de la caja"
                  >
                    <span>Seleccionar</span>
                  </button>
                  <button
                    onClick={() => handleCopyText(editableAsIs, "Proceso Actual (AS-IS)")}
                    className="px-2.5 py-1 bg-amber-950 border border-amber-800 hover:border-amber-600 text-amber-300 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-amber-400" />
                    <span>Copiar</span>
                  </button>
                  <button
                    onClick={() => setEditableAsIs(asIsNarrativeText)}
                    className="p-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-all cursor-pointer"
                    title="Restablecer a texto original"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-amber-400/90 uppercase block">
                  Caja de Texto Redactada (Editable / Copiable):
                </label>
                <textarea
                  ref={asIsRef}
                  value={editableAsIs}
                  onChange={(e) => setEditableAsIs(e.target.value)}
                  rows={15}
                  className="w-full bg-zinc-900/90 border border-amber-900/40 rounded-xl p-4 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-500 leading-relaxed shadow-inner selection:bg-amber-500 selection:text-black resize-y"
                  placeholder="Descripción del proceso AS-IS..."
                />
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>Volumen: <strong className="text-white">{monthlyCases} casos/mes</strong></span>
                <span>Tiempo/Caso: <strong className="text-amber-400">{timePerCase} {timeUnit}</strong></span>
              </div>
            </div>

            {/* Campo de Texto 2: TO-BE */}
            <div className="bg-zinc-950 border border-purple-800/50 rounded-2xl p-5 space-y-3 relative shadow-lg">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-purple-400" />
                  <div>
                    <h5 className="text-xs font-black text-purple-400 uppercase tracking-wider">
                      Campo de Texto: Proceso CON Solución (TO-BE)
                    </h5>
                    <span className="text-[10px] text-zinc-500 font-mono block">
                      {editableToBe.split(/\s+/).filter(Boolean).length} palabras • {editableToBe.length} caracteres
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelectAll(toBeRef)}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                    title="Seleccionar todo el texto de la caja"
                  >
                    <span>Seleccionar</span>
                  </button>
                  <button
                    onClick={() => handleCopyText(editableToBe, "Proceso Futuro (TO-BE)")}
                    className="px-2.5 py-1 bg-purple-950 border border-purple-800 hover:border-purple-600 text-purple-300 font-mono text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-purple-400" />
                    <span>Copiar</span>
                  </button>
                  <button
                    onClick={() => setEditableToBe(toBeNarrativeText)}
                    className="p-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-all cursor-pointer"
                    title="Restablecer a texto original"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-purple-400/90 uppercase block">
                  Caja de Texto Redactada (Editable / Copiable):
                </label>
                <textarea
                  ref={toBeRef}
                  value={editableToBe}
                  onChange={(e) => setEditableToBe(e.target.value)}
                  rows={15}
                  className="w-full bg-zinc-900/90 border border-purple-900/40 rounded-xl p-4 text-xs font-mono text-zinc-200 focus:outline-none focus:border-purple-500 leading-relaxed shadow-inner selection:bg-purple-500 selection:text-black resize-y"
                  placeholder="Descripción del proceso TO-BE..."
                />
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>Lead Time: <strong className="text-emerald-400">&lt; 3 min (-85%)</strong></span>
                <span>Tasa Automatización: <strong className="text-purple-400">&gt; 95% directo</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM SECTION (BOXES AND FLOW CHART) */}
      {(activeDisplay === "diagram" || activeDisplay === "both") && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                Diagrama de Flujo Visual (AS-IS vs TO-BE)
              </h4>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("sideBySide")}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                  viewMode === "sideBySide"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Side-by-Side
              </button>
              <button
                onClick={() => setViewMode("asis")}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                  viewMode === "asis"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Solo AS-IS
              </button>
              <button
                onClick={() => setViewMode("tobe")}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                  viewMode === "tobe"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Solo TO-BE
              </button>
            </div>
          </div>

          {/* Main Ref Container for PNG capture */}
          <div ref={flowchartRef} className="p-2 bg-zinc-950 rounded-2xl border border-zinc-900">
            {/* Grid rendering */}
            {viewMode === "sideBySide" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderFlowColumn("Flujo Actual (AS-IS Manual)", "Operación con cuellos de botella e intervención manual", asIsNodes, false)}
                {renderFlowColumn("Flujo Futuro Rediseñado (TO-BE Optimizado)", "Arquitectura de 6 etapas con IA Agéntica & Automatización", toBeNodes, true)}
              </div>
            )}

            {viewMode === "asis" && (
              <div className="max-w-2xl mx-auto">
                {renderFlowColumn("Flujo Actual (AS-IS Manual)", "Operación con cuellos de botella e intervención manual", asIsNodes, false)}
              </div>
            )}

            {viewMode === "tobe" && (
              <div className="max-w-3xl mx-auto">
                {renderFlowColumn("Flujo Futuro Rediseñado (TO-BE Optimizado)", "Arquitectura de 6 etapas con IA Agéntica & Automatización", toBeNodes, true)}
              </div>
            )}

            {/* Architectural Summary Banner */}
            <div className="mt-6 p-5 bg-gradient-to-br from-purple-950/30 via-zinc-950 to-indigo-950/20 border border-purple-800/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Resumen de Beneficios de la Arquitectura Futura (TO-BE)
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">Reducción de Tiempo</span>
                  <span className="text-emerald-400 font-extrabold text-sm block font-mono">-85% Lead Time</span>
                  <p className="text-[11px] text-zinc-400">De horas/días a menos de 3 minutos por caso.</p>
                </div>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">Liberación de Horas</span>
                  <span className="text-purple-400 font-extrabold text-sm block font-mono">10x Capacidad Operativa</span>
                  <p className="text-[11px] text-zinc-400">El equipo humano solo atiende excepciones de alto riesgo (&lt;5%).</p>
                </div>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">Precisión & Calidad</span>
                  <span className="text-blue-400 font-extrabold text-sm block font-mono">&lt; 1% Tasa de Error</span>
                  <p className="text-[11px] text-zinc-400">Validaciones automáticas antes de escribir en sistemas destino.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend & Summary Footer */}
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold text-zinc-300">Convenciones Flujo Futuro:</span>
          <span className="flex items-center gap-1.5 text-blue-300"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 1. Ingesta</span>
          <span className="flex items-center gap-1.5 text-cyan-300"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> 2. Pre-procesamiento</span>
          <span className="flex items-center gap-1.5 text-purple-300"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> 3. Motor IA Agéntico</span>
          <span className="flex items-center gap-1.5 text-indigo-300"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> 4-5. Calidad & HITL</span>
          <span className="flex items-center gap-1.5 text-emerald-300"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 6. Cierre Automatizado</span>
        </div>
        <span className="text-[10px] text-zinc-500 italic">Haz clic en cualquier paso para ver sus detalles de ingeniería</span>
      </div>
    </div>
  );
};
