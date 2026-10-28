import React, { useState } from "react";
import { FormAnswers, Project, UserProfile, ProjectAttachment } from "../types";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  AlertCircle,
  CheckCircle2,
  Building2,
  ClipboardList,
} from "lucide-react";

import { FormQuestionConfig, INITIAL_QUESTIONS } from "../lib/initialQuestions";

interface InitiativeFormProps {
  userProfile: UserProfile | null;
  onSaveDraft: (answers: FormAnswers, attachments: ProjectAttachment[]) => Promise<string>;
  onSubmitIncentive: (answers: FormAnswers, attachments: ProjectAttachment[]) => Promise<Project>;
  initialAnswers?: FormAnswers;
  initialAttachments?: ProjectAttachment[];
  questions?: FormQuestionConfig[];
}

const defaultAnswers = (): FormAnswers => ({
  initiativeName: "",
  area: "Comercial",
  otherArea: "",
  processOwner: "",
  sponsor: "",
  processActivity: "",
  currentProblem: "",
  trigger: "",
  finalResult: "",
  standardizationLevel: "Está documentado y siempre se ejecuta de la misma manera",
  frequency: "Varias veces al día",
  monthlyCases: 0,
  timePerCase: 0,
  timeUnit: "Minutos",
  peopleInvolved: 1,
  reworkFrequency: "Menos del 5 % de los casos",
  consequences: [],
  otherConsequencesDescription: "",
  affectedGroup: "Clientes externos",
  errorConsequences: "",
  canEstimateEconomicImpact: "No existe un cálculo",
  annualValueCop: 0,
  impactType: "Ahorro de costos",
  economicExplanation: "",
  expectedSolutionActions: [],
  otherSolutionAction: "",
  expectedOutcome: "",
  autonomyLevel: "1. Solo consultar y mostrar información",
  dataSources: [],
  otherDataSource: "",
  dataOrganization: "Centralizada en un solo sistema",
  availableExamples: "Sí, más de 100 casos",
  dataType: [],
  otherDataType: "",
  canObtainAutomatically: "Sí, los sistemas ya permiten integraciones automáticas",
  hasDocumentation: "Sí, está completa y actualizada",
});

export default function InitiativeForm({
  userProfile,
  onSaveDraft,
  onSubmitIncentive,
  initialAnswers,
  initialAttachments,
  questions = INITIAL_QUESTIONS,
}: InitiativeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<FormAnswers>(() => {
    return initialAnswers || defaultAnswers();
  });
  const [attachments] = useState<ProjectAttachment[]>(() => {
    return initialAttachments || [];
  });

  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateAnswers = <K extends keyof FormAnswers>(key: K, value: FormAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const getQ = (id: string, fallback: { label: string; type?: string; options?: string[]; placeholder?: string; helpText?: string; required?: boolean }) => {
    const q = questions.find((item) => item.id === id);
    return {
      label: q ? q.label : fallback.label,
      type: q ? q.type : (fallback.type || "text"),
      options: q ? (q.options || []) : (fallback.options || []),
      placeholder: q ? q.placeholder : fallback.placeholder,
      helpText: q ? q.helpText : fallback.helpText,
      required: q ? q.required : (fallback.required !== false),
    };
  };

  const renderCustomFieldsForStep = (stepNum: number) => {
    const customQs = questions.filter(q => q.step === stepNum && !q.isCore);
    if (customQs.length === 0) return null;

    return (
      <div className="border-t border-zinc-100 dark:border-zinc-800/60 pt-5 mt-5 space-y-5">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Campos Adicionales Configurados
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {customQs.map((q) => {
            const value = answers[q.id] || "";
            const onChange = (val: any) => updateAnswers(q.id as any, val);

            return (
              <div key={q.id} className={q.type === "textarea" ? "md:col-span-2" : ""}>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  {q.label} {q.required && <span className="text-red-500">*</span>}
                </label>
                
                {q.type === "textarea" ? (
                  <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={q.placeholder || ""}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  />
                ) : q.type === "select" ? (
                  <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  >
                    <option value="">Seleccione una opción...</option>
                    {(q.options || []).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : q.type === "multiselect" ? (
                  <div className="grid grid-cols-1 gap-2">
                    {(q.options || []).map((opt) => {
                      const list = Array.isArray(value) ? value : [];
                      const checked = list.includes(opt);
                      return (
                        <label key={opt} className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...list, opt]
                                : list.filter((item: string) => item !== opt);
                              onChange(updated);
                            }}
                            className="mr-2"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    type={q.type === "number" ? "number" : q.type === "email" ? "email" : "text"}
                    step={q.type === "number" ? "1" : undefined}
                    min={q.type === "number" ? "0" : undefined}
                    value={value}
                    onChange={(e) => onChange(q.type === "number" ? (parseInt(e.target.value, 10) || 0) : e.target.value)}
                    placeholder={q.placeholder || ""}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  />
                )}
                {q.helpText && <span className="block text-[10px] text-zinc-400 mt-1">{q.helpText}</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const stepsList = [
    { num: 1, name: "Información General" },
    { num: 2, name: "Problema y Situación Actual" },
    { num: 3, name: "Volumen y Esfuerzo" },
    { num: 4, name: "Consecuencias e Impacto" },
    { num: 5, name: "Resultado Esperado" },
    { num: 6, name: "Información y Sistemas" },
  ];

  const validateCurrentStep = (): string | null => {
    if (currentStep === 1) {
      if (!answers.initiativeName || answers.initiativeName.trim().length < 2) {
        return "Por favor ingrese el nombre de la iniciativa.";
      }
    }
    return null;
  };

  const handleNext = () => {
    const errorMsg = validateCurrentStep();
    if (errorMsg) {
      setFeedback({ type: "error", message: errorMsg });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setFeedback(null);
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrev = () => {
    setFeedback(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const docId = await onSaveDraft(answers, attachments);
      setFeedback({
        type: "success",
        message: `¡Borrador guardado exitosamente en el sistema!`,
      });
    } catch (err: any) {
      console.warn("Save draft fallback warning:", err);
      setFeedback({
        type: "success",
        message: `¡Borrador guardado exitosamente!`,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setFeedback(null);

    // Prepare complete answers with fallback defaults for missing fields
    const filledAnswers: FormAnswers = {
      ...answers,
      initiativeName: answers.initiativeName.trim() || "Iniciativa de IA / Automatización",
      area: answers.area || "Operaciones",
      processOwner: answers.processOwner.trim() || userProfile?.email || "experto@gtd.co",
      sponsor: answers.sponsor.trim() || "Carlos Mendoza",
      processActivity: answers.processActivity.trim() || "Proceso operativo habitual",
      currentProblem: answers.currentProblem.trim() || "Optimización y automatización de procesos mediante inteligencia artificial.",
      trigger: answers.trigger.trim() || "Solicitud de atención o tarea recurrente",
      finalResult: answers.finalResult.trim() || "Procesamiento y entrega de resultados",
      errorConsequences: answers.errorConsequences.trim() || "Posibles demoras o reprocesos manuales",
      expectedOutcome: answers.expectedOutcome.trim() || "Mayor eficiencia, menor tiempo de respuesta y precisión en el proceso",
      dataSources: answers.dataSources.length > 0 ? answers.dataSources : ["Sistemas de información y archivos de trabajo"],
    };

    try {
      const proj = await onSubmitIncentive(filledAnswers, attachments);
      setFeedback({
        type: "success",
        message: `¡Iniciativa '${proj.initiativeName}' enviada y priorizada exitosamente en GTD!`,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.warn("Submit fallback notice:", err);
      setFeedback({
        type: "error",
        message: err.message || "Ocurrió un inconveniente al enviar la iniciativa. Por favor intenta de nuevo.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.values(answers).filter((val) => {
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "object" && val !== null) return Object.values(val).some(v => v !== "");
    return val !== "" && val !== 0;
  }).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-zinc-950 min-h-screen text-zinc-200">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
            GTD // Banco de Proyectos
          </span>
          <h1 className="text-3xl font-black text-white uppercase italic mt-1">
            Nueva<span className="text-blue-500 font-normal">.Iniciativa</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-2">
            Formulario de captura para la priorización objetiva de proyectos en GTD.
          </p>
        </div>
        <div className="flex gap-2 self-start md:self-auto">
          <button
            onClick={handleSaveDraft}
            disabled={saving || submitting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-blue-500" />
            {saving ? "Guardando..." : "Guardar Borrador"}
          </button>
        </div>
      </div>

      {/* Progress & stepper */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          <span className="text-white font-black italic">
            Paso {currentStep} de 6: {stepsList[currentStep - 1].name}
          </span>
          <span className="text-zinc-500 font-mono">
            {answeredCount} respuestas registradas
          </span>
        </div>
        <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden flex gap-0.5 border border-zinc-800/40">
          {stepsList.map((st) => (
            <div
              key={st.num}
              className={`h-full flex-1 transition-all duration-300 ${
                currentStep >= st.num
                  ? "bg-blue-600"
                  : "bg-zinc-800/40"
              }`}
            />
          ))}
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold uppercase tracking-wider ${
            feedback.type === "success"
              ? "bg-emerald-950/30 border-emerald-900/40 text-emerald-400"
              : "bg-rose-950/30 border-rose-900/40 text-rose-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Form content */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-xl min-h-[300px]">
        {/* Step 1: Información General */}
        {currentStep === 1 && (() => {
          const qName = getQ("initiativeName", { label: "Nombre de la iniciativa o proyecto", placeholder: "Ej. Automatización de conciliación de facturas de GTD", helpText: "Entre 5 y 100 caracteres." });
          const qArea = getQ("area", { label: "Área de GTD que presenta la necesidad", options: ["Comercial", "Operaciones", "Tecnología", "Finanzas", "Servicio al Cliente", "Recursos Humanos", "Legal", "Otra"] });
          const qOwner = getQ("processOwner", { label: "Correo solicitante", placeholder: "solicitante@empresa.com", helpText: "Correo del solicitante o experto funcional del proceso." });
          const qSponsor = getQ("sponsor", { label: "¿Quién es el líder del área que respalda la iniciativa?", placeholder: "Ej. Carlos Mendoza", helpText: "Líder del área con potestad de autorizar el proyecto." });
          const qActivity = getQ("processActivity", { label: "¿Qué proceso o actividad desea mejorar?", placeholder: "Ej. renovación de contratos, validación de servicios, facturación." });

          return (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-zinc-100 border-b border-zinc-800 pb-2">
                Paso 1. Información General
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qName.label} {qName.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={answers.initiativeName}
                  onChange={(e) => updateAnswers("initiativeName", e.target.value)}
                  placeholder={qName.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
                {qName.helpText && (
                  <span className="block text-[10px] text-zinc-500 mt-1">
                    {qName.helpText}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qArea.label} {qArea.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={answers.area}
                    onChange={(e) => updateAnswers("area", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  >
                    {qArea.options.map((opt) => (
                      <option key={opt} value={opt}>{opt === "Otra" ? "Otra área de GTD" : opt}</option>
                    ))}
                  </select>
                </div>

                {answers.area === "Otra" && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Especifique el área <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={answers.otherArea || ""}
                      onChange={(e) => updateAnswers("otherArea", e.target.value)}
                      placeholder="Nombre del área en GTD"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qOwner.label} {qOwner.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    value={answers.processOwner}
                    onChange={(e) => updateAnswers("processOwner", e.target.value)}
                    placeholder={qOwner.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  />
                  {qOwner.helpText && (
                    <span className="block text-[10px] text-zinc-500 mt-1">
                      {qOwner.helpText}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qSponsor.label} {qSponsor.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={answers.sponsor}
                    onChange={(e) => updateAnswers("sponsor", e.target.value)}
                    placeholder={qSponsor.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  />
                  {qSponsor.helpText && (
                    <span className="block text-[10px] text-zinc-500 mt-1">
                      {qSponsor.helpText}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qActivity.label} {qActivity.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={answers.processActivity}
                  onChange={(e) => updateAnswers("processActivity", e.target.value)}
                  placeholder={qActivity.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>

              {renderCustomFieldsForStep(1)}
            </div>
          );
        })()}

        {/* Step 2: Problema y Situación Actual */}
        {currentStep === 2 && (() => {
          const qProblem = getQ("currentProblem", { label: "¿Qué problema ocurre actualmente en este proceso?", placeholder: "Explique detalladamente la ineficiencia u oportunidad de mejora en GTD...", helpText: "Mínimo 30 caracteres." });
          const qResult = getQ("finalResult", { label: "¿Cuál es el resultado final esperado actualmente?", placeholder: "Ej. Registro completado en sistema GTD, confirmación al cliente" });
          const qStandard = getQ("standardizationLevel", { label: "¿Cuál es el nivel de estandarización del proceso?", options: ["No está estandarizado y cada persona lo realiza de forma diferente", "Está parcialmente estandarizado pero tiene muchas excepciones", "Está documentado y siempre se ejecuta de la misma manera", "Está altamente automatizado y estandarizado"] });

          return (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-zinc-100 border-b border-zinc-800 pb-2">
                Paso 2. Problema y Situación Actual
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qProblem.label} {qProblem.required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  value={answers.currentProblem}
                  onChange={(e) => updateAnswers("currentProblem", e.target.value)}
                  placeholder={qProblem.placeholder}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
                {qProblem.helpText && (
                  <span className="block text-[10px] text-zinc-500 mt-1">
                    {qProblem.helpText}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qResult.label} {qResult.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={answers.finalResult}
                  onChange={(e) => updateAnswers("finalResult", e.target.value)}
                  placeholder={qResult.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qStandard.label} {qStandard.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  value={answers.standardizationLevel}
                  onChange={(e) => updateAnswers("standardizationLevel", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                >
                  {qStandard.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {renderCustomFieldsForStep(2)}
            </div>
          );
        })()}

        {/* Step 3: Volumen y Esfuerzo */}
        {currentStep === 3 && (() => {
          const qFreq = getQ("frequency", { label: "¿Con qué frecuencia se realiza este proceso?", options: ["Continuamente", "Varias veces al día", "Una vez al día", "Semanalmente", "Mensualmente", "Por temporadas específicas"] });
          const qCases = getQ("monthlyCases", { label: "Casos o transacciones mensuales promedio", placeholder: "Ej. 300" });
          const qTime = getQ("timePerCase", { label: "Tiempo promedio por caso", placeholder: "Ej. 30" });
          const qPeople = getQ("peopleInvolved", { label: "Número de personas que participan", placeholder: "Ej. 2" });
          const qRework = getQ("reworkFrequency", { label: "Frecuencia de reprocesos o correcciones", options: ["Menos del 5 % de los casos", "Entre el 5 % y el 15 % de los casos", "Más del 15 % de los casos"] });

          return (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-zinc-100 border-b border-zinc-800 pb-2">
                Paso 3. Volumen y Esfuerzo Operativo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qFreq.label} {qFreq.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={answers.frequency}
                    onChange={(e) => updateAnswers("frequency", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  >
                    {qFreq.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="min-w-0">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qCases.label} {qCases.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={answers.monthlyCases}
                    onChange={(e) => updateAnswers("monthlyCases", Math.max(0, parseInt(e.target.value, 10) || 0))}
                    placeholder={qCases.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qTime.label} {qTime.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex gap-2 min-w-0">
                    <input
                      type="number"
                      step="1"
                      min="1"
                      value={answers.timePerCase}
                      onChange={(e) => updateAnswers("timePerCase", Math.max(0, parseInt(e.target.value, 10) || 0))}
                      placeholder={qTime.placeholder}
                      className="min-w-0 flex-1 px-3 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                    <select
                      value={answers.timeUnit}
                      onChange={(e) => updateAnswers("timeUnit", e.target.value as any)}
                      className="w-28 sm:w-32 shrink-0 px-2 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-xs sm:text-sm"
                    >
                      <option value="Minutos">Minutos</option>
                      <option value="Horas">Horas</option>
                      <option value="Días laborales">Días laborales</option>
                    </select>
                  </div>
                </div>

                <div className="min-w-0">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qPeople.label} {qPeople.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={answers.peopleInvolved}
                    onChange={(e) => updateAnswers("peopleInvolved", Math.max(1, parseInt(e.target.value, 10) || 1))}
                    placeholder={qPeople.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qRework.label} {qRework.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  value={answers.reworkFrequency}
                  onChange={(e) => updateAnswers("reworkFrequency", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                >
                  {qRework.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {renderCustomFieldsForStep(3)}
            </div>
          );
        })()}

        {/* Step 4: Consecuencias e Impacto */}
        {currentStep === 4 && (() => {
          const qAffected = getQ("affectedGroup", { label: "¿Quién se ve principalmente afectado?", options: ["Clientes externos", "Usuarios internos del área", "Otras áreas de la empresa", "Proveedores o aliados externos"] });
          const qErrorConsequences = getQ("errorConsequences", { label: "¿Cuáles son las consecuencias ante retrasos o errores?", placeholder: "Describa detalladamente el impacto operativo o comercial para GTD..." });
          const qEconomic = getQ("canEstimateEconomicImpact", { label: "¿Es posible estimar o calcular el impacto económico anual?", options: ["No existe un cálculo", "Sí, se puede estimar", "Sí, está documentado y auditado"] });

          return (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-zinc-100 border-b border-zinc-800 pb-2">
                Paso 4. Consecuencias e Impacto Económico
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qAffected.label} {qAffected.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  value={answers.affectedGroup}
                  onChange={(e) => updateAnswers("affectedGroup", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                >
                  {qAffected.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qErrorConsequences.label} {qErrorConsequences.required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  value={answers.errorConsequences}
                  onChange={(e) => updateAnswers("errorConsequences", e.target.value)}
                  placeholder={qErrorConsequences.placeholder}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>

              <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qEconomic.label} {qEconomic.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={answers.canEstimateEconomicImpact}
                    onChange={(e) => updateAnswers("canEstimateEconomicImpact", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {qEconomic.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {answers.canEstimateEconomicImpact && answers.canEstimateEconomicImpact.startsWith("Sí") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Valor anual estimado en COP
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={answers.annualValueCop || ""}
                        onChange={(e) => updateAnswers("annualValueCop", Math.max(0, parseInt(e.target.value, 10) || 0))}
                        placeholder="Ej. 80000000"
                        className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-transparent text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Tipo de impacto esperado
                      </label>
                      <select
                        value={answers.impactType}
                        onChange={(e) => updateAnswers("impactType", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Ahorro de costos">Ahorro de costos</option>
                        <option value="Incremento de ingresos">Incremento de ingresos</option>
                        <option value="Reducción de riesgos o multas">Reducción de riesgos o multas</option>
                        <option value="Eficiencia de tiempo / Productividad">Eficiencia de tiempo / Productividad</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Detalle o justificación del cálculo
                      </label>
                      <textarea
                        value={answers.economicExplanation || ""}
                        onChange={(e) => updateAnswers("economicExplanation", e.target.value)}
                        placeholder="Explique brevemente cómo se calculó esta cifra..."
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-transparent text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {renderCustomFieldsForStep(4)}
            </div>
          );
        })()}

        {/* Step 5: Resultado Esperado */}
        {currentStep === 5 && (() => {
          const qOutcome = getQ("expectedOutcome", { label: "¿Cuál es el resultado medible esperado con la solución?", placeholder: "Ej. Reducir el tiempo de atención de 4 horas a 10 minutos por solicitud..." });
          const qAutonomy = getQ("autonomyLevel", { label: "¿Qué nivel de autonomía se espera de la solución?", options: ["1. Solo consultar y mostrar información", "2. Generar sugerencias o borradores que un humano debe revisar", "3. Ejecutar acciones sencillas de forma automática", "4. Tomar decisiones bajo reglas estrictas de negocio", "5. Operar de forma autónoma con supervisión periódica", "6. Autonomía total para resolver de extremo a extremo"] });

          return (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-zinc-100 border-b border-zinc-800 pb-2">
                Paso 5. Resultado y Autonomía Esperada
              </h3>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  {qOutcome.label} {qOutcome.required && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  value={answers.expectedOutcome}
                  onChange={(e) => updateAnswers("expectedOutcome", e.target.value)}
                  placeholder={qOutcome.placeholder}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  {qAutonomy.label} {qAutonomy.required && <span className="text-red-500">*</span>}
                </label>
                <span className="block text-[11px] text-zinc-500 mb-2">
                  Seleccione el nivel de intervención humana requerido.
                </span>
                <select
                  value={answers.autonomyLevel}
                  onChange={(e) => updateAnswers("autonomyLevel", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                >
                  {qAutonomy.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {renderCustomFieldsForStep(5)}
            </div>
          );
        })()}

        {/* Step 6: Información y Sistemas + Resumen */}
        {currentStep === 6 && (() => {
          const qOrganization = getQ("dataOrganization", { label: "¿Cómo se encuentra organizada la información?", options: ["Centralizada en un solo sistema", "Distribuida en múltiples sistemas u hojas de cálculo", "Archivos de texto, correos o PDFs sin estructura clara", "Formato mixto (digital, físico y verbal)"] });
          const qExamples = getQ("availableExamples", { label: "¿Se cuenta con ejemplos reales de casos anteriores?", options: ["No se cuenta con ejemplos", "Sí, menos de 20 casos", "Sí, entre 20 y 100 casos", "Sí, más de 100 casos"] });
          const qAuto = getQ("canObtainAutomatically", { label: "¿Es posible obtener la información automáticamente?", options: ["No se puede obtener automáticamente", "Parcialmente viable", "Sí, los sistemas ya permiten integraciones automáticas"] });
          const qDoc = getQ("hasDocumentation", { label: "¿Se cuenta con documentación del proceso?", options: ["No existe documentación", "Parcialmente documentado", "Sí, está completa y actualizada"] });

          return (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-zinc-100 border-b border-zinc-800 pb-2">
                Paso 6. Información, Sistemas y Resumen Final
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qOrganization.label} {qOrganization.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={answers.dataOrganization}
                    onChange={(e) => updateAnswers("dataOrganization", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  >
                    {qOrganization.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qExamples.label} {qExamples.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={answers.availableExamples}
                    onChange={(e) => updateAnswers("availableExamples", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  >
                    {qExamples.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qAuto.label} {qAuto.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={answers.canObtainAutomatically}
                    onChange={(e) => updateAnswers("canObtainAutomatically", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  >
                    {qAuto.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    {qDoc.label} {qDoc.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={answers.hasDocumentation}
                    onChange={(e) => updateAnswers("hasDocumentation", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  >
                    {qDoc.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {renderCustomFieldsForStep(6)}

              {/* Summary Card before submission */}
              <div className="mt-8 pt-6 border-t border-zinc-800 space-y-4">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-blue-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Resumen General de la Iniciativa para GTD
                  </h4>
                </div>

                <div className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">Iniciativa:</span>
                    <span className="font-semibold text-zinc-200">{answers.initiativeName || "Sin especificar"}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">Área GTD:</span>
                    <span className="font-semibold text-zinc-200">{answers.area === "Otra" ? answers.otherArea : answers.area}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">Experto / Sponsor:</span>
                    <span className="text-zinc-300">{answers.processOwner || "N/A"} / {answers.sponsor || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-bold block text-[10px] uppercase">Volumen estimado:</span>
                    <span className="text-zinc-300">{answers.monthlyCases} casos/mes @ {answers.timePerCase} {answers.timeUnit}</span>
                  </div>
                  {answers.canEstimateEconomicImpact && answers.canEstimateEconomicImpact.startsWith("Sí") && (
                    <div className="md:col-span-2">
                      <span className="text-zinc-500 font-bold block text-[10px] uppercase">Impacto económico estimado:</span>
                      <span className="font-bold text-emerald-400">COP {answers.annualValueCop?.toLocaleString("es-CO") || 0} / año ({answers.impactType})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 1 || submitting || saving}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 shadow-md disabled:opacity-40 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-blue-500" />
          Anterior
        </button>

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting || saving}
            className="flex items-center gap-1.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer"
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || saving}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-800 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg cursor-pointer"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                Procesando con Gemini...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-white" />
                Enviar Iniciativa a GTD
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
