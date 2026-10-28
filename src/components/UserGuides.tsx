import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  BookOpen,
  Download,
  User,
  Shield,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Activity,
  Database,
  TrendingUp,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";
import { UserProfile, UserRole } from "../types";

interface UserGuidesProps {
  userProfile: UserProfile | null;
}

export default function UserGuides({ userProfile }: UserGuidesProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<"solicitante" | "administrador">(
    userProfile?.role === "Administrador" ? "administrador" : "solicitante"
  );

  if (!userProfile) return null;

  const currentRole = userProfile.role;
  // Constraint: user can only see the guide appropriate for their active role
  const isAllowedAdmin = currentRole === "Administrador";

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // PDF Export logic
  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const isExportingAdmin = activeGuideTab === "administrador" && isAllowedAdmin;
    const title = isExportingAdmin 
      ? "Manual del Administrador - Priorizador de Proyectos GTD" 
      : "Guía del Usuario Solicitante - Priorizador de Proyectos GTD";

    let pageNum = 1;

    // Helper to draw header & footer on pages
    const drawPageDecoration = (docInstance: jsPDF, isFirstPage: boolean) => {
      // Top colored bar
      docInstance.setFillColor(37, 99, 235); // GTD Blue
      docInstance.rect(0, 0, 210, 8, "F");

      // Bottom footer line
      docInstance.setDrawColor(228, 228, 231);
      docInstance.line(15, 282, 195, 282);

      // Footer text
      docInstance.setFont("helvetica", "normal");
      docInstance.setFontSize(8);
      docInstance.setTextColor(113, 113, 122);
      docInstance.text("Priorizador de Proyectos de IA - GTD", 15, 287);
      docInstance.text(`Página ${pageNum}`, 195, 287, { align: "right" });
    };

    // Draw Cover Page / Title
    doc.setFillColor(15, 23, 42); // slate-900 background
    doc.rect(0, 0, 210, 297, "F");

    // Clear background red bar for cover page
    doc.setFillColor(239, 56, 41);
    doc.rect(0, 0, 210, 15, "F");

    // Cover Page content
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("PRIORIZADOR DE PROYECTOS", 20, 90);
    doc.text("DE INTELIGENCIA ARTIFICIAL", 20, 102);

    doc.setFillColor(59, 130, 246); // Blue divider accent
    doc.rect(20, 112, 40, 3, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(148, 163, 184); // light gray
    doc.text(isExportingAdmin ? "Manual de Gestión y Configuración (Administración)" : "Guía de Formulación y Criterios (Solicitante)", 20, 124);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("GTD // Banco e Incubadora de Proyectos de IA", 20, 240);
    doc.text(`Fecha de exportación: ${new Date().toLocaleDateString("es-CO")}`, 20, 246);
    doc.text(`Generado para: ${userProfile.name} (${userProfile.email})`, 20, 252);

    // Add main content page
    doc.addPage();
    pageNum++;
    drawPageDecoration(doc, false);

    let y = 25;
    const margin = 20;
    const pageWidth = 170; // 210 - 40

    const addText = (text: string, fontSize = 10, fontStyle = "normal", color = [30, 41, 59], spacing = 5) => {
      doc.setFont("helvetica", fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      
      const lines = doc.splitTextToSize(text, pageWidth);
      for (const line of lines) {
        if (y + fontSize / 2 > 270) {
          doc.addPage();
          pageNum++;
          drawPageDecoration(doc, false);
          y = 25;
        }
        doc.text(line, margin, y);
        y += (fontSize * 0.35) + 2.5; // Line spacing scale
      }
      y += spacing;
    };

    const addHeading = (text: string, level = 1, spacing = 6) => {
      let fontSize = 16;
      let color = [15, 23, 42]; // dark primary
      let fontStyle = "bold";

      if (level === 2) {
        fontSize = 12;
        color = [30, 41, 59];
      } else if (level === 3) {
        fontSize = 10;
        color = [239, 56, 41]; // Red
      }

      if (y + fontSize > 265) {
        doc.addPage();
        pageNum++;
        drawPageDecoration(doc, false);
        y = 25;
      }

      doc.setFont("helvetica", fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(text, margin, y);
      
      if (level === 1) {
        // Draw underline
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, y + 2, margin + pageWidth, y + 2);
        y += 4;
      }
      
      y += (fontSize * 0.35) + 3 + spacing;
    };

    if (!isExportingAdmin) {
      // SOLICITANTE / VISITANTE GUIDE PDF
      addHeading("1. ¿Qué es el Radar de Oportunidades de IA?", 1);
      addText(
        "El Radar de Oportunidades de Inteligencia Artificial es una plataforma corporativa desarrollada por Claro Colombia para capturar, analizar y priorizar de manera ágil ideas y casos de uso en todas las áreas de la compañía. Su propósito es identificar qué procesos se beneficiarían de implementar soluciones de automatización inteligente, asistentes conversacionales de lenguaje natural y agentes autónomos utilizando tecnologías líderes como Google Enterprise, Google Workspace y Vertex AI.",
        10,
        "normal"
      );
      addText(
        "Al registrar una iniciativa, un modelo avanzado de Inteligencia Artificial analiza el caso de uso de manera profunda y calcula de forma objetiva tres dimensiones: Importancia Operativa, Viabilidad Técnica y Facilidad de Despliegue. Esto genera una puntuación general de 0 a 100 que permite priorizar los proyectos que mayor valor retornen a Claro.",
        10,
        "normal"
      );

      addHeading("2. Guía del Formulario de Registro de Iniciativas", 1);
      addText(
        "A continuación, se detalla qué significa cada una de las secciones del formulario y qué información debe utilizar para responder a las preguntas de manera clara, incluso si no cuenta con conocimientos de sistemas o programación.",
        10,
        "normal"
      );

      // Section 1
      addHeading("Sección 1: Información General", 2);
      addText("Esta sección recopila datos básicos para identificar quién propone la idea y qué se busca mejorar.", 10, "italic");
      addHeading("• Nombre de la iniciativa:", 3, 1);
      addText("El título que identificará tu proyecto. Debe ser corto, descriptivo y centrado en la acción. Con qué llenarlo: Piensa en el verbo clave y el objeto del proceso. Ejemplos correctos: 'Auditoría automática de facturas de interconexión' o 'Asistente de consulta de contratos de arriendo'.", 9, "normal");
      
      addHeading("• Experto que conoce el proceso:", 3, 1);
      addText("Correo de la persona técnica u operativa que domina el día a día. Con qué llenarlo: El correo institucional de Claro de quien resolverá dudas detalladas sobre el paso a paso.", 9, "normal");

      addHeading("• Líder o Sponsor del área:", 3, 1);
      addText("Directivo (Director o Gerente) que respalda la iniciativa. Con qué llenarlo: Correo institucional del jefe o responsable del presupuesto con poder de autorizar pruebas con datos reales.", 9, "normal");

      addHeading("• Proceso o actividad a mejorar:", 3, 1);
      addText("Descripción simple de la actividad que genera el dolor de cabeza. Con qué llenarlo: En un lenguaje sencillo, defina el proceso base. Ejemplo: 'Cargar archivos Excel a la plataforma de cobros y revisar si los saldos coinciden'.", 9, "normal");

      // Section 2
      addHeading("Sección 2: Detalle del Problema", 2);
      addText("Describe la ineficiencia, cómo inicia y cómo termina la tarea hoy.", 10, "italic");
      
      addHeading("• ¿Qué problema ocurre actualmente?:", 3, 1);
      addText("El dolor u obstáculo principal. Con qué llenarlo: Mencionando retrasos, reprocesos o actividades repetitivas. Ejemplo: 'Revisar manualmente 200 contratos en PDF al mes toma 15 días, lo que demora la firma final e impide detectar cobros erróneos antes de pagar'.", 9, "normal");

      addHeading("• Detonante (Trigger):", 3, 1);
      addText("Qué evento da inicio a la actividad. Con qué llenarlo: El hecho físico o digital que arranca la tarea. Ejemplo: 'Llega un correo electrónico con la pre-factura en PDF' o 'Se descarga el reporte de diferencias del sistema a las 8:00 AM'.", 9, "normal");

      addHeading("• Resultado final actual:", 3, 1);
      addText("Cómo concluye la actividad hoy. Con qué llenarlo: El estado de finalización del trabajo actual. Ejemplo: 'El archivo de Excel conciliado queda guardado en una carpeta compartida y se envía un correo de confirmación al operador'.", 9, "normal");

      addHeading("• Mapeo de Pasos del Proceso:", 3, 1);
      addText("Desglose secuencial de actividades. Con qué llenarlo: Cree de 3 a 5 pasos muy simples detallando quién hace qué y en qué sistema. Ejemplo: Paso 1: El analista descarga el PDF del sistema X; Paso 2: Copia los datos manuales en una plantilla Excel; Paso 3: Verifica los saldos contra el portal web de Claro.", 9, "normal");

      // Section 3
      addHeading("Sección 3: Frecuencia y Volumetría", 2);
      addText("Preguntas numéricas para dimensionar el esfuerzo operativo que se hace hoy.", 10, "italic");
      addHeading("• Casos o transacciones al mes / Tiempo promedio por caso:", 3, 1);
      addText("Con qué llenarlo: Números reales basados en el último mes. Si recibe 300 solicitudes de clientes al mes y procesar cada una toma 20 minutos, coloque '300' y '20 minutos'. Esto permite calcular automáticamente cuántas horas de trabajo manual al año consume la tarea.", 9, "normal");

      // Section 4
      addHeading("Sección 4: Consecuencias e Impacto Económico", 2);
      addText("Permite calcular el valor de resolver el problema y priorizar económicamente.", 10, "italic");
      addHeading("• ¿Es posible estimar el impacto económico?:", 3, 1);
      addText("Con qué llenarlo: Si la ineficiencia genera multas, pagos de penalidades a clientes, pérdidas por cobros no cobrados o costos de personal extra, seleccione 'Sí' e indique un valor estimado anual en pesos colombianos (COP). No se preocupe si es aproximado, justifíquelo en la caja de texto inferior.", 9, "normal");

      // Section 5, 6, 7 overview
      addHeading("Secciones 5, 6 y 7: Solución, Datos y Viabilidad", 2);
      addText("Estas preguntas evalúan qué tan factible es construir la solución rápidamente.", 10, "italic");
      addText("- Expectativas de la solución: Qué tareas operativas delegaría a la Inteligencia Artificial (clasificar, redactar respuestas, extraer datos de facturas) y cuánta autonomía espera que tenga (asistencia parcial o decisión autónoma con supervisión).\n- Datos y Organización: Indique dónde está la información. Es ideal si los datos están centralizados en sistemas o archivos organizados (ej. Carpetas en Google Drive, hojas de Google Sheets, bases de datos), y si dispone de al menos 30 ejemplos reales de casos anteriores para que la IA los analice y aprenda de ellos.\n- Viabilidad y Entorno: Indique si cuenta con documentación (manuales del proceso) y si existe un ambiente de pruebas ('Sandbox') donde podamos ensayar la herramienta sin afectar la operación real de Claro.", 9, "normal");

      addHeading("3. Consejos para obtener una mejor calificación", 1);
      addText(
        "Para que su iniciativa califique alto en el Radar y sea priorizada rápidamente para desarrollo:\n1. Describa detalladamente el problema y justifique el impacto en los clientes.\n2. Asegúrese de que el Sponsor (Director/Gerente) esté enterado y comprometido con apoyar las pruebas del proyecto.\n3. Prepare ejemplos reales (tanto casos que salieron bien como casos con errores) para facilitar el entrenamiento del modelo de IA.\n4. Si el proceso involucra a varias personas y consume muchas horas al mes, la Importancia Operativa aumentará significativamente.",
        10,
        "normal"
      );

    } else {
      // ADMINISTRADOR GUIDE PDF
      addHeading("1. Introducción para Administradores", 1);
      addText(
        "Como Administrador del Radar de Oportunidades de IA, usted lidera la estrategia de transformación digital y adopción de tecnologías de automatización cognitiva en Claro Colombia. El sistema automatiza las etapas de recopilación y pre-evaluación, brindándole un portafolio priorizado de manera científica y co-pilotado por Inteligencia Artificial (Gemini 3.6 Flash) para optimizar la toma de decisiones tecnológicas.",
        10,
        "normal"
      );

      addHeading("2. Explicación de los Módulos de Administración", 1);
      addText(
        "El sistema consta de los siguientes módulos principales a los que usted tiene control total:",
        10,
        "normal"
      );

      addHeading("• Mesa de Evaluación y Análisis de IA (Módulo 'Análisis'):", 2);
      addText(
        "Es el centro operativo donde se consultan los análisis automáticos realizados por Gemini 3.6 Flash. Para cada propuesta enviada, la IA genera un dictamen en tiempo real estructurado en:\n" +
        "- Resumen Ejecutivo de la iniciativa.\n" +
        "- Identificación precisa de cuellos de botella y problemas.\n" +
        "- Recomendación de Solución (ej. Automatización tradicional, Asistente de IA, Agente autónomo con aprobación humana).\n" +
        "- Grado de viabilidad para desplegar dentro de Google Workspace (Gmail, Sheets, Drive) y Vertex AI (Modelos Gemini, Document AI, Agent Builder).\n" +
        "- Riesgos de implementación identificados y dependencias técnicas.\n" +
        "- Acciones administrativas: Desde este panel, usted puede cambiar el estado formal del proyecto (ej. Priorizado, Aprobado para piloto, En backlog, Rechazado), agregar comentarios que serán visibles para el solicitante, o forzar una actualización del análisis de la IA si la iniciativa fue editada.",
        10,
        "normal"
      );

      addHeading("• Ranking de Proyectos (Módulo 'Ranking'):", 2);
      addText(
        "Presenta un tablero interactivo (estilo Bento Grid) donde todas las iniciativas se ordenan de mayor a menor puntuación general. Permite:\n" +
        "- Filtrar por Áreas de la compañía (Comercial, Operaciones, Tecnología, etc.).\n" +
        "- Filtrar por Estados (Analizado, Aprobado para piloto, etc.).\n" +
        "- Filtrar por Categorías resultantes (Quick Win, Proyecto Estratégico, Análisis Detallado Requerido).\n" +
        "- Buscar proyectos por palabras clave en tiempo real.",
        10,
        "normal"
      );

      addHeading("• Comparador Interactivo de Iniciativas (Módulo 'Comparador'):", 2);
      addText(
        "Permite seleccionar de 2 a 4 proyectos simultáneos para contrastar detalladamente sus matrices de puntuación. Grafica la distribución tridimensional de Importancia vs. Viabilidad vs. Facilidad y detalla los riesgos e impactos económicos de cada opción frente a las otras.",
        10,
        "normal"
      );

      addHeading("• Configuración de Ponderaciones (Módulo 'Configuración'):", 2);
      addText(
        "Este es el motor de priorización del Radar. Permite ajustar manualmente la importancia de los tres pilares de evaluación para adaptarlos a la estrategia coyuntural de Claro:\n" +
        "- Ponderación de Importancia (Relevancia operativa y económica).\n" +
        "- Ponderación de Viabilidad (Factibilidad técnica y calidad de datos).\n" +
        "- Ponderación de Facilidad (Rapidez de desarrollo y ausencia de bloqueos).\n" +
        "La suma de los tres pesos debe ser exactamente el 100% (1.00). Al guardar una nueva configuración, todo el ranking de proyectos se recalcula de forma instantánea en la base de datos.",
        10,
        "normal"
      );

      addHeading("• Historial de Cambios (Módulo 'Historial'):", 2);
      addText(
        "Bitácora inmutable de auditoría del sistema. Registra cada acción crítica realizada en el Radar: quién la hizo, cuándo, sobre qué proyecto, qué valor cambió (ej. de 'Borrador' a 'Priorizado') y la justificación obligatoria.",
        10,
        "normal"
      );

      addHeading("3. Explicación de Campos de Priorización y Fórmulas", 1);
      addText(
        "El sistema de priorización se calcula automáticamente al enviar una propuesta mediante algoritmos deterministas definidos en el core y complementados por variables cuantitativas del formulario:\n" +
        "1. IMPORTANCIA (40 pts): Evalúa la magnitud del problema. Se calcula sumando: Volumen y horas anuales del proceso (hasta 15 pts) + Impacto económico reportado (hasta 10 pts) + consecuencias como pérdida de clientes o multas (hasta 10 pts) + urgencia por fechas límite (hasta 5 pts).\n" +
        "2. VIABILIDAD (35 pts): Evalúa si es posible construirlo con éxito. Se compone de: Estandarización y documentación del proceso (15 pts) + Organización centralizada de datos (10 pts) + Disponibilidad de ejemplos reales de entrenamiento (10 pts) + Alineación estratégica de Google Workspace y Vertex AI (15 pts).\n" +
        "3. FACILIDAD (25 pts): Evalúa la simplicidad de implementación. Se compone de: Disponibilidad de accesos listos a sistemas (10 pts) + Disponibilidad del experto funcional (5 pts) + Autorización directa para el piloto controlado (5 pts) + Disponibilidad de un Sandbox o ambiente seguro de pruebas (5 pts).",
        10,
        "normal"
      );
    }

    doc.save(isExportingAdmin ? "Manual_Administrador_Radar_IA_Claro.pdf" : "Guia_Solicitante_Radar_IA_Claro.pdf");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6" id="user-guides-module">
      {/* Header */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight uppercase italic flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            Centro de Aprendizaje y Guías
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Manuales detallados escritos en lenguaje sencillo para dominar el Radar de Oportunidades.
          </p>
        </div>

        {/* Action Button: Export PDF */}
        <button
          onClick={handleExportPDF}
          id="btn-download-guide-pdf"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          Descargar Guía en PDF
        </button>
      </div>

      {/* Role Restriction Tab View Selector (Controlled: Admins can toggle between Visitor and Admin view, standard users can only see their appropriate guide) */}
      {isAllowedAdmin && (
        <div className="flex bg-zinc-100 dark:bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 max-w-xs">
          <button
            onClick={() => setActiveGuideTab("solicitante")}
            id="tab-guide-solicitante"
            className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeGuideTab === "solicitante"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            Vista Solicitante
          </button>
          <button
            onClick={() => setActiveGuideTab("administrador")}
            id="tab-guide-administrador"
            className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeGuideTab === "administrador"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            Vista Administrador
          </button>
        </div>
      )}

      {/* RENDER ACTIVE GUIDE SHEET */}
      {activeGuideTab === "solicitante" && (
        <div className="space-y-6" id="guide-sheet-solicitante">
          {/* Welcome Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                <User className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Guía de Formulación de Proyectos para Solicitantes y Visitantes
                </h3>
                <p className="text-[10px] uppercase font-bold text-zinc-500 font-mono">
                  Rol Actual Autorizado: {currentRole}
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              ¿Tienes una idea para automatizar tus tareas operativas o mejorar tu día a día en Claro, pero no sabes de programación o Inteligencia Artificial? <strong>¡Este es tu lugar!</strong> El Radar de Oportunidades traduce tu conocimiento práctico en una propuesta técnica que priorizamos según su valor real para la compañía.
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl flex gap-3">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">¿Cómo funciona?</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                  Llenas un formulario describiendo tu proceso actual y qué te duele. Al enviarlo, un co-piloto de Inteligencia Artificial (Gemini) analiza tu descripción en segundos y califica objetivamente qué tan fácil, útil y viable es construir la solución.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Aid Card for Applicant */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Ayuda Visual: Embudo de Recopilación y Priorización de Proyectos
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              La siguiente guía visual muestra cómo recopilamos todas las propuestas del equipo y las pasamos por un embudo de análisis inteligente para ordenarlas y saber con total claridad cuáles proyectos podemos y debemos construir de primero:
            </p>
            <div className="aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 relative shadow-md">
              <img
                src="/src/assets/images/prioritization_funnel_1784667830920.jpg"
                alt="Embudo de Priorización RADAR.IA"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center italic mt-1 leading-normal">
              <strong>Figura 1:</strong> Proceso de captura, análisis y ordenamiento jerárquico de iniciativas en Claro Colombia.
            </p>
          </div>

          {/* Form Explanations Title */}
          <div>
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">
              Desglose de Preguntas del Formulario (Paso a Paso)
            </h3>
            <p className="text-[11px] text-zinc-400">
              Haz clic en cada sección para entender qué significa y cómo completarla sin complicaciones técnicas.
            </p>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-3">
            {[
              {
                id: "step1",
                icon: Info,
                title: "Paso 1: Información General de la Iniciativa",
                description: "Se recopilan los datos de las personas involucradas y la descripción básica del proceso.",
                questions: [
                  {
                    name: "Nombre de la iniciativa o caso de uso",
                    explanation: "Es el título que llevará tu idea en el sistema corporativo. Debe ser corto y conciso.",
                    tip: "Piensa en el verbo principal y el objeto. Ej. 'Conciliación de facturas de técnicos' o 'Lectura inteligente de contratos'. Evita títulos genéricos como 'Proyecto de IA' o 'Automatización área'.",
                  },
                  {
                    name: "Correo solicitante",
                    explanation: "El correo electrónico institucional de la persona técnica u operativa o solicitante del proceso.",
                    tip: "Esta persona será contactada por la mesa técnica para resolver dudas profundas, por lo que es vital que tenga disponibilidad para apoyar el diseño.",
                  },
                  {
                    name: "Sponsor o Líder del área",
                    explanation: "El directivo del área (Gerente, Director) con poder de autorización y presupuesto.",
                    tip: "Es el responsable de firmar las aprobaciones de pilotos e integraciones con sistemas.",
                  },
                  {
                    name: "¿Qué proceso o actividad desea mejorar?",
                    explanation: "Resumen muy breve de la labor operativa que se ejecuta actualmente y que se busca potenciar.",
                    tip: "Ejemplo claro: 'Revisión mensual de cobros y conciliación con el anexo comercial en PDF'.",
                  },
                ],
              },
              {
                id: "step2",
                icon: HelpCircle,
                title: "Paso 2: Detalle del Problema Actual",
                description: "Aquí explicas el cuello de botella y cómo se realiza la tarea en el día a día.",
                questions: [
                  {
                    name: "¿Qué problema ocurre actualmente en este proceso?",
                    explanation: "El dolor de cabeza o limitación principal de la tarea manual. Explicación de mínimos 50 caracteres.",
                    tip: "Concéntrate en la ineficiencia. Ej. 'Revisar manualmente 400 carpetas de contratistas toma 15 días, lo que frena el inicio de labores y genera riesgos de auditoría de seguridad social'. No menciones la solución de software aquí, solo la molestia.",
                  },
                  {
                    name: "Mapeo de pasos",
                    explanation: "Desglose breve del proceso. Consiste en enumerar quién hace qué en cada sistema.",
                    tip: "Usa oraciones secuenciales sencillas. Ej. '1. Analista descarga los PDFs', '2. Digita los valores en un archivo de Excel', '3. Sube el Excel al portal de Claro'.",
                  },
                ],
              },
              {
                id: "step3",
                icon: Activity,
                title: "Paso 3: Frecuencia y Volumetría",
                description: "Permite dimensionar matemáticamente cuántas horas de trabajo manual requiere el proceso al año.",
                questions: [
                  {
                    name: "Casos al mes y tiempo por caso",
                    explanation: "La cantidad de expedientes, correos, facturas o tareas que se procesan al mes, y cuántos minutos u horas toma uno solo de ellos.",
                    tip: "Usa números reales o promedios cercanos. El sistema calculará automáticamente: Casos al Mes x Tiempo Unitario x 12 Meses. Esto demuestra el tamaño del esfuerzo actual.",
                  },
                  {
                    name: "Personas involucradas",
                    explanation: "Cantidad de analistas u operadores que realizan esta actividad hoy en día.",
                    tip: "Por ejemplo, si la tarea es compartida por todo el equipo de 5 personas, digita '5'.",
                  },
                ],
              },
              {
                id: "step4",
                icon: TrendingUp,
                title: "Paso 4: Consecuencias e Impacto Económico",
                description: "Estudia los efectos de los errores y calcula el valor de mitigar los problemas.",
                questions: [
                  {
                    name: "Consecuencias de demoras o fallas",
                    explanation: "Consecuencias reales ante errores operativos en el proceso actual.",
                    tip: "Puedes seleccionar casillas como: 'Pérdida de clientes', 'Multas o sanciones de entes reguladores (ej. SIC)', 'Fuga de ingresos', o 'Sobrecarga laboral extrema'.",
                  },
                  {
                    name: "Impacto económico estimado anual (en COP)",
                    explanation: "Si es posible estimar las pérdidas monetarias que la ineficiencia le causa a Claro al año.",
                    tip: "Incluye multas pagadas, valores de cobros que caducaron por no revisarse a tiempo, o el costo de tercerización. Detalla brevemente la fórmula sencilla que utilizaste para calcular el valor.",
                  },
                ],
              },
              {
                id: "step5",
                icon: Sparkles,
                title: "Paso 5: Expectativas de la Solución (¿Qué hará la IA?)",
                description: "Define el rol de la Inteligencia Artificial y su nivel de autonomía deseado.",
                questions: [
                  {
                    name: "Acciones esperadas de la solución",
                    explanation: "Qué tareas concretas quieres que ejecute el sistema inteligente.",
                    tip: "Ejemplos: 'Leer y extraer texto de documentos PDFs escaneados', 'Clasificar correos por urgencia', o 'Tomar datos de un Excel y diligenciar un portal web automáticamente'.",
                  },
                  {
                    name: "Nivel de autonomía esperado",
                    explanation: "Qué tan independiente quieres que sea el sistema.",
                    tip: "Niveles sugeridos: 'Asistente personal' (solo te da recomendaciones, tú tomas la acción), 'Co-piloto con aprobación' (la IA elabora todo, pero tú debes hacer clic en 'Aprobar' para enviar), o 'Agente autónomo supervisado' (la IA procesa todo sola y solo te avisa si encuentra un caso excepcional). Elige el que mejor se adapte a tu confianza.",
                  },
                ],
              },
              {
                id: "step6",
                icon: Database,
                title: "Paso 6: Organización de Datos y Seguridad",
                description: "Evalúa si contamos con la materia prima (los datos) para alimentar y entrenar a la IA.",
                questions: [
                  {
                    name: "¿Cómo se encuentra organizada la información?",
                    explanation: "Indica en dónde residen los datos del proceso actualmente.",
                    tip: "Elegir opciones ordenadas como 'Centralizada en un solo sistema' o 'Bases de datos/Archivos estructurados' incrementará la viabilidad de desarrollo de la solución.",
                  },
                  {
                    name: "Ejemplos reales disponibles",
                    explanation: "Cantidad de casos anteriores que tenemos guardados y que sirven de ejemplo.",
                    tip: "Para que un agente de IA aprenda con exactitud, es ideal contar con ejemplos. Seleccionar 'Sí, más de 100 casos' o 'Sí, entre 30 y 100 casos' le dará la máxima calificación de viabilidad al proyecto.",
                  },
                  {
                    name: "Autorización de accesos",
                    explanation: "Indica si el área tiene permisos de acceso a las carpetas, carpetas compartidas o plataformas donde se leerán o guardarán los datos.",
                    tip: "Contar previamente con accesos listos evita largos procesos de TI y permite comenzar a programar de inmediato.",
                  },
                ],
              },
            ].map((sec) => {
              const SecIcon = sec.icon;
              const isExpanded = expandedSection === sec.id;
              return (
                <div
                  key={sec.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300">
                        <SecIcon className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                          {sec.title}
                        </h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{sec.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {sec.questions.map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className="bg-white dark:bg-zinc-900 p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl space-y-2"
                          >
                            <h5 className="text-[11px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest">
                              {q.name}
                            </h5>
                            <p className="text-xs text-zinc-600 dark:text-zinc-300">
                              <strong className="text-zinc-700 dark:text-zinc-400 font-medium">¿A qué hace referencia?:</strong> {q.explanation}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50">
                              <span className="font-bold text-[10px] text-emerald-500 uppercase tracking-wider block mb-1">💡 Con qué información llenarlo o Tip:</span>
                              {q.tip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeGuideTab === "administrador" && isAllowedAdmin && (
        <div className="space-y-6" id="guide-sheet-administrador">
          {/* Welcome Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Manual de Gestión y Gobernanza para Administradores (Full Access)
                </h3>
                <p className="text-[10px] uppercase font-bold text-zinc-500 font-mono">
                  Módulo de Seguridad y Configuración Avanzada
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Como <strong>Administrador</strong>, tienes la potestad de configurar el motor matemático del ranking, auditar los logs globales de cambios, gestionar los roles de los usuarios, y coordinar los veredictos de IA (Gemini). A continuación, se detalla detalladamente cómo operar cada sección técnica disponible en tu barra lateral.
            </p>
          </div>

          {/* Visual Aid Card for Admin */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Ayuda Visual: Matriz de Priorización de Proyectos y Decisiones
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              La siguiente matriz de priorización automatizada organiza el listado completo de iniciativas registradas. Al cruzar la Importancia Operativa contra la Viabilidad y Facilidad del proyecto, identifica instantáneamente en el cuadrante verde superior derecho los proyectos de <strong>Prioridad 1 (Quick Wins)</strong>, determinando con precisión científica cuáles iniciativas se deben ejecutar primero:
            </p>
            <div className="aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 relative shadow-md">
              <img
                src="/src/assets/images/quadrant_dashboard_1784667845286.jpg"
                alt="Matriz de Priorización RADAR.IA"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center italic mt-1 leading-normal">
              <strong>Figura 2:</strong> Matriz cuadrante de priorización (Importancia vs Factibilidad) para la toma ágil de decisiones.
            </p>
          </div>

          {/* Modules Explanation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Mesa de Evaluación y Análisis de IA (Módulo 'Análisis')",
                description: "Es el panel donde la IA co-pilota el portafolio corporativo.",
                fields: [
                  {
                    name: "Lectura del Dictamen estructurado",
                    text: "Muestra la interpretación técnica que Gemini hace de la ineficiencia. Incluye Resumen Ejecutivo, Problema Central, Riesgos de Implementación e información clave faltante.",
                  },
                  {
                    name: "Concepto de Solución IA",
                    text: "Clasifica el proyecto en: Automatización Tradicional, Flujo de Trabajo, Asistente de IA, Agente con Aprobación, Agente Parcial, Agente Autónomo o Mejora de Proceso.",
                  },
                  {
                    name: "Alineación Google Workspace & Vertex AI",
                    text: "Un campo crítico de auditoría que evalúa cómo la iniciativa se integra con las APIs de Google (Drive, Sheets, Gmail, Docs) y con los microservicios de Vertex AI (Gemini, Agent Builder, Document AI), recomendando servicios exactos.",
                  },
                  {
                    name: "Acciones administrativas",
                    text: "Te permite cambiar el Estado (ej. Priorizado, En piloto) para que el solicitante lo rastree, ingresar comentarios de retroalimentación, o forzar una re-evaluación del LLM si el solicitante corrigió datos del formulario.",
                  },
                ],
              },
              {
                title: "Tablero Bento Grid (Módulo 'Ranking')",
                description: "Organiza de mayor a menor las propuestas según su viabilidad e importancia de forma dinámica.",
                fields: [
                  {
                    name: "Puntaje General (0-100)",
                    text: "Es el promedio ponderado de los tres pilares (Importancia, Viabilidad, Facilidad). La iniciativa de mayor valor para Claro encabezará automáticamente el ranking.",
                  },
                  {
                    name: "Clasificación de Categoría",
                    text: "Divide los proyectos en: 'Quick Win' (Fácil y muy importante), 'Proyecto Estratégico' (Alto valor pero requiere planeación compleja) o 'Análisis Detallado' (Requiere pulir datos).",
                  },
                  {
                    name: "Filtros en tiempo real",
                    text: "Barra superior que filtra instantáneamente por Área beneficiada, Estado de avance, o Categoría de impacto, facilitando comités de planeación trimestral.",
                  },
                ],
              },
              {
                title: "Configurador de Criterios (Módulo 'Configuración')",
                description: "Permite cambiar en tiempo real los porcentajes del algoritmo del Radar.",
                fields: [
                  {
                    name: "Peso de Importancia (Default: 40%)",
                    text: "Mide qué tanto duele el problema hoy. Premia volumen mensual de casos, tiempo perdido, multas o pérdidas económicas reportadas.",
                  },
                  {
                    name: "Peso de Viabilidad (Default: 35%)",
                    text: "Mide qué tan maduro está el proceso. Premia la estandarización previa, la centralización de datos y la integración de herramientas Google.",
                  },
                  {
                    name: "Peso de Facilidad (Default: 25%)",
                    text: "Mide qué tan rápido se puede iniciar. Premia tener accesos listos, sandbox de pruebas disponible y un experto con tiempo libre.",
                  },
                  {
                    name: "Recálculo Instantáneo",
                    text: "Al guardar, el sistema actualiza de manera masiva los puntajes de todas las iniciativas guardadas en Firestore aplicando los nuevos coeficientes.",
                  },
                ],
              },
              {
                title: "Bitácora de Auditoría (Módulo 'Historial de Cambios')",
                description: "Registro de control inmutable e histórico de la plataforma.",
                fields: [
                  {
                    name: "Logs detallados por usuario",
                    text: "Guarda la fecha exacta, el correo del usuario que realizó la acción, la entidad modificada (usuario, proyecto, pesos), el valor anterior y el valor nuevo.",
                  },
                  {
                    name: "Justificación de Overrides",
                    text: "Cada vez que cambies el estado de un proyecto o edites ponderaciones, el sistema te solicitará obligatoriamente una justificación de negocio para garantizar la transparencia corporativa.",
                  },
                ],
              },
            ].map((mod, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm space-y-4"
              >
                <div>
                  <h4 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">
                    {mod.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{mod.description}</p>
                </div>

                <div className="space-y-3">
                  {mod.fields.map((f, fIdx) => (
                    <div key={fIdx} className="text-xs space-y-1">
                      <span className="font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest text-[9px] block">
                        • {f.name}:
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed pl-3">
                        {f.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mathematical formulas breakdown card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              Fórmula de Puntuación del Algoritmo de Priorización (Detalle Matemático)
            </h4>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              El puntaje total de un proyecto (de 0 a 100) se calcula como la suma de las puntuaciones de cada pilar, multiplicada por su respectivo peso configurado.
            </p>

            <div className="font-mono text-xs bg-zinc-950 text-emerald-400 p-4 rounded-xl border border-zinc-800 space-y-2 text-center">
              <p className="font-bold">
                Puntaje Total = (Importancia * PesoImp) + (Viabilidad * PesoVia) + (Facilidad * PesoFac)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
                <h5 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Pilar 1: Importancia (Máx 40 pts)</h5>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  - Horas manuales dedicadas/año (hasta 15 pts)<br />
                  - Pérdida económica reportada en COP (hasta 10 pts)<br />
                  - Gravedad de consecuencias (hasta 10 pts)<br />
                  - Urgencia por fechas límite (hasta 5 pts)
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
                <h5 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Pilar 2: Viabilidad (Máx 35 pts)</h5>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  - Estandarización del proceso (hasta 15 pts)<br />
                  - Centralización u organización de datos (hasta 10 pts)<br />
                  - Cantidad de ejemplos reales anteriores (hasta 10 pts)<br />
                  - Integración Google Workspace & Vertex AI (hasta 15 pts)
                </p>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
                <h5 className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Pilar 3: Facilidad (Máx 25 pts)</h5>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  - Autorización previa de accesos TI (hasta 10 pts)<br />
                  - Disponibilidad semanal del experto (hasta 5 pts)<br />
                  - Autorización del líder para piloto (hasta 5 pts)<br />
                  - Existencia de un sandbox de pruebas (hasta 5 pts)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
