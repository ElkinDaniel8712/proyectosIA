import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Project, FormAnswers } from "../types";
import { calculateProjectScore } from "../scoring";
import {
  Upload,
  FileSpreadsheet,
  Download,
  AlertCircle,
  CheckCircle,
  X,
  FileText,
  Trash2,
  Sparkles,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

interface ImportRealDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (projects: Project[], replaceAll: boolean) => Promise<void>;
  onClearAll: () => Promise<void>;
  totalCurrentProjects: number;
  userEmail?: string;
}

interface ParsedRow {
  name: string;
  area: string;
  sponsor: string;
  processOwner: string;
  problem: string;
  expectedOutcome: string;
  annualValueCop: number;
  monthlyCases: number;
  timePerCase: number;
  peopleInvolved: number;
  raw: any;
}

export default function ImportRealDataModal({
  isOpen,
  onClose,
  onImportComplete,
  onClearAll,
  totalCurrentProjects,
  userEmail = "elkin.zapata@grupogtd.com",
}: ImportRealDataModalProps) {
  const [activeTab, setActiveTab] = useState<"file" | "paste">("file");
  const [pastedText, setPastedText] = useState("");
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [replaceAll, setReplaceAll] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Generate and download Excel template
  const handleDownloadTemplate = () => {
    try {
      const templateData = [
        {
          "Nombre de la Iniciativa": "Ej: Implementación de Agente IA para Despacho Cuadrillas",
          "Área / Gerencia": "Operaciones",
          "Sponsor (Nombre y Cargo Real)": "Ej: Roberto Valenzuela (Gerente de Operaciones)",
          "Líder del Proceso": userEmail,
          "Problema Actual": "Demora excesiva en asignación de órdenes de trabajo a cuadrillas en terreno.",
          "Resultado Esperado": "Asignación autónoma en menos de 2 minutos vía Telegram / Teams.",
          "Impacto Económico Anual COP": 150000000,
          "Casos Mensuales": 1200,
          "Tiempo por Caso (Minutos)": 30,
          "Personas Involucradas": 35,
          "Nivel Estandarización": "Está documentado y siempre se ejecuta de la misma manera",
        },
        {
          "Nombre de la Iniciativa": "Ej: Conciliación Automatizada de Facturación Interconexión",
          "Área / Gerencia": "Finanzas",
          "Sponsor (Nombre y Cargo Real)": "Ej: Diana Carolina Pinzón (Gerencia de Finanzas)",
          "Líder del Proceso": userEmail,
          "Problema Actual": "Cruce manual de CDRs con operadores internacionales toma hasta 15 días.",
          "Resultado Esperado": "Cruce 100% automático en menos de 1 hora con alertas de disputas.",
          "Impacto Económico Anual COP": 320000000,
          "Casos Mensuales": 45,
          "Tiempo por Caso (Minutos)": 480,
          "Personas Involucradas": 3,
          "Nivel Estandarización": "Está documentado y siempre se ejecuta de la misma manera",
        },
      ];

      const ws = XLSX.utils.json_to_sheet(templateData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Plantilla_Proyectos_GTD");
      XLSX.writeFile(wb, "Plantilla_Proyectos_Reales_GTD.xlsx");
      setStatusMsg({ type: "success", text: "Plantilla descargada con éxito. Diligénciala y súbela aquí." });
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: "Error al generar plantilla: " + err.message });
    }
  };

  // Helper to extract fields from row object (tolerant to various column header names)
  const mapRowToParsed = (row: any): ParsedRow | null => {
    const keys = Object.keys(row);
    const findVal = (possibleNames: string[]): any => {
      for (const p of possibleNames) {
        const foundKey = keys.find((k) => k.toLowerCase().trim() === p.toLowerCase().trim());
        if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) {
          return row[foundKey];
        }
      }
      return undefined;
    };

    const name = findVal(["nombre", "iniciativa", "nombre de la iniciativa", "proyecto", "titulo", "title", "name"]);
    if (!name || String(name).trim() === "") return null;

    const area = findVal(["area", "área", "gerencia", "departamento", "área / gerencia", "unidad"]) || "Operaciones";
    const sponsor = findVal(["sponsor", "patrocinador", "sponsor (nombre y cargo real)", "sponsor real", "lider ejecutivo", "gerente"]) || "Por Asignar (Gerencia GTD)";
    const processOwner = findVal(["lider", "líder", "propietario", "líder del proceso", "dueño de proceso", "owner", "solicitante"]) || userEmail;
    const problem = findVal(["problema", "problema actual", "descripcion", "descripción", "situacion actual", "current problem"]) || "Optimización de procesos operativos en GTD.";
    const expectedOutcome = findVal(["resultado", "resultado esperado", "objetivo", "solucion", "solución", "expected outcome"]) || "Automatización y eficiencia operativa integral.";
    
    const rawCop = findVal(["impacto", "impacto economico", "impacto económico", "impacto económico anual cop", "ahorro cop", "cop", "valor anual", "ahorro"]);
    const annualValueCop = typeof rawCop === "number" ? rawCop : parseFloat(String(rawCop || "").replace(/[^0-9.-]+/g, "")) || 0;

    const rawCases = findVal(["casos", "casos mensuales", "volumen", "mensual"]);
    const monthlyCases = typeof rawCases === "number" ? rawCases : parseInt(String(rawCases || "").replace(/[^0-9]/g, ""), 10) || 100;

    const rawTime = findVal(["tiempo", "tiempo por caso", "minutos", "duracion"]);
    const timePerCase = typeof rawTime === "number" ? rawTime : parseInt(String(rawTime || "").replace(/[^0-9]/g, ""), 10) || 30;

    const rawPeople = findVal(["personas", "personas involucradas", "equipo", "usuarios"]);
    const peopleInvolved = typeof rawPeople === "number" ? rawPeople : parseInt(String(rawPeople || "").replace(/[^0-9]/g, ""), 10) || 5;

    return {
      name: String(name).trim(),
      area: String(area).trim(),
      sponsor: String(sponsor).trim(),
      processOwner: String(processOwner).trim(),
      problem: String(problem).trim(),
      expectedOutcome: String(expectedOutcome).trim(),
      annualValueCop: isNaN(annualValueCop) ? 0 : annualValueCop,
      monthlyCases: isNaN(monthlyCases) ? 50 : monthlyCases,
      timePerCase: isNaN(timePerCase) ? 30 : timePerCase,
      peopleInvolved: isNaN(peopleInvolved) ? 5 : peopleInvolved,
      raw: row,
    };
  };

  // Handle Excel file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);
    setStatusMsg(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const rawJson = XLSX.utils.sheet_to_json(ws);

        const mapped: ParsedRow[] = [];
        for (const item of rawJson) {
          const parsed = mapRowToParsed(item);
          if (parsed) mapped.push(parsed);
        }

        if (mapped.length === 0) {
          setStatusMsg({
            type: "error",
            text: "No se encontraron filas válidas en el archivo. Asegúrate de incluir la columna 'Nombre de la Iniciativa'.",
          });
          setParsedRows([]);
        } else {
          setParsedRows(mapped);
          setStatusMsg({
            type: "success",
            text: `Se detectaron con éxito ${mapped.length} proyectos reales listos para cargar.`,
          });
        }
      } catch (err: any) {
        console.error(err);
        setStatusMsg({ type: "error", text: "Error procesando el archivo: " + err.message });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  // Handle pasted text from Excel/Clipboard
  const handleProcessPasted = () => {
    if (!pastedText.trim()) return;

    try {
      setIsProcessing(true);
      const lines = pastedText.trim().split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      // Detect delimiter: tab or semicolon or comma
      const firstLine = lines[0];
      let delimiter = "\t";
      if (firstLine.includes("\t")) delimiter = "\t";
      else if (firstLine.includes(";")) delimiter = ";";
      else if (firstLine.includes(",")) delimiter = ",";

      const headers = lines[0].split(delimiter).map((h) => h.replace(/^["']|["']$/g, "").trim());
      const mapped: ParsedRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(delimiter).map((c) => c.replace(/^["']|["']$/g, "").trim());
        const rowObj: Record<string, string> = {};
        headers.forEach((h, idx) => {
          rowObj[h] = cells[idx] || "";
        });
        const parsed = mapRowToParsed(rowObj);
        if (parsed) mapped.push(parsed);
      }

      if (mapped.length === 0) {
        setStatusMsg({
          type: "error",
          text: "No se detectaron proyectos válidos en el texto pegado.",
        });
      } else {
        setParsedRows(mapped);
        setStatusMsg({
          type: "success",
          text: `Se leyeron ${mapped.length} proyectos desde el portapapeles.`,
        });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Error procesando texto: " + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  // Convert ParsedRow into full Project with calculated scores
  const convertToProjects = (rows: ParsedRow[]): Project[] => {
    return rows.map((r, idx) => {
      const projId = `gtd_real_${Date.now()}_${idx + 1}`;
      const answers: FormAnswers = {
        initiativeName: r.name,
        area: r.area,
        sponsor: r.sponsor,
        processOwner: r.processOwner,
        processActivity: r.name,
        currentProblem: r.problem,
        trigger: "Inicio operativo del caso en Grupo GTD",
        finalResult: r.expectedOutcome,
        standardizationLevel: "Está documentado y siempre se ejecuta de la misma manera",
        frequency: r.monthlyCases > 200 ? "Varias veces al día" : r.monthlyCases > 30 ? "Diario" : "Semanal",
        monthlyCases: r.monthlyCases,
        timePerCase: r.timePerCase,
        timeUnit: "Minutos",
        peopleInvolved: r.peopleInvolved,
        reworkFrequency: "Entre el 5 % y el 15 % de los casos",
        consequences: ["Sobrecostos", "Retrasos en la atención", "Afectación a clientes"],
        affectedGroup: "Toda la compañía",
        errorConsequences: "Retrasos operativos y sobrecostos acumulados en la operación de GTD.",
        canEstimateEconomicImpact: r.annualValueCop > 0 ? "Sí, está documentado y auditado" : "No con exactitud, pero existe un beneficio cualitativo",
        annualValueCop: r.annualValueCop,
        impactType: "Ahorro de costos directos y aumento de productividad",
        economicExplanation: `Impacto anual estimado en COP $${(r.annualValueCop || 0).toLocaleString()} optimizando ${r.monthlyCases} casos/mes.`,
        expectedOutcome: r.expectedOutcome,
        autonomyLevel: "3. Proponer acciones y esperar confirmación humana",
        dataSources: ["Sistemas internos GTD", "Bases de datos", "Archivos Excel / CSV"],
        dataOrganization: "Centralizada en un solo sistema",
        availableExamples: "Sí, más de 100 casos",
        dataType: ["Información interna", "Información de clientes"],
        canObtainAutomatically: "Sí, los sistemas ya permiten integraciones automáticas",
        hasDocumentation: "Sí, está completa y actualizada",
        expertAvailability: "Sí, cuatro o más horas por semana",
        pilotAuthorization: "Sí",
        safeTestingEnvironment: "Sí, existe un ambiente de pruebas",
      };

      const score = calculateProjectScore(projId, answers);

      return {
        id: projId,
        initiativeName: r.name,
        area: r.area,
        sponsor: r.sponsor,
        processOwner: r.processOwner,
        status: "Priorizado",
        category: score.category || "Implementar de inmediato",
        riskLevel: "bajo",
        recommendedSolutionType: "agente_con_aprobacion",
        requesterId: "gtd_user_admin",
        requesterEmail: r.processOwner,
        submittedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        answers,
        score,
        attachments: [],
      };
    });
  };

  // Submit import
  const handleConfirmImport = async () => {
    if (parsedRows.length === 0) return;
    try {
      setIsProcessing(true);
      const projectsToSave = convertToProjects(parsedRows);
      await onImportComplete(projectsToSave, replaceAll);
      onClose();
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: "Error al guardar en el catálogo: " + err.message });
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-neutral-100">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Carga Masiva de Proyectos Reales de Grupo GTD
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Importa los proyectos auténticos para presentar ante la Gerencia de Proyectos y exportar a Word.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Action Callout & Template */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-300">¿Tienes un archivo de Excel con tus proyectos?</h4>
                <p className="text-xs text-neutral-300 mt-1">
                  Puedes subir tu archivo directamente o descargar la plantilla oficial con el formato esperado.
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium transition shrink-0"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              Descargar Plantilla Excel
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-neutral-800">
            <button
              onClick={() => setActiveTab("file")}
              className={`pb-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition ${
                activeTab === "file"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Upload className="w-4 h-4" />
              Subir Archivo (.xlsx, .xls, .csv)
            </button>
            <button
              onClick={() => setActiveTab("paste")}
              className={`pb-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 transition ${
                activeTab === "paste"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Pegar Filas de Excel
            </button>
          </div>

          {/* Tab 1: File Upload */}
          {activeTab === "file" && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-700 hover:border-blue-500/60 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-neutral-950/40 transition hover:bg-neutral-900/60 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="p-4 rounded-full bg-neutral-800/80 group-hover:bg-blue-500/10 text-neutral-400 group-hover:text-blue-400 mb-3 transition">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <p className="font-semibold text-neutral-200">
                  {fileName ? fileName : "Haz clic aquí para seleccionar tu archivo Excel o CSV"}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Formatos compatibles: .xlsx, .xls, .csv (sin límite de proyectos)
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Paste Rows */}
          {activeTab === "paste" && (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-neutral-300">
                Pega aquí las filas copiadas directamente desde tu hoja de cálculo:
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Nombre de la Iniciativa	Área	Sponsor	Líder	Problema	Impacto COP&#10;Agente FTTH	Operaciones	Juan Pérez	elkin.zapata@grupogtd.com	Demoras cuadrillas	180000000"
                rows={5}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 font-mono"
              />
              <button
                onClick={handleProcessPasted}
                disabled={!pastedText.trim()}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs transition flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Procesar Texto Pegado
              </button>
            </div>
          )}

          {/* Status Message */}
          {statusMsg && (
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2 text-xs ${
                statusMsg.type === "success"
                  ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-300"
                  : statusMsg.type === "error"
                  ? "bg-red-950/30 border-red-800/50 text-red-300"
                  : "bg-blue-950/30 border-blue-800/50 text-blue-300"
              }`}
            >
              {statusMsg.type === "success" ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Parsed Rows Preview */}
          {parsedRows.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Vista Previa de Proyectos Identificados ({parsedRows.length})
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Listos para scoring y exportación
                </span>
              </div>
              <div className="max-h-52 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950/60 divide-y divide-neutral-800/60">
                {parsedRows.map((row, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-neutral-900/40">
                    <div className="space-y-0.5 max-w-[65%]">
                      <p className="font-semibold text-neutral-100 truncate">{row.name}</p>
                      <p className="text-neutral-400 text-[11px] truncate">
                        <span className="text-blue-400 font-medium">{row.area}</span> • Sponsor: <span className="text-neutral-200">{row.sponsor}</span> • Líder: {row.processOwner}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-medium">
                        {row.annualValueCop > 0 ? `$${row.annualValueCop.toLocaleString()} COP` : "Cualitativo"}
                      </span>
                      <p className="text-[10px] text-neutral-500">{row.monthlyCases} casos/mes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Import Strategy Selection */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <span className="text-xs font-semibold text-neutral-300 block">
              Estrategia de Actualización del Catálogo:
            </span>
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="importStrategy"
                  checked={replaceAll}
                  onChange={() => setReplaceAll(true)}
                  className="mt-1 text-blue-600 focus:ring-blue-500 rounded-full"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Reemplazar por completo (Recomendado para datos reales)
                  </span>
                  <span className="text-[11px] text-neutral-400 block">
                    Elimina los {totalCurrentProjects} registros de prueba actuales y deja únicamente tus proyectos reales de Grupo GTD.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="importStrategy"
                  checked={!replaceAll}
                  onChange={() => setReplaceAll(false)}
                  className="mt-1 text-blue-600 focus:ring-blue-500 rounded-full"
                />
                <div>
                  <span className="text-xs font-semibold text-neutral-200 block">
                    Agregar o fusionar a los existentes
                  </span>
                  <span className="text-[11px] text-neutral-400 block">
                    Mantiene los proyectos actuales y añade los nuevos.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Wipe Test Data Option */}
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-neutral-400">¿Quieres vaciar los proyectos de prueba ahora?</p>
              <p className="text-[11px] text-neutral-500">Deja el catálogo en 0 para comenzar a ingresar proyectos 100% reales.</p>
            </div>
            <button
              onClick={async () => {
                if (window.confirm("¿Seguro que deseas vaciar todos los proyectos de prueba del catálogo?")) {
                  await onClearAll();
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs font-medium transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Vaciar Proyectos de Prueba
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmImport}
            disabled={parsedRows.length === 0 || isProcessing}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition flex items-center gap-2"
          >
            {isProcessing ? (
              <span>Procesando...</span>
            ) : (
              <>
                <span>Guardar {parsedRows.length} Proyectos Reales</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
