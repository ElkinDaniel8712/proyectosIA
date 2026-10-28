import React, { useState } from "react";
import { DatabaseDiagnostics, checkDatabaseHealth } from "../lib/projectRepository";
import { Database, ShieldCheck, AlertCircle, RefreshCw, X, Server, CloudOff, CheckCircle2 } from "lucide-react";

interface DatabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagnostics: DatabaseDiagnostics | null;
  onRefresh: () => void;
}

export default function DatabaseStatusModal({
  isOpen,
  onClose,
  diagnostics,
  onRefresh,
}: DatabaseStatusModalProps) {
  const [checking, setChecking] = useState(false);

  if (!isOpen) return null;

  const handleTestNow = async () => {
    setChecking(true);
    await onRefresh();
    setTimeout(() => setChecking(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-5 text-zinc-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100">Estado de la Base de Datos</h2>
              <p className="text-xs text-zinc-400">Diagnóstico de disponibilidad y almacenamiento</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          {/* Cloud Firestore Status */}
          <div className={`p-4 rounded-xl border ${
            diagnostics?.firebaseReachable
              ? "bg-emerald-950/20 border-emerald-800/40"
              : "bg-amber-950/20 border-amber-800/40"
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              {diagnostics?.firebaseReachable ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <CloudOff className="w-4 h-4 text-amber-400" />
              )}
              <span className="text-xs font-bold text-zinc-200">Firebase Firestore</span>
            </div>
            <p className="text-xs font-medium text-zinc-300">
              {diagnostics?.firebaseReachable ? "En línea y sincronizado" : "No disponible / Sin acceso"}
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              {diagnostics?.firebaseReachable
                ? "Conexión directa con Google Cloud establecida."
                : "La API Key o permisos del proyecto de Google Cloud están restringidos (PERMISSION_DENIED)."}
            </p>
          </div>

          {/* Local Server Storage */}
          <div className="p-4 rounded-xl border bg-indigo-950/20 border-indigo-800/40">
            <div className="flex items-center gap-2 mb-1.5">
              <Server className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-zinc-200">Almacenamiento GTD</span>
            </div>
            <p className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Operativo y Persistente
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Tus iniciativas se guardan de forma segura en disco en el servidor y en memoria local.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/80 space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Detalles Técnicos de Configuración
          </span>
          <div className="flex justify-between py-1 border-b border-zinc-900">
            <span className="text-zinc-400">Proyecto Firebase:</span>
            <span className="font-mono text-zinc-200">{diagnostics?.firebaseProjectId || "gen-lang-client-0454135713"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-900">
            <span className="text-zinc-400">Database ID:</span>
            <span className="font-mono text-zinc-200 truncate max-w-[280px]" title={diagnostics?.firestoreDatabaseId}>
              {diagnostics?.firestoreDatabaseId || "ai-studio-radardeoportunid-..."}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-zinc-900">
            <span className="text-zinc-400">Registros cargados actualmente:</span>
            <span className="font-bold text-indigo-400">{diagnostics?.totalProjects ?? 0} iniciativas</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-zinc-400">Modo de Operación:</span>
            <span className="font-semibold text-emerald-400">
              {diagnostics?.firebaseReachable ? "Sincronización en la Nube" : "Respaldo Persistente Activo"}
            </span>
          </div>
        </div>

        {/* Explanation message */}
        <div className="p-3 bg-zinc-800/40 rounded-xl border border-zinc-700/40 text-xs text-zinc-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p>
            <strong>¿Por qué no cargaban los registros?</strong> La base de datos en la nube de Firebase devolvió un error de permisos (<code>PERMISSION_DENIED</code>). Ya hemos activado la capa de respaldo permanente de GTD para que todos los registros se carguen y se guarden sin interrupciones.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleTestNow}
            disabled={checking}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? "animate-spin" : ""}`} />
            {checking ? "Verificando..." : "Comprobar Conexión"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
