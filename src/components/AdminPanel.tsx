import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FormQuestionConfig } from "../lib/initialQuestions";
import { UserProfile, UserRole } from "../types";
import { calculateProjectScore } from "../scoring";
import {
  Users,
  Sliders,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  UserPlus,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  FileText,
  Save,
  Grid,
  Sparkles,
  Database,
} from "lucide-react";

interface AdminPanelProps {
  questions: FormQuestionConfig[];
  allUsers: UserProfile[];
  userProfile: UserProfile | null;
  onToggleUserStatus: (userId: string, currentActive: boolean) => void;
  writeAuditLog: (action: string, details: string) => Promise<void>;
}

interface PreapprovedUser {
  email: string;
  name: string;
  role: UserRole;
  area: string;
  password?: string;
  createdAt: string;
}

export const DEMO_PROJECTS_DATA = [
  {
    id: "demo_claro_interconexion",
    initiativeName: "Conciliación de Tráfico de Interconexión Internacional",
    area: "Finanzas",
    requesterId: "demo_user_diana",
    requesterEmail: "diana.pinzon@claro.com.co",
    processOwner: "Diana Carolina Pinzón",
    sponsor: "Mauricio Tobón (Gerente de Facturación)",
    status: "Analizado por IA",
    answers: {
      initiativeName: "Conciliación de Tráfico de Interconexión Internacional",
      area: "Finanzas",
      processOwner: "Diana Carolina Pinzón",
      sponsor: "Mauricio Tobón (Gerente de Facturación)",
      processActivity: "Cruce mensual de registros de llamadas internacionales (CDRs) con operadores internacionales para facturación.",
      currentProblem: "El cruce de gigabytes de llamadas se realiza manualmente en Excel/Access. Toma de 10 a 15 días, impidiendo radicar disputas contractuales a tiempo (el límite son 60 días), provocando pérdidas de ingresos y retrasos.",
      trigger: "Recepción de factura mensual del operador aliado",
      finalResult: "Factura aprobada o disputa radicada",
      standardizationLevel: "Está documentado y siempre se ejecuta de la misma manera",
      steps: [
        { number: 1, description: "Descargar archivos de CDR de Claro y del aliado", responsible: "Analista de Facturación", system: "Sistemas de Red / Servidor FTP" },
        { number: 2, description: "Aplicar formato de datos y consolidar tarifas de contratos vigentes", responsible: "Analista de Facturación", system: "Excel" },
        { number: 3, description: "Realizar cruces de llamadas de forma manual o con macros de Access", responsible: "Analista de Facturación", system: "Access / Excel" },
        { number: 4, description: "Reportar discrepancias mediante correo formal", responsible: "Analista de Facturación", system: "Outlook" }
      ],
      frequency: "Mensual",
      monthlyCases: 24,
      timePerCase: 14,
      timeUnit: "Horas",
      peopleInvolved: 2,
      reworkFrequency: "Frecuentemente",
      consequences: ["Sobrecostos", "Pérdida o retraso de ingresos", "Riesgo contractual", "Dificultad para atender un mayor volumen"],
      affectedGroup: "Toda la compañía",
      errorConsequences: "Pérdidas económicas severas al vencer el plazo de 60 días para objeciones contractuales.",
      hasDeadline: "Sí, por un compromiso contractual",
      deadlineDate: "2026-12-31",
      deadlineExplanation: "Los contratos vigentes con operadores internacionales estipulan un término perentorio de 60 días para objetar cargos.",
      canEstimateEconomicImpact: "Sí, existe un cálculo documentado",
      annualValueCop: 1200000000,
      impactType: "Ahorro de costos / Recuperación de ingresos",
      economicExplanation: "Pérdidas acumuladas anuales de COP 1.200 millones debido a disputas no presentadas o rechazadas por vencimiento de término.",
      expectedSolutionActions: ["Consultar bases de datos", "Comparar información de diferentes fuentes", "Calcular valores y verificar cálculos", "Generar reportes y alertas"],
      expectedOutcome: "Automatizar el cruce de datos en un 100%, reduciendo el tiempo de proceso a menos de 1 hora.",
      autonomyLevel: "4. Ejecutar una acción después de recibir aprobación humana",
      mandatoryHumanIntervention: ["Antes de enviar información a entidades externas"],
      escalationRule: "Si la discrepancia es superior a COP 50 millones, notificar a la Dirección de Impuestos y Legal.",
      dataSources: ["Bases de datos (SQL, Oracle, etc.)", "Archivos Excel / CSV", "Sistemas de Claro (SAP, Minerva)"],
      dataOrganization: "Organizada en archivos o bases de datos",
      availableExamples: "Sí, más de 100 casos",
      dataType: ["Información financiera", "Contratos", "Información interna"],
      errorImpactLevel: "4. Pérdida económica",
      hasAccessAuthorization: "Sí, ya cuenta con todos los accesos",
      canObtainAutomatically: "Sí, los sistemas ya permiten integraciones automáticas",
      hasDocumentation: "Sí, está completa y actualizada",
      expertAvailability: "Sí, cuatro o más horas por semana",
      pilotAuthorization: "Sí",
      safeTestingEnvironment: "Sí, existe un ambiente de pruebas",
      successMetric: "Reducción del tiempo",
      metricDetails: { indicator: "Tiempo de radicación de disputas", currentValue: "45", targetValue: "5", unit: "Días", source: "Sistemas de Auditoría de Interconexión" }
    },
    attachments: [],
    analysis: {
      id: "analysis_claro_interconexion",
      projectId: "demo_claro_interconexion",
      model: "gemini-3.6-flash",
      structuredAnalysis: {
        resumenEjecutivo: "Automatización del proceso crítico de conciliación de llamadas e interconexión con operadores globales mediante un agente inteligente capaz de consolidar CDRs y cruzarlos contra anexos contractuales.",
        problemaPrincipal: "Cruce manual ineficiente de altos volúmenes de llamadas que demora de 10 a 15 días, impidiendo reclamar disputas antes de vencer el plazo contractual.",
        procesoActual: "Carga y cruce manual en Excel/Access por parte de un analista especializado con alta probabilidad de omisiones operativas.",
        consequencesPrincipales: ["Pérdidas de ingresos estimadas en COP 1.200M anuales", "Disputas vencidas", "Sobrecostos tarifarios no detectados"],
        volumenYEsfuerzo: { casosMensuales: 24, minutosPorCaso: 840, horasAnualesEstimadas: 336, personasParticipantes: 2, nivelReproceso: "Frecuentemente" },
        impacto: { descripcion: "Alto impacto financiero y de flujo de caja para Claro Colombia.", impactoEconomicoReportado: 1200000000, tipoImpactoEconomico: "Ahorro de costos / Recuperación de ingresos", nivelEvidencia: "documentado", afectacionClientes: "Baja afectación a cliente final, pero alta afectación corporativa.", riesgosActuales: ["Vencimiento de plazos legales de reclamo", "Pago de tarifas sobrefacturadas"] },
        resultadoEsperado: "Lograr la conciliación del 100% de operadores en menos de 1 hora, agilizando la radicación de disputas en los primeros 5 días hábiles.",
        tipoSolucionRecomendada: "agente_con_aprobacion",
        justificacionTipoSolucion: "Dada la sensibilidad financiera y la interacción con operadores internacionales, se sugiere un agente que extraiga y concilie automáticamente, requiriendo aprobación humana antes de firmar y radicar disputas formales.",
        aptitudParaAgente: "alta",
        complejidadEstimada: "media",
        nivelRiesgo: "alto",
        beneficiosEsperados: ["Recuperación directa de hasta COP 1.200 millones anuales", "Liberación del 95% del tiempo de los analistas", "Auditoría del 100% del tráfico sin muestreo"],
        riesgosImplementacion: ["Cambio repentino en las plantillas de CDR de los operadores aliados", "Seguridad en la transmisión de datos financieros"],
        dependencias: ["APIs de acceso a bases de datos Minerva y servidores FTP de tráfico"],
        informacionFaltante: ["Ninguna, el proceso está completamente documentado y estandarizado"],
        preguntasParaElArea: ["¿Los formatos de los aliados varían frecuentemente o siguen la especificación estándar de la GSMA?"],
        recomendaciones: ["Iniciar piloto integrando solo los dos aliados con mayor volumen de disputas históricas.", "Anonimizar números de teléfono de clientes en el ambiente de pruebas."],
        siguientePasoRecomendado: "Construcción de conectores automáticos FTP para descarga de CDRs de Telefónica y AT&T en ambiente de sandbox.",
        confianzaAnalisis: 0.95,
        evidencias: []
      }
    }
  },
  {
    id: "demo_claro_enlaces",
    initiativeName: "Diagnóstico Inteligente de Enlaces Dedicados B2B",
    area: "Operaciones",
    requesterId: "demo_user_carlos",
    requesterEmail: "carlos.mendoza@claro.com.co",
    processOwner: "Carlos Mendoza",
    sponsor: "Liliana Restrepo (Directora de Operaciones de Red)",
    status: "Analizado por IA",
    answers: {
      initiativeName: "Diagnóstico Inteligente de Enlaces Dedicados B2B",
      area: "Operaciones",
      processOwner: "Carlos Mendoza",
      sponsor: "Liliana Restrepo (Directora de Operaciones de Red)",
      processActivity: "Atención técnica primaria y diagnóstico inicial de caídas de enlaces de datos de clientes corporativos (pymes y grandes empresas).",
      currentProblem: "Los ingenieros de soporte dedican entre 20 y 30 minutos por incidente realizando pruebas básicas manuales (ping, traceroute, estado de puertos en routers, validación de corte de fibra). Esto genera cuellos de botella severos, aumentando el MTTR (tiempo medio de reparación) y ocasionando penalidades por incumplimiento de SLAs corporativos.",
      trigger: "Apertura de ticket de soporte por caída de enlace dedicada",
      finalResult: "Diagnóstico clasificado y escalamiento inmediato con pruebas adjuntas al área técnica correcta.",
      standardizationLevel: "Está documentado y siempre se ejecuta de la misma manera",
      steps: [
        { number: 1, description: "Recibir notificación del ticket en la cola de soporte", responsible: "Ingeniero de Soporte L1", system: "Remedy" },
        { number: 2, description: "Consultar dirección IP del router del cliente e ingresar por consola", responsible: "Ingeniero de Soporte L1", system: "Consola de Comandos (SSH)" },
        { number: 3, description: "Ejecutar pings y verificar tablas de enrutamiento y estado físico de la interfaz", responsible: "Ingeniero de Soporte L1", system: "Terminal de Red" },
        { number: 4, description: "Documentar resultados en el ticket y escalar al área de campo o de transmisión", responsible: "Ingeniero de Soporte L1", system: "Remedy" }
      ],
      frequency: "Diario",
      monthlyCases: 1500,
      timePerCase: 25,
      timeUnit: "Minutos",
      peopleInvolved: 12,
      reworkFrequency: "Raras veces",
      consequences: ["Retrasos en la atención", "Incumplimiento de tiempos acordados", "Afectación a clientes", "Riesgo contractual"],
      affectedGroup: "Clientes externos",
      errorConsequences: "Afectación grave a la operación de grandes empresas clientes de Claro y cobro de penalidades financieras millonarias estipuladas en contratos.",
      hasDeadline: "Sí, por un compromiso contractual",
      deadlineDate: "2026-10-15",
      deadlineExplanation: "Los contratos corporativos de Claro exigen tiempos de diagnóstico menores a 15 minutos para evitar penalidades de reembolso automático.",
      canEstimateEconomicImpact: "Sí, existe una estimación aproximada",
      annualValueCop: 450000000,
      impactType: "Ahorro de costos / Reducción de penalidades",
      economicExplanation: "Se pagan aproximadamente COP 450 millones anuales en créditos y descuentos a clientes corporativos por caídas de SLA de diagnóstico.",
      expectedSolutionActions: ["Consultar bases de datos", "Interactuar con sistemas externos (APIs, SSH, etc.)", "Generar reportes y alertas", "Actualizar estados en sistemas corporativos"],
      expectedOutcome: "Realizar el diagnóstico básico automático de caídas de enlaces en menos de 2 minutos para el 85% de los casos.",
      autonomyLevel: "5. Ejecutar automáticamente únicamente casos sencillos",
      mandatoryHumanIntervention: ["Antes de realizar cambios físicos en la configuración de la red"],
      escalationRule: "Si el enlace es de un cliente nivel 'Gold/Platinium' y no responde a comandos de red, alertar de inmediato al NOC central de Claro.",
      dataSources: ["Bases de datos (SQL, Oracle, etc.)", "Sistemas de red (Zabbix, Cacti, Cisco Works)", "Sistemas de Claro (SAP, Minerva)"],
      dataOrganization: "Centralizada en un solo sistema",
      availableExamples: "Sí, más de 100 casos",
      dataType: ["Información interna", "Información de clientes", "Credenciales o contraseñas"],
      errorImpactLevel: "5. Incumplimiento contractual",
      hasAccessAuthorization: "Sí, ya cuenta con todos los accesos",
      canObtainAutomatically: "Sí, los sistemas ya permiten integraciones automáticas",
      hasDocumentation: "Sí, está completa y actualizada",
      expertAvailability: "Sí, cuatro o más horas por semana",
      pilotAuthorization: "Sí",
      safeTestingEnvironment: "Sí, existe un ambiente de pruebas",
      successMetric: "Reducción del tiempo",
      metricDetails: { indicator: "MTTR de diagnóstico (Tiempo medio)", currentValue: "25", targetValue: "2", unit: "Minutos", source: "SLA Tracker Remedy" }
    },
    attachments: [],
    analysis: {
      id: "analysis_claro_enlaces",
      projectId: "demo_claro_enlaces",
      model: "gemini-3.6-flash",
      structuredAnalysis: {
        resumenEjecutivo: "Implementación de un agente inteligente de operaciones de red que interactúe por API/SSH con los routers de clientes corporativos para diagnosticar de forma inmediata fallas en enlaces de fibra dedicados.",
        problemaPrincipal: "Lentitud de diagnóstico primario (25 minutos promedio) que excede el tiempo máximo de SLA, ocasionando altos pagos de penalidades a empresas.",
        procesoActual: "Ingenieros realizan diagnósticos repetitivos manuales en consola Remedy y CLI de routers ante cada ticket reportado.",
        consequencesPrincipales: ["Pago de penalidades de COP 450M anuales", "Afectación de satisfacción del cliente corporativo", "Saturación del equipo técnico L1"],
        volumenYEsfuerzo: { casosMensuales: 1500, minutosPorCaso: 25, horasAnualesEstimadas: 7500, personasParticipantes: 12, nivelReproceso: "Raras veces" },
        impacto: { descripcion: "Altísimo impacto en eficiencia operativa y satisfacción del segmento corporativo Claro.", impactoEconomicoReportado: 450000000, tipoImpactoEconomico: "Reducción de penalidades por SLA", nivelEvidencia: "estimado", afectacionClientes: "Alta. Los clientes reciben un servicio de respuesta inmediata ante caídas.", riesgosActuales: ["Pérdida de cuentas corporativas por mal servicio", "Pérdida financiera recurrente"] },
        resultadoEsperado: "Lograr diagnósticos básicos automatizados en 2 minutos, liberando al soporte para tareas complejas.",
        tipoSolucionRecomendada: "agente_parcialmente_autonomo",
        justificacionTipoSolucion: "Un agente autónomo que se active con el trigger del ticket, corra pruebas de ping y de puertos en segundos, e indexe el resultado en Remedy es la solución idónea.",
        aptitudParaAgente: "alta",
        complejidadEstimada: "alta",
        nivelRiesgo: "alto",
        beneficiosEsperados: ["Ahorro directo de COP 450M anuales en penalidades", "Liberación de 7.500 horas de ingenieros especializados al año", "Resolución en minutos de fallas lógicas comunes"],
        riesgosImplementacion: ["Habilitar credenciales de SSH en el agente (riesgo de seguridad lógicas)", "Saturación del procesador del router por consultas concurrentes"],
        dependencias: ["Integración API con Remedy", "Accesos SSH seguros restringidos por IP a routers corporativos"],
        informacionFaltante: ["Ninguna, el proceso está completamente estandarizado y documentado"],
        preguntasParaElArea: ["¿El agente requiere credenciales de lectura únicamente o se requiere que aplique cambios como apagar/encender el puerto del router en el cliente?"],
        recomendaciones: ["Empezar con un piloto de solo lectura (diagnóstico sin escritura).", "Utilizar SSH Keys almacenadas de forma segura y rotativas."],
        siguientePasoRecomendado: "Configurar credenciales de lectura en el sandbox de pruebas para 5 routers de prueba e implementar el script de diagnóstico.",
        confianzaAnalisis: 0.90,
        evidencias: []
      }
    }
  },
  {
    id: "demo_claro_descuentos",
    initiativeName: "Auditoría de Descuentos en Contratos B2B Multilínea",
    area: "Finanzas",
    requesterId: "demo_user_jorge",
    requesterEmail: "jorge.lopez@claro.com.co",
    processOwner: "Jorge Eliecer López",
    sponsor: "Mauricio Tobón (Gerente de Facturación)",
    status: "Analizado por IA",
    answers: {
      initiativeName: "Auditoría de Descuentos en Contratos B2B Multilínea",
      area: "Finanzas",
      processOwner: "Jorge Eliecer López",
      sponsor: "Mauricio Tobón (Gerente de Facturación)",
      processActivity: "Auditoría mensual de tarifas y descuentos comerciales aplicados a clientes corporativos que firmaron ofertas comerciales personalizadas en PDF.",
      currentProblem: "Los descuentos corporativos se pactan en contratos PDF adjuntos. La facturación aplica tarifas estándar y los analistas de finanzas deben auditar manualmente que coincidan con las cláusulas contractuales complejas (descuentos por volumen, tarifas escalonadas). Al mes se analizan solo un 5% de los contratos, generando fugas masivas de ingresos por descuentos omitidos (quejas del cliente) o cobros menores por error.",
      trigger: "Emisión de la pre-facturación mensual corporativa",
      finalResult: "Pre-factura corregida con descuentos correctos aplicados o informe de conformidad.",
      standardizationLevel: "Generalmente es igual, pero presenta algunas excepciones",
      steps: [
        { number: 1, description: "Recuperar el archivo PDF del contrato firmado en el repositorio", responsible: "Analista de Finanzas", system: "Onedrive / SharePoint" },
        { number: 2, description: "Buscar las cláusulas de tarifas y de descuentos multilínea", responsible: "Analista de Finanzas", system: "PDF Reader" },
        { number: 3, description: "Descargar el reporte de cobros pre-facturados de Minerva", responsible: "Analista de Finanzas", system: "Minerva" },
        { number: 4, description: "Comparar en Excel tarifa contractual vs tarifa cobrada, buscando inconsistencias", responsible: "Analista de Finanzas", system: "Excel" },
        { number: 5, description: "Escalar errores de facturación al área de sistemas", responsible: "Analista de Finanzas", system: "Correo" }
      ],
      frequency: "Mensual",
      monthlyCases: 80,
      timePerCase: 3,
      timeUnit: "Horas",
      peopleInvolved: 3,
      reworkFrequency: "Frecuentemente",
      consequences: ["Sobrecostos", "Pérdida o retraso de ingresos", "Afectación a clientes", "Riesgo contractual"],
      affectedGroup: "Clientes externos",
      errorConsequences: "Fugas millonarias de facturación o incremento de quejas corporativas y demandas por cobros indebidos.",
      hasDeadline: "No existe una fecha obligatoria",
      canEstimateEconomicImpact: "Sí, existe una estimación aproximada",
      annualValueCop: 680000000,
      impactType: "Ahorro de costos / Fugas de ingresos",
      economicExplanation: "Se estiman pérdidas anuales por COP 680 millones causadas por cobros indebidos no auditados o retrasos en reembolsos comerciales.",
      expectedSolutionActions: ["Procesar y clasificar documentos (PDF, Excel, etc.)", "Comparar información de diferentes fuentes", "Calcular valores y verificar cálculos", "Generar reportes y alertas"],
      expectedOutcome: "Procesar el 100% de los contratos mensuales corporativos (80 contratos de alto volumen) mediante lectura inteligente de PDF, logrando auditoría automatizada en menos de 24 horas.",
      autonomyLevel: "4. Ejecutar una acción después de recibir aprobación humana",
      mandatoryHumanIntervention: ["Antes de aplicar notas de crédito o cambiar valores en la factura"],
      escalationRule: "Si la discrepancia contractual es superior al 15% del valor de la cuenta, escalar a la Dirección Comercial de Empresas.",
      dataSources: ["Bases de datos (SQL, Oracle, etc.)", "Archivos Excel / CSV", "Sistemas de Claro (SAP, Minerva)", "Repositorios de documentos (Sharepoint, Drive)"],
      dataOrganization: "Principalmente en correos y documentos",
      availableExamples: "Sí, entre 30 y 100 casos",
      dataType: ["Información financiera", "Contratos", "Información de clientes"],
      errorImpactLevel: "4. Pérdida económica",
      hasAccessAuthorization: "Cuenta con algunos accesos, pero faltan otros",
      canObtainAutomatically: "Sí, puede obtenerse mediante archivos o reportes",
      hasDocumentation: "Existe documentación parcial",
      expertAvailability: "Sí, entre dos y cuatro horas por semana",
      pilotAuthorization: "Sí, sujeto a algunas condiciones",
      pilotConditions: "Validar que la lectura del LLM sobre los PDF del contrato tenga un acierto verificado mayor al 95% antes de implementarlo en producción.",
      safeTestingEnvironment: "Sí, existe un ambiente de pruebas",
      successMetric: "Ahorro de costos / Reducción de errores",
      metricDetails: { indicator: "Porcentaje de contratos auditados al mes", currentValue: "5", targetValue: "100", unit: "%", source: "Informes de Auditoría Financiera" }
    },
    attachments: [],
    analysis: {
      id: "analysis_claro_descuentos",
      projectId: "demo_claro_descuentos",
      model: "gemini-3.6-flash",
      structuredAnalysis: {
        resumenEjecutivo: "Implementación de un Agente de IA de Procesamiento Documental (Document AI) que lea contratos PDF comerciales de Claro Colombia, extraiga cláusulas de descuento complejas y las concilie automáticamente con la pre-facturación mensual de Minerva.",
        problemaPrincipal: "Auditoría manual lenta de contratos PDF complejos que causa que solo se revise el 5% de las cuentas corporativas, facilitando la fuga de ingresos o quejas por cobros excesivos.",
        procesoActual: "Extracción visual manual de cláusulas financieras en PDFs contra reportes de facturación de Minerva en Excel.",
        consequencesPrincipales: ["Fugas financieras por COP 680M anuales", "Altas quejas comerciales B2B", "Auditoría incompleta (solo 5% de alcance)"],
        volumenYEsfuerzo: { casosMensuales: 80, minutosPorCaso: 180, horasAnualesEstimadas: 2880, personasParticipantes: 3, nivelReproceso: "Frecuentemente" },
        impacto: { descripcion: "Alto impacto en gobernanza de ingresos y relaciones contractuales con cuentas clave corporativas.", impactoEconomicoReportado: 680000000, tipoImpactoEconomico: "Recuperación de ingresos por fugas", nivelEvidencia: "estimado", afectacionClientes: "Alta. Evita reclamos y molestias de cobro excesivo en facturas corporativas.", riesgosActuales: ["Reclamaciones ante entes de control por cobro indebido", "Pérdida de confianza de clientes corporativos"] },
        resultadoEsperado: "Lograr cobertura de auditoría del 100% de contratos corporativos mensuales en menos de 24 horas.",
        tipoSolucionRecomendada: "agente_con_aprobacion",
        justificacionTipoSolucion: "Dado que se involucran modificaciones financieras y notas de crédito en Minerva, se recomienda un agente basado en LLM para lectura de contratos, que envíe una propuesta de corrección de facturación para la aprobación final del analista.",
        aptitudParaAgente: "alta",
        complejidadEstimada: "alta",
        nivelRiesgo: "alto",
        beneficiosEsperados: ["Control y auditoría del 100% de contratos B2B", "Recuperación estimada de hasta COP 680M al año", "Cero reclamos comerciales por facturación de descuentos"],
        riesgosImplementacion: ["Alucinaciones en la lectura de cláusulas de PDFs no estructurados", "Integración técnica segura para descarga de contratos"],
        dependencias: ["Acceso al repositorio de contratos de SharePoint", "Acceso a reportes de facturación del sistema Minerva"],
        informacionFaltante: ["Se requiere un listado de formatos y plantillas de contrato estándar del área corporativa."],
        preguntasParaElArea: ["¿Todos los contratos corporativos tienen una estructura uniforme o cada contrato tiene anexos personalizados escritos libremente?"],
        recomendaciones: ["Utilizar filtrado y extracción inteligente con Gemini Flash.", "Diseñar una interfaz sencilla de aprobación de discrepancias."],
        siguientePasoRecomendado: "Subir 10 ejemplos de contratos en PDF con diferentes cláusulas al sandbox para evaluar la tasa de acierto de extracción de la IA.",
        confianzaAnalisis: 0.88,
        evidencias: []
      }
    }
  },
  {
    id: "demo_claro_pqrs",
    initiativeName: "Enrutador Cognitivo de PQRs Complejas (Habeas Data / Legal)",
    area: "Servicio al Cliente",
    requesterId: "demo_user_liliana",
    requesterEmail: "liliana.restrepo@claro.com.co",
    processOwner: "Liliana Restrepo",
    sponsor: "Felipe Aristizábal (Director de Experiencia de Cliente)",
    status: "Analizado por IA",
    answers: {
      initiativeName: "Enrutador Cognitivo de PQRs Complejas (Habeas Data / Legal)",
      area: "Servicio al Cliente",
      processOwner: "Liliana Restrepo",
      sponsor: "Felipe Aristizábal (Director de Experiencia de Cliente)",
      processActivity: "Clasificación inteligente, análisis de criticidad lógicas y asignación de quejas, peticiones y reclamos (PQRs) complejas ingresadas por clientes.",
      currentProblem: "Las quejas complejas de clientes (por ejemplo, disputas de Habeas Data, fraudes de identidad, reclamos de facturación antiguos) ingresan a una cola única general. Los analistas toman de 5 a 10 minutos por PQR para leer el texto libre, comprender el problema de fondo y reasignarlo manualmente al área especialista (Fraudes, Legal, Cobranzas). Esto causa demoras que ponen en riesgo los términos legales de respuesta (15 días hábiles), generando multas severas de la Superintendencia de Industria y Comercio (SIC).",
      trigger: "Ingreso de una nueva PQR en el canal digital o de oficina",
      finalResult: "PQR asignada a la bandeja técnica especialista adecuada con un análisis previo de urgencia y sugerencia de solución.",
      standardizationLevel: "Generalmente es igual, pero presenta algunas excepciones",
      steps: [
        { number: 1, description: "Revisar texto adjunto y radicaciones de la PQR en el sistema corporativo", responsible: "Analista de Clasificación PQR", system: "SGA PQR Claro" },
        { number: 2, description: "Identificar palabras clave, intenciones del cliente y criticidad legal", responsible: "Analista de Clasificación PQR", system: "Manual" },
        { number: 3, description: "Modificar campo de clasificación y transferir a bandeja especialista", responsible: "Analista de Clasificación PQR", system: "SGA PQR Claro" }
      ],
      frequency: "Diario",
      monthlyCases: 12000,
      timePerCase: 6,
      timeUnit: "Minutos",
      peopleInvolved: 18,
      reworkFrequency: "Ocasionalmente",
      consequences: ["Retrasos en la atención", "Incumplimiento de tiempos acordados", "Afectación a clientes", "Riesgo regulatorio"],
      affectedGroup: "Entidades regulatorias",
      errorConsequences: "Multas multimillonarias por parte de la SIC por vencimiento de términos de respuesta legal (Silencio Administrativo Positivo).",
      hasDeadline: "Sí, por una obligación regulatoria",
      deadlineDate: "2026-08-01",
      deadlineExplanation: "La Ley colombiana estipula exactamente 15 días hábiles para dar respuesta de fondo a toda PQR; si se vence un solo día, el cliente gana la queja por derecho de Silencio Administrativo Positivo.",
      canEstimateEconomicImpact: "Sí, existe un cálculo documentado",
      annualValueCop: 950000000,
      impactType: "Evitación de Multas / Sanciones Regulatorias",
      economicExplanation: "Durante el año anterior, Claro pagó COP 950 millones en sanciones e indemnizaciones a la SIC debido a PQRs resueltas fuera de término provocadas por demoras de enrutamiento.",
      expectedSolutionActions: ["Procesar y clasificar documentos (PDF, Excel, etc.)", "Comparar información de diferentes fuentes", "Generar reportes y alertas", "Actualizar estados en sistemas corporativos"],
      expectedOutcome: "Automatizar la clasificación y enrutamiento del 90% de las PQRs en tiempo real (menos de 30 segundos por caso).",
      autonomyLevel: "6. Ejecutar todo el proceso sin intervención humana",
      mandatoryHumanIntervention: ["Ninguno, el enrutador es netamente una decisión lógica interna"],
      escalationRule: "Si la PQR contiene palabras como 'Superintendencia', 'Demanda' o 'Derecho de Petición', asignar de inmediato etiqueta de 'Urgencia Legal' y escalarla al equipo de abogados senior.",
      dataSources: ["Bases de datos (SQL, Oracle, etc.)", "Sistemas de Claro (SAP, Minerva)", "Bandejas de PQRs (SGA Claro)"],
      dataOrganization: "Centralizada en un solo sistema",
      availableExamples: "Sí, más de 100 casos",
      dataType: ["Información de clientes", "Información regulada", "Información interna"],
      errorImpactLevel: "6. Incumplimiento regulatorio",
      hasAccessAuthorization: "Sí, ya cuenta con todos los accesos",
      canObtainAutomatically: "Sí, los sistemas ya permiten integraciones automáticas",
      hasDocumentation: "Sí, está completa y actualizada",
      expertAvailability: "Sí, cuatro o más horas por semana",
      pilotAuthorization: "Sí",
      safeTestingEnvironment: "Sí, existe un ambiente de pruebas",
      successMetric: "Reducción de errores",
      metricDetails: { indicator: "Porcentaje de PQRs enrutadas incorrectamente", currentValue: "18", targetValue: "2", unit: "%", source: "Informes de Operación de Experiencia de Cliente" }
    },
    attachments: [],
    analysis: {
      id: "analysis_claro_pqrs",
      projectId: "demo_claro_pqrs",
      model: "gemini-3.6-flash",
      structuredAnalysis: {
        resumenEjecutivo: "Automatización cognitiva en tiempo real del enrutamiento de PQRs a través de un clasificador de lenguaje natural impulsado por LLM, optimizando el tiempo de respuesta y previniendo multas del ente de control (SIC).",
        problemaPrincipal: "Clasificación manual ineficiente de 12.000 PQRs al mes que consume tiempo legal crítico, arriesgando la imposición de multas por vencimiento de términos.",
        procesoActual: "Lectura manual de quejas por un equipo numeroso de analistas que redirigen las carpetas en el sistema SGA Claro de manera iterativa.",
        consequencesPrincipales: ["Pago de multas a la SIC por COP 950M anuales", "Retrasos en respuesta legal", "Ineficiencia del recurso humano"],
        volumenYEsfuerzo: { casosMensuales: 12000, minutosPorCaso: 6, horasAnualesEstimadas: 14400, personasParticipantes: 18, nivelReproceso: "Ocasionalmente" },
        impacto: { descripcion: "Alto impacto regulatorio y legal. Protege directamente la reputación e ingresos de Claro.", impactoEconomicoReportado: 950000000, tipoImpactoEconomico: "Prevención de sanciones de entes de control", nivelEvidencia: "documentado", afectacionClientes: "Media. Los clientes reciben respuesta con mejor calidad por ser atendidos directamente por el especialista.", riesgosActuales: ["Multas de la SIC", "Declaración de silencios administrativos positivos automatizados"] },
        resultadoEsperado: "Lograr clasificación automática en menos de 30 segundos para el 90% del volumen mensual.",
        tipoSolucionRecomendada: "agente_autonomo",
        justificacionTipoSolucion: "Dado que se trata de clasificar y reasignar de forma lógica interna sin alterar información contractual ni transaccional externa, se clasifica de alta aptitud como un agente autónomo de clasificación cognitiva.",
        aptitudParaAgente: "alta",
        complejidadEstimada: "media",
        nivelRiesgo: "medio",
        beneficiosEsperados: ["Eliminación total del cuello de botella en triaje de entrada", "Prevención de multas por COP 950M", "Liberación de 14.400 horas de personal al año"],
        riesgosImplementacion: ["Alucinación o clasificación errónea en casos ambiguos", "Indisponibilidad de APIs del SGA en picos de tráfico"],
        dependencias: ["Integración por servicios web o APIs REST de entrada y reasignación del SGA PQR"],
        informacionFaltante: ["Se requiere el manual de taxonomía oficial de PQRs de Claro Colombia."],
        preguntasParaElArea: ["¿El sistema SGA cuenta con servicios web REST o requiere conexión directa a base de datos Oracle?"],
        recomendaciones: ["Utilizar clasificación en lote mediante APIs de Gemini con prompts formateados con One-Shot learning.", "Establecer una bandeja de 'excepciones de IA' para quejas de bajísima confianza."],
        siguientePasoRecomendado: "Desarrollar prueba de concepto clasificando 100 textos históricos y medir concordancia contra analistas humanos.",
        confianzaAnalisis: 0.94,
        evidencias: []
      }
    }
  },
  {
    id: "demo_claro_proveedores",
    initiativeName: "Validación de Requisitos y Activación de Técnicos Contratistas",
    area: "Tecnología",
    requesterId: "demo_user_mauricio",
    requesterEmail: "mauricio.alzate@claro.com.co",
    processOwner: "Mauricio Alzate",
    sponsor: "Liliana Restrepo (Directora de Soporte de Red)",
    status: "Analizado por IA",
    answers: {
      initiativeName: "Validación de Requisitos y Activación de Técnicos Contratistas",
      area: "Tecnología",
      processOwner: "Mauricio Alzate",
      sponsor: "Liliana Restrepo (Directora de Soporte de Red)",
      processActivity: "Revisión documental mensual y validación de seguridad social (ARL), certificaciones de altura y EPS de más de 400 técnicos contratistas antes de habilitar sus accesos a plataformas de red de Claro.",
      currentProblem: "Los técnicos externos deben subir PDFs de sus certificaciones y soportes de pago de ARL/EPS cada mes. El equipo de Claro revisa manualmente cada archivo PDF, valida que la fecha esté vigente y cruza el número de cédula en la planilla. El proceso demora entre 10 y 15 días acumulados, retrasando las órdenes de servicio en calle debido a técnicos suspendidos por demora en la validación manual de sus papeles.",
      trigger: "Envío de soportes por parte de la empresa contratista aliada",
      finalResult: "Acceso lógico habilitado para el técnico de campo o rechazo documental detallado.",
      standardizationLevel: "Está documentado y siempre se ejecuta de la misma manera",
      steps: [
        { number: 1, description: "Recibir paquete de documentos en el portal de contratistas", responsible: "Gestor de Accesos de Claro", system: "Portal de Contratistas Claro" },
        { number: 2, description: "Abrir PDFs de ARL, EPS y curso de alturas del técnico", responsible: "Gestor de Accesos de Claro", system: "PDF Reader" },
        { number: 3, description: "Verificar vigencia, NIT y firmas válidas de las entidades de salud", responsible: "Gestor de Accesos de Claro", system: "Manual" },
        { number: 4, description: "Habilitar estado del técnico en la plataforma Active Directory", responsible: "Gestor de Accesos de Claro", system: "Active Directory Claro" }
      ],
      frequency: "Mensual",
      monthlyCases: 400,
      timePerCase: 40,
      timeUnit: "Minutos",
      peopleInvolved: 3,
      reworkFrequency: "Ocasionalmente",
      consequences: ["Retrasos en la atención", "Sobrecostos", "Dependencia de una persona específica", "Dificultad para atender un mayor volumen"],
      affectedGroup: "Proveedores",
      errorConsequences: "Retrasos graves en la instalación o mantenimiento de antenas y enlaces fijos Claro en calle por falta de técnicos habilitados lógicamente.",
      hasDeadline: "Sí, por una temporada o aumento de demanda",
      deadlineDate: "2026-09-01",
      deadlineExplanation: "Los primeros 5 días de cada mes es la fecha crítica para el pago y validación de la planilla de seguridad social de contratistas.",
      canEstimateEconomicImpact: "Sí, existe una estimación aproximada",
      annualValueCop: 180000000,
      impactType: "Ahorro de costos / Eficiencia Operativa",
      economicExplanation: "Se pierden alrededor de COP 180 millones al año debido a penalidades por retrasos en instalaciones de calle causadas por personal técnico bloqueado sin justificación rápida.",
      expectedSolutionActions: ["Procesar y clasificar documentos (PDF, Excel, etc.)", "Comparar información de diferentes fuentes", "Calcular valores y verificar cálculos", "Actualizar estados en sistemas corporativos"],
      expectedOutcome: "Lograr la validación documental y activación lógica del técnico en menos de 5 minutos, reduciendo el backlog de aprobaciones a cero.",
      autonomyLevel: "4. Ejecutar una acción después de recibir aprobación humana",
      mandatoryHumanIntervention: ["Antes de realizar aprobaciones finales en Active Directory"],
      escalationRule: "Si un documento presenta sospechas de alteración o fraude, bloquear el contratista de inmediato y notificar a Seguridad Corporativa.",
      dataSources: ["Bases de datos (SQL, Oracle, etc.)", "Archivos Excel / CSV", "Repositorios de documentos", "Portales públicos de consulta (EPS, ARL)"],
      dataOrganization: "Organizada en archivos o bases de datos",
      availableExamples: "Sí, más de 100 casos",
      dataType: ["Datos personales", "Contratos", "Información interna"],
      errorImpactLevel: "2. Reproceso interno",
      hasAccessAuthorization: "Sí, ya cuenta con todos los accesos",
      canObtainAutomatically: "Sí, puede obtenerse mediante archivos o reportes",
      hasDocumentation: "Sí, está completa y actualizada",
      expertAvailability: "Sí, entre dos y cuatro horas por semana",
      pilotAuthorization: "Sí",
      safeTestingEnvironment: "Sí, existe un ambiente de pruebas",
      successMetric: "Reducción del tiempo",
      metricDetails: { indicator: "Tiempo promedio de validación de contratista", currentValue: "40", targetValue: "3", unit: "Minutos", source: "Portal de Gestión de Contratistas" }
    },
    attachments: [],
    analysis: {
      id: "analysis_claro_proveedores",
      projectId: "demo_claro_proveedores",
      model: "gemini-3.6-flash",
      structuredAnalysis: {
        resumenEjecutivo: "Agente inteligente de validación documental que analiza contratos, ARLs, EPS y certificados de altura en formato PDF. Extrae automáticamente nombres, fechas, cédulas y vigencias para cruzarlos con el Active Directory y activar técnicos de campo.",
        problemaPrincipal: "Demora de hasta 15 días en la revisión manual de documentos de contratistas, lo que paraliza a los técnicos en calle y atrasa las instalaciones/mantenimientos de Claro.",
        procesoActual: "Revisión visual e individual en PDF por parte del Gestor de Accesos contra la planilla de seguridad social.",
        consequencesPrincipales: ["COP 180M anuales por retraso de instalación", "Técnicos habilitados tarde", "Carga operativa masiva al inicio de mes"],
        volumenYEsfuerzo: { casosMensuales: 400, minutosPorCaso: 40, horasAnualesEstimadas: 3200, personasParticipantes: 3, nivelReproceso: "Ocasionalmente" },
        impacto: { descripcion: "Alto impacto en tiempos de despliegue de infraestructura de telecomunicaciones Claro.", impactoEconomicoReportado: 180000000, tipoImpactoEconomico: "Reducción de penalidades por demora de instalaciones", nivelEvidencia: "estimado", afectacionClientes: "Alta. Evita retrasos de visitas técnicas en casa del cliente.", riesgosActuales: ["Operación en calle por técnicos con ARL vencida", "Pérdida de clientes por visitas tardías"] },
        resultadoEsperado: "Validar y activar a cada técnico en menos de 5 minutos, con un backlog de aprobaciones de cero.",
        tipoSolucionRecomendada: "agente_con_aprobacion",
        justificacionTipoSolucion: "Dado que se habilitan credenciales físicas y lógicas del Active Directory de Claro, se sugiere un agente que extraiga datos del PDF y proponga la activación automática, requiriendo el clic final de validación de un supervisor para cumplir con políticas de ciberseguridad corporativas.",
        aptitudParaAgente: "alta",
        complejidadEstimada: "media",
        nivelRiesgo: "alto",
        beneficiosEsperados: ["Validación instantánea en 3 minutos", "Reducción a cero de retrasos por personal bloqueado", "Control de riesgos de responsabilidad en calle al 100%"],
        riesgosImplementacion: ["Falsificación o adulteración digital de planillas de pago", "Formatos de EPS/ARL no legibles"],
        dependencias: ["Integración con portal de carga de contratistas", "Acceso vía API para consulta/escritura en Active Directory"],
        informacionFaltante: ["Falta conocer si la Base de Datos de Active Directory se puede conectar directamente a través de API."],
        preguntasParaElArea: ["¿Se tiene mapeada la lista de EPS y ARL válidas en Colombia para que el agente filtre documentos falsificados?"],
        recomendaciones: ["Utilizar OCR con Gemini Flash para leer planillas de aportes.", "Incluir validación cruzada con la API de consulta de la ADRES para cédulas."],
        siguientePasoRecomendado: "Implementar piloto de extracción de ARL de la EPS Sura y ARL Seguros Bolívar con 20 PDFs reales.",
        confianzaAnalisis: 0.92,
        evidencias: []
      }
    }
  }
];

export default function AdminPanel({
  questions,
  allUsers,
  userProfile,
  onToggleUserStatus,
  writeAuditLog,
}: AdminPanelProps) {
  // Preapproved users state
  const [preapprovedUsers, setPreapprovedUsers] = useState<PreapprovedUser[]>([]);
  const [loadingPreapproved, setLoadingPreapproved] = useState(true);

  // User creation form states
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newUserRole, setNewUserRole] = useState<UserRole>("Administrador");
  const [newUserArea, setNewUserArea] = useState("Tecnología");
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");

  // Question editing states
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editPlaceholder, setEditPlaceholder] = useState("");
  const [editHelpText, setEditHelpText] = useState("");
  const [editType, setEditType] = useState<FormQuestionConfig["type"]>("text");
  const [editRequired, setEditRequired] = useState(true);
  const [editOptionsRaw, setEditOptionsRaw] = useState("");
  const [editStep, setEditStep] = useState(1);
  const [editOrder, setEditOrder] = useState(1);

  // Question creation states
  const [createStep, setCreateStep] = useState(1);
  const [createId, setCreateId] = useState("");
  const [createLabel, setCreateLabel] = useState("");
  const [createPlaceholder, setCreatePlaceholder] = useState("");
  const [createHelpText, setCreateHelpText] = useState("");
  const [createType, setCreateType] = useState<FormQuestionConfig["type"]>("text");
  const [createRequired, setCreateRequired] = useState(false);
  const [createOptionsRaw, setCreateOptionsRaw] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Seeding states
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [seedingSuccess, setSeedingSuccess] = useState("");
  const [seedingError, setSeedingError] = useState("");

  // Accordion/Tab control for step groupings
  const [expandedSteps, setExpandedSteps] = useState<{ [key: number]: boolean }>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const toggleStepAccordion = (step: number) => {
    setExpandedSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  // Real-time listener for preapproved users
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "preapproved_users"),
      (snapshot) => {
        const list: PreapprovedUser[] = [];
        snapshot.forEach((d) => {
          list.push({ email: d.id, ...d.data() } as PreapprovedUser);
        });
        setPreapprovedUsers(list);
        setLoadingPreapproved(false);
      },
      (err) => {
        console.error("Error fetching preapproved users:", err);
        setLoadingPreapproved(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handle preapproved user creation
  const handleCreatePreapprovedUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError("");
    setUserSuccess("");

    let emailClean = newUserEmail.trim();
    if (!emailClean) return;
    if (!emailClean.includes("@")) {
      emailClean = `${emailClean}@grupogtd.com`;
    }
    emailClean = emailClean.toLowerCase();

    if (newUserPassword.length < 6) {
      setUserError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const userRef = doc(db, "preapproved_users", emailClean);
      const preapprovedPayload: PreapprovedUser = {
        email: emailClean,
        name: newUserName.trim(),
        role: newUserRole,
        area: newUserArea,
        password: newUserPassword,
        createdAt: new Date().toISOString(),
      };

      await setDoc(userRef, preapprovedPayload);

      await writeAuditLog(
        "Crear Pre-aprobación de Usuario",
        `Se pre-aprobó el usuario admin/usuario: ${emailClean} con rol ${newUserRole}`
      );

      setUserSuccess(`¡Usuario ${emailClean} pre-aprobado exitosamente! Ya puede iniciar sesión.`);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
    } catch (err: any) {
      console.error("Error preapproving user:", err);
      setUserError(err.message || "Error al registrar el usuario pre-aprobado.");
    }
  };

  // Delete preapproved user record
  const handleDeletePreapprovedUser = async (email: string) => {
    if (!window.confirm(`¿Está seguro de eliminar la pre-aprobación para ${email}?`)) return;

    try {
      await deleteDoc(doc(db, "preapproved_users", email));
      await writeAuditLog("Eliminar Pre-aprobación", `Se eliminó pre-aprobación para: ${email}`);
    } catch (err: any) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  // Start editing a question
  const startEditQuestion = (q: FormQuestionConfig) => {
    setEditingQuestionId(q.id);
    setEditLabel(q.label);
    setEditPlaceholder(q.placeholder || "");
    setEditHelpText(q.helpText || "");
    setEditType(q.type);
    setEditRequired(q.required);
    setEditOptionsRaw(q.options ? q.options.join(", ") : "");
    setEditStep(q.step);
    setEditOrder(q.order);
  };

  // Cancel question editing
  const cancelEditQuestion = () => {
    setEditingQuestionId(null);
  };

  // Save question edits
  const saveQuestionEdits = async (id: string, isCore: boolean) => {
    if (!editLabel.trim()) {
      alert("La etiqueta de la pregunta es requerida.");
      return;
    }

    try {
      const qRef = doc(db, "questions_config", id);
      const options = ["select", "multiselect"].includes(editType)
        ? editOptionsRaw
            .split(",")
            .map((o) => o.trim())
            .filter((o) => o !== "")
        : undefined;

      const updatedPayload: Partial<FormQuestionConfig> = {
        label: editLabel.trim(),
        placeholder: editPlaceholder.trim() || undefined,
        helpText: editHelpText.trim() || undefined,
        type: editType,
        required: editRequired,
        step: editStep,
        order: editOrder,
      };

      if (options) {
        updatedPayload.options = options;
      }

      await updateDoc(qRef, updatedPayload);

      await writeAuditLog(
        "Modificar Pregunta",
        `Pregunta modificada: ${id} ("${editLabel.slice(0, 30)}...")`
      );

      setEditingQuestionId(null);
    } catch (err: any) {
      alert(`Error al guardar cambios de la pregunta: ${err.message}`);
    }
  };

  // Handle custom field creation
  const handleCreateCustomField = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const cleanId = createId.replace(/[^a-zA-Z0-9]/g, "").trim();
    if (!cleanId) {
      setFormError("El identificador único debe contener solo caracteres alfanuméricos.");
      return;
    }

    if (!createLabel.trim()) {
      setFormError("La etiqueta de la pregunta es requerida.");
      return;
    }

    // Check duplicate ID
    if (questions.some((q) => q.id.toLowerCase() === cleanId.toLowerCase())) {
      setFormError(`Ya existe una pregunta con el identificador '${cleanId}'.`);
      return;
    }

    try {
      const options = ["select", "multiselect"].includes(createType)
        ? createOptionsRaw
            .split(",")
            .map((o) => o.trim())
            .filter((o) => o !== "")
        : undefined;

      // Determine correct order (append to the end of the step)
      const stepQuestions = questions.filter((q) => q.step === createStep);
      const maxOrder = stepQuestions.reduce((max, q) => (q.order > max ? q.order : max), 0);
      const nextOrder = maxOrder + 1;

      const newQuestion: FormQuestionConfig = {
        id: cleanId,
        label: createLabel.trim(),
        type: createType,
        required: createRequired,
        step: createStep,
        order: nextOrder,
        isCore: false,
        placeholder: createPlaceholder.trim() || undefined,
        helpText: createHelpText.trim() || undefined,
      };

      if (options) {
        newQuestion.options = options;
      }

      await setDoc(doc(db, "questions_config", cleanId), newQuestion);

      await writeAuditLog(
        "Crear Campo Personalizado",
        `Se creó el campo personalizado '${cleanId}' en el Paso ${createStep}`
      );

      setFormSuccess(`¡Campo '${cleanId}' creado exitosamente en el Paso ${createStep}!`);
      setCreateId("");
      setCreateLabel("");
      setCreatePlaceholder("");
      setCreateHelpText("");
      setCreateType("text");
      setCreateRequired(false);
      setCreateOptionsRaw("");
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "Error al crear el campo personalizado.");
    }
  };

  // Delete custom field
  const handleDeleteCustomField = async (id: string, label: string) => {
    if (!window.confirm(`¿Está seguro de eliminar el campo personalizado '${id}'?\nEsta acción es irreversible.`)) return;

    try {
      await deleteDoc(doc(db, "questions_config", id));
      await writeAuditLog("Eliminar Campo Personalizado", `Campo personalizado eliminado: ${id} (${label})`);
    } catch (err: any) {
      alert(`Error al eliminar el campo personalizado: ${err.message}`);
    }
  };

  // Load 5 Telecom Demo Projects
  const handleSeedDemoProjects = async () => {
    setSeedingLoading(true);
    setSeedingSuccess("");
    setSeedingError("");
    try {
      for (const p of DEMO_PROJECTS_DATA) {
        const score = calculateProjectScore(p.id, p.answers as any);
        
        const finalProj = {
          ...p,
          requesterId: userProfile?.id || "demo_user_id",
          requesterEmail: userProfile?.email || "elkin.zapata@claro.com.co",
          createdBy: userProfile?.email || "elkin.zapata@claro.com.co",
          score,
          category: score.category,
          riskLevel: p.analysis?.structuredAnalysis?.nivelRiesgo || (score.restrictions && score.restrictions.length > 0 ? "alto" : "bajo"),
          recommendedSolutionType: p.analysis?.structuredAnalysis?.tipoSolucionRecomendada || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          submittedAt: new Date().toISOString(),
          isDemo: true,
        };

        await setDoc(doc(db, "projects", p.id), finalProj);
      }

      await writeAuditLog(
        "Cargar Proyectos Demo",
        "Se cargaron 5 iniciativas de telecomunicaciones de prueba en el Radar de Oportunidades."
      );
      setSeedingSuccess("¡Se han cargado los 5 proyectos corporativos de prueba de Claro con éxito!");
    } catch (err: any) {
      console.error(err);
      setSeedingError(err.message || "Error al cargar los proyectos de prueba.");
    } finally {
      setSeedingLoading(false);
    }
  };

  const stepNames = [
    "Paso 1: Información General",
    "Paso 2: Problema Actual",
    "Paso 3: Volumen y Esfuerzo",
    "Paso 4: Consecuencias e Impacto",
    "Paso 5: Resultado Esperado y Autonomía",
    "Paso 6: Información y Sistemas",
    "Paso 7: Preparación del Área",
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="border-b border-zinc-800 pb-5">
        <h1 className="text-2xl font-black text-zinc-50 tracking-tight flex items-center gap-2.5">
          <Sliders className="w-6 h-6 text-indigo-500" />
          ENTORNO DE ADMINISTRADOR RADAR
        </h1>
        <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
          Modificación del formulario dinámico, gobernanza de roles y creación de usuarios administradores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: USER MANAGEMENT (1/3 width) */}
        <div className="space-y-6 lg:col-span-1">
          {/* USER CREATION CARD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-zinc-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
              <UserPlus className="w-4 h-4 text-indigo-400" />
              Crear Nuevo Usuario Admin
            </h3>

            {userError && (
              <div className="p-3 bg-red-950/20 border border-red-800/40 rounded-xl text-red-400 text-xs">
                {userError}
              </div>
            )}
            {userSuccess && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-emerald-400 text-xs">
                {userSuccess}
              </div>
            )}

            <form onSubmit={handleCreatePreapprovedUser} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ej. Elkin Zapata"
                  className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Usuario o Correo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="elkin.zapata"
                    className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-24"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] font-bold text-zinc-500">
                    @claro.com.co
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Contraseña segura"
                    className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Rol Asignado
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full py-2 px-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Evaluador">Evaluador</option>
                    <option value="Solicitante">Solicitante</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Área
                  </label>
                  <select
                    value={newUserArea}
                    onChange={(e) => setNewUserArea(e.target.value)}
                    className="w-full py-2 px-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Tecnología">Tecnología</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Operaciones">Operaciones</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Servicio al Cliente">Servicio al Cliente</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer transition-all"
              >
                Crear Cuenta Pre-aprobada
              </button>
            </form>
          </div>

          {/* PREAPPROVED & REGISTERED USERS LIST */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-zinc-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
              <Users className="w-4 h-4 text-indigo-400" />
              Gobernanza de Cuentas
            </h3>

            <div className="space-y-4">
              {/* Preapproved subset */}
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Cuentas Pre-aprobadas (Pendiente Primer Acceso)
                </h4>
                {loadingPreapproved ? (
                  <p className="text-xs text-zinc-600">Cargando...</p>
                ) : preapprovedUsers.length === 0 ? (
                  <p className="text-[11px] text-zinc-600 italic">No hay pre-aprobaciones creadas.</p>
                ) : (
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {preapprovedUsers.map((p) => (
                      <div
                        key={p.email}
                        className="p-2.5 bg-zinc-950 border border-zinc-800/80 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="overflow-hidden pr-2">
                          <p className="font-bold text-zinc-200 truncate">{p.name}</p>
                          <p className="text-[9px] text-zinc-500 truncate font-mono">{p.email}</p>
                          <span className="text-[8px] font-black uppercase bg-indigo-950 text-indigo-400 border border-indigo-900/60 px-1 py-0.2 rounded mt-1 inline-block">
                            {p.role}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeletePreapprovedUser(p.email)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 hover:text-red-400 hover:bg-red-950/10 transition-colors cursor-pointer"
                          title="Eliminar pre-aprobación"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Registered list */}
              <div>
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Usuarios Activos en el Sistema ({allUsers.length})
                </h4>
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {allUsers.map((u) => (
                    <div
                      key={u.id}
                      className="p-2.5 bg-zinc-950 border border-zinc-800/80 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="overflow-hidden pr-2">
                        <p className="font-bold text-zinc-200 truncate">{u.name}</p>
                        <p className="text-[9px] text-zinc-500 truncate font-mono">{u.email}</p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className="text-[8px] font-black uppercase bg-zinc-900 text-zinc-300 border border-zinc-800 px-1 py-0.2 rounded">
                            {u.role}
                          </span>
                          <span className="text-[8px] font-medium text-zinc-500">{u.area}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleUserStatus(u.id, u.active)}
                        disabled={u.email === userProfile?.email}
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold shrink-0 transition-colors cursor-pointer border ${
                          u.active
                            ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/40 hover:bg-emerald-950/40"
                            : "bg-red-950/20 text-red-400 border-red-900/40 hover:bg-red-950/40"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {u.active ? "Activo" : "Bloqueado"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CARGA DE DATOS DE PRUEBA */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-zinc-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
              <Database className="w-4 h-4 text-emerald-400" />
              Proyectos de Prueba (Demo)
            </h3>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              Carga 5 iniciativas corporativas de telecomunicaciones prediseñadas (proyectos reales de Claro: IA en Call Centers, Automatización de Despliegue de Red, Plataforma IoT para Empresas, etc.) para probar el funcionamiento del Radar.
            </p>

            {seedingError && (
              <div className="p-3 bg-red-950/20 border border-red-800/40 rounded-xl text-red-400 text-xs">
                {seedingError}
              </div>
            )}
            {seedingSuccess && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-emerald-400 text-xs">
                {seedingSuccess}
              </div>
            )}

            <button
              onClick={handleSeedDemoProjects}
              disabled={seedingLoading}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-900/20 cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              {seedingLoading ? "Cargando Proyectos..." : "Cargar 5 Proyectos Demo"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: QUESTIONS CONFIGURATION (2/3 width) */}
        <div className="space-y-6 lg:col-span-2">
          {/* ADD CUSTOM QUESTION CARD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-zinc-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
              <Plus className="w-4 h-4 text-indigo-400" />
              Agregar Campo Personalizado al Formulario
            </h3>

            {formError && (
              <div className="p-3 bg-red-950/20 border border-red-800/40 rounded-xl text-red-400 text-xs">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-emerald-400 text-xs">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleCreateCustomField} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Clave Única (ID en BD)
                  </label>
                  <input
                    type="text"
                    required
                    value={createId}
                    onChange={(e) => setCreateId(e.target.value)}
                    placeholder="Ej. impactoSLA"
                    className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <p className="text-[9px] text-zinc-500">Solo letras y números, sin espacios.</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Ubicación (Paso del Formulario)
                  </label>
                  <select
                    value={createStep}
                    onChange={(e) => setCreateStep(parseInt(e.target.value))}
                    className="w-full py-2 px-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {stepNames.map((name, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Etiqueta / Pregunta
                </label>
                <input
                  type="text"
                  required
                  value={createLabel}
                  onChange={(e) => setCreateLabel(e.target.value)}
                  placeholder="Ej. ¿Esta iniciativa afecta directamente los ANS (SLA) contractuales?"
                  className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Tipo de Dato
                  </label>
                  <select
                    value={createType}
                    onChange={(e) => setCreateType(e.target.value as any)}
                    className="w-full py-2 px-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="text">Texto Corto</option>
                    <option value="textarea">Texto Largo (textarea)</option>
                    <option value="number">Numérico</option>
                    <option value="select">Selección Única (select)</option>
                    <option value="multiselect">Selección Múltiple (checks)</option>
                    <option value="email">Correo Electrónico</option>
                  </select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Opciones de Selección (Solo para select / multiselect)
                  </label>
                  <input
                    type="text"
                    disabled={!["select", "multiselect"].includes(createType)}
                    value={createOptionsRaw}
                    onChange={(e) => setCreateOptionsRaw(e.target.value)}
                    placeholder="Sí, No, No se conoce (separadas por comas)"
                    className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Texto de Ayuda / Descripción (Opcional)
                  </label>
                  <input
                    type="text"
                    value={createHelpText}
                    onChange={(e) => setCreateHelpText(e.target.value)}
                    placeholder="Ej. Seleccione Sí si existe penalidad contractual."
                    className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Placeholder (Guía en campo - Opcional)
                  </label>
                  <input
                    type="text"
                    value={createPlaceholder}
                    onChange={(e) => setCreatePlaceholder(e.target.value)}
                    placeholder="Ej. Sí, No..."
                    className="w-full px-3 py-2 bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="createRequired"
                  checked={createRequired}
                  onChange={(e) => setCreateRequired(e.target.checked)}
                  className="rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <label htmlFor="createRequired" className="text-xs font-bold text-zinc-300 cursor-pointer">
                  Campo Obligatorio (Requerido para avanzar de paso)
                </label>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer transition-all"
              >
                Agregar Campo Nuevo
              </button>
            </form>
          </div>

          {/* LIST & EDIT QUESTIONS GROUPED BY STEP */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-zinc-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
              <Grid className="w-4 h-4 text-indigo-400" />
              Gestión de Estructura de Formulario
            </h3>

            <div className="space-y-3">
              {stepNames.map((name, idx) => {
                const stepNum = idx + 1;
                const stepQuestions = questions
                  .filter((q) => q.step === stepNum)
                  .sort((a, b) => a.order - b.order);
                const isExpanded = expandedSteps[stepNum];

                return (
                  <div key={stepNum} className="border border-zinc-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleStepAccordion(stepNum)}
                      className="w-full p-3 bg-zinc-950 flex items-center justify-between text-xs font-bold text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-indigo-400">
                          {stepNum}
                        </span>
                        {name} ({stepQuestions.length})
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="p-3 bg-zinc-900/60 border-t border-zinc-800/80 space-y-3 divide-y divide-zinc-800/60">
                        {stepQuestions.length === 0 ? (
                          <p className="text-xs text-zinc-500 italic p-2 text-center">
                            No hay campos configurados en este paso.
                          </p>
                        ) : (
                          stepQuestions.map((q, qIdx) => {
                            const isEditing = editingQuestionId === q.id;

                            return (
                              <div key={q.id} className={`pt-3 first:pt-0 ${isEditing ? "bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50" : ""}`}>
                                {isEditing ? (
                                  // EDIT QUESTION INLINE FORM
                                  <div className="space-y-3 text-xs">
                                    <div className="flex justify-between items-center pb-1">
                                      <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                                        ID: {q.id} • {q.isCore ? "Sistema Core" : "Campo Personalizado"}
                                      </span>
                                      <span className="text-[10px] font-semibold text-indigo-400">Paso {editStep} • Orden {editOrder}</span>
                                    </div>

                                    <div className="space-y-1">
                                      <label className="block text-[9px] font-bold text-zinc-400">Pregunta / Etiqueta</label>
                                      <input
                                        type="text"
                                        value={editLabel}
                                        onChange={(e) => setEditLabel(e.target.value)}
                                        className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none"
                                      />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-zinc-400">Tipo de Dato</label>
                                        <select
                                          value={editType}
                                          onChange={(e) => setEditType(e.target.value as any)}
                                          className="w-full py-1 px-1 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none"
                                        >
                                          <option value="text">Texto Corto</option>
                                          <option value="textarea">Texto Largo (textarea)</option>
                                          <option value="number">Numérico</option>
                                          <option value="select">Selección Única</option>
                                          <option value="multiselect">Selección Múltiple</option>
                                          <option value="email">Correo</option>
                                        </select>
                                      </div>

                                      <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-zinc-400">Ubicación (Paso)</label>
                                        <input
                                          type="number"
                                          min="1"
                                          max="7"
                                          value={editStep}
                                          onChange={(e) => setEditStep(parseInt(e.target.value) || 1)}
                                          className="w-full px-2 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none"
                                        />
                                      </div>
                                    </div>

                                    {["select", "multiselect"].includes(editType) && (
                                      <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-zinc-400">Opciones (separadas por comas)</label>
                                        <input
                                          type="text"
                                          value={editOptionsRaw}
                                          onChange={(e) => setEditOptionsRaw(e.target.value)}
                                          placeholder="Ej. Opción 1, Opción 2"
                                          className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none"
                                        />
                                      </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-zinc-400">Texto de Ayuda</label>
                                        <input
                                          type="text"
                                          value={editHelpText}
                                          onChange={(e) => setEditHelpText(e.target.value)}
                                          className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-zinc-400">Placeholder</label>
                                        <input
                                          type="text"
                                          value={editPlaceholder}
                                          onChange={(e) => setEditPlaceholder(e.target.value)}
                                          className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none"
                                        />
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-1.5">
                                        <input
                                          type="checkbox"
                                          id={`editRequired_${q.id}`}
                                          checked={editRequired}
                                          onChange={(e) => setEditRequired(e.target.checked)}
                                          className="rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                                        />
                                        <label htmlFor={`editRequired_${q.id}`} className="text-[11px] font-bold text-zinc-300">
                                          Requerido
                                        </label>
                                      </div>

                                      <div className="flex items-center gap-1">
                                        <label className="text-[10px] text-zinc-500">Orden:</label>
                                        <input
                                          type="number"
                                          value={editOrder}
                                          onChange={(e) => setEditOrder(parseInt(e.target.value) || 1)}
                                          className="w-12 px-1 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-center text-zinc-200 focus:outline-none"
                                        />
                                      </div>
                                    </div>

                                    <div className="flex gap-2 pt-1 justify-end">
                                      <button
                                        type="button"
                                        onClick={cancelEditQuestion}
                                        className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer"
                                      >
                                        <X className="w-3 h-3" /> Cancelar
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => saveQuestionEdits(q.id, q.isCore)}
                                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer"
                                      >
                                        <Save className="w-3 h-3" /> Guardar
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  // STATIC QUESTION VIEW WITH ACTIONS
                                  <div className="flex items-start justify-between gap-4 text-xs">
                                    <div className="space-y-1 flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-mono text-[9px] font-bold text-zinc-500">
                                          ID: {q.id}
                                        </span>
                                        <span className={`px-1.5 py-0.2 rounded text-[8px] font-black uppercase ${
                                          q.isCore ? "bg-zinc-800 text-zinc-400 border border-zinc-700" : "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40"
                                        }`}>
                                          {q.isCore ? "Sistema" : "Personalizado"}
                                        </span>
                                        {q.required && (
                                          <span className="text-[8px] font-black bg-red-950/40 text-red-400 border border-red-900/40 px-1.5 py-0.2 rounded uppercase">
                                            Requerido
                                          </span>
                                        )}
                                        <span className="text-[9px] text-zinc-500">Orden: {q.order}</span>
                                      </div>
                                      <p className="font-bold text-zinc-100">{q.label}</p>
                                      <p className="text-[10px] text-zinc-400">
                                        Tipo: <b className="text-zinc-300 font-semibold">{q.type}</b>
                                        {q.options && ` • Opciones: [${q.options.join(", ")}]`}
                                      </p>
                                      {q.helpText && (
                                        <p className="text-[10px] text-zinc-500 italic font-medium">Ayuda: {q.helpText}</p>
                                      )}
                                    </div>

                                    <div className="flex gap-1.5 items-center shrink-0">
                                      <button
                                        onClick={() => startEditQuestion(q)}
                                        className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                                        title="Editar pregunta"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>
                                      {!q.isCore && (
                                        <button
                                          onClick={() => handleDeleteCustomField(q.id, q.label)}
                                          className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-950/10 transition-colors cursor-pointer"
                                          title="Eliminar campo personalizado"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
