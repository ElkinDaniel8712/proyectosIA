import React from "react";
import { UserRole, UserProfile } from "../types";
import {
  Home,
  PlusCircle,
  FileText,
  BarChart2,
  TrendingUp,
  Columns,
  Settings,
  Shield,
  History,
  LogOut,
  User,
  Zap,
  BookOpen,
  Database,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  userProfile: UserProfile | null;
  onLogout: () => void;
  onChangeSimulatedRole?: (newRole: UserRole) => void;
  onOpenDatabaseStatus?: () => void;
}

export default function Sidebar({
  activeView,
  onNavigate,
  userProfile,
  onLogout,
  onChangeSimulatedRole,
  onOpenDatabaseStatus,
}: SidebarProps) {
  if (!userProfile) return null;

  const currentRole = userProfile.role;
  const isVisitor =
    userProfile.role === "Visitante" ||
    userProfile.email?.toLowerCase().includes("visitante") ||
    userProfile.id?.startsWith("visitor_");

  const navItems = [
    { id: "inicio", label: "Inicio", icon: Home, roles: ["Solicitante", "Evaluador", "Administrador"] },
    { id: "nueva", label: "Nueva Iniciativa", icon: PlusCircle, roles: ["Solicitante", "Evaluador", "Administrador", "Visitante"] },
    { id: "mis", label: "Mis Iniciativas", icon: FileText, roles: ["Solicitante"] },
    { id: "analisis", label: "Análisis de Iniciativas", icon: BarChart2, roles: ["Evaluador", "Administrador"] },
    { id: "ranking", label: "Ranking de Proyectos", icon: TrendingUp, roles: ["Solicitante", "Evaluador", "Administrador"] },
    { id: "comparador", label: "Comparador", icon: Columns, roles: ["Evaluador", "Administrador"] },
    { id: "guias", label: "Guías de Usuario", icon: BookOpen, roles: ["Solicitante", "Evaluador", "Administrador", "Visitante"] },
    { id: "administracion", label: "Panel Administrativo", icon: Shield, roles: ["Administrador"] },
    { id: "configuracion", label: "Configuración", icon: Settings, roles: ["Administrador"] },
    { id: "historial", label: "Historial de Cambios", icon: History, roles: ["Administrador"] },
  ];

  return (
    <aside className="w-64 bg-zinc-950 text-zinc-300 border-r border-zinc-800 flex flex-col justify-between h-screen sticky top-0 transition-colors duration-200 z-10">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/10">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white uppercase italic leading-none">
              GTD<span className="text-blue-500 font-normal">.IA</span>
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-500 mt-1">
              Priorización de Proyectos
            </p>
          </div>
        </div>

        {/* User profile & role selector */}
        <div className="p-4 mx-3 my-4 bg-zinc-900 border border-zinc-800 rounded-[1.5rem] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 p-0.5">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white uppercase">
                {userProfile.name.slice(0, 2)}
              </div>
            </div>
            <div className="overflow-hidden">
              <h2 className="text-xs font-bold text-white truncate">
                {userProfile.name}
              </h2>
              <p className="text-[10px] text-zinc-500 truncate font-mono">
                {userProfile.email}
              </p>
            </div>
          </div>
          
          {/* Simulated role chooser */}
          {!isVisitor && (
            <div className="border-t border-zinc-800 pt-2.5">
              <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                Rol Activo (Simulador)
              </label>
              <select
                value={currentRole}
                onChange={(e) => onChangeSimulatedRole && onChangeSimulatedRole(e.target.value as UserRole)}
                className="w-full text-[11px] py-1.5 px-2 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Solicitante">Solicitante</option>
                <option value="Evaluador">Evaluador</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
          )}
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            if (isVisitor && item.id !== "nueva" && item.id !== "guias") {
              return null;
            }
            const allowed = item.roles.includes(currentRole) || (isVisitor && (item.id === "nueva" || item.id === "guias"));
            if (!allowed) return null;

            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 font-bold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-500" : "text-zinc-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Database status button */}
      <div className="px-3 pt-2">
        <button
          onClick={onOpenDatabaseStatus}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-medium bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 transition-all text-zinc-300 cursor-pointer"
          title="Verificar disponibilidad de base de datos"
        >
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>Base de Datos</span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Activa
          </span>
        </button>
      </div>

      {/* Logout button */}
      <div className="p-3 border-t border-zinc-800/80">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 hover:border-rose-900/40 border border-transparent transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
