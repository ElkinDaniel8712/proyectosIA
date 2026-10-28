import React, { useState, useMemo } from "react";
import { Project, ProjectStatus } from "../types";
import { calculateProjectScore } from "../scoring";
import { calculateProjectKPIs } from "../utils/kpiCalculator";
import { classifyProjectTechnologies } from "../utils/technologyClassifier";
import {
  TrendingUp,
  Search,
  Filter,
  ArrowUpDown,
  HelpCircle,
  AlertCircle,
  X,
  Zap,
  Shield,
  Clock,
  ExternalLink,
  Trash2,
  AlertTriangle,
  Award,
  Cpu,
  FileDown,
  CheckCircle2,
} from "lucide-react";
import { exportProjectToDocx } from "../utils/exportProjectDocx";
import ImportRealDataModal from "./ImportRealDataModal";
import { FileSpreadsheet, Upload } from "lucide-react";

interface ProjectRankingProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  userEmail?: string;
  onWhyPositionRequested: (
    project: Project,
    rankPos: number,
    totalCount: number,
    nextProjName?: string,
    prevProjName?: string
  ) => Promise<any>; // returns the why position JSON
  onDeleteProject?: (projectId: string) => void;
  onImportRealProjects?: (projects: Project[], replaceAll: boolean) => Promise<void>;
  onClearAllProjects?: () => Promise<void>;
}

export default function ProjectRanking({
  projects,
  onSelectProject,
  userEmail,
  onWhyPositionRequested,
  onDeleteProject,
  onImportRealProjects,
  onClearAllProjects,
}: ProjectRankingProps) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  // Delete project state
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const confirmAndDelete = async () => {
    if (!deletingProject || !onDeleteProject) return;
    try {
      await onDeleteProject(deletingProject.id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingProject(null);
    }
  };
  // Filters & search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedSponsor, setSelectedSponsor] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedRisk, setSelectedRisk] = useState("Todos");

  // Sorting state
  const [sortColumn, setSortColumn] = useState<"rank" | "totalScore" | "importanceScore" | "viabilityScore" | "easeScore">("totalScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Why position modal state
  const [selectedWhyProject, setSelectedWhyProject] = useState<Project | null>(null);
  const [whyDetails, setWhyDetails] = useState<any | null>(null);
  const [whyLoading, setWhyLoading] = useState(false);
  const [whyError, setWhyError] = useState("");

  // Export to Word state
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const handleExportDocx = async (project: Project) => {
    try {
      setExportingId(project.id);
      await exportProjectToDocx(project);
      setExportSuccessMsg(`Documento Word (.docx) descargado: ${project.initiativeName}`);
      setTimeout(() => setExportSuccessMsg(null), 4500);
    } catch (err) {
      console.error("Error al exportar a Word:", err);
      alert("Hubo un error al generar el archivo de Word. Por favor intente nuevamente.");
    } finally {
      setExportingId(null);
    }
  };

  // Get all projects entered for ranking
  const rankingProjects = useMemo(() => {
    return projects;
  }, [projects]);

  // Sorting & mapping dynamic rank position on the projects
  const rankedProjects = useMemo(() => {
    // Recalculate score for projects that do not have a full valid score calculated
    const withScores = rankingProjects.map((proj) => {
      const activeScore = (proj.score && proj.score.importanceScore > 0 && proj.score.category !== "NO CALCULADA")
        ? proj.score
        : calculateProjectScore(proj.id, proj.answers);

      return {
        ...proj,
        score: activeScore,
        category: activeScore.category,
        riskLevel: activeScore.restrictions.length > 0 ? "Alto" : (proj.riskLevel || "Bajo"),
      };
    });

    // Sort projects strictly by totalScore descending to establish rank snapshot
    const sortedByScore = withScores.sort((a, b) => {
      const scoreA = a.score?.totalScore ?? 0;
      const scoreB = b.score?.totalScore ?? 0;
      return scoreB - scoreA;
    });

    // Add rankPosition
    return sortedByScore.map((proj, idx) => ({
      ...proj,
      currentRank: idx + 1,
    }));
  }, [rankingProjects]);

  // Apply filters and search
  const processedProjects = useMemo(() => {
    let result = [...rankedProjects];

    // Search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.initiativeName.toLowerCase().includes(term) ||
          p.area.toLowerCase().includes(term) ||
          p.processOwner.toLowerCase().includes(term) ||
          (p.sponsor && p.sponsor.toLowerCase().includes(term)) ||
          (p.answers?.sponsor && p.answers.sponsor.toLowerCase().includes(term))
      );
    }

    // Area
    if (selectedArea !== "Todos") {
      result = result.filter((p) => p.area === selectedArea);
    }

    // Sponsor
    if (selectedSponsor !== "Todos") {
      result = result.filter((p) => (p.sponsor || p.answers?.sponsor) === selectedSponsor);
    }

    // Category
    if (selectedCategory !== "Todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Status
    if (selectedStatus !== "Todos") {
      result = result.filter((p) => p.status === selectedStatus);
    }

    // Risk
    if (selectedRisk !== "Todos") {
      result = result.filter((p) => p.riskLevel === selectedRisk);
    }

    // Column sort
    result.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortColumn === "rank") {
        valA = a.currentRank;
        valB = b.currentRank;
      } else if (sortColumn === "totalScore") {
        valA = a.score?.totalScore ?? 0;
        valB = b.score?.totalScore ?? 0;
      } else if (sortColumn === "importanceScore") {
        valA = a.score?.importanceScore ?? 0;
        valB = b.score?.importanceScore ?? 0;
      } else if (sortColumn === "viabilityScore") {
        valA = a.score?.viabilityScore ?? 0;
        valB = b.score?.viabilityScore ?? 0;
      } else if (sortColumn === "easeScore") {
        valA = a.score?.easeScore ?? 0;
        valB = b.score?.easeScore ?? 0;
      }

      if (sortDirection === "asc") {
        return valA - valB;
      } else {
        return valB - valA;
      }
    });

    return result;
  }, [rankedProjects, searchTerm, selectedArea, selectedSponsor, selectedCategory, selectedStatus, selectedRisk, sortColumn, sortDirection]);

  // Filter options lists
  const areasList = useMemo(() => {
    const s = new Set<string>();
    rankedProjects.forEach((p) => {
      if (p.area) s.add(p.area);
    });
    return ["Todos", ...Array.from(s).sort()];
  }, [rankedProjects]);

  const sponsorsList = useMemo(() => {
    const s = new Set<string>();
    rankedProjects.forEach((p) => {
      const sp = p.sponsor || p.answers?.sponsor;
      if (sp && sp.trim()) {
        s.add(sp.trim());
      }
    });
    return ["Todos", ...Array.from(s).sort()];
  }, [rankedProjects]);

  const categoriesList = [
    "Todos",
    "Quick Win",
    "Piloto de aprendizaje",
    "Proyecto estratégico",
    "Preparar antes de implementar",
    "Requiere revisión especializada",
    "Mantener en backlog",
  ];

  const statusesList: (ProjectStatus | "Todos")[] = [
    "Todos",
    "Borrador",
    "Enviado",
    "Pendiente de análisis de IA",
    "Analizado por IA",
    "Pendiente de revisión",
    "Información adicional requerida",
    "Priorizado",
    "Aprobado para piloto",
    "En piloto",
    "Implementado",
    "En backlog",
    "Rechazado",
    "Archivado",
  ];

  // Traffic light scores helper
  const getTrafficLight = (score: number) => {
    if (score >= 70) {
      return {
        bg: "bg-emerald-950/40 text-emerald-400 border-emerald-900/30",
        dot: "bg-emerald-500",
        label: "Prioridad Alta",
      };
    } else if (score >= 40) {
      return {
        bg: "bg-amber-950/40 text-amber-400 border-amber-900/30",
        dot: "bg-amber-500",
        label: "Prioridad Media",
      };
    } else {
      return {
        bg: "bg-rose-950/40 text-rose-400 border-rose-900/30",
        dot: "bg-rose-500",
        label: "Prioridad Baja",
      };
    }
  };

  const toggleSort = (col: typeof sortColumn) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDirection("desc");
    }
  };

  // Why position explanation trigger
  const handleOpenWhyModal = async (project: Project, rankPos: number) => {
    setSelectedWhyProject(project);
    setWhyLoading(true);
    setWhyDetails(null);
    setWhyError("");

    // Identify next and prev project names
    const nextProj = rankedProjects.find((p) => p.currentRank === rankPos - 1);
    const prevProj = rankedProjects.find((p) => p.currentRank === rankPos + 1);

    try {
      const response = await onWhyPositionRequested(
        project,
        rankPos,
        rankedProjects.length,
        nextProj?.initiativeName,
        prevProj?.initiativeName
      );
      setWhyDetails(response);
    } catch (err: any) {
      console.error(err);
      setWhyError(err.message || "No se pudo obtener la explicación del ranking.");
    } finally {
      setWhyLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-zinc-950 min-h-screen text-zinc-200">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
            Ranking<span className="text-blue-500 font-normal">.de.Proyectos</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
            Tabla consolidada ordenada matemáticamente por el puntaje total (Importancia 40%, Viabilidad 35%, Facilidad 25%).
          </p>
        </div>

        {onImportRealProjects && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-500/20 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Cargar Proyectos Reales (Excel / CSV)</span>
            </button>
          </div>
        )}

        {exportSuccessMsg && (
          <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs font-semibold text-emerald-300 flex items-center justify-between gap-3 animate-fade-in shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{exportSuccessMsg}</span>
            </div>
            <button
              onClick={() => setExportSuccessMsg(null)}
              className="text-emerald-400 hover:text-white text-xs px-2 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Filters and search box */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por iniciativa, área, sponsor o solicitante..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Area */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span>Área:</span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-2.5 py-1.5 border border-zinc-800 bg-zinc-950 text-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[160px] truncate"
              >
                {areasList.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Sponsor */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span>Sponsor:</span>
              <select
                value={selectedSponsor}
                onChange={(e) => setSelectedSponsor(e.target.value)}
                className="px-2.5 py-1.5 border border-zinc-800 bg-zinc-950 text-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[180px] truncate"
              >
                {sponsorsList.map((sp) => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span>Categoría:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 border border-zinc-800 bg-zinc-950 text-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {categoriesList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span>Estado:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2.5 py-1.5 border border-zinc-800 bg-zinc-950 text-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {statusesList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-xl overflow-hidden">
        {processedProjects.length === 0 ? (
          <p className="text-center text-xs text-zinc-500 py-16 bg-zinc-950/40 uppercase tracking-widest font-mono">
            Ninguna iniciativa registrada coincide con los filtros especificados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-800">
                  <th className="p-4 w-16 text-center text-[10px]">
                    <button onClick={() => toggleSort("rank")} className="flex items-center gap-1 justify-center w-full cursor-pointer font-black">
                      POS <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                    </button>
                  </th>
                  <th className="p-4 min-w-[180px] text-[10px]">Iniciativa</th>
                  <th className="p-4 w-32 text-[10px]">Área</th>
                  <th className="p-4 w-24 text-center text-[10px]">Importancia</th>
                  <th className="p-4 w-24 text-center text-[10px]">Viabilidad</th>
                  <th className="p-4 w-24 text-center text-[10px]">Facilidad</th>
                  <th className="p-4 w-24 text-center text-[10px]">
                    <button onClick={() => toggleSort("totalScore")} className="flex items-center gap-1 justify-center w-full cursor-pointer text-blue-500 font-black">
                      TOTAL <ArrowUpDown className="w-3 h-3 text-blue-500" />
                    </button>
                  </th>
                  <th className="p-4 min-w-[140px] text-[10px]">Categoría</th>
                  <th className="p-4 min-w-[150px] text-[10px]">KPIs de Éxito (Meta IA)</th>
                  <th className="p-4 min-w-[190px] text-center text-[10px]">Acciones / Exportar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-semibold text-zinc-300">
                {processedProjects.map((p) => {
                  const scoreObj = p.score;
                  const total = scoreObj?.totalScore ?? p.currentRank ?? 0;
                  const traffic = getTrafficLight(total);
                  const projKPIs = calculateProjectKPIs(p);
                  const topKPI = projKPIs[0];

                  return (
                    <tr key={p.id} className="hover:bg-zinc-950/40 transition-all">
                      <td className="p-4 font-black text-center text-white text-sm italic">
                        #{p.currentRank}
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="font-bold text-white line-clamp-1">{p.initiativeName}</p>
                          <p className="text-[10px] text-zinc-500 font-mono" title="Correo Solicitante que ingresó el formulario">
                            Ingresó: {p.answers?.processOwner || p.requesterEmail}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-zinc-400">
                        <p className="line-clamp-1">{p.area}</p>
                        {(p.sponsor || p.answers?.sponsor) && (
                          <p className="text-[10px] text-zinc-500 font-mono line-clamp-1" title={p.sponsor || p.answers?.sponsor}>
                            Sponsor: {p.sponsor || p.answers?.sponsor}
                          </p>
                        )}
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-zinc-300">
                        {scoreObj?.importanceScore ?? 0}
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-zinc-300">
                        {scoreObj?.viabilityScore ?? 0}
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-zinc-300">
                        {scoreObj?.easeScore ?? 0}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-black text-[10px] leading-none ${traffic.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${traffic.dot}`} />
                          {total}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          p.category === "Quick Win"
                            ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                            : p.category === "Proyecto estratégico"
                            ? "bg-indigo-950/40 text-indigo-400 border-indigo-900/40"
                            : p.category === "Requiere revisión especializada"
                            ? "bg-rose-950/40 text-rose-400 border-rose-900/40"
                            : "bg-zinc-950 text-zinc-500 border-zinc-800"
                        }`}>
                          {p.category || "No calculada"}
                        </span>
                      </td>
                      <td className="p-4">
                        {topKPI ? (
                          <div className="flex flex-col gap-1">
                            <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono font-extrabold text-[10px] rounded-md inline-block w-fit">
                              {topKPI.targetNumeric}
                            </span>
                            <span className="text-[10px] text-zinc-400 truncate max-w-[150px]" title={topKPI.indicator}>
                              {topKPI.indicator}
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-600 text-[10px]">Sin calcular</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleExportDocx(p)}
                            disabled={exportingId === p.id}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/50 hover:border-blue-600/60 text-blue-300 hover:text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm disabled:opacity-50"
                            title="Exportar a archivo de Word (.docx) estructurado"
                          >
                            <FileDown className={`w-3.5 h-3.5 text-blue-400 shrink-0 ${exportingId === p.id ? "animate-bounce" : ""}`} />
                            <span>{exportingId === p.id ? "Generando..." : "Word"}</span>
                          </button>
                          <button
                            onClick={() => handleOpenWhyModal(p, p.currentRank)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer hover:border-zinc-700 shadow-sm"
                          >
                            <HelpCircle className="w-3 h-3 text-blue-500 shrink-0" />
                            ¿Por qué?
                          </button>
                          <button
                            onClick={() => onSelectProject(p.id)}
                            className="p-1.5 text-zinc-500 hover:text-white cursor-pointer hover:bg-zinc-950 border border-transparent hover:border-zinc-800 rounded-lg"
                            title="Ver Ficha de Proyecto"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          {onDeleteProject && (
                            <button
                              onClick={() => setDeletingProject(p)}
                              className="p-1.5 text-rose-500 hover:text-rose-400 cursor-pointer hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 rounded-lg transition-all"
                              title="Eliminar Formulario / Iniciativa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* WHY POSITION MODAL PANEL Section 20 */}
      {selectedWhyProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-end z-50">
          <div className="w-full max-w-lg bg-zinc-900 border-l border-zinc-800 h-screen shadow-2xl p-6 overflow-y-auto flex flex-col justify-between transition-colors">
            
            <div className="space-y-6">
              {/* Header modal */}
              <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block font-mono">
                    Análisis de Posición en el Radar
                  </span>
                  <h3 className="text-lg font-black text-white uppercase italic mt-1">
                    {selectedWhyProject.initiativeName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedWhyProject(null)}
                  className="p-1.5 rounded-lg hover:bg-zinc-950 border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {whyLoading && (
                <div className="py-24 text-center space-y-4">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Gemini está calculando la explicación del ranking...</p>
                </div>
              )}

              {whyError && (
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/30 text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{whyError}</span>
                </div>
              )}

              {whyDetails && (
                <div className="space-y-5 text-xs text-zinc-400 leading-relaxed">
                  
                  {/* Position stats */}
                  <div className="grid grid-cols-4 gap-3 text-center bg-zinc-950 p-4 border border-zinc-800 rounded-xl font-mono">
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase font-bold block">POS</span>
                      <span className="text-sm font-black text-blue-400 italic">#{whyDetails.posicionActual}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase font-bold block">TOTAL</span>
                      <span className="text-sm font-bold text-white">{selectedWhyProject.score?.totalScore}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase font-bold block">IMP</span>
                      <span className="text-sm font-bold text-zinc-300">{selectedWhyProject.score?.importanceScore}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase font-bold block">VIA/FAC</span>
                      <span className="text-sm font-bold text-zinc-300">{selectedWhyProject.score?.viabilityScore}/{selectedWhyProject.score?.easeScore}</span>
                    </div>
                  </div>

                  {/* General Explanation */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-zinc-500 uppercase text-[9px] tracking-widest font-mono block">
                      Explicación del Ranking
                    </span>
                    <p className="bg-blue-950/10 p-4 border border-blue-900/30 rounded-xl leading-relaxed text-zinc-300">
                      {whyDetails.explicacionGeneral}
                    </p>
                  </div>

                  {/* Positive/Negative factors */}
                  <div className="grid grid-cols-1 gap-4 pt-1">
                    <div className="space-y-2">
                      <span className="font-bold text-emerald-400 uppercase text-[9px] tracking-widest font-mono block">
                        Factores a Favor (Elevan Puntaje)
                      </span>
                      <div className="space-y-1.5">
                        {whyDetails.factoresPositivos?.map((item: string, idx: number) => (
                          <div key={idx} className="flex gap-2 items-start text-xs text-zinc-300">
                            <span className="text-emerald-400 font-extrabold shrink-0">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="font-bold text-rose-400 uppercase text-[9px] tracking-widest font-mono block">
                        Limitaciones (Restan Puntaje)
                      </span>
                      <div className="space-y-1.5">
                        {whyDetails.factoresNegativos?.map((item: string, idx: number) => (
                          <div key={idx} className="flex gap-2 items-start text-xs text-zinc-300">
                            <span className="text-rose-400 font-extrabold shrink-0">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Comparative Analysis */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                    <span className="font-bold text-zinc-500 uppercase text-[9px] tracking-widest font-mono block">
                      Análisis Comparativo del Cuadrante
                    </span>
                    <p className="text-xs leading-relaxed text-zinc-400 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                      {whyDetails.analisisComparativo}
                    </p>
                  </div>

                  {/* Actions for improvement Section 20 */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <span className="font-bold text-blue-400 uppercase text-[9px] tracking-widest font-mono block">
                      Acciones para Elevar la Viabilidad y Facilidad
                    </span>
                    <div className="space-y-1.5 bg-zinc-950 p-4 rounded-xl border border-dashed border-zinc-800">
                      {whyDetails.accionesParaMejorar?.map((item: string, idx: number) => (
                        <div key={idx} className="flex gap-2 items-start text-xs text-zinc-300">
                          <span className="text-blue-400 font-bold shrink-0">{idx+1}.</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPIs de Éxito */}
                  {selectedWhyProject && (
                    <div className="space-y-2 pt-3 border-t border-zinc-800">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-emerald-400 uppercase text-[9px] tracking-widest font-mono flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
                          KPIs de Éxito Calculados por IA
                        </span>
                        <button
                          onClick={() => {
                            const projId = selectedWhyProject.id;
                            setSelectedWhyProject(null);
                            onSelectProject(projId);
                          }}
                          className="text-[10px] font-bold text-blue-400 hover:underline uppercase tracking-wider cursor-pointer"
                        >
                          Ver Ficha Técnica Completa →
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {calculateProjectKPIs(selectedWhyProject).slice(0, 4).map((kpi) => (
                          <div key={kpi.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                            <div className="flex justify-between items-start gap-1">
                              <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase">{kpi.category}</span>
                              <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono font-black text-[9px] rounded">
                                {kpi.targetNumeric}
                              </span>
                            </div>
                            <p className="text-[11px] font-bold text-zinc-200 line-clamp-1">{kpi.indicator}</p>
                            <p className="text-[10px] text-zinc-400 font-mono italic">{kpi.targetValue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tecnologías Aplicables */}
                  {selectedWhyProject && (
                    <div className="space-y-2 pt-3 border-t border-zinc-800">
                      <span className="font-bold text-purple-400 uppercase text-[9px] tracking-widest font-mono flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        Tecnologías / Soluciones Aplicables
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {classifyProjectTechnologies(selectedWhyProject).map((tech) => (
                          <span
                            key={tech.name}
                            className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold flex items-center gap-1 ${
                              tech.applied
                                ? tech.badgeColor
                                : "border-zinc-800 bg-zinc-950 text-zinc-600 line-through opacity-50"
                            }`}
                          >
                            {tech.applied ? "✓" : "✕"} {tech.name}
                            {tech.name === "Otras" && tech.applied && tech.detailsIfOther && (
                              <span className="text-[9px] font-normal text-pink-300"> ({tech.detailsIfOther})</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer close */}
            <div className="pt-4 border-t border-zinc-800">
              <button
                onClick={() => setSelectedWhyProject(null)}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer text-center"
              >
                Cerrar Análisis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      {deletingProject && (
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
                  Está a punto de eliminar el formulario/iniciativa{" "}
                  <strong className="text-white">"{deletingProject.initiativeName}"</strong>.
                  Esta acción eliminará permanentemente la iniciativa del ranking y de la base de datos.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setDeletingProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAndDelete}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-rose-600/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Real Data Modal */}
      {onImportRealProjects && onClearAllProjects && (
        <ImportRealDataModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImportComplete={onImportRealProjects}
          onClearAll={onClearAllProjects}
          totalCurrentProjects={projects.length}
          userEmail={userEmail}
        />
      )}
    </div>
  );
}
