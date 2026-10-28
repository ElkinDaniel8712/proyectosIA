export interface FormQuestionConfig {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "multiselect" | "textarea" | "email";
  options?: string[];
  required: boolean;
  step: number;
  order: number;
  isCore: boolean;
  helpText?: string;
  placeholder?: string;
}

export const INITIAL_QUESTIONS: FormQuestionConfig[] = [
  // Paso 1: Información General
  {
    id: "initiativeName",
    label: "Nombre de la iniciativa o proyecto",
    type: "text",
    required: true,
    step: 1,
    order: 1,
    isCore: true,
    placeholder: "Ej. Automatización de conciliación de facturas",
    helpText: "Debe ser conciso e identificar claramente el objetivo.",
  },
  {
    id: "area",
    label: "Área de GTD que presenta la iniciativa",
    type: "select",
    options: ["Comercial", "Operaciones", "Tecnología", "Finanzas", "Servicio al Cliente", "Recursos Humanos", "Legal", "Otra"],
    required: true,
    step: 1,
    order: 2,
    isCore: true,
    helpText: "Área organizativa de GTD.",
  },
  {
    id: "processOwner",
    label: "Correo solicitante",
    type: "email",
    required: true,
    step: 1,
    order: 3,
    isCore: true,
    placeholder: "solicitante@empresa.com",
    helpText: "Correo del solicitante o experto funcional del proceso.",
  },
  {
    id: "sponsor",
    label: "¿Quién es el líder del área que respalda la iniciativa?",
    type: "text",
    required: true,
    step: 1,
    order: 4,
    isCore: true,
    placeholder: "Ej. Carlos Mendoza",
    helpText: "Nombre del líder del área con potestad para autorizar e impulsar la iniciativa.",
  },
  {
    id: "processActivity",
    label: "¿Qué proceso o actividad desea mejorar?",
    type: "text",
    required: true,
    step: 1,
    order: 5,
    isCore: true,
    placeholder: "Ej. renovación de contratos, validación de servicios, facturación.",
  },

  // Paso 2: Problema y Situación Actual
  {
    id: "currentProblem",
    label: "¿Qué problema ocurre actualmente en este proceso?",
    type: "textarea",
    required: true,
    step: 2,
    order: 1,
    isCore: true,
    placeholder: "Explique el problema (mínimo 50 caracteres). Describa la ineficiencia operativa...",
    helpText: "Mínimo 50 caracteres.",
  },
  {
    id: "finalResult",
    label: "¿Cuál es el resultado final esperado actualmente?",
    type: "text",
    required: true,
    step: 2,
    order: 2,
    isCore: true,
    placeholder: "Ej. Registro completado en sistema GTD, confirmación al cliente",
  },
  {
    id: "standardizationLevel",
    label: "¿Cuál es el nivel de estandarización del proceso?",
    type: "select",
    options: [
      "No está estandarizado y cada persona lo realiza de forma diferente",
      "Está parcialmente estandarizado pero tiene muchas excepciones",
      "Está documentado y siempre se ejecuta de la misma manera",
      "Está altamente automatizado y estandarizado"
    ],
    required: true,
    step: 2,
    order: 4,
    isCore: true,
  },

  // Paso 3: Volumen y Esfuerzo Operativo
  {
    id: "frequency",
    label: "¿Con qué frecuencia se ejecuta este proceso?",
    type: "select",
    options: [
      "Continuamente",
      "Varias veces al día",
      "Una vez al día",
      "Semanalmente",
      "Mensualmente",
      "Por temporadas específicas"
    ],
    required: true,
    step: 3,
    order: 1,
    isCore: true,
  },
  {
    id: "monthlyCases",
    label: "Casos o transacciones que se gestionan al mes",
    type: "number",
    required: true,
    step: 3,
    order: 2,
    isCore: true,
    placeholder: "0",
  },
  {
    id: "timePerCase",
    label: "Tiempo promedio que toma procesar un solo caso",
    type: "number",
    required: true,
    step: 3,
    order: 3,
    isCore: true,
    placeholder: "0",
  },
  {
    id: "timeUnit",
    label: "Unidad de medida del tiempo",
    type: "select",
    options: ["Minutos", "Horas", "Días laborales"],
    required: true,
    step: 3,
    order: 4,
    isCore: true,
  },
  {
    id: "peopleInvolved",
    label: "Número de personas que participan en el proceso",
    type: "number",
    required: true,
    step: 3,
    order: 5,
    isCore: true,
    placeholder: "1",
  },
  {
    id: "reworkFrequency",
    label: "Frecuencia de reprocesos o corrección de errores",
    type: "select",
    options: [
      "Menos del 5 % de los casos",
      "Entre el 5 % y el 15 % de los casos",
      "Más del 15 % de los casos"
    ],
    required: true,
    step: 3,
    order: 6,
    isCore: true,
  },

  // Paso 4: Consecuencias e Impacto Económico
  {
    id: "affectedGroup",
    label: "¿Quién se ve principalmente afectado por las ineficiencias o retrasos?",
    type: "select",
    options: [
      "Clientes externos",
      "Usuarios internos del área",
      "Otras áreas de la empresa",
      "Proveedores o aliados externos"
    ],
    required: true,
    step: 4,
    order: 1,
    isCore: true,
  },
  {
    id: "errorConsequences",
    label: "¿Cuáles son las consecuencias ante retrasos o errores en la ejecución?",
    type: "textarea",
    required: true,
    step: 4,
    order: 2,
    isCore: true,
    placeholder: "Describa detalladamente qué ocurre si hay errores o retrasos en GTD...",
  },
  {
    id: "canEstimateEconomicImpact",
    label: "¿Es posible estimar o calcular el impacto económico anual de esta ineficiencia?",
    type: "select",
    options: [
      "No existe un cálculo",
      "Sí, se puede estimar",
      "Sí, está documentado y auditado"
    ],
    required: true,
    step: 4,
    order: 3,
    isCore: true,
  },
  {
    id: "annualValueCop",
    label: "Impacto económico estimado anual",
    type: "number",
    required: false,
    step: 4,
    order: 4,
    isCore: true,
    placeholder: "0",
  },
  {
    id: "impactType",
    label: "Tipo de impacto esperado",
    type: "select",
    options: [
      "Ahorro de costos",
      "Incremento de ingresos",
      "Reducción de riesgos o multas",
      "Eficiencia de tiempo / Productividad"
    ],
    required: false,
    step: 4,
    order: 5,
    isCore: true,
  },
  {
    id: "economicExplanation",
    label: "Detalle o justificación del impacto económico estimado",
    type: "textarea",
    required: false,
    step: 4,
    order: 6,
    isCore: true,
    placeholder: "Ej. Horas de personal dedicadas a tareas manuales que podrían reasignarse...",
  },

  // Paso 5: Resultado y Autonomía Esperada
  {
    id: "expectedOutcome",
    label: "¿Cuál es el resultado medible esperado con la solución?",
    type: "textarea",
    required: true,
    step: 5,
    order: 1,
    isCore: true,
    placeholder: "Ej. Reducir el tiempo de atención de 4 horas a 10 minutos...",
  },
  {
    id: "autonomyLevel",
    label: "¿Qué nivel de autonomía se espera de la solución?",
    type: "select",
    options: [
      "1. Solo consultar y mostrar información",
      "2. Generar sugerencias o borradores que un humano debe revisar",
      "3. Ejecutar acciones sencillas de forma automática",
      "4. Tomar decisiones bajo reglas estrictas de negocio",
      "5. Operar de forma autónoma con supervisión periódica",
      "6. Autonomía total para resolver de extremo a extremo"
    ],
    required: true,
    step: 5,
    order: 2,
    isCore: true,
  },

  // Paso 6: Información, Sistemas y Documentación
  {
    id: "dataOrganization",
    label: "¿Cómo se encuentra organizada la información del proceso?",
    type: "select",
    options: [
      "Centralizada en un solo sistema",
      "Distribuida en múltiples sistemas u hojas de cálculo",
      "Archivos de texto, correos o PDFs sin estructura clara",
      "Formato mixto (digital, físico y verbal)"
    ],
    required: true,
    step: 6,
    order: 1,
    isCore: true,
  },
  {
    id: "availableExamples",
    label: "¿Se cuenta con ejemplos reales de casos anteriores?",
    type: "select",
    options: [
      "No se cuenta con ejemplos",
      "Sí, menos de 20 casos",
      "Sí, entre 20 y 100 casos",
      "Sí, más de 100 casos"
    ],
    required: true,
    step: 6,
    order: 2,
    isCore: true,
  },
  {
    id: "canObtainAutomatically",
    label: "¿Es posible obtener la información de entrada de forma automática?",
    type: "select",
    options: [
      "No se puede obtener automáticamente",
      "Parcialmente viable",
      "Sí, los sistemas ya permiten integraciones automáticas"
    ],
    required: true,
    step: 6,
    order: 3,
    isCore: true,
  },
  {
    id: "hasDocumentation",
    label: "¿Se cuenta con documentación del proceso?",
    type: "select",
    options: [
      "No existe documentación",
      "Parcialmente documentado",
      "Sí, está completa y actualizada"
    ],
    required: true,
    step: 6,
    order: 4,
    isCore: true,
  },
];
