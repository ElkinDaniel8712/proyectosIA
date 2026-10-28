import React, { useState, useMemo } from "react";
import { Project, FormAnswers } from "../types";
import { calculateProjectScore } from "../scoring";
import {
  Columns,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

interface InitiativeComparatorProps {
  projects: Project[];
  onCompareRequested: (selectedProjects: Project[]) => Promise<any>;
}

export default function InitiativeComparator({
  projects,
  onCompareRequested,
}: InitiativeComparatorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparisonResult, setComparisonResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  // Normalize projects to compute missing scores, categories, and solution types
  const normalizedProjects = useMemo(() => {
    return projects.map((p) => {
      const defaultAnswers: FormAnswers = {
        initiativeName: p.initiativeName || "",
        area: p.area || "",
        processOwner: p.processOwner || "",
        sponsor: p.sponsor || "",
        processActivity: "",
        currentProblem: "",
        trigger: "",
        finalResult: "",
        standardizationLevel: "",
        frequency: "",
        monthlyCases: 0,
        timePerCase: 0,
        timeUnit: "Minutos",
        peopleInvolved: 0,
        reworkFrequency: "",
        consequences: [],
        affectedGroup: "",
        errorConsequences: "",
        canEstimateEconomicImpact: "",
        expectedOutcome: "",
        autonomyLevel: "",
        dataSources: [],
        dataOrganization: "",
        availableExamples: "",
        dataType: [],
        canObtainAutomatically: "",
        hasDocumentation: "",
      };
      const answers: FormAnswers = p.answers ? { ...defaultAnswers, ...p.answers } : defaultAnswers;

      // Dynamically calculate score if missing or incomplete
      const activeScore =
        p.score && p.score.importanceScore > 0 && p.score.category !== "NO CALCULADA"
          ? p.score
          : calculateProjectScore(p.id, answers);

      // Category
      const category =
        p.category && p.category !== "NO CALCULADA"
          ? p.category
          : activeScore.category;

      // Recommended solution type
      let recommendedSolutionType =
        p.recommendedSolutionType || p.analysis?.structuredAnalysis?.tipoSolucionRecomendada;

      if (!recommendedSolutionType) {
        if (answers.autonomyLevel?.startsWith("1") || answers.autonomyLevel?.startsWith("2")) {
          recommendedSolutionType = "asistente_ia";
        } else if (answers.autonomyLevel?.startsWith("3") || answers.autonomyLevel?.startsWith("4")) {
          recommendedSolutionType = "automatizacion_tradicional";
        } else if (answers.autonomyLevel?.startsWith("5") || answers.autonomyLevel?.startsWith("6")) {
          recommendedSolutionType = "agente_autonomo";
        } else {
          recommendedSolutionType = "automatizacion_tradicional";
        }
      }

      return {
        ...p,
        answers,
        score: activeScore,
        category,
        recommendedSolutionType,
      };
    });
  }, [projects]);

  const activeProjects = useMemo(() => {
    return normalizedProjects.filter((p) => p.status !== "Borrador");
  }, [normalizedProjects]);

  const toggleSelect = (id: string) => {
    setWarning("");
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        setWarning("Puede comparar hasta 4 iniciativas simultáneamente.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleCompare = async () => {
    setWarning("");
    if (selectedIds.length < 2) {
      setWarning("Por favor seleccione al menos 2 iniciativas para comparar.");
      return;
    }
    setLoading(true);
    setComparisonResult(null);
    setError("");

    const selectedProjects = activeProjects.filter((p) => selectedIds.includes(p.id));

    try {
      const result = await onCompareRequested(selectedProjects);
      setComparisonResult(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al comparar las iniciativas con Gemini.");
    } finally {
      setLoading(false);
    }
  };

  const selectedProjects = useMemo(() => {
    return activeProjects.filter((p) => selectedIds.includes(p.id));
  }, [activeProjects, selectedIds]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-zinc-950 min-h-screen text-zinc-200">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5 mb-6">
        <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
          Comparador<span className="text-blue-500 font-normal">.de.Iniciativas</span>
        </h1>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
          Seleccione entre 2 y 4 iniciativas enviadas para comparar sus métricas y obtener una conclusión estratégica de Gemini.
        </p>
      </div>

      {warning && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900/40 text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          {warning}
        </div>
      )}

      {/* Select checklist */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">
            Listado de Iniciativas Evaluadas ({selectedIds.length}/4 seleccionadas)
          </h3>
          {selectedIds.length >= 2 && (
            <button
              onClick={handleCompare}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              {loading ? "Comparando..." : "Comparar con Gemini"}
            </button>
          )}
        </div>

        {activeProjects.length === 0 ? (
          <p className="text-center text-xs text-zinc-500 py-6">No hay iniciativas enviadas para comparar.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[180px] overflow-y-auto pr-2">
            {activeProjects.map((p) => {
              const checked = selectedIds.includes(p.id);
              return (
                <label
                  key={p.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    checked
                      ? "bg-blue-950/20 border-blue-500/50"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelect(p.id)}
                    className="mt-0.5 rounded border-zinc-800 text-blue-500 bg-zinc-900 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{p.initiativeName}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5 font-mono">
                      Área: {p.area} • Score: {p.score?.totalScore ?? "Sin score"}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {loading && (
        <div className="py-24 text-center space-y-4 bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-xl">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Gemini está analizando la viabilidad relativa y rentabilidad...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/30 text-xs font-semibold text-rose-400 uppercase tracking-wider">
          {error}
        </div>
      )}

      {/* Side-by-side comparison grid */}
      {selectedProjects.length >= 2 && !loading && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-zinc-500 font-bold border-b border-zinc-800">
                    <th className="p-4 w-32 shrink-0 uppercase tracking-wider text-[10px]">Factor</th>
                    {selectedProjects.map((p) => (
                      <th key={p.id} className="p-4 min-w-[150px] border-l border-zinc-800 text-white font-black text-sm uppercase italic">
                        {p.initiativeName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-medium text-zinc-300">
                  {/* Area */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Área</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-semibold">{p.area}</td>
                    ))}
                  </tr>
                  {/* Problem */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Problema</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 text-xs text-zinc-400 leading-relaxed max-w-sm">{p.answers.currentProblem}</td>
                    ))}
                  </tr>
                  {/* Volume cases */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Casos Mensuales</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-bold font-mono text-white">{p.answers.monthlyCases} casos</td>
                    ))}
                  </tr>
                  {/* Economic impact */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Impacto Económico</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-bold font-mono text-emerald-400">
                        {p.answers.annualValueCop
                          ? `COP ${p.answers.annualValueCop.toLocaleString("es-CO")}/año`
                          : "No estimado"}
                      </td>
                    ))}
                  </tr>
                  {/* Scores breakdown */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Importancia (40%)</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-bold font-mono">{p.score?.importanceScore ?? 0}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Viabilidad (35%)</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-bold font-mono">{p.score?.viabilityScore ?? 0}/100</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Facilidad (25%)</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-bold font-mono">{p.score?.easeScore ?? 0}/100</td>
                    ))}
                  </tr>
                  {/* Total score */}
                  <tr className="bg-blue-950/10 font-bold text-blue-400">
                    <td className="p-4 text-[10px] uppercase tracking-wider">SCORE TOTAL</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-black text-sm font-mono">{p.score?.totalScore ?? 0}/100</td>
                    ))}
                  </tr>
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Categoría</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60">
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-zinc-950 text-zinc-300 border border-zinc-800">
                          {p.category || "No calculada"}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Recommended solution */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Solución Sugerida</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 font-bold text-xs uppercase text-zinc-300">
                        {(p.recommendedSolutionType || "Pendiente").replace(/_/g, " ")}
                      </td>
                    ))}
                  </tr>
                  {/* Testing env */}
                  <tr>
                    <td className="p-4 font-bold bg-zinc-950/40 text-zinc-400 text-[10px] uppercase tracking-wider">Entorno Pruebas</td>
                    {selectedProjects.map((p) => (
                      <td key={p.id} className="p-4 border-l border-zinc-800/60 text-xs text-zinc-400 leading-relaxed">{p.answers.safeTestingEnvironment}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gemini AI Comparative Conclusion */}
          {comparisonResult && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">
                  Resolución Estratégica de Priorización por Gemini IA
                </h3>
              </div>

              <div className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
                <span className="block font-bold text-zinc-500 uppercase text-[9px] tracking-widest mb-1 font-mono">
                  Resumen Comparativo
                </span>
                {comparisonResult.resumenComparativo}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* abordar primero */}
                <div className="p-5 border rounded-[1.5rem] bg-emerald-950/20 border-emerald-900/40 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-black text-emerald-400 uppercase text-[10px] tracking-widest">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    Abordar Primero (Mayor ROI / Viable)
                  </div>
                  <p className="font-bold text-white text-sm">{comparisonResult.iniciativaPrioritaria?.nombre}</p>
                  <p className="text-zinc-400 leading-relaxed">{comparisonResult.iniciativaPrioritaria?.justificacion}</p>
                </div>

                {/* piloto aprendizaje */}
                <div className="p-5 border rounded-[1.5rem] bg-blue-950/20 border-blue-900/40 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-black text-blue-400 uppercase text-[10px] tracking-widest">
                    <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                    Excelente Piloto de Aprendizaje
                  </div>
                  <p className="font-bold text-white text-sm">{comparisonResult.pilotoDeAprendizaje?.nombre}</p>
                  <p className="text-zinc-400 leading-relaxed">{comparisonResult.pilotoDeAprendizaje?.justificacion}</p>
                </div>
              </div>

              {/* requiere preparación */}
              {comparisonResult.requierePreparacionPrevia && (
                <div className="p-5 border rounded-[1.5rem] bg-amber-950/20 border-amber-900/40 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-black text-amber-400 uppercase text-[10px] tracking-widest">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    Requiere Preparación Previa Obligatoria
                  </div>
                  <p className="font-bold text-white text-sm">{comparisonResult.requierePreparacionPrevia.nombre}</p>
                  <div className="space-y-1 mt-1 pl-1 font-mono text-[11px]">
                    {comparisonResult.requierePreparacionPrevia.accionesRecomendadas?.map((act: string, idx: number) => (
                      <div key={idx} className="flex gap-2 items-start text-zinc-400">
                        <span className="text-amber-500">•</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* riesgos y conclusión gerencial */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div className="text-xs">
                  <span className="block font-black text-white uppercase text-[10px] tracking-widest mb-1.5">
                    Análisis de Riesgos Diferenciales
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-400">{comparisonResult.riesgosDiferenciales}</p>
                </div>

                <div className="text-xs">
                  <span className="block font-black text-blue-400 uppercase text-[10px] tracking-widest mb-1.5">
                    Conclusión Gerencial y Hoja de Ruta Secuencial
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-300 bg-zinc-950 p-5 rounded-xl border border-zinc-800">
                    {comparisonResult.conclusionGerencial}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
