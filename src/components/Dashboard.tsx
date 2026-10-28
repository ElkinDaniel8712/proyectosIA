import React, { useState, useMemo } from "react";
import { Project, ProjectStatus, FormAnswers } from "../types";
import { calculateProjectScore } from "../scoring";
import {
  FileText,
  Clock,
  CheckCircle,
  Zap,
  TrendingUp,
  AlertTriangle,
  PlayCircle,
  Filter,
  RefreshCw,
} from "lucide-react";

interface DashboardProps {
  projects: Project[];
  onSelectProject?: (projectId: string) => void;
}

export default function Dashboard({ projects, onSelectProject }: DashboardProps) {
  // Filters state
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedSponsor, setSelectedSponsor] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [selectedSolution, setSelectedSolution] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedRisk, setSelectedRisk] = useState("Todos");

  // Reset filters
  const resetFilters = () => {
    setSelectedArea("Todos");
    setSelectedSponsor("Todos");
    setSelectedStatus("Todos");
    setSelectedSolution("Todos");
    setSelectedCategory("Todos");
    setSelectedRisk("Todos");
  };

  // Normalize projects to ensure area, score, category, solution type, and risk level are populated
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
      const area = p.area || answers.area || "General / Otras";

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

      // Risk level
      const rawRisk = p.riskLevel || p.analysis?.structuredAnalysis?.nivelRiesgo;
      const riskLevel =
        rawRisk
          ? rawRisk.toLowerCase()
          : activeScore.restrictions && activeScore.restrictions.length > 0
          ? "alto"
          : "bajo";

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
        area,
        score: activeScore,
        category,
        riskLevel,
        recommendedSolutionType,
      };
    });
  }, [projects]);

  // Get filter options dynamically
  const areas = useMemo(() => {
    const list = new Set<string>();
    normalizedProjects.forEach((p) => {
      if (p.area) list.add(p.area);
    });
    return ["Todos", ...Array.from(list)];
  }, [normalizedProjects]);

  const statuses: (ProjectStatus | "Todos")[] = [
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

  const solutions = [
    "Todos",
    "automatizacion_tradicional",
    "flujo_trabajo",
    "asistente_ia",
    "agente_con_aprobacion",
    "agente_parcialmente_autonomo",
    "agente_autonomo",
    "mejora_proceso",
  ];

  const categories = [
    "Todos",
    "Quick Win",
    "Piloto de aprendizaje",
    "Proyecto estratégico",
    "Preparar antes de implementar",
    "Requiere revisión especializada",
    "Mantener en backlog",
  ];

  const risks = ["Todos", "bajo", "medio", "alto", "critico"];

  const sponsors = useMemo(() => {
    const list = normalizedProjects.map((p) => p.sponsor || p.answers?.sponsor).filter(Boolean);
    return ["Todos", ...Array.from(new Set(list)).sort()];
  }, [normalizedProjects]);

  // Apply filters
  const filteredProjects = useMemo(() => {
    return normalizedProjects.filter((p) => {
      if (selectedArea !== "Todos" && p.area !== selectedArea) return false;
      if (selectedSponsor !== "Todos" && (p.sponsor || p.answers?.sponsor) !== selectedSponsor) return false;
      if (selectedStatus !== "Todos" && p.status !== selectedStatus) return false;
      if (selectedSolution !== "Todos" && p.recommendedSolutionType !== selectedSolution) return false;
      if (selectedCategory !== "Todos" && p.category !== selectedCategory) return false;
      if (selectedRisk !== "Todos" && p.riskLevel !== selectedRisk) return false;
      return true;
    });
  }, [normalizedProjects, selectedArea, selectedSponsor, selectedStatus, selectedSolution, selectedCategory, selectedRisk]);

  // Compute stats
  const stats = useMemo(() => {
    const total = filteredProjects.length;
    let draft = 0;
    let pendingAI = 0;
    let analyzed = 0;
    let quickWin = 0;
    let highImpact = 0; // Importance >= 70
    let highRisk = 0; // riskLevel === alto or critico
    let approvedPilot = 0;

    filteredProjects.forEach((p) => {
      if (p.status === "Borrador") draft++;
      if (p.status === "Pendiente de análisis de IA" || p.status === "Enviado") pendingAI++;
      if (p.status === "Analizado por IA" || p.status === "Priorizado" || p.status === "Aprobado para piloto" || p.status === "En piloto") analyzed++;
      if (p.category === "Quick Win") quickWin++;
      if (p.status === "Aprobado para piloto" || p.status === "En piloto" || p.status === "Implementado") approvedPilot++;
      
      // We check for high risk
      if (p.riskLevel === "alto" || p.riskLevel === "critico") highRisk++;
    });

    // High Impact: let's calculate based on importance score
    // Since we save it in firestore and have it on the project
    // Let's count projects with totalScore or importanceScore >= 70 (or high impact in answers)
    // Wait, let's count projects where category is 'Proyecto estratégico' or importanceScore >= 70
    const strategic = filteredProjects.filter(p => p.category === "Proyecto estratégico").length;

    // Area distribution
    const areaCounts: Record<string, number> = {};
    filteredProjects.forEach((p) => {
      areaCounts[p.area] = (areaCounts[p.area] || 0) + 1;
    });
    const sortedAreas = Object.entries(areaCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Status distribution
    const statusCounts: Record<string, number> = {};
    filteredProjects.forEach((p) => {
      statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
    });

    // Solution recommended distribution
    const solutionCounts: Record<string, number> = {};
    filteredProjects.forEach((p) => {
      if (p.recommendedSolutionType) {
        solutionCounts[p.recommendedSolutionType] = (solutionCounts[p.recommendedSolutionType] || 0) + 1;
      }
    });

    // Category distribution
    const categoryCounts: Record<string, number> = {};
    filteredProjects.forEach((p) => {
      if (p.category) {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      }
    });

    // Risk level distribution
    const riskCounts: Record<string, number> = {};
    filteredProjects.forEach((p) => {
      if (p.riskLevel) {
        riskCounts[p.riskLevel] = (riskCounts[p.riskLevel] || 0) + 1;
      }
    });

    return {
      total,
      draft,
      pendingAI,
      analyzed,
      quickWin,
      highImpact: strategic,
      highRisk,
      approvedPilot,
      sortedAreas,
      statusCounts,
      solutionCounts,
      categoryCounts,
      riskCounts,
    };
  }, [filteredProjects]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-zinc-950 min-h-screen text-zinc-200">
      {/* Dashboard Header */}
      <header className="flex justify-between items-end border-b border-zinc-800 pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
            Radar<span className="text-blue-500 font-normal">.IA</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-1">
            Universal Operations Interface // v1.0
          </p>
        </div>
        <div className="flex gap-8 text-right">
          <div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Latency</p>
            <p className="text-xl font-mono text-emerald-400">14ms</p>
          </div>
          <div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Iniciativas</p>
            <p className="text-xl font-mono text-white">{stats.total}</p>
          </div>
        </div>
      </header>

      {/* Filters bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[1.5rem] p-4 flex flex-wrap gap-4 items-center mb-6 shadow-xl">
        <div className="flex items-center gap-2 text-zinc-400 mr-2">
          <Filter className="w-4 h-4 text-blue-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Filtros:</span>
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1 min-w-[140px]">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Área</span>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Sponsor */}
        <div className="flex flex-col gap-1 min-w-[140px]">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Sponsor</span>
          <select
            value={selectedSponsor}
            onChange={(e) => setSelectedSponsor(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[180px] truncate"
          >
            {sponsors.map((sp) => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 min-w-[140px]">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Estado</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Recommended Solution */}
        <div className="flex flex-col gap-1 min-w-[160px]">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Tipo Solución</span>
          <select
            value={selectedSolution}
            onChange={(e) => setSelectedSolution(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {solutions.map((s) => (
              <option key={s} value={s}>
                {s === "Todos" ? "Todos" : s.replace(/_/g, " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Prioritization Category */}
        <div className="flex flex-col gap-1 min-w-[160px]">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Categoría</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col gap-1 min-w-[110px]">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Riesgo</span>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {risks.map((r) => (
              <option key={r} value={r}>
                {r === "Todos" ? "Todos" : r.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Reset btn */}
        <div className="flex items-end h-full pt-4 ml-auto">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-zinc-200 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-all cursor-pointer shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Card 1: Primary Focus: Resumen de Oportunidades (col-span-4) */}
        <div className="col-span-12 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-[10px] font-bold uppercase tracking-tighter text-zinc-300">
                Estado General
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <h2 className="text-6xl font-light text-white mt-6 font-mono">
              {stats.total}
              <span className="text-xl text-emerald-400 font-bold ml-2">Total</span>
            </h2>
            <p className="text-zinc-500 text-xs mt-2 font-medium uppercase tracking-wider">
              Oportunidades de IA Registradas
            </p>
          </div>
          <div className="space-y-3 pt-6 border-t border-zinc-800/80 mt-6">
            <div className="flex justify-between text-xs items-center">
              <span className="text-zinc-400 font-medium">Borradores guardados</span>
              <span className="font-mono text-white font-bold bg-zinc-800 px-2 py-0.5 rounded-md">{stats.draft}</span>
            </div>
            <div className="flex justify-between text-xs items-center">
              <span className="text-zinc-400 font-medium">Pendientes de análisis IA</span>
              <span className="font-mono text-amber-400 font-bold bg-amber-950/40 border border-amber-900/40 px-2 py-0.5 rounded-md">{stats.pendingAI}</span>
            </div>
            <div className="flex justify-between text-xs items-center">
              <span className="text-zinc-400 font-medium">Analizados por la IA</span>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded-md">{stats.analyzed}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Environmental Focus: Quick Wins (col-span-5, contrasting light bg) */}
        <div className="col-span-12 md:col-span-5 bg-zinc-100 rounded-[2.5rem] p-8 flex flex-col justify-between text-zinc-950 shadow-xl">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Optimización de Retorno</p>
            <h3 className="text-5xl font-extrabold tracking-tighter text-zinc-900 font-mono mt-1">
              {stats.quickWin} Quick Wins
            </h3>
            <p className="text-xs font-semibold text-zinc-600 mt-2 leading-relaxed">
              Iniciativas de alto impacto comercial y de muy fácil implementación listas para su despliegue en pilotos ágiles.
            </p>
          </div>
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-zinc-200">
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Tipo Priorización</span>
            <span className="px-3 py-1 bg-zinc-950 text-white rounded-full text-[10px] font-bold uppercase tracking-tight font-mono">
              ★ ALTO VALOR & FÁCIL
            </span>
          </div>
        </div>

        {/* Card 3: Active Node Focus: Pilotos & Riesgo (col-span-3, primary solid colored) */}
        <div className="col-span-12 md:col-span-3 bg-blue-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl">
          <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Pilotos y Gobernanza</div>
          <div className="space-y-1">
            <div className="text-6xl font-black tracking-tighter font-mono">{stats.approvedPilot}</div>
            <p className="text-xs font-bold">Iniciativas en Piloto</p>
          </div>
          <div className="text-[11px] font-medium bg-blue-500/50 self-start px-3 py-1 rounded-full border border-blue-400/20">
            Alerta: {stats.highRisk} de Alto Riesgo
          </div>
        </div>

        {/* Card 4: Deep Insight: Matriz de Priorización (col-span-12 md:col-span-7) */}
        <div className="col-span-12 md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Matriz de Priorización
                </h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Ubicación cuadrante (Importancia vs. Facilidad)</p>
              </div>
              <span className="px-2.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded-lg text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Scatter Plot Map
              </span>
            </div>
          </div>

          <div className="relative border border-zinc-800 bg-zinc-950/70 rounded-2xl h-80 p-6 mt-4 flex flex-col justify-between overflow-hidden">
            {/* Quadrant lines and labels */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-dashed border-zinc-800/60">
              {/* Top Left Quadrant */}
              <div className="relative border-r border-b border-dashed border-zinc-800/60 flex items-start justify-start p-2">
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                  ESTRATÉGICOS (DIFÍCIL / ALTO VALOR)
                </span>
              </div>
              {/* Top Right Quadrant */}
              <div className="relative border-b border-dashed border-zinc-800/60 flex items-start justify-end p-2 text-right">
                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">
                  QUICK WINS (FÁCIL / ALTO VALOR)
                </span>
              </div>
              {/* Bottom Left Quadrant */}
              <div className="relative border-r border-dashed border-zinc-800/60 flex items-end justify-start p-2">
                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                  BACKLOG (DIFÍCIL / BAJO VALOR)
                </span>
              </div>
              {/* Bottom Right Quadrant */}
              <div className="relative flex items-end justify-end p-2 text-right">
                <span className="text-[8px] font-bold text-sky-500 uppercase tracking-widest">
                  PILOTOS APRENDIZAJE (FÁCIL / BAJO VALOR)
                </span>
              </div>
            </div>

            {/* Axes labels */}
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
              Importancia (Eje Y) ➜
            </div>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
              Facilidad (Eje X) ➜
            </div>

            {/* Plot elements */}
            <div className="relative w-full h-full z-10">
              {filteredProjects
                .filter((p) => p.score && p.score.importanceScore !== undefined && p.score.easeScore !== undefined)
                .map((p) => {
                  const yPos = 100 - (p.score?.importanceScore ?? 0); // Importance score
                  const xPos = p.score?.easeScore ?? 0; // Ease score
                  
                  // Color node by category
                  let colorClass = "bg-zinc-500 border-zinc-600";
                  if (p.category === "Quick Win") colorClass = "bg-emerald-500 border-emerald-400 shadow-emerald-500/10";
                  else if (p.category === "Piloto de aprendizaje") colorClass = "bg-sky-500 border-sky-400 shadow-sky-500/10";
                  else if (p.category === "Proyecto estratégico") colorClass = "bg-indigo-500 border-indigo-400 shadow-indigo-500/10";
                  else if (p.category === "Preparar antes de implementar") colorClass = "bg-amber-500 border-amber-400 shadow-amber-500/10";
                  else if (p.category === "Requiere revisión especializada") colorClass = "bg-rose-500 border-rose-400 shadow-rose-500/10";

                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectProject && onSelectProject(p.id)}
                      className={`absolute w-5 h-5 rounded-full border-2 text-white flex items-center justify-center font-bold text-[9px] cursor-pointer hover:scale-125 hover:z-20 shadow-md transition-all ${colorClass}`}
                      style={{
                        top: `${yPos}%`,
                        left: `${xPos}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      title={`${p.initiativeName} (Imp: ${p.score?.importanceScore}, Fac: ${p.score?.easeScore})`}
                    >
                      {p.currentRank || "•"}
                    </button>
                  );
                })}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center pt-4 text-[9px] text-zinc-400 font-bold uppercase tracking-wide">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Quick Win</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Proyecto Estratégico</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Piloto Aprendizaje</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Preparar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Revisión Especializada</span>
            </div>
          </div>
        </div>

        {/* Card 5: Operational Focus: Distribución por Áreas (col-span-12 md:col-span-5) */}
        <div className="col-span-12 md:col-span-5 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Iniciativas por Área (Top 5)
            </h4>
            <p className="text-xs text-zinc-500 mt-1">Sectores y áreas de negocio con mayor actividad de radicación.</p>
          </div>

          <div className="space-y-4 pt-4 flex-grow flex flex-col justify-center">
            {stats.sortedAreas.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-8">Sin datos para graficar</p>
            ) : (
              stats.sortedAreas.map(([area, count]) => {
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={area} className="space-y-1 bg-zinc-950/40 p-3.5 border border-zinc-800/40 rounded-2xl">
                    <div className="flex justify-between text-xs font-bold text-zinc-300">
                      <span className="truncate max-w-[200px]">{area}</span>
                      <span className="font-mono text-blue-400">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden mt-1.5">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Card 6: Risk Level Distribution (col-span-12 md:col-span-4) */}
        <div className="col-span-12 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-zinc-800 pb-3">
              Análisis de Riesgo Operativo
            </h4>
          </div>

          <div className="space-y-4 pt-4 my-2">
            {["critico", "alto", "medio", "bajo"].map((risk) => {
              const count = stats.riskCounts[risk] || 0;
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
              let colorClass = "bg-green-500";
              let textCol = "text-green-400";
              if (risk === "critico") { colorClass = "bg-rose-600"; textCol = "text-rose-500"; }
              else if (risk === "alto") { colorClass = "bg-rose-500"; textCol = "text-rose-400"; }
              else if (risk === "medio") { colorClass = "bg-amber-500"; textCol = "text-amber-400"; }

              return (
                <div key={risk} className="flex items-center justify-between text-xs">
                  <span className={`uppercase font-bold tracking-widest shrink-0 w-16 text-[9px] ${textCol}`}>
                    {risk === "critico" ? "Crítico" : risk}
                  </span>
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                      <div
                        className={`${colorClass} h-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-zinc-300 w-6 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-[9px] text-zinc-500 uppercase tracking-widest text-center border-t border-zinc-800/80">
            Categorizado por el motor de IA
          </div>
        </div>

        {/* Card 7: Technical breakdown: Soluciones Recomendadas (col-span-12 md:col-span-4) */}
        <div className="col-span-12 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-zinc-800 pb-3">
              Solución Recomendada por IA
            </h4>
          </div>

          <div className="space-y-3.5 pt-4 flex-grow overflow-y-auto max-h-[160px] pr-1">
            {Object.keys(stats.solutionCounts).length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-8">Sin datos</p>
            ) : (
              Object.entries(stats.solutionCounts).map(([sol, count]) => {
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={sol} className="flex items-center justify-between gap-4 text-xs">
                    <span className="text-zinc-400 capitalize truncate font-semibold text-[11px]">
                      {sol.replace(/_/g, " ")}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-16 bg-zinc-950 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-zinc-300 w-5 text-right text-[11px]">
                        {count}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-2 text-[9px] text-zinc-500 uppercase tracking-widest text-center border-t border-zinc-800/80">
            Arquitectura de solución sugerida
          </div>
        </div>

        {/* Card 8: Operational progress: Distribución por Categorías (col-span-12 md:col-span-4) */}
        <div className="col-span-12 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-zinc-800 pb-3">
              Clasificación Estratégica
            </h4>
          </div>

          <div className="space-y-3 pt-4 flex-grow overflow-y-auto max-h-[160px] pr-1">
            {Object.keys(stats.categoryCounts).length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-8">Sin datos</p>
            ) : (
              Object.entries(stats.categoryCounts).map(([cat, count]) => {
                let dotCol = "bg-zinc-500";
                if (cat === "Quick Win") dotCol = "bg-emerald-500";
                else if (cat === "Piloto de aprendizaje") dotCol = "bg-sky-500";
                else if (cat === "Proyecto estratégico") dotCol = "bg-indigo-500";
                else if (cat === "Preparar antes de implementar") dotCol = "bg-amber-500";
                else if (cat === "Requiere revisión especializada") dotCol = "bg-rose-500";

                return (
                  <div key={cat} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${dotCol}`} />
                      <span className="text-zinc-400 text-[11px] font-semibold truncate">{cat}</span>
                    </div>
                    <span className="font-mono font-bold text-zinc-300 shrink-0">{count}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-2 text-[9px] text-zinc-500 uppercase tracking-widest text-center border-t border-zinc-800/80">
            Ejes prioritarios del radar
          </div>
        </div>

      </div>
    </div>
  );
}
