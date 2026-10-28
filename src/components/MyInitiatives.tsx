import React, { useState } from "react";
import { Project, ProjectStatus } from "../types";
import {
  FileText,
  Clock,
  Eye,
  Edit3,
  Calendar,
  AlertTriangle,
  Compass,
  Trash2,
} from "lucide-react";

interface MyInitiativesProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onEditDraft?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

export default function MyInitiatives({
  projects,
  onSelectProject,
  onEditDraft,
  onDeleteProject,
}: MyInitiativesProps) {
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
  // Status badge colors
  const getStatusBadge = (status: ProjectStatus) => {
    let color = "bg-zinc-800 text-zinc-300 border-zinc-700";
    if (status === "Borrador") color = "bg-zinc-800 text-zinc-300 border-zinc-700";
    else if (status === "Enviado") color = "bg-blue-950/40 text-blue-400 border-blue-900/40";
    else if (status === "Pendiente de análisis de IA") color = "bg-amber-950/40 text-amber-400 border-amber-900/40 animate-pulse";
    else if (status === "Analizado por IA") color = "bg-emerald-950/40 text-emerald-400 border-emerald-900/40";
    else if (status === "Priorizado" || status === "Aprobado para piloto") color = "bg-indigo-950/40 text-indigo-400 border-indigo-900/40";
    else if (status === "En piloto") color = "bg-sky-950/40 text-sky-400 border-sky-900/40";
    else if (status === "Implementado") color = "bg-emerald-950/40 text-emerald-300 border-emerald-900/30";
    else if (status === "Rechazado") color = "bg-rose-950/40 text-rose-400 border-rose-900/40";
    else if (status === "En backlog") color = "bg-zinc-950 text-zinc-500 border-zinc-800";

    return (
      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-zinc-950 min-h-screen text-zinc-200">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5 mb-6">
        <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
          Mis<span className="text-blue-500 font-normal">.Iniciativas</span>
        </h1>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
          Consulte el estado, los análisis de IA y la trazabilidad de las iniciativas que ha registrado.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-zinc-900 border border-dashed border-zinc-800 rounded-[2rem] text-center p-6 shadow-xl">
          <div className="p-4 rounded-full bg-zinc-950 text-zinc-600 mb-4 border border-zinc-800">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Aún no tienes iniciativas registradas</h3>
          <p className="text-xs text-zinc-500 mt-1.5 max-w-sm">
            Vaya a la opción "Nueva iniciativa" para empezar a registrar dolores de procesos susceptibles a ser automatizados con IA.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => {
            const isDraft = project.status === "Borrador";
            const dateStr = project.submittedAt || project.createdAt;
            const formattedDate = dateStr
              ? new Date(dateStr).toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "No disponible";

            return (
              <div
                key={project.id}
                className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between gap-5 hover:border-zinc-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
                        {project.area} {project.otherArea ? `(${project.otherArea})` : ""}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">
                        {project.initiativeName}
                      </h3>
                    </div>
                    <div className="shrink-0">{getStatusBadge(project.status)}</div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.answers.currentProblem}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 pt-3 border-t border-zinc-800/80 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-zinc-600" />
                      {project.answers.monthlyCases} casos/mes
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-between pt-2">
                  {onDeleteProject ? (
                    <button
                      onClick={() => setDeletingProject(project)}
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 transition-all cursor-pointer"
                      title="Eliminar formulario/iniciativa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : <div />}

                  <div className="flex items-center gap-2">
                    {isDraft && onEditDraft ? (
                      <button
                        onClick={() => onEditDraft(project)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-[10px] font-bold uppercase tracking-widest text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all cursor-pointer shadow-md"
                      >
                        <Edit3 className="w-3 h-3" />
                        Editar Borrador
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectProject(project.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Ver Detalles
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
                  Está a punto de eliminar la iniciativa{" "}
                  <strong className="text-white">"{deletingProject.initiativeName}"</strong>.
                  Esta acción borrará de forma permanente todos sus datos, respuestas y análisis generados.
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
    </div>
  );
}
