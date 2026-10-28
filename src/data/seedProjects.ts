import { Project } from "../types";

export const INITIAL_GTD_PROJECTS: Project[] = [
  {
    "id": "gtd_proj_001_ftth",
    "initiativeName": "Agente Inteligente de Soporte a Cuadrillas Técnicas FTTH",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-15T14:30:00.000Z",
    "createdAt": "2026-03-15T14:00:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.981Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Agente Inteligente de Soporte a Cuadrillas Técnicas FTTH",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Validación de potencia óptica en splitters y reaprovisionamiento de ONTs en terreno",
      "currentProblem": "Las cuadrillas de terreno pierden en promedio 35 minutos por visita técnica llamando al NOC para validar potencia de splitter y provisionar perfiles de banda ancha en la OLT.",
      "trigger": "Llegada del técnico al domicilio del cliente con orden de trabajo abierta",
      "finalResult": "Servicio de fibra óptica activado, parámetros ópticos certificados y ticket cerrado en CRM",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 1450,
      "timePerCase": 35,
      "timeUnit": "Minutos",
      "peopleInvolved": 45,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Retraso en la jornada del técnico, reprogramación de citas y tiempos muertos en llamada con soporte central.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Agente conversacional en Telegram/Teams integrado a las OLTs Huawei/ZTE que permite al técnico consultar atenuación dBm y enviar comando de reset y provisión en 60 segundos.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "APIs de OLT",
        "Sistema CRM/OSS",
        "Base de datos de inventario de red"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de clientes"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_001_ftth_1793119590980",
      "projectId": "gtd_proj_001_ftth",
      "scoringVersion": "v1",
      "importanceScore": 79,
      "viabilityScore": 87,
      "easeScore": 73,
      "totalScore": 80.3,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "1450 casos/mes, 35 Minutos/caso. Equivale a 10.150 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (10150.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Retraso en la jornada del técnico, reprogramación de citas y tiempos muertos en llamada con soporte central.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "APIs de OLT, Sistema CRM/OSS, Base de datos de inventario de red",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de clientes",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.980Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_001",
      "projectId": "gtd_proj_001_ftth",
      "analyzedAt": "2026-03-15T14:35:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Iniciativa de alta prioridad orientada a dotar a 45 cuadrillas de terreno con un agente autónomo de diagnóstico y aprovisionamiento FTTH. Elimina más de 10.000 horas anuales de llamadas al NOC.",
        "problemaPrincipal": "Dependencia telefónica de operadores NOC para tareas rutinarias de diagnóstico de atenuación óptica y provisión de ONTs.",
        "procesoActual": "El técnico en domicilio llama al NOC, aguarda en cola de espera, dicta el número de serie de la ONT y espera verificación manual.",
        "consecuenciasPrincipales": [
          "Cuellos de botella en mesa NOC en horas pico",
          "Retraso acumulado en el plan de visitas diarias",
          "Insatisfacción del cliente por tiempos de instalación prolongados"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 1450,
          "minutosPorCaso": 35,
          "horasAnualesEstimadas": 10150,
          "personasParticipantes": 45,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Disminución del tiempo de visita técnica de 35 a 5 minutos por caso. Recuperación de capacidad operativa equivalente a 5 cuadrillas adicionales.",
          "impactoEconomicoReportado": 185000000,
          "tipoImpactoEconomico": "Ahorro de costos directos y aumento de productividad",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Mejora del NPS de instalación y cumplimiento de ventanas horarias.",
          "riesgosActuales": [
            "Congestión telefónica",
            "Desconexiones accidentales por prueba manual"
          ]
        },
        "resultadoEsperado": "Autogestión total de diagnóstico y aprovisionamiento en 60 segundos.",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "Proceso altamente estandarizado con interfaces API en OLTs y reglas determinísticas de validación de potencia.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "No expone datos personales sensibles de clientes finales y cuenta con rollback automático ante fallas.",
        "restriccionesIdentificadas": [
          "Disponibilidad de credenciales y API REST en OLTs",
          "Cobertura de red móvil para cuadrillas de terreno"
        ],
        "recomendacionesImplementacion": [
          "Iniciar con piloto en zona norte con 10 cuadrillas durante 3 semanas",
          "Integrar canal de Teams móvil con autenticación multifactor",
          "Configurar alertas automáticas en caso de splitters saturados"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_002_troncal",
    "initiativeName": "Automatización y Clasificación de Averías en Red Troncal de Fibra",
    "area": "Redes y Conectividad",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-18T10:15:00.000Z",
    "createdAt": "2026-03-18T09:40:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.981Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "agente_parcialmente_autonomo",
    "answers": {
      "initiativeName": "Automatización y Clasificación de Averías en Red Troncal de Fibra",
      "area": "Redes y Conectividad",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Correlación de eventos de corte y disparo de reflectometría OTDR",
      "currentProblem": "Clasificación manual de alarmas SNMP masivas ante caídas de anillos DWDM interurbanos, demorando hasta 50 minutos la identificación del tramo afectado.",
      "trigger": "Recepción de múltiples alarmas de pérdida de señal óptica (LOS)",
      "finalResult": "Identificación del tramo exacto (km/poste) y despacho de cuadrilla de empalme",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Diario",
      "monthlyCases": 680,
      "timePerCase": 45,
      "timeUnit": "Minutos",
      "peopleInvolved": 12,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Riesgo contractual",
        "Afectación a clientes"
      ],
      "affectedGroup": "Clientes externos",
      "errorConsequences": "Despacho de personal a la subestación incorrecta y aumento de indisponibilidad de enlaces críticos.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Sistema que correlacione alarmas de red con mediciones de reflectometría óptica e indique las coordenadas geográficas del corte.",
      "autonomyLevel": "3. Ejecutar acciones sencillas de forma automática",
      "dataSources": [
        "NMS / Zabbix",
        "Sistemas GIS de tendido de fibra"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_002_troncal_1793119590981",
      "projectId": "gtd_proj_002_troncal",
      "scoringVersion": "v1",
      "importanceScore": 76,
      "viabilityScore": 87,
      "easeScore": 86,
      "totalScore": 82.35,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "680 casos/mes, 45 Minutos/caso. Equivale a 6.120 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (6120.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Despacho de personal a la subestación incorrecta y aumento de indisponibilidad de enlaces críticos.",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Clientes externos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "NMS / Zabbix, Sistemas GIS de tendido de fibra",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Ejecutar acciones sencillas de forma automática",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.981Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_002",
      "projectId": "gtd_proj_002_troncal",
      "analyzedAt": "2026-03-18T10:20:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Modelo de correlación inteligente de telemetría de red y reflectometría para la red troncal nacional, reduciendo el MTTR ante eventos de corte en fibra óptica.",
        "problemaPrincipal": "Tiempo excesivo de análisis ante tormentas de alarmas ópticas en la infraestructura troncal.",
        "procesoActual": "Ingeniero del NOC revisa múltiples consolas de monitoreo, consulta el mapa de ductos y solicita disparo manual de reflectómetro.",
        "consecuenciasPrincipales": [
          "Incumplimiento de SLA en contratos corporativos",
          "Mayor costo por horas extras de cuadrillas de empalme"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 680,
          "minutosPorCaso": 45,
          "horasAnualesEstimadas": 6120,
          "personasParticipantes": 12,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Ahorro directo de $240M COP anuales en penalizaciones de SLA y optimización de traslados.",
          "impactoEconomicoReportado": 240000000,
          "tipoImpactoEconomico": "Mitigación de multas por SLA y reducción de MTTR",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Disminución notable del tiempo de corte en enlaces B2B críticos.",
          "riesgosActuales": [
            "Sobrecarga mental de ingenieros de guardia",
            "Errores de ruteo"
          ]
        },
        "resultadoEsperado": "Localización automática del corte en menos de 3 minutos tras la caída de señal.",
        "tipoSolucionRecomendada": "agente_parcialmente_autonomo",
        "justificacionTipoSolucion": "Requiere validación final de un ingeniero de guardia antes de enviar a cuadrilla de terreno con maquinaria pesada.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Impacto operativo si se produce una falsa alarma en troncales de alta capacidad.",
        "restriccionesIdentificadas": [
          "Calibración precisa del inventario GIS de fibra",
          "Acceso seguro a controladores DWDM"
        ],
        "recomendacionesImplementacion": [
          "Entrenar con histórico de los últimos 24 meses de cortes certificados",
          "Incorporar botón de aprobación en 1 clic para el despachador"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_003_facturacion",
    "initiativeName": "Conciliación Automatizada de Facturación de Interconexión Mayorista",
    "area": "Finanzas",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
    "status": "Aprobado para piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-20T11:00:00.000Z",
    "createdAt": "2026-03-20T10:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.981Z",
    "category": "Requiere revisión especializada",
    "riskLevel": "bajo",
    "recommendedSolutionType": "automatizacion_tradicional",
    "answers": {
      "initiativeName": "Conciliación Automatizada de Facturación de Interconexión Mayorista",
      "area": "Finanzas",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
      "processActivity": "Cruce mensual de registros de llamadas/tráfico (CDRs) con facturación de otros operadores",
      "currentProblem": "Cruce manual en Excel de millones de registros de interconexión con otros operadores móviles y fijos, tardando hasta 12 días cada mes en detectar discrepancias.",
      "trigger": "Cierre de ciclo de facturación mensual y recepción de cuenta de cobro del operador aliado",
      "finalResult": "Acta de conciliación aprobada y órdenes de objeción financiera generadas",
      "standardizationLevel": "Está altamente automatizado y estandarizado",
      "frequency": "Mensual",
      "monthlyCases": 35,
      "timePerCase": 240,
      "timeUnit": "Minutos",
      "peopleInvolved": 4,
      "reworkFrequency": "Menos del 5 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Pérdida o retraso de ingresos"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Pagos indebidos de cargos de acceso o demoras en la recuperación de saldos a favor.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Procesamiento automatizado de archivos de CDRs en base de datos con reporte instantáneo de desvíos tarifarios.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Archivos CDR de centrales telefónicas",
        "Facturación ERP SAP"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información financiera"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_003_facturacion_1793119590981",
      "projectId": "gtd_proj_003_facturacion",
      "scoringVersion": "v1",
      "importanceScore": 56,
      "viabilityScore": 92,
      "easeScore": 86,
      "totalScore": 76.1,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "35 casos/mes, 240 Minutos/caso. Equivale a 1.680 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (1680.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Menos del 5 % de los casos",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Pagos indebidos de cargos de acceso o demoras en la recuperación de saldos a favor.",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está altamente automatizado y estandarizado",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Archivos CDR de centrales telefónicas, Facturación ERP SAP",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información financiera",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [
        "Manejo de información financiera sensible."
      ],
      "category": "Requiere revisión especializada",
      "calculatedAt": "2026-10-27T16:46:30.981Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_003",
      "projectId": "gtd_proj_003_facturacion",
      "analyzedAt": "2026-03-20T11:05:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Automatización de alta precisión para el cruce de millones de CDRs de interconexión contra facturas de operadores competidores, liberando 1.680 horas anuales de analistas contables.",
        "problemaPrincipal": "Proceso manual propenso a errores al cruzar gigabytes de datos en hojas de cálculo.",
        "procesoActual": "Descarga manual de archivos de servidores FTP, consolidación en macros de Excel y revisión manual de líneas discrepantes.",
        "consecuenciasPrincipales": [
          "Retraso en objeciones formales ante regulador",
          "Costos financieros por pagos no refutados a tiempo"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 35,
          "minutosPorCaso": 240,
          "horasAnualesEstimadas": 1680,
          "personasParticipantes": 4,
          "nivelReproceso": "Menos del 5 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de conciliación de 12 días a 4 horas por mes.",
          "impactoEconomicoReportado": 95000000,
          "tipoImpactoEconomico": "Ahorro de costos directos y recuperación de cobros",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Proceso interno con impacto directo en liquidez financiera de GTD.",
          "riesgosActuales": [
            "Pérdida de archivos",
            "Corrupción de fórmulas en hojas de cálculo"
          ]
        },
        "resultadoEsperado": "Motor de conciliación BigQuery / Python que entrega reporte de diferencias clasificado por operador y código de servicio.",
        "tipoSolucionRecomendada": "automatizacion_tradicional",
        "justificacionTipoSolucion": "Las reglas matemáticas y financieras son 100% deterministas y no requieren inferencia probabilística.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Ambiente estrictamente controlado con aprobaciones finales por jefatura contable.",
        "restriccionesIdentificadas": [
          "Seguridad en la custodia de datos de CDRs bajo normatividad CRC",
          "Conectividad segura con ERP SAP"
        ],
        "recomendacionesImplementacion": [
          "Validar los formatos estándar de intercambio de CDR con Claro, Tigo y Movistar",
          "Generar alertas de discrepancia mayores al 1% de desviación"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_004_cloud_onboarding",
    "initiativeName": "Asistente de Onboarding y Configuración de Servicios Cloud B2B",
    "area": "Tecnología",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Juan Ramón Jaramillo Hernández (Gerente de Desarrollo y Preventa - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-22T16:00:00.000Z",
    "createdAt": "2026-03-22T15:20:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.981Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Asistente de Onboarding y Configuración de Servicios Cloud B2B",
      "area": "Tecnología",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Juan Ramón Jaramillo Hernández (Gerente de Desarrollo y Preventa - Gtd Colombia)",
      "processActivity": "Recolección de requerimientos técnicos e infraestructura para clientes corporativos",
      "currentProblem": "El levantamiento de especificaciones (IPs, VLANs, máquinas virtuales, políticas de firewall) se realiza mediante correos y formularios no estandarizados, generando múltiples iteraciones y retrasos de hasta 3 semanas.",
      "trigger": "Firma de contrato comercial de servicios Cloud / Datacenter GTD",
      "finalResult": "Ficha técnica aprobada y entregada al equipo de ingeniería de despliegue",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 220,
      "timePerCase": 60,
      "timeUnit": "Minutos",
      "peopleInvolved": 8,
      "reworkFrequency": "Más del 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Pérdida o retraso de ingresos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Clientes externos",
      "errorConsequences": "Configuraciones erróneas de direccionamiento IP o inconsistencias en políticas de seguridad perimetral.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Asistente inteligente guiado que valida en tiempo real la compatibilidad de topologías de red y genera plantillas de aprovisionamiento.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Plantillas de arquitectura de soluciones",
        "Catálogo de servicios Cloud GTD"
      ],
      "dataOrganization": "Distribuida en múltiples sistemas u hojas de cálculo",
      "availableExamples": "Sí, entre 20 y 100 casos",
      "dataType": [
        "Información interna",
        "Información de clientes"
      ],
      "canObtainAutomatically": "Parcialmente viable",
      "hasDocumentation": "Existe pero está desactualizada"
    },
    "score": {
      "id": "score_gtd_proj_004_cloud_onboarding_1793119590981",
      "projectId": "gtd_proj_004_cloud_onboarding",
      "scoringVersion": "v1",
      "importanceScore": 84,
      "viabilityScore": 78,
      "easeScore": 76,
      "totalScore": 79.9,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "220 casos/mes, 60 Minutos/caso. Equivale a 2.640 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2640.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Más del 15 % de los casos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Configuraciones erróneas de direccionamiento IP o inconsistencias en políticas de seguridad perimetral.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Clientes externos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Existe pero está desactualizada",
            "scoreObtained": 8,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Distribuida en múltiples sistemas u hojas de cálculo",
            "scoreObtained": 15,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, entre 20 y 100 casos",
            "scoreObtained": 15,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Apto, Agente/IA: Apto",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Plantillas de arquitectura de soluciones, Catálogo de servicios Cloud GTD",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Parcialmente viable",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de clientes",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.981Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_004",
      "projectId": "gtd_proj_004_cloud_onboarding",
      "analyzedAt": "2026-03-22T16:10:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Portal y asistente conversacional para acelerar la recopilación de datos técnicos de clientes B2B para servicios de Nube y Conectividad SD-WAN, reduciendo el onboarding de 21 a 4 días.",
        "problemaPrincipal": "Falta de validación previa en los parámetros de red entregados por el cliente corporativo.",
        "procesoActual": "El comercial envía un documento Word al cliente, quien lo devuelve incompleto; el ingeniero debe agendar 3 o 4 sesiones de aclaración.",
        "consecuenciasPrincipales": [
          "Retraso en el reconocimiento de ingresos contractuales",
          "Frustración inicial del cliente corporativo"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 220,
          "minutosPorCaso": 60,
          "horasAnualesEstimadas": 2640,
          "personasParticipantes": 8,
          "nivelReproceso": "Más del 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Acelera el inicio de facturación en promedio 17 días por cada enlace corporativo vendido.",
          "impactoEconomicoReportado": 120000000,
          "tipoImpactoEconomico": "Aceleración de Time-to-Market y facturación temprana",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Mejora radical de la primera impresión en la experiencia B2B.",
          "riesgosActuales": [
            "Pérdida de clientes antes del encendido por demoras"
          ]
        },
        "resultadoEsperado": "Formulario inteligente con validaciones de subnetting y reglas de firewall.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Capacidad de razonar y asistir al cliente corporativo resolviendo dudas técnicas en lenguaje natural.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Maneja datos de arquitectura de red privada de empresas clientes.",
        "restriccionesIdentificadas": [
          "Integración con el catálogo de productos de preventa",
          "Validación de autenticidad del contacto técnico del cliente"
        ],
        "recomendacionesImplementacion": [
          "Integrar asistente en el portal de clientes GTD con inicio de sesión único (SSO)",
          "Construir generador automático de diagramas lógicos de red"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_005_auditoria_red",
    "initiativeName": "Auditoría Preventiva de Calidad de Documentación de Enlaces de Fibra",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "En backlog",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-24T09:00:00.000Z",
    "createdAt": "2026-03-24T08:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.982Z",
    "category": "Piloto de aprendizaje",
    "riskLevel": "medio",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Auditoría Preventiva de Calidad de Documentación de Enlaces de Fibra",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Revisión de carpetas de entrega técnica de contratistas de tendido de fibra",
      "currentProblem": "Revisión visual de cientos de fotografías y diagramas de empalme entregados por cuadrillas contratistas para autorizar el pago del hito.",
      "trigger": "Entrega de liquidación de obra civil o tendido por parte del contratista",
      "finalResult": "Certificado de calidad de obra emitido y autorización de pago de contratista",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 500,
      "timePerCase": 20,
      "timeUnit": "Minutos",
      "peopleInvolved": 6,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Errores en la información"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Aprobación de empalmes con radio de curvatura indebido o falta de sellado hermético.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Módulo con visión computacional que examine fotos de postes, etiquetas y curvas de atenuación.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Fotografías tomadas por contratistas",
        "Curvas de reflectometría PDF"
      ],
      "dataOrganization": "Archivos de texto, correos o PDFs sin estructura clara",
      "availableExamples": "Sí, entre 20 y 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "No se puede obtener automáticamente",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_005_auditoria_red_1793119590982",
      "projectId": "gtd_proj_005_auditoria_red",
      "scoringVersion": "v1",
      "importanceScore": 53,
      "viabilityScore": 72,
      "easeScore": 70,
      "totalScore": 63.9,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "500 casos/mes, 20 Minutos/caso. Equivale a 2.000 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2000.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Aprobación de empalmes con radio de curvatura indebido o falta de sellado hermético.",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Archivos de texto, correos o PDFs sin estructura clara",
            "scoreObtained": 10,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, entre 20 y 100 casos",
            "scoreObtained": 15,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Fotografías tomadas por contratistas, Curvas de reflectometría PDF",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "No se puede obtener automáticamente",
            "scoreObtained": 5,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Piloto de aprendizaje",
      "calculatedAt": "2026-10-27T16:46:30.982Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_005",
      "projectId": "gtd_proj_005_auditoria_red",
      "analyzedAt": "2026-03-24T09:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Sistema de inspección por visión artificial de entregables fotográficos y técnicos de contratistas de tendido de fibra óptica para garantizar la integridad de la planta externa.",
        "problemaPrincipal": "Volumen inmanejable de fotografías que impide a los supervisores auditar el 100% de los hitos constructivos.",
        "procesoActual": "Muestreo aleatorio del 10% de las obras; el 90% restante queda sin validación visual antes del pago.",
        "consecuenciasPrincipales": [
          "Fallas prematuras en cajas de empalme por ingreso de agua",
          "Costos imprevistos de reparación durante el período de garantía"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 500,
          "minutosPorCaso": 20,
          "horasAnualesEstimadas": 2000,
          "personasParticipantes": 6,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Inspección del 100% de las obras civiles con reducción de fallas operativas en los primeros 12 meses.",
          "impactoEconomicoReportado": 45000000,
          "tipoImpactoEconomico": "Ahorro de costos por mantenimiento correctivo posterior",
          "nivelEvidencia": "estimado",
          "afectacionClientes": "Mayor confiabilidad y resiliencia de la red de fibra óptica.",
          "riesgosActuales": [
            "Reclamaciones tardías a contratistas liquidados"
          ]
        },
        "resultadoEsperado": "Auditoría automatizada de imágenes con dictamen de pasa/no pasa.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Se beneficia de modelos multimodales (Gemini Vision) para reconocer elementos físicos y etiquetas reglamentarias.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Riesgo de falsos rechazos que bloqueen pagos a contratistas aliados.",
        "restriccionesIdentificadas": [
          "Calidad y resolución variable de cámaras de celulares de contratistas",
          "Estandarización de ángulos fotográficos requeridos"
        ],
        "recomendacionesImplementacion": [
          "Probar primero con Gemini multimodal en un lote piloto de 100 carpetas",
          "Definir lista de verificación estricta: sellos, etiquetas y radios de curvatura"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_006_soc_triage",
    "initiativeName": "Triage y Correlación Autónoma de Incidentes de Ciberseguridad en el SOC",
    "area": "Ciberseguridad",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-25T11:20:00.000Z",
    "createdAt": "2026-03-25T11:00:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.982Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "agente_parcialmente_autonomo",
    "answers": {
      "initiativeName": "Triage y Correlación Autónoma de Incidentes de Ciberseguridad en el SOC",
      "area": "Ciberseguridad",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Filtrado de alertas de seguridad del SIEM y enriquecimiento con fuentes de Threat Intelligence",
      "currentProblem": "El SOC recibe más de 8.500 alertas diarias generadas por firewalls perimetrales y sensores EDR; el 92% son falsos positivos que saturan a los analistas L1.",
      "trigger": "Generación de evento de severidad media/alta en consola SIEM",
      "finalResult": "Alerta clasificada, enriquecida con reputación de IP/dominio y escalada a L2 si es amenaza real",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 8500,
      "timePerCase": 12,
      "timeUnit": "Minutos",
      "peopleInvolved": 14,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Riesgo de seguridad",
        "Sobrecostos",
        "Retrasos en la atención"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Fatiga de alertas y riesgo de no detectar a tiempo un ataque de ransomware o exfiltración de datos.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Agente autónomo integrado a VirusTotal, AlienVault y SIEM que descarta falsos positivos y redacta el informe forense preliminar.",
      "autonomyLevel": "3. Ejecutar acciones sencillas de forma automática",
      "dataSources": [
        "Consola SIEM / Splunk",
        "APIs de Threat Intelligence (VirusTotal, AbuseIPDB)"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información confidencial"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_006_soc_triage_1793119590982",
      "projectId": "gtd_proj_006_soc_triage",
      "scoringVersion": "v1",
      "importanceScore": 79,
      "viabilityScore": 87,
      "easeScore": 82,
      "totalScore": 82.55,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "8500 casos/mes, 12 Minutos/caso. Equivale a 20.400 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (20400.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Fatiga de alertas y riesgo de no detectar a tiempo un ataque de ransomware o exfiltración de datos.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Consola SIEM / Splunk, APIs de Threat Intelligence (VirusTotal, AbuseIPDB)",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información confidencial",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Ejecutar acciones sencillas de forma automática",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.982Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_006",
      "projectId": "gtd_proj_006_soc_triage",
      "analyzedAt": "2026-03-25T11:30:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Automatización inteligente para el triaje y enriquecimiento de 8.500 alertas mensuales en el Centro de Operaciones de Seguridad (SOC) de GTD, reduciendo el tiempo de análisis de 12 minutos a 15 segundos.",
        "problemaPrincipal": "Sobrecarga de analistas L1 por avalancha de eventos y falsos positivos.",
        "procesoActual": "El analista copia manualmente la dirección IP o hash sospechoso en múltiples plataformas públicas para determinar su reputación.",
        "consecuenciasPrincipales": [
          "Retraso de hasta 4 horas en detectar incidentes críticos reales",
          "Alta rotación y agotamiento del equipo de ciberseguridad"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 8500,
          "minutosPorCaso": 12,
          "horasAnualesEstimadas": 20400,
          "personasParticipantes": 14,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Filtrado automático del 85% de los falsos positivos y aislamiento preventivo de endpoints comprometidos.",
          "impactoEconomicoReportado": 310000000,
          "tipoImpactoEconomico": "Mitigación de riesgos de ciberataques y optimización de analistas SOC",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Protección integral de las redes corporativas y servicios de telecomunicaciones de clientes GTD.",
          "riesgosActuales": [
            "Brechas de seguridad inadvertidas",
            "Violación de directivas ISO 27001"
          ]
        },
        "resultadoEsperado": "Playbook automatizado que ejecuta consultas API paralelas y actualiza el ticket con veredicto en tiempo récord.",
        "tipoSolucionRecomendada": "agente_parcialmente_autonomo",
        "justificacionTipoSolucion": "Las consultas y bloqueos de IPs benignas son automáticos, reservando la autorización de bloqueo perimetral a analistas certificados.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Acceso a logs de seguridad corporativos.",
        "restriccionesIdentificadas": [
          "Cuotas y límites de API en feeds comerciales de inteligencia de amenazas"
        ],
        "recomendacionesImplementacion": [
          "Implementar en ambiente de laboratorio con datos anonimizados durante 2 semanas",
          "Configurar lista blanca de IPs troncales de Grupo GTD"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_007_cotizador_sdwan",
    "initiativeName": "Motor de Factibilidad Técnica y Cotización Automática de Enlaces SD-WAN",
    "area": "Comercial",
    "processOwner": "fernando.villate@grupogtd.com",
    "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
    "status": "Aprobado para piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "fernando.villate@grupogtd.com",
    "submittedAt": "2026-03-26T08:45:00.000Z",
    "createdAt": "2026-03-26T08:15:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.982Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Motor de Factibilidad Técnica y Cotización Automática de Enlaces SD-WAN",
      "area": "Comercial",
      "processOwner": "fernando.villate@grupogtd.com",
      "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
      "processActivity": "Validación de cobertura de fibra óptica y cálculo de CAPEX/OPEX para propuestas comerciales B2B",
      "currentProblem": "Los ejecutivos de cuenta esperan entre 3 y 5 días para que Preventa e Ingeniería de Red validen si hay cobertura de fibra propia o si se requiere contratar a terceros.",
      "trigger": "Ingreso de solicitud de cotización empresarial en el CRM Salesforce",
      "finalResult": "Oferta comercial con desglose de equipos, ancho de banda y margen financiero generada en PDF",
      "standardizationLevel": "Está altamente automatizado y estandarizado",
      "frequency": "Varias veces al día",
      "monthlyCases": 950,
      "timePerCase": 40,
      "timeUnit": "Minutos",
      "peopleInvolved": 18,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Pérdida o retraso de ingresos",
        "Retrasos en la atención",
        "Afectación a clientes"
      ],
      "affectedGroup": "Clientes externos",
      "errorConsequences": "Pérdida de negocios corporativos frente a competidores que cotizan en menos de 2 horas.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Módulo georreferenciado que cruza la dirección del cliente con los buffers de fibra óptica GTD y calcula la inversión automáticamente.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "GIS de Fibra Óptica GTD",
        "Tarifario de equipamiento CPE",
        "CRM Salesforce"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información comercial sensible",
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_007_cotizador_sdwan_1793119590982",
      "projectId": "gtd_proj_007_cotizador_sdwan",
      "scoringVersion": "v1",
      "importanceScore": 77,
      "viabilityScore": 92,
      "easeScore": 73,
      "totalScore": 81.25,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "950 casos/mes, 40 Minutos/caso. Equivale a 7.600 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (7600.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Pérdida de negocios corporativos frente a competidores que cotizan en menos de 2 horas.",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Clientes externos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está altamente automatizado y estandarizado",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "GIS de Fibra Óptica GTD, Tarifario de equipamiento CPE, CRM Salesforce",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información comercial sensible, Información interna",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.982Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_007",
      "projectId": "gtd_proj_007_cotizador_sdwan",
      "analyzedAt": "2026-03-26T08:50:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Plataforma de factibilidad técnica instantánea y tarificación de enlaces SD-WAN corporativos que reduce de 96 horas a 10 minutos el ciclo de entrega de propuestas comerciales.",
        "problemaPrincipal": "Dependencia de validación manual en mapas de planta externa por parte de ingenieros de preventa.",
        "procesoActual": "El comercial envía un correo al área de ingeniería, quien abre el software GIS, mide distancias al mufas/cámaras más cercanas y cotiza tendido de última milla.",
        "consecuenciasPrincipales": [
          "Tasa de pérdida de clientes superior al 18% por respuesta tardía",
          "Ingenieros de alta calificación dedicados a tareas repetitivas de cálculo de metros de fibra"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 950,
          "minutosPorCaso": 40,
          "horasAnualesEstimadas": 7600,
          "personasParticipantes": 18,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Incremento estimado de $380M COP en margen bruto anual por aceleración de funnel comercial.",
          "impactoEconomicoReportado": 380000000,
          "tipoImpactoEconomico": "Aumento de ingresos comerciales y tasa de conversión de ventas",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Respuesta inmediata al cliente corporativo aumentando la reputación de agilidad de GTD.",
          "riesgosActuales": [
            "Errores de estimación de costos en obras complejas"
          ]
        },
        "resultadoEsperado": "Algoritmo geoespacial que calcula automáticamente el costo de acometida y genera la propuesta en PDF.",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "Las reglas de diseño de planta externa y matrices de precios unitarios están perfectamente parametrizadas.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Riesgo controlado mediante límites máximos de descuento aprobados por la Gerencia Comercial.",
        "restriccionesIdentificadas": [
          "Actualización continua de la capa GIS de mufas y postes disponibles"
        ],
        "recomendacionesImplementacion": [
          "Integrar con Salesforce mediante API REST",
          "Incluir cálculo de SLA esperado según topología de redundancia"
        ]
      }
    },
    "createdBy": "fernando.villate@grupogtd.com"
  },
  {
    "id": "gtd_proj_008_churn_b2b",
    "initiativeName": "Modelo Predictivo y Agente de Retención Temprana de Cuentas B2B",
    "area": "Comercial",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-27T15:00:00.000Z",
    "createdAt": "2026-03-27T14:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.982Z",
    "category": "Requiere revisión especializada",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Modelo Predictivo y Agente de Retención Temprana de Cuentas B2B",
      "area": "Comercial",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
      "processActivity": "Detección de señales de insatisfacción y riesgo de cancelación de contratos de telecomunicaciones",
      "currentProblem": "Los ejecutivos de cuenta se enteran de la insatisfacción del cliente corporativo cuando este radica la carta formal de cancelación del servicio, sin tiempo de maniobra para retenerlo.",
      "trigger": "Cierre mensual de métricas de red y análisis de tickets de soporte en CRM",
      "finalResult": "Lista de clientes con alto score de fuga y plan de retención personalizado asignado al Key Account Manager",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 320,
      "timePerCase": 90,
      "timeUnit": "Minutos",
      "peopleInvolved": 10,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Pérdida o retraso de ingresos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Pérdida de facturación recurrente en cuentas corporativas clave con ticket promedio alto.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Dashboard y alertas que avisan con 90 días de anticipación la probabilidad de fuga analizando caídas de tráfico, tickets y demoras de pago.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Telemetría de tráfico en routers de borde",
        "Histórico de tickets Zendesk/CRM",
        "Mora y pagos en SAP"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información de clientes",
        "Información financiera"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_008_churn_b2b_1793119590982",
      "projectId": "gtd_proj_008_churn_b2b",
      "scoringVersion": "v1",
      "importanceScore": 72,
      "viabilityScore": 87,
      "easeScore": 77,
      "totalScore": 78.5,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "320 casos/mes, 90 Minutos/caso. Equivale a 5.760 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (5760.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Pérdida de facturación recurrente en cuentas corporativas clave con ticket promedio alto.",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Telemetría de tráfico en routers de borde, Histórico de tickets Zendesk/CRM, Mora y pagos en SAP",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información de clientes, Información financiera",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [
        "Manejo de información financiera sensible."
      ],
      "category": "Requiere revisión especializada",
      "calculatedAt": "2026-10-27T16:46:30.982Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_008",
      "projectId": "gtd_proj_008_churn_b2b",
      "analyzedAt": "2026-03-27T15:10:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Sistema predictivo basado en Vertex AI para anticipar cancelaciones de contratos corporativos de telecomunicaciones con 90 días de anticipación, protegiendo $520M COP anuales de facturación recurrente.",
        "problemaPrincipal": "Falta de visibilidad unificada de los factores que degradan la relación con los clientes empresariales.",
        "procesoActual": "Revisión reactiva una vez que el cliente envía la carta de intención de no renovación.",
        "consecuenciasPrincipales": [
          "Pérdida irreparable de ingresos mensuales recurrentes (MRR)",
          "Altos costos de adquisición comercial para reemplazar los ingresos perdidos"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 320,
          "minutosPorCaso": 90,
          "horasAnualesEstimadas": 5760,
          "personasParticipantes": 10,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción proyectada del churn corporativo del 4.2% al 2.6% anual.",
          "impactoEconomicoReportado": 520000000,
          "tipoImpactoEconomico": "Protección de ingresos recurrentes (MRR) y disminución de churn",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Atención proactiva a clientes en riesgo antes de que escalen reclamos graves.",
          "riesgosActuales": [
            "Fuga masiva de clientes a la competencia"
          ]
        },
        "resultadoEsperado": "Score de salud del cliente (Health Score) actualizado semanalmente en Salesforce.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Capacidad de analizar correlaciones no lineales entre datos de red, tickets y patrones de consumo.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "No realiza acciones automáticas sobre los servicios; emite recomendaciones comerciales a ejecutivos humanos.",
        "restriccionesIdentificadas": [
          "Limpieza y sincronización de datos entre el sistema de facturación y el NMS de red"
        ],
        "recomendacionesImplementacion": [
          "Comenzar con el top 200 de clientes corporativos de mayor facturación",
          "Crear un comité quincenal de retención comercial para revisar las alertas prioritarias"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_009_datacenter_cooling",
    "initiativeName": "Optimización Predictiva de Climatización y Eficiencia Energética (PUE) en Data Centers GTD",
    "area": "Infraestructura",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "En piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-28T10:00:00.000Z",
    "createdAt": "2026-03-28T09:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.983Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "agente_parcialmente_autonomo",
    "answers": {
      "initiativeName": "Optimización Predictiva de Climatización y Eficiencia Energética (PUE) en Data Centers GTD",
      "area": "Infraestructura",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Control de unidades de aire acondicionado de precisión (CRAC) en salas de servidores",
      "currentProblem": "Las salas de servidores se mantienen a temperaturas ultrabajas fijas por precaución, generando un sobrecosto eléctrico masivo en los Data Centers de GTD.",
      "trigger": "Lectura continua de sensores de temperatura y humedad en pasillos fríos y calientes",
      "finalResult": "Ajuste dinámico de setpoints de climatización manteniendo la temperatura en rangos seguros ASHRAE",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 720,
      "timePerCase": 30,
      "timeUnit": "Minutos",
      "peopleInvolved": 6,
      "reworkFrequency": "Menos del 5 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Riesgo de seguridad"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Riesgo de sobrecalentamiento de servidores si el sistema falla, o sobrecostos de energía millonarios si se sobreenfría.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Controlador inteligente que anticipa la carga térmica según la hora del día y la temperatura exterior de la ciudad.",
      "autonomyLevel": "3. Ejecutar acciones sencillas de forma automática",
      "dataSources": [
        "Sistema BMS (Building Management System)",
        "Telemetría IoT de sensores térmicos"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_009_datacenter_cooling_1793119590982",
      "projectId": "gtd_proj_009_datacenter_cooling",
      "scoringVersion": "v1",
      "importanceScore": 74,
      "viabilityScore": 87,
      "easeScore": 86,
      "totalScore": 81.55,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "720 casos/mes, 30 Minutos/caso. Equivale a 4.320 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (4320.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Menos del 5 % de los casos",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Riesgo de sobrecalentamiento de servidores si el sistema falla, o sobrecostos de energía millonarios si se sobreenfría.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Sistema BMS (Building Management System), Telemetría IoT de sensores térmicos",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Ejecutar acciones sencillas de forma automática",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.982Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_009",
      "projectId": "gtd_proj_009_datacenter_cooling",
      "analyzedAt": "2026-03-28T10:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Sistema de optimización energética autónomo para las salas de servidores de los Data Centers de Grupo GTD, optimizando el PUE de 1.62 a 1.38 con un ahorro comprobado de $280M COP anuales.",
        "problemaPrincipal": "Falta de modulación dinámica en los equipos de enfriamiento ante variaciones climáticas externas y de carga computacional.",
        "procesoActual": "Los operadores del centro de cómputo revisan manualmente termómetros y dejan configurados los compresores a máxima potencia continua.",
        "consecuenciasPrincipales": [
          "Facturas eléctricas desproporcionadas en horas de baja demanda nocturna",
          "Mayor desgaste mecánico y fallas de compresores de enfriamiento"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 720,
          "minutosPorCaso": 30,
          "horasAnualesEstimadas": 4320,
          "personasParticipantes": 6,
          "nivelReproceso": "Menos del 5 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del consumo energético global del Data Center en un 14.5% y cumplimiento de metas ESG de sostenibilidad.",
          "impactoEconomicoReportado": 280000000,
          "tipoImpactoEconomico": "Ahorro directo en factura eléctrica y reducción de huella de carbono",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Garantía de uptime y resiliencia para clientes de colocación y nube privada.",
          "riesgosActuales": [
            "Puntos calientes no detectados en racks densos"
          ]
        },
        "resultadoEsperado": "Regulación autónoma de velocidad de ventiladores y flujo de aire guiada por gemelo digital térmico.",
        "tipoSolucionRecomendada": "agente_parcialmente_autonomo",
        "justificacionTipoSolucion": "Ajuste autónomo con topes de seguridad por hardware que impiden exceder 25°C en cualquier pasillo.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "La infraestructura física aloja servidores de misión crítica de bancos y entidades de gobierno.",
        "restriccionesIdentificadas": [
          "Compatibilidad con protocolos Modbus y BACnet en unidades CRAC antiguas"
        ],
        "recomendacionesImplementacion": [
          "Ejecutar prueba de concepto en Sala 2 durante 60 días",
          "Instalar 40 sensores de temperatura inalámbricos adicionales en pasillos calientes"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_010_wifi_soporte",
    "initiativeName": "Asistente Virtual de Diagnóstico y Autocorrección de Wi-Fi Hogar y ONT",
    "area": "Atención a Clientes",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-29T12:00:00.000Z",
    "createdAt": "2026-03-29T11:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.983Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Asistente Virtual de Diagnóstico y Autocorrección de Wi-Fi Hogar y ONT",
      "area": "Atención a Clientes",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
      "processActivity": "Atención de llamadas de clientes residenciales reportando lentitud o cortes en internet",
      "currentProblem": "El 65% de las llamadas al Call Center por lentitud corresponden a interferencias de canal Wi-Fi, ubicación del router o saturación de dispositivos en el hogar, resolviéndose con reinicios simples.",
      "trigger": "Contacto del abonado por WhatsApp, app móvil o portal web",
      "finalResult": "Diagnóstico remoto completado, cambio automático de canal Wi-Fi y confirmación con el cliente",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 3800,
      "timePerCase": 18,
      "timeUnit": "Minutos",
      "peopleInvolved": 30,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Clientes externos",
      "errorConsequences": "Largas colas de espera en el Call Center y despacho innecesario de técnicos de terreno.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Bot inteligente en WhatsApp capaz de ejecutar comandos TR-069 en el router residencial para cambiar canal y reiniciar remotamente.",
      "autonomyLevel": "3. Ejecutar acciones sencillas de forma automática",
      "dataSources": [
        "Servidor ACS / TR-069",
        "Base de datos de clientes residenciales"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de clientes"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_010_wifi_soporte_1793119590983",
      "projectId": "gtd_proj_010_wifi_soporte",
      "scoringVersion": "v1",
      "importanceScore": 75,
      "viabilityScore": 87,
      "easeScore": 82,
      "totalScore": 80.95,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "3800 casos/mes, 18 Minutos/caso. Equivale a 13.680 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (13680.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Largas colas de espera en el Call Center y despacho innecesario de técnicos de terreno.",
            "scoreObtained": 21,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Clientes externos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Servidor ACS / TR-069, Base de datos de clientes residenciales",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de clientes",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Ejecutar acciones sencillas de forma automática",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.983Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_010",
      "projectId": "gtd_proj_010_wifi_soporte",
      "analyzedAt": "2026-03-29T12:05:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Asistente inteligente de autoservicio para diagnóstico y optimización remota de routers Wi-Fi residenciales, absorbiendo 3.800 solicitudes mensuales sin intervención de operadores telefónicos.",
        "problemaPrincipal": "Saturación del Call Center por incidencias de fácil resolución en la red inalámbrica doméstica del cliente.",
        "procesoActual": "El usuario llama a la línea 018000, espera 12 minutos en conmutador y un agente le pide desconectar y conectar cables manualmente.",
        "consecuenciasPrincipales": [
          "Bajo índice de resolución en primer contacto (FCR)",
          "Despacho innecesario de cuadrillas de terreno para revisar problemas de configuración"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 3800,
          "minutosPorCaso": 18,
          "horasAnualesEstimadas": 13680,
          "personasParticipantes": 30,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Resolución del 70% de las incidencias en menos de 90 segundos a través de WhatsApp.",
          "impactoEconomicoReportado": 220000000,
          "tipoImpactoEconomico": "Reducción de llamadas a call center y visitas técnicas innecesarias",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Mejora inmediata de la satisfacción del abonado al resolver su falla en cualquier momento 24/7.",
          "riesgosActuales": [
            "Insatisfacción por esperas telefónicas prolongadas"
          ]
        },
        "resultadoEsperado": "Flujo conversacional con pruebas en tiempo real de potencia óptica, latencia y cambio de frecuencia a 5 GHz.",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "Las consultas y comandos sobre el protocolo TR-069 son estándar y seguros.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "No realiza cambios de configuración destructivos; en caso de falla de fibra real, deriva al agendador de visitas.",
        "restriccionesIdentificadas": [
          "Disponibilidad del protocolo TR-069 en el 100% del parque de ONTs Huawei y ZTE"
        ],
        "recomendacionesImplementacion": [
          "Comenzar con clientes de fibra óptica en Medellín y Bogotá",
          "Habilitar opción de reinicio suave de ONT desde el chat"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_011_rfp_legal",
    "initiativeName": "Extractor Semántico de Requisitos y Matrices de Cumplimiento en Licitaciones",
    "area": "Legal",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Leda Betancurt Noreña (Gerente Asuntos Legales y Regulatorios - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-30T16:20:00.000Z",
    "createdAt": "2026-03-30T15:50:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.983Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Extractor Semántico de Requisitos y Matrices de Cumplimiento en Licitaciones",
      "area": "Legal",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Leda Betancurt Noreña (Gerente Asuntos Legales y Regulatorios - Gtd Colombia)",
      "processActivity": "Lectura de pliegos de contratación pública y redacción de matriz de riesgos legales y SLAs",
      "currentProblem": "Los pliegos de contratación de entidades públicas y multinacionales superan las 300 páginas; los abogados tardan hasta 5 días hábiles en leerlos y consolidar las condiciones de garantía y multas.",
      "trigger": "Publicación de nuevo proceso licitatorio en SECOP o plataforma privada",
      "finalResult": "Matriz Excel con todas las causales de rechazo, pólizas exigidas, plazos de entrega y niveles de servicio",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 45,
      "timePerCase": 360,
      "timeUnit": "Minutos",
      "peopleInvolved": 5,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Riesgo contractual",
        "Pérdida o retraso de ingresos"
      ],
      "affectedGroup": "Otras áreas de la empresa",
      "errorConsequences": "Presentar propuestas incompletas que resultan en descalificación o asumir multas leoninas por falta de revisión previa.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Asistente con Gemini que analiza el PDF del pliego y responde preguntas clave sobre seguros, SLAs mínimos y requisitos habilitantes.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Pliegos PDF de contratación",
        "Histórico de matrices de licitaciones anteriores"
      ],
      "dataOrganization": "Archivos de texto, correos o PDFs sin estructura clara",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información confidencial",
        "Información legal"
      ],
      "canObtainAutomatically": "No se puede obtener automáticamente",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_011_rfp_legal_1793119590983",
      "projectId": "gtd_proj_011_rfp_legal",
      "scoringVersion": "v1",
      "importanceScore": 74,
      "viabilityScore": 77,
      "easeScore": 68,
      "totalScore": 73.55,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "45 casos/mes, 360 Minutos/caso. Equivale a 3.240 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (3240.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Presentar propuestas incompletas que resultan en descalificación o asumir multas leoninas por falta de revisión previa.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Otras áreas de la empresa",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Archivos de texto, correos o PDFs sin estructura clara",
            "scoreObtained": 10,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Pliegos PDF de contratación, Histórico de matrices de licitaciones anteriores",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "No se puede obtener automáticamente",
            "scoreObtained": 5,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información confidencial, Información legal",
            "scoreObtained": 21,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.983Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_011",
      "projectId": "gtd_proj_011_rfp_legal",
      "analyzedAt": "2026-03-30T16:25:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Herramienta de análisis documental potenciada por modelos multimodales para la extracción estructurada de cláusulas, garantías y requisitos técnicos en pliegos de contratación pública y privada.",
        "problemaPrincipal": "Tiempos excesivos de lectura que impiden al equipo legal revisar todas las licitaciones de telecomunicaciones que se publican en el mercado.",
        "procesoActual": "El abogado lee manualmente pliegos extensos, resaltando texto y transcribiendo a una plantilla de Excel.",
        "consecuenciasPrincipales": [
          "Pérdida de oportunidades comerciales multimillonarias por falta de tiempo para armar la oferta",
          "Riesgo de pasar por alto requisitos habilitantes mínimos"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 45,
          "minutosPorCaso": 360,
          "horasAnualesEstimadas": 3240,
          "personasParticipantes": 5,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de elaboración de la matriz de 4 días a 45 minutos por licitación.",
          "impactoEconomicoReportado": 140000000,
          "tipoImpactoEconomico": "Aumento de adjudicaciones y reducción de riesgos jurídicos",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Permite a GTD competir en proyectos estratégicos con el sector público y banca.",
          "riesgosActuales": [
            "Rechazos de ofertas por fallas formales"
          ]
        },
        "resultadoEsperado": "Resumen ejecutivo automático con semáforo de viabilidad jurídica y matriz de cumplimiento lista para auditoría.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Ideal para modelos LLM de contexto largo (Gemini 2.5) con capacidad de analizar cientos de páginas simultáneamente.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "El dictamen de la IA es una ayuda preliminar; la aprobación final la firma el apoderado legal.",
        "restriccionesIdentificadas": [
          "Procesamiento de documentos escaneados con baja resolución o firmas manuscritas"
        ],
        "recomendacionesImplementacion": [
          "Integrar OCR avanzado de Google Cloud Document AI para digitalizar pliegos escaneados",
          "Configurar alertas para cláusulas de penalización desproporcionadas"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_012_inventario_activo",
    "initiativeName": "Conciliación Automatizada de Inventario Físico vs Lógico de Puertos GPON y DWDM",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Aprobado para piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-03-31T09:10:00.000Z",
    "createdAt": "2026-03-31T08:40:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.983Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "automatizacion_tradicional",
    "answers": {
      "initiativeName": "Conciliación Automatizada de Inventario Físico vs Lógico de Puertos GPON y DWDM",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Cruce de configuración real de chasis OLT/DWDM con base de datos de inventario OSS/CRM",
      "currentProblem": "Existen discrepancias entre lo que figura en el sistema de ventas (puerto ocupado) y lo que realmente está configurado en el equipo, bloqueando ventas por 'falta de puertos' cuando en realidad hay disponibilidad.",
      "trigger": "Descubrimiento de red semanal mediante SNMP/SSH",
      "finalResult": "Inventario conciliado, puertos fantasma liberados y actualización automática en el OSS",
      "standardizationLevel": "Está altamente automatizado y estandarizado",
      "frequency": "Semanal",
      "monthlyCases": 180,
      "timePerCase": 60,
      "timeUnit": "Minutos",
      "peopleInvolved": 6,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Pérdida o retraso de ingresos",
        "Sobrecostos",
        "Retrasos en la atención"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Inversiones innecesarias en compra de nuevas tarjetas OLT creyendo erróneamente que la red está saturada.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Script orquestado que consulta las OLTs de madrugada, compara contra el CRM y reporta diferencias.",
      "autonomyLevel": "3. Ejecutar acciones sencillas de forma automática",
      "dataSources": [
        "Comandos CLI en OLTs (Huawei/ZTE)",
        "Base de datos OSS/CRM"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_012_inventario_activo_1793119590983",
      "projectId": "gtd_proj_012_inventario_activo",
      "scoringVersion": "v1",
      "importanceScore": 72,
      "viabilityScore": 92,
      "easeScore": 86,
      "totalScore": 82.5,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "180 casos/mes, 60 Minutos/caso. Equivale a 2.160 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2160.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Inversiones innecesarias en compra de nuevas tarjetas OLT creyendo erróneamente que la red está saturada.",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está altamente automatizado y estandarizado",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Comandos CLI en OLTs (Huawei/ZTE), Base de datos OSS/CRM",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Ejecutar acciones sencillas de forma automática",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.983Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_012",
      "projectId": "gtd_proj_012_inventario_activo",
      "analyzedAt": "2026-03-31T09:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Conciliación continua entre la configuración viva de la red de acceso y los registros comerciales de inventario, recuperando un 12% de capacidad disponible sin desembolsos de capital.",
        "problemaPrincipal": "Falta de sincronización bidireccional tras cancelaciones de clientes o cambios técnicos no registrados.",
        "procesoActual": "Auditorías manuales esporádicas cuando un cliente reclama que no hay cupo en su edificio.",
        "consecuenciasPrincipales": [
          "Oportunidades de venta perdidas por falsos agotamientos de puerto",
          "Descoordinación entre ingeniería de planta interna y el área comercial"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 180,
          "minutosPorCaso": 60,
          "horasAnualesEstimadas": 2160,
          "personasParticipantes": 6,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Ahorro directo comprobado de $190M COP en compras de tarjetas de expansión OLT.",
          "impactoEconomicoReportado": 190000000,
          "tipoImpactoEconomico": "Ahorro de CAPEX en equipamiento y aumento de disponibilidad comercial",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Habilitación inmediata de cupos de conectividad para nuevos clientes.",
          "riesgosActuales": [
            "Inversiones redundantes"
          ]
        },
        "resultadoEsperado": "Dashboard de discrepancias y sincronización automática de estados con base de datos central.",
        "tipoSolucionRecomendada": "automatizacion_tradicional",
        "justificacionTipoSolucion": "Las reglas lógicas de cotejo de datos son exactas y deterministas.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Solo actualiza banderas de disponibilidad en el sistema de inventario sin interrumpir tráfico de clientes activos.",
        "restriccionesIdentificadas": [
          "Ventana nocturna de consultas para no sobrecargar CPU de las OLTs"
        ],
        "recomendacionesImplementacion": [
          "Ejecutar los domingos a las 02:00 am en lotes de 10 OLTs",
          "Generar reporte de puertos con atenuación fuera de norma"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_013_reprogramacion_visitas",
    "initiativeName": "Agente Autónomo de Confirmación y Reprogramación Inteligente de Visitas Técnicas",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Implementado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-02T14:00:00.000Z",
    "createdAt": "2026-04-02T13:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.983Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Agente Autónomo de Confirmación y Reprogramación Inteligente de Visitas Técnicas",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Confirmación con clientes de citas de instalación o reparación de fibra óptica",
      "currentProblem": "El 24% de las visitas técnicas terminan en 'cliente ausente' o 'portería no autoriza', costando combustible, tiempo de cuadrilla y reprogramaciones manuales tardías.",
      "trigger": "Asignación de orden de trabajo en la agenda del técnico para el día siguiente",
      "finalResult": "Cita confirmada por el usuario o reagendada automáticamente según huecos disponibles de cuadrilla en la misma zona",
      "standardizationLevel": "Está altamente automatizado y estandarizado",
      "frequency": "Varias veces al día",
      "monthlyCases": 2100,
      "timePerCase": 15,
      "timeUnit": "Minutos",
      "peopleInvolved": 12,
      "reworkFrequency": "Más del 15 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Retrasos en la atención",
        "Afectación a clientes"
      ],
      "affectedGroup": "Clientes externos",
      "errorConsequences": "Cuadrillas paradas esperando al abonado y retrasos en la atención del resto de clientes del día.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Mensajería interactiva por WhatsApp con opciones rápidas de confirmación y geolocalización del técnico.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "Sistema de despacho y ruteo de cuadrillas",
        "WhatsApp Business API",
        "CRM"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de clientes"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_013_reprogramacion_visitas_1793119590983",
      "projectId": "gtd_proj_013_reprogramacion_visitas",
      "scoringVersion": "v1",
      "importanceScore": 84,
      "viabilityScore": 92,
      "easeScore": 73,
      "totalScore": 84.05,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "2100 casos/mes, 15 Minutos/caso. Equivale a 6.300 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (6300.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Más del 15 % de los casos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Cuadrillas paradas esperando al abonado y retrasos en la atención del resto de clientes del día.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Clientes externos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está altamente automatizado y estandarizado",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Sistema de despacho y ruteo de cuadrillas, WhatsApp Business API, CRM",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de clientes",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.983Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_013",
      "projectId": "gtd_proj_013_reprogramacion_visitas",
      "analyzedAt": "2026-04-02T14:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Agente de interacción conversacional para la confirmación previa de citas técnicas que redujo las visitas fallidas del 24% al 4.5% en la operación metropolitana de GTD.",
        "problemaPrincipal": "Falta de recordatorios oportunos e imposibilidad de que el usuario cambie su cita de manera rápida.",
        "procesoActual": "El despachador intentaba llamar por teléfono a cada usuario el día anterior; la mayoría no contestaba números desconocidos.",
        "consecuenciasPrincipales": [
          "Pérdida de capacidad instalada de los técnicos",
          "Aumento del tiempo promedio de entrega de nuevas conexiones de fibra"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 2100,
          "minutosPorCaso": 15,
          "horasAnualesEstimadas": 6300,
          "personasParticipantes": 12,
          "nivelReproceso": "Más del 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Disminución de 400 visitas fallidas al mes y mejora del índice de satisfacción del cliente (CSAT).",
          "impactoEconomicoReportado": 165000000,
          "tipoImpactoEconomico": "Reducción de visitas fallidas y optimización de rutas de cuadrilla",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Comodidad para el abonado que gestiona su cita desde WhatsApp sin llamadas.",
          "riesgosActuales": [
            "Reclamaciones por reprogramaciones de última hora"
          ]
        },
        "resultadoEsperado": "Flujo automatizado con botones de confirmación y reagendamiento con slots en tiempo real.",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "Integración directa con el sistema de despacho por geocercas.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Operación de soporte a la logística con baja complejidad técnica y alta trazabilidad.",
        "restriccionesIdentificadas": [
          "Mantenimiento de la base de teléfonos móviles actualizada en CRM"
        ],
        "recomendacionesImplementacion": [
          "Enviar notificación 24h antes y recordatorio 2h antes de la llegada del técnico",
          "Compartir foto y nombre del técnico por motivos de seguridad domiciliaria"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_014_fugas_ingresos",
    "initiativeName": "Auditoría de Revenue Assurance: Detección de Servicios Activos No Facturados",
    "area": "Finanzas",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-03T11:00:00.000Z",
    "createdAt": "2026-04-03T10:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Requiere revisión especializada",
    "riskLevel": "bajo",
    "recommendedSolutionType": "automatizacion_tradicional",
    "answers": {
      "initiativeName": "Auditoría de Revenue Assurance: Detección de Servicios Activos No Facturados",
      "area": "Finanzas",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
      "processActivity": "Auditoría mensual cruzando interfaces activas en routers de borde con contratos activos en facturación",
      "currentProblem": "Se identifican casos donde un cliente B2B solicitó ampliación de ancho de banda o encendido de enlace y, por error humano en la mesa de ayuda, nunca se notificó a Finanzas para iniciar la facturación.",
      "trigger": "Cierre contable mensual",
      "finalResult": "Reporte de enlaces con tráfico real que carecen de cuenta de cobro activa en SAP",
      "standardizationLevel": "Está altamente automatizado y estandarizado",
      "frequency": "Mensual",
      "monthlyCases": 65,
      "timePerCase": 180,
      "timeUnit": "Minutos",
      "peopleInvolved": 4,
      "reworkFrequency": "Menos del 5 % de los casos",
      "consequences": [
        "Pérdida o retraso de ingresos",
        "Errores en la información"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Servicios de alto valor consumiendo ancho de banda de red sin generar facturación recurrente.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Proceso batch que detecta desalineaciones entre la base de datos de aprovisionamiento de red y el módulo de facturación de SAP.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Telemetría Netflow / SNMP de routers",
        "Módulo de Facturación SAP ERP"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información financiera",
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_014_fugas_ingresos_1793119590984",
      "projectId": "gtd_proj_014_fugas_ingresos",
      "scoringVersion": "v1",
      "importanceScore": 60,
      "viabilityScore": 92,
      "easeScore": 84,
      "totalScore": 77.2,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "65 casos/mes, 180 Minutos/caso. Equivale a 2.340 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2340.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Menos del 5 % de los casos",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Servicios de alto valor consumiendo ancho de banda de red sin generar facturación recurrente.",
            "scoreObtained": 16,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está altamente automatizado y estandarizado",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Telemetría Netflow / SNMP de routers, Módulo de Facturación SAP ERP",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información financiera, Información interna",
            "scoreObtained": 17,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [
        "Manejo de información financiera sensible."
      ],
      "category": "Requiere revisión especializada",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_014",
      "projectId": "gtd_proj_014_fugas_ingresos",
      "analyzedAt": "2026-04-03T11:20:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Auditoría automatizada de Revenue Assurance que detecta discrepancias entre servicios entregados en la red IP y contratos activos en SAP ERP, recuperando $410M COP anuales de ingresos no percibidos.",
        "problemaPrincipal": "Ruptura del flujo de información entre operaciones de ingeniería y la gerencia de facturación.",
        "procesoActual": "Cruce aleatorio anual de una pequeña muestra de contratos corporativos.",
        "consecuenciasPrincipales": [
          "Subfacturación prolongada durante meses o años",
          "Dificultad legal para cobrar retroactivos a clientes corporativos"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 65,
          "minutosPorCaso": 180,
          "horasAnualesEstimadas": 2340,
          "personasParticipantes": 4,
          "nivelReproceso": "Menos del 5 % de los casos"
        },
        "impacto": {
          "descripcion": "Detección inmediata en menos de 24 horas cuando un enlace entra en producción sin factura asociada.",
          "impactoEconomicoReportado": 410000000,
          "tipoImpactoEconomico": "Recuperación de ingresos no facturados y saneamiento de cartera",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Claridad y transparencia en los cobros desde el día 1 de encendido.",
          "riesgosActuales": [
            "Evasión involuntaria de cobros"
          ]
        },
        "resultadoEsperado": "Reporte mensual con alertas tempranas y pre-generación de notas de cobro.",
        "tipoSolucionRecomendada": "automatizacion_tradicional",
        "justificacionTipoSolucion": "Proceso basado en reglas matemáticas de cruce de llaves primarias (ID de circuito / ID de cliente).",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "No realiza cobros directos; genera órdenes de revisión para los ejecutivos comerciales de cuenta.",
        "restriccionesIdentificadas": [
          "Estandarización del identificador único de circuito (Circuit ID) en todos los sistemas"
        ],
        "recomendacionesImplementacion": [
          "Correr primero sobre la cartera B2B corporativa de enlaces dedicados",
          "Establecer bloqueo automático de encendido en NOC si el ticket comercial no tiene orden SAP aprobada"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_015_patching_firmware",
    "initiativeName": "Orquestador de Actualización de Firmware y Parches CVE en Routers CPE",
    "area": "Tecnología",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Juan Ramón Jaramillo Hernández (Gerente de Desarrollo y Preventa - Gtd Colombia)",
    "status": "En backlog",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-05T15:30:00.000Z",
    "createdAt": "2026-04-05T15:00:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "automatizacion_tradicional",
    "answers": {
      "initiativeName": "Orquestador de Actualización de Firmware y Parches CVE en Routers CPE",
      "area": "Tecnología",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Juan Ramón Jaramillo Hernández (Gerente de Desarrollo y Preventa - Gtd Colombia)",
      "processActivity": "Despliegue de parches de seguridad y versiones de software en equipos de borde de clientes",
      "currentProblem": "La actualización manual de más de 12.000 routers CPE desplegados en clientes toma meses a los ingenieros de soporte, dejando equipos vulnerables a exploits conocidos.",
      "trigger": "Publicación de boletín de seguridad crítico por fabricantes (Cisco, Fortinet, Mikrotik)",
      "finalResult": "Parque de routers actualizado a la versión recomendada con pruebas de conectividad exitosas",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 400,
      "timePerCase": 45,
      "timeUnit": "Minutos",
      "peopleInvolved": 8,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Riesgo de seguridad",
        "Retrasos en la atención"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Posible desconexión masiva de clientes si una imagen de firmware resulta defectuosa.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Orquestador Ansible / Python con validación pre y post actualización y rollback instantáneo ante fallas.",
      "autonomyLevel": "3. Ejecutar acciones sencillas de forma automática",
      "dataSources": [
        "NMS de monitoreo",
        "Repositorio de imágenes de firmware certificadas"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_015_patching_firmware_1793119590984",
      "projectId": "gtd_proj_015_patching_firmware",
      "scoringVersion": "v1",
      "importanceScore": 74,
      "viabilityScore": 87,
      "easeScore": 86,
      "totalScore": 81.55,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "400 casos/mes, 45 Minutos/caso. Equivale a 3.600 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (3600.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Posible desconexión masiva de clientes si una imagen de firmware resulta defectuosa.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "NMS de monitoreo, Repositorio de imágenes de firmware certificadas",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Ejecutar acciones sencillas de forma automática",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_015",
      "projectId": "gtd_proj_015_patching_firmware",
      "analyzedAt": "2026-04-05T15:40:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Orquestador centralizado de despliegue de parches de firmware y CVEs en los equipos de borde (CPE) de clientes empresariales, ejecutando ventanas de actualización nocturnas desatendidas con verificación automática.",
        "problemaPrincipal": "Dificultad logística para parchar miles de dispositivos distribuidos geográficamente.",
        "procesoActual": "Ingenieros de guardia se conectan uno a uno por SSH en horario nocturno para subir la imagen y reiniciar el equipo.",
        "consecuenciasPrincipales": [
          "Exposición prolongada a vulnerabilidades críticas de día cero",
          "Fatiga del personal técnico por jornadas nocturnas reiterativas"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 400,
          "minutosPorCaso": 45,
          "horasAnualesEstimadas": 3600,
          "personasParticipantes": 8,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Capacidad de parchar el 100% de la flota en menos de 72 horas ante una alerta crítica de seguridad.",
          "impactoEconomicoReportado": 85000000,
          "tipoImpactoEconomico": "Ahorro de horas hombre y mitigación de multas por ciberincidentes",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Máxima seguridad perimetral sin interrupción de su jornada laboral diurna.",
          "riesgosActuales": [
            "Reboots fallidos por fallas de energía durante el flasheo"
          ]
        },
        "resultadoEsperado": "Playbook con verificación de backup de configuración previa, prueba de ping y restauración automática en caso de contingencia.",
        "tipoSolucionRecomendada": "automatizacion_tradicional",
        "justificacionTipoSolucion": "Las operaciones de red y actualización son determinísticas mediante scripts de red.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Manipulación de equipos en producción que enrutan tráfico corporativo.",
        "restriccionesIdentificadas": [
          "Disponibilidad de ancho de banda suficiente para transferir imágenes de 100MB sin saturar enlaces de gestión"
        ],
        "recomendacionesImplementacion": [
          "Comenzar con lotes del 5% de equipos piloto",
          "Requerir confirmación de backup exitoso antes de iniciar el flasheo"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_016_bgp_route",
    "initiativeName": "Monitoreo Inteligente de Calidad de Rutas BGP y Tráfico Internacional",
    "area": "Redes y Conectividad",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-07T10:00:00.000Z",
    "createdAt": "2026-04-07T09:20:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "agente_parcialmente_autonomo",
    "answers": {
      "initiativeName": "Monitoreo Inteligente de Calidad de Rutas BGP y Tráfico Internacional",
      "area": "Redes y Conectividad",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Análisis de latencia, jitter y pérdida de paquetes en enlaces submarinos e interconexiones IP con proveedores Tier-1",
      "currentProblem": "Cuando un proveedor internacional de tránsito IP experimenta degradación o flap de rutas sin caída total, el tráfico sigue saliendo por esa ruta lenta, provocando reclamos de clientes gamers y corporativos durante horas.",
      "trigger": "Detección de incremento anormal de latencia en telemetría ThousandEyes / Catchpoint",
      "finalResult": "Recomendación de cambio de prioridades BGP o conmutación automática de tráfico a proveedor alterno",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 340,
      "timePerCase": 50,
      "timeUnit": "Minutos",
      "peopleInvolved": 7,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Afectación a clientes",
        "Retrasos en la atención",
        "Riesgo contractual"
      ],
      "affectedGroup": "Clientes externos",
      "errorConsequences": "Degradación masiva de la experiencia de navegación internacional y streaming.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Agente que evalúa en tiempo real métricas de latencia por prefijo y ejecuta prepending de AS-Path para balancear tráfico.",
      "autonomyLevel": "3. Ejecutar acciones sencillas de forma automática",
      "dataSources": [
        "Looking Glass BGP",
        "Telemetría de latencia ThousandEyes",
        "Routers Core Juniper/Cisco"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_016_bgp_route_1793119590984",
      "projectId": "gtd_proj_016_bgp_route",
      "scoringVersion": "v1",
      "importanceScore": 76,
      "viabilityScore": 87,
      "easeScore": 81,
      "totalScore": 81.1,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "340 casos/mes, 50 Minutos/caso. Equivale a 3.400 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (3400.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Degradación masiva de la experiencia de navegación internacional y streaming.",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Clientes externos",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Looking Glass BGP, Telemetría de latencia ThousandEyes, Routers Core Juniper/Cisco",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Ejecutar acciones sencillas de forma automática",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_016",
      "projectId": "gtd_proj_016_bgp_route",
      "analyzedAt": "2026-04-07T10:10:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Sistema inteligente de optimización de rutas de enrutamiento exterior BGP para mitigar caídas de calidad y microcortes hacia destinos internacionales críticos como nubes de AWS, Microsoft y Google.",
        "problemaPrincipal": "Incapacidad del protocolo BGP estándar para detectar degradaciones de latencia o pérdida de paquetes intermedia sin caída de enlace.",
        "procesoActual": "El ingeniero de redes recibe tickets de lentitud, consulta Looking Glasses externos y modifica manualmente las comunidades de BGP.",
        "consecuenciasPrincipales": [
          "Tiempos de degradación de hasta 3 horas antes de que se diagnostique la causa externa",
          "Penalizaciones de SLA en contratos corporativos de interconexión bancaria"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 340,
          "minutosPorCaso": 50,
          "horasAnualesEstimadas": 3400,
          "personasParticipantes": 7,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Detección y conmutación automática de prefijos degradados en menos de 60 segundos.",
          "impactoEconomicoReportado": 210000000,
          "tipoImpactoEconomico": "Cumplimiento de SLAs y mejora de calidad de servicio percibida",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Navegación estable y de ultrabaja latencia para clientes residenciales y corporativos.",
          "riesgosActuales": [
            "Re-inyecciones indebidas de rutas que causen bucles"
          ]
        },
        "resultadoEsperado": "Agente que inyecta políticas de ruta dinámicas con validación previa de impacto en ancho de banda.",
        "tipoSolucionRecomendada": "agente_parcialmente_autonomo",
        "justificacionTipoSolucion": "Conmutaciones de contingencia automáticas con aprobación de ingeniería para cambios estructurales.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Afecta la tabla de enrutamiento de la red troncal nacional de Grupo GTD.",
        "restriccionesIdentificadas": [
          "Evitar flapping de rutas manteniendo un periodo de histéresis mínimo de 30 minutos"
        ],
        "recomendacionesImplementacion": [
          "Piloto inicial con tráfico hacia CDNs de Cloudflare y Akamai",
          "Crear panel de monitoreo con mapa mundial de latencias en tiempo real"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_017_ordenes_compra",
    "initiativeName": "Validación y Autorización Automatizada de Hitos de Pago a Contratistas de Fibra",
    "area": "Finanzas",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
    "status": "Pendiente de revisión",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-08T11:45:00.000Z",
    "createdAt": "2026-04-08T11:15:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Requiere revisión especializada",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Validación y Autorización Automatizada de Hitos de Pago a Contratistas de Fibra",
      "area": "Finanzas",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
      "processActivity": "Revisión de actas de obra civil y cantidades de cable tendido contra precios de contrato marco",
      "currentProblem": "Revisión manual en Excel de planillas con miles de líneas de metros de fibra, herrajes y empalmes presentadas por contratistas, generando cuellos de botella de hasta 20 días en las aprobaciones de pago.",
      "trigger": "Carga de liquidación mensual por parte del contratista en el portal de proveedores",
      "finalResult": "Certificado de liquidación aprobado con monto exacto validado y orden de pago en ERP",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 85,
      "timePerCase": 150,
      "timeUnit": "Minutos",
      "peopleInvolved": 5,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos",
        "Errores en la información"
      ],
      "affectedGroup": "Proveedores o aliados externos",
      "errorConsequences": "Sobrefacturación de cantidades de obra o deterioro en la relación con aliados estratégicos por pagos demorados.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Módulo que cruza el diseño aprobado en GIS con la liquidación del contratista y los precios pactados en el contrato.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Planos GIS de obra ejecutada",
        "Contrato marco en SAP",
        "Facturas del portal de proveedores"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información financiera",
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_017_ordenes_compra_1793119590984",
      "projectId": "gtd_proj_017_ordenes_compra",
      "scoringVersion": "v1",
      "importanceScore": 70,
      "viabilityScore": 87,
      "easeScore": 79,
      "totalScore": 78.2,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "85 casos/mes, 150 Minutos/caso. Equivale a 2.550 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2550.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Sobrefacturación de cantidades de obra o deterioro en la relación con aliados estratégicos por pagos demorados.",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Proveedores o aliados externos",
            "scoreObtained": 8,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Planos GIS de obra ejecutada, Contrato marco en SAP, Facturas del portal de proveedores",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información financiera, Información interna",
            "scoreObtained": 17,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [
        "Manejo de información financiera sensible."
      ],
      "category": "Requiere revisión especializada",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_017",
      "projectId": "gtd_proj_017_ordenes_compra",
      "analyzedAt": "2026-04-08T11:50:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Motor de auditoría de cuentas de cobro de contratistas de tendido y empalme de fibra óptica que coteja en segundos las cantidades reportadas contra los planos de red autorizados.",
        "problemaPrincipal": "Discrepancias entre las cantidades de obra física registradas en terreno y las facturas presentadas a cobro.",
        "procesoActual": "Un supervisor revisa línea por línea en Excel y busca a mano en el plano de AutoCAD si la obra fue ejecutada.",
        "consecuenciasPrincipales": [
          "Riesgo de pago por ítems duplicados o no ejecutados",
          "Fricciones y demoras en el pago a cuadrillas aliadas esenciales"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 85,
          "minutosPorCaso": 150,
          "horasAnualesEstimadas": 2550,
          "personasParticipantes": 5,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del ciclo de pago de 22 a 4 días hábiles, garantizando control presupuestario estricto.",
          "impactoEconomicoReportado": 75000000,
          "tipoImpactoEconomico": "Ahorro por detección de sobrefacturación y eficiencia administrativa",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Mejor relación con contratistas garantizando cuadrillas disponibles para atender clientes.",
          "riesgosActuales": [
            "Reclamaciones de contratistas por cobros retenidos"
          ]
        },
        "resultadoEsperado": "Visualizador comparativo de cantidades presupuestadas vs liquidadas con aprobación en 1 clic.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Capacidad de procesar tablas no estructuradas y cotejar descripciones de ítems heterogéneas.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "La liberación final de fondos en SAP requiere siempre el token digital del director de finanzas.",
        "restriccionesIdentificadas": [
          "Estandarización de las plantillas de entrega requeridas a los contratistas"
        ],
        "recomendacionesImplementacion": [
          "Exigir carga de liquidaciones en formato digital estructurado desde el nuevo portal",
          "Habilitar alertas de variación mayor al 5% respecto al presupuesto inicial"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_018_turnos_noc",
    "initiativeName": "Planificador Predictivo de Cobertura y Turnos de Ingenieros NOC 24/7",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Borrador",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-09T09:00:00.000Z",
    "createdAt": "2026-04-09T08:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Piloto de aprendizaje",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Planificador Predictivo de Cobertura y Turnos de Ingenieros NOC 24/7",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Diseño de la malla mensual de turnos diurnos, nocturnos y guardias pasivas del Centro de Control de Red",
      "currentProblem": "Armar manualmente la planilla de turnos de 35 ingenieros en Excel toma 3 días al mes al coordinador, generando quejas por descansos insuficientes, cruces de habilidades y horas extras desbalanceadas.",
      "trigger": "Inicio de la última semana de cada mes para programar el mes siguiente",
      "finalResult": "Calendario de turnos optimizado cumpliendo normativa laboral y garantizando especialistas de red en cada franja",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 35,
      "timePerCase": 60,
      "timeUnit": "Minutos",
      "peopleInvolved": 3,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Retrasos en la atención",
        "Errores en la información"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Turnos nocturnos sin especialista en DWDM o IP, provocando demoras en la atención de fallas críticas.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Algoritmo de optimización que genera la malla de turnos en 5 minutos y notifica por calendario de Google Workspace.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Histórico de incidentes por franja horaria",
        "Matriz de competencias de ingenieros",
        "Sistema de nómina"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_018_turnos_noc_1793119590984",
      "projectId": "gtd_proj_018_turnos_noc",
      "scoringVersion": "v1",
      "importanceScore": 52,
      "viabilityScore": 87,
      "easeScore": 85,
      "totalScore": 72.5,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "35 casos/mes, 60 Minutos/caso. Equivale a 420 h/año.",
            "scoreObtained": 10,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (420.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Turnos nocturnos sin especialista en DWDM o IP, provocando demoras en la atención de fallas críticas.",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Histórico de incidentes por franja horaria, Matriz de competencias de ingenieros, Sistema de nómina",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Piloto de aprendizaje",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_018",
      "projectId": "gtd_proj_018_turnos_noc",
      "analyzedAt": "2026-04-09T09:10:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Planificador automatizado de cobertura operativa 24/7 para el NOC de Grupo GTD, equilibrando restricciones legales laborales, disponibilidad de habilidades técnicas y patrones de incidentes de red.",
        "problemaPrincipal": "Ineficiencia y desbalance en la confección de cuadrantes de guardia entre el personal de ingeniería.",
        "procesoActual": "El coordinador pasa días cuadrando solicitudes de vacaciones, cambios de turno y descansos en un libro de Excel.",
        "consecuenciasPrincipales": [
          "Gastos excesivos en horas extras no presupuestadas",
          "Descontento del equipo por falta de previsibilidad en sus descansos"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 35,
          "minutosPorCaso": 60,
          "horasAnualesEstimadas": 420,
          "personasParticipantes": 3,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Garantía del 100% de cobertura de competencias críticas (DWDM, IP Core, Ciberseguridad) en todas las guardias.",
          "impactoEconomicoReportado": 38000000,
          "tipoImpactoEconomico": "Optimización de horas extras y bienestar laboral",
          "nivelEvidencia": "estimado",
          "afectacionClientes": "Tiempo de respuesta veloz ante caídas nocturnas de red.",
          "riesgosActuales": [
            "Errores en la asignación de guardias pasivas"
          ]
        },
        "resultadoEsperado": "Calendario publicado directamente en Google Calendar con confirmación de cada ingeniero.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Resolución de problemas de satisfacción de restricciones (CSP) combinada con interfaz conversacional para cambios de turno.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "No tiene impacto directo sobre el tráfico de red, solo en la gestión de turnos del personal.",
        "restriccionesIdentificadas": [
          "Cumplimiento estricto del código de trabajo sobre descansos entre jornadas"
        ],
        "recomendacionesImplementacion": [
          "Integrar con Google Calendar para sincronización automática en los teléfonos del equipo",
          "Permitir intercambio de turnos entre ingenieros con aprobación en 1 clic del coordinador"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_019_ups_nodos",
    "initiativeName": "Monitoreo y Mantenimiento Predictivo de Grupos Electrógenos y UPS en Nodos Críticos",
    "area": "Infraestructura",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-10T10:00:00.000Z",
    "createdAt": "2026-04-10T09:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Monitoreo y Mantenimiento Predictivo de Grupos Electrógenos y UPS en Nodos Críticos",
      "area": "Infraestructura",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Control de telemetría de bancos de baterías, rectificadores y niveles de combustible diésel en shelters de telecomunicaciones",
      "currentProblem": "Cortes imprevistos de energía comercial provocan apagado súbito de nodos de fibra cuando las baterías fallan por resistencia interna oculta o bombas de combustible trabadas.",
      "trigger": "Alerta de corte de energía comercial o reporte de ciclo de descarga en shelter de red",
      "finalResult": "Diagnóstico preventivo del estado de salud (SOH) de baterías y orden de mantenimiento correctivo generada antes de la falla",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 65,
      "timePerCase": 45,
      "timeUnit": "Minutos",
      "peopleInvolved": 12,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Afectación a clientes",
        "Sobrecostos",
        "Riesgos de seguridad o cumplimiento"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Caída no programada de anillos de transporte DWDM y quejas de clientes corporativos con SLAs de 99.98%.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Sistema inteligente de correlación de telemetría SNMP/Modbus que detecta degradación de celdas de batería y programa visitas preventivas.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "Telemetría Modbus / SNMP",
        "Sistema SCADA",
        "ERP de Mantenimiento"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_019_ups_nodos_1793119590984",
      "projectId": "gtd_proj_019_ups_nodos",
      "scoringVersion": "v1",
      "importanceScore": 65,
      "viabilityScore": 87,
      "easeScore": 81,
      "totalScore": 76.7,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "65 casos/mes, 45 Minutos/caso. Equivale a 585 h/año.",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (585.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Caída no programada de anillos de transporte DWDM y quejas de clientes corporativos con SLAs de 99.98%.",
            "scoreObtained": 21,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Telemetría Modbus / SNMP, Sistema SCADA, ERP de Mantenimiento",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_019",
      "projectId": "gtd_proj_019_ups_nodos",
      "analyzedAt": "2026-04-10T10:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Implementación de mantenimiento predictivo mediante modelos de series de tiempo sobre telemetría de energía en 120 nodos troncales de Grupo GTD para anticipar fallas de respaldo eléctrico.",
        "problemaPrincipal": "Falta de visibilidad sobre la impedancia interna y capacidad de descarga real de baterías en nodos remotos.",
        "procesoActual": "Revisiones manuales bimensuales con multímetro que no detectan anomalías súbitas de temperatura o sulfatación.",
        "consecuenciasPrincipales": [
          "Apagados de nodos críticos durante tormentas eléctricas",
          "Penalizaciones severas de SLA con clientes del sector financiero",
          "Desgaste prematuro de generadores auxiliares"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 65,
          "minutosPorCaso": 45,
          "horasAnualesEstimadas": 585,
          "personasParticipantes": 12,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Aseguramiento del 99.995% de disponibilidad en enlaces de misión crítica mediante predicción de fallas energéticas.",
          "impactoEconomicoReportado": 120000000,
          "tipoImpactoEconomico": "Mitigación de multas y reducción de visitas reactivas de emergencia",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Previene cortes abruptos en sedes corporativas de clientes bancarios.",
          "riesgosActuales": [
            "Incumplimiento de SLA por corte eléctrico prolongado"
          ]
        },
        "resultadoEsperado": "Dashboard con índice SOH (State of Health) de cada banco de baterías y generación automática de tickets en SAP PM.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Combinación de analítica de telemetría IoT con asistente que recomienda reemplazo o ecualización de celdas a los ingenieros de infraestructura.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "La criticidad de la energía requiere supervisión humana antes de emitir bajas o reemplazos costosos.",
        "restriccionesIdentificadas": [
          "Disponibilidad de enlaces de telemetría fuera de banda (out-of-band) en nodos rurales"
        ],
        "recomendacionesImplementacion": [
          "Piloto en los 15 nodos de mayor densidad de tráfico de fibra",
          "Integrar alertas críticas con el canal de mensajería del NOC"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_020_pqr_regulatorio",
    "initiativeName": "Clasificación Inteligente y Respuesta a Reclamos Regulatorios PQR ante la SIC/CRC",
    "area": "Atención a Clientes",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
    "status": "Aprobado para piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-11T11:20:00.000Z",
    "createdAt": "2026-04-11T10:45:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Clasificación Inteligente y Respuesta a Reclamos Regulatorios PQR ante la SIC/CRC",
      "area": "Atención a Clientes",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
      "processActivity": "Recepción, tipificación regulatoria y redacción de descargos técnicos ante requerimientos de entes reguladores de telecomunicaciones",
      "currentProblem": "Plazos legales perentorios de 15 días hábiles que se agotan rápidamente por la demora en recolectar bitácoras técnicas de cortes de fibra para responder los radicados oficiales.",
      "trigger": "Notificación de requerimiento oficial de la entidad regulatoria o radicación de PQR formal",
      "finalResult": "Respuesta jurídica y técnica radicada en el término legal con trazabilidad probatoria completa",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 620,
      "timePerCase": 40,
      "timeUnit": "Minutos",
      "peopleInvolved": 14,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Sanciones regulatorias",
        "Sobrecostos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Sanciones pecuniarias por silencio administrativo positivo o respuestas extemporáneas.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Asistente con PLN que analiza el texto del radicado, consulta automáticamente el historial del circuito en OSS y genera el borrador formal de respuesta.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Sistema de PQRs",
        "CRM",
        "Logs de incidencias NOC",
        "Plantillas legales aprobadas"
      ],
      "dataOrganization": "Dispersa en varios sistemas",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información de clientes",
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_020_pqr_regulatorio_1793119590984",
      "projectId": "gtd_proj_020_pqr_regulatorio",
      "scoringVersion": "v1",
      "importanceScore": 70,
      "viabilityScore": 72,
      "easeScore": 76,
      "totalScore": 72.2,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "620 casos/mes, 40 Minutos/caso. Equivale a 4.960 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (4960.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Sanciones pecuniarias por silencio administrativo positivo o respuestas extemporáneas.",
            "scoreObtained": 16,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Dispersa en varios sistemas",
            "scoreObtained": 5,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Sistema de PQRs, CRM, Logs de incidencias NOC, Plantillas legales aprobadas",
            "scoreObtained": 10,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información de clientes, Información interna",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_020",
      "projectId": "gtd_proj_020_pqr_regulatorio",
      "analyzedAt": "2026-04-11T11:30:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Agente asistente para la clasificación jurídica, extracción de causales y confección de descargos probatorios de PQRs ante entidades de vigilancia de telecomunicaciones.",
        "problemaPrincipal": "El 30% del tiempo de los analistas de servicio al cliente se gasta persiguiendo logs técnicos en 3 plataformas distintas para adjuntar a la respuesta formal.",
        "procesoActual": "El analista lee el PDF del reclamo, ingresa manualmente a Remedy/Jira, extrae tickets de avería y redacta una carta en Word.",
        "consecuenciasPrincipales": [
          "Riesgo de multas por notificación extemporánea",
          "Respuestas imprecisas que derivan en segunda instancia regulatoria",
          "Sobrecarga del área jurídica en tareas operativas de transcripción"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 620,
          "minutosPorCaso": 40,
          "horasAnualesEstimadas": 4960,
          "personasParticipantes": 14,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de respuesta promedio de 9 días hábiles a 3 días hábiles, con 0% de casos vencidos.",
          "impactoEconomicoReportado": 145000000,
          "tipoImpactoEconomico": "Prevención de multas y eficiencia en horas de abogados/analistas",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Mayor transparencia y claridad técnica en las explicaciones brindadas a los abonados.",
          "riesgosActuales": [
            "Sanciones por Silencio Administrativo"
          ]
        },
        "resultadoEsperado": "Asistente con revisión humana obligatoria que entrega la contestación con anexos de telemetría en formato PDF certificado.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Por motivos normativos, un abogado/analista debe dar el visto bueno final antes del envío oficial al ente de control.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Involucra normatividad legal vinculante y plazos estrictos.",
        "restriccionesIdentificadas": [
          "Reglamentación del régimen de protección de usuarios de telecomunicaciones"
        ],
        "recomendacionesImplementacion": [
          "Integrar con el buzón oficial de correspondencia de GTD",
          "Generar biblioteca de cláusulas técnicas aprobadas por la gerencia jurídica"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_021_dark_fiber_postes",
    "initiativeName": "Auditoría de Enlaces Dark Fiber y Gestión de Alquiler de Postería a Terceros",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "En piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-12T08:50:00.000Z",
    "createdAt": "2026-04-12T08:15:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Piloto de aprendizaje",
    "riskLevel": "bajo",
    "recommendedSolutionType": "automatizacion_sin_ia",
    "answers": {
      "initiativeName": "Auditoría de Enlaces Dark Fiber y Gestión de Alquiler de Postería a Terceros",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Conciliación de inventario físico de hilos oscuros arrendados y cruce de postes compartidos con empresas eléctricas",
      "currentProblem": "Discrepancias entre las matrices de arriendo de postes de las distribuidoras eléctricas y el inventario GIS de tendido aéreo de GTD, provocando cobros indebidos o falta de cobro a terceros.",
      "trigger": "Facturación mensual de alquiler de infraestructura de postes y ductos recibida de concesionarias",
      "finalResult": "Inventario conciliado, objeciones formales de cobros no aplicables y facturación correcta de hilos oscuros",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 280,
      "timePerCase": 90,
      "timeUnit": "Minutos",
      "peopleInvolved": 5,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Retrasos en la facturación"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Pago de cánones por postes en los que GTD ya retiró cables o no cobro de fibra oscura cedida.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Herramienta automatizada de conciliación espacial GIS contra bases de datos de distribuidores de energía.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "Sistema GIS de Red",
        "Facturas y catastros de eléctricas",
        "ERP Financiero"
      ],
      "dataOrganization": "Dispersa en varios sistemas",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de terceros"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_021_dark_fiber_postes_1793119590984",
      "projectId": "gtd_proj_021_dark_fiber_postes",
      "scoringVersion": "v1",
      "importanceScore": 52,
      "viabilityScore": 72,
      "easeScore": 81,
      "totalScore": 66.25,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "280 casos/mes, 90 Minutos/caso. Equivale a 5.040 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (5040.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Pago de cánones por postes en los que GTD ya retiró cables o no cobro de fibra oscura cedida.",
            "scoreObtained": 8,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Dispersa en varios sistemas",
            "scoreObtained": 5,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Sistema GIS de Red, Facturas y catastros de eléctricas, ERP Financiero",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de terceros",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Piloto de aprendizaje",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_021",
      "projectId": "gtd_proj_021_dark_fiber_postes",
      "analyzedAt": "2026-04-12T09:00:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Auditoría algorítmica de infraestructura física pasiva que cruza el trazado geográfico de cables de Grupo GTD con los cobros de las distribuidoras eléctricas.",
        "problemaPrincipal": "Validación manual en hojas de cálculo con más de 150.000 registros de postes compartidos a nivel nacional.",
        "procesoActual": "El equipo de operaciones contrasta manualmente coordenadas UTM contra planillas Excel recibidas de 8 empresas de energía distintas.",
        "consecuenciasPrincipales": [
          "Pagos de cánones por apoyos retirados en años anteriores",
          "Demora en la liquidación de cuentas de cobro a operadores mayoristas"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 280,
          "minutosPorCaso": 90,
          "horasAnualesEstimadas": 5040,
          "personasParticipantes": 5,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Depuración del 100% del padrón de postes con trazabilidad geoespacial fehaciente.",
          "impactoEconomicoReportado": 85000000,
          "tipoImpactoEconomico": "Recuperación de cobros improcedentes y reducción de canon",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Optimización de costos operativos para transferir competitividad a clientes mayoristas.",
          "riesgosActuales": [
            "Reclamaciones de concesionarias por presunta ocupación no declarada"
          ]
        },
        "resultadoEsperado": "Motor de cruce geoespacial que genera de forma automática el reporte de discrepancias y cartas de objeción.",
        "tipoSolucionRecomendada": "automatizacion_tradicional",
        "justificacionTipoSolucion": "Se trata de un problema de cruce de bases de datos relacionales y análisis espacial GIS con reglas geométricas determinísticas.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Riesgo estrictamente contable y administrativo sin afectación sobre la disponibilidad del tráfico de red.",
        "restriccionesIdentificadas": [
          "Variaciones en los formatos de entrega de cada compañía distribuidora de energía"
        ],
        "recomendacionesImplementacion": [
          "Estandarizar el esquema de importación de coordenadas geográficas en formato GeoJSON/Shapefile",
          "Publicar tablero en Looker Studio para seguimiento del equipo de finanzas e infraestructura"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_022_deteccion_vandalismo",
    "initiativeName": "Detección Temprana de Vandalismo y Hurto de Cable en Cámaras Subterráneas",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-13T14:10:00.000Z",
    "createdAt": "2026-04-13T13:40:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Detección Temprana de Vandalismo y Hurto de Cable en Cámaras Subterráneas",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Correlación de alarmas de apertura no autorizada de tapas de cámara y atenuaciones acústicas en fibras ópticas sensoras",
      "currentProblem": "El corte vandálico de cables de fibra en canalizaciones subterráneas se detecta únicamente cuando el enlace cae por completo, retrasando la llegada de seguridad física y brigadas.",
      "trigger": "Sensor de apertura de cámara de registro o fluctuación anómala de dispersión Rayleigh en fibra sensora",
      "finalResult": "Alerta en tiempo real despachada a la central de seguridad física y móvil policial más cercano en menos de 90 segundos",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 150,
      "timePerCase": 20,
      "timeUnit": "Minutos",
      "peopleInvolved": 8,
      "reworkFrequency": "Menos del 5 % de los casos",
      "consequences": [
        "Afectación a clientes",
        "Sobrecostos",
        "Riesgos de seguridad o cumplimiento"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Robo consumado de cientos de metros de cable, parálisis de servicios por hasta 18 horas y costosas obras civiles de empalme.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Agente autónomo que geolocaliza el punto exacto de la manipulación con precisión de 5 metros e inicia el protocolo de seguridad de forma instantánea.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "Monitoreo DAS (Distributed Acoustic Sensing)",
        "Sensores IoT LoRaWAN de tapas",
        "CCTV perimetral"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de telemetría IoT"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_022_deteccion_vandalismo_1793119590984",
      "projectId": "gtd_proj_022_deteccion_vandalismo",
      "scoringVersion": "v1",
      "importanceScore": 61,
      "viabilityScore": 87,
      "easeScore": 77,
      "totalScore": 74.1,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "150 casos/mes, 20 Minutos/caso. Equivale a 600 h/año.",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (600.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Menos del 5 % de los casos",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Robo consumado de cientos de metros de cable, parálisis de servicios por hasta 18 horas y costosas obras civiles de empalme.",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Monitoreo DAS (Distributed Acoustic Sensing), Sensores IoT LoRaWAN de tapas, CCTV perimetral",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de telemetría IoT",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_022",
      "projectId": "gtd_proj_022_deteccion_vandalismo",
      "analyzedAt": "2026-04-13T14:25:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Sistema autónomo de detección de intrusión física en la red subterránea troncal de Grupo GTD para neutralizar intentos de sustracción de cable de telecomunicaciones.",
        "problemaPrincipal": "El tiempo transcurrido entre la manipulación de una tapa de pozo y la llegada de la patrulla de vigilancia suele exceder los 30 minutos.",
        "procesoActual": "El operador del NOC recibe una caída masiva de BGP/interfaces ópticas, deduce que fue un corte físico y contacta telefónicamente a la empresa de seguridad.",
        "consecuenciasPrincipales": [
          "Pérdida de cientos de metros de cables de alto número de hilos (144/288 FO)",
          "Costos millonarios en cuadrillas nocturnas de fusión de fibra",
          "Graves interrupciones de conectividad en enlaces de gobierno y banca"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 150,
          "minutosPorCaso": 20,
          "horasAnualesEstimadas": 600,
          "personasParticipantes": 8,
          "nivelReproceso": "Menos del 5 % de los casos"
        },
        "impacto": {
          "descripcion": "Disminución del 70% en metros lineales de cable vandalizado gracias a la disuasión e intercepción antes del corte definitivo.",
          "impactoEconomicoReportado": 230000000,
          "tipoImpactoEconomico": "Ahorro directo en materiales y mantenimiento de emergencia",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Elimina interrupciones prolongadas en clientes de la red dorsal.",
          "riesgosActuales": [
            "Afectación a la integridad física del personal técnico de terreno"
          ]
        },
        "resultadoEsperado": "Despacho automatizado multicanal (móviles de patrullaje, radioperadores, alarmas sonoras en cámara).",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "La velocidad requerida (< 2 minutos) no tolera colas humanas de espera en la mesa del NOC.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Involucra coordinación con servicios de seguridad y fuerzas del orden.",
        "restriccionesIdentificadas": [
          "Cobertura de red celular/LoRaWAN en cámaras subterráneas blindadas"
        ],
        "recomendacionesImplementacion": [
          "Despliegue inicial en las 5 rutas troncales con mayor tasa histórica de incidencias",
          "Integrar con la central de monitoreo de cámaras de la policía metropolitana"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_023_informes_sla_clientes",
    "initiativeName": "Agente de Generación Automática de Informes Ejecutivos de SLA para Clientes Banca y Retail",
    "area": "Comercial",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
    "status": "Implementado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-14T09:15:00.000Z",
    "createdAt": "2026-04-14T08:45:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Agente de Generación Automática de Informes Ejecutivos de SLA para Clientes Banca y Retail",
      "area": "Comercial",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Iván Amezcua Macín (Gerente Experiencia al Cliente y Comercial - Gtd Colombia)",
      "processActivity": "Extracción mensual de disponibilidad de enlaces MPLS/SD-WAN, cómputo de multas contractuales y redacción de informes para gerencias de TI corporativas",
      "currentProblem": "Los primeros 5 días hábiles del mes, los Service Managers invierten hasta el 80% de su tiempo construyendo manualmente informes de SLA en Excel y PowerPoint.",
      "trigger": "Cierre contable mensual y vencimiento del plazo de entrega de reportes de calidad de servicio a cuentas clave",
      "finalResult": "Informe ejecutivo en PDF institucional con analítica de latencia, jitter, disponibilidad y recomendaciones de capacidad entregado al cliente",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 340,
      "timePerCase": 50,
      "timeUnit": "Minutos",
      "peopleInvolved": 16,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Retrasos en facturación condicionada al informe y disputas de cobro con clientes AAA.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Generación automática y programada de informes de SLA con narrativa técnica generada por IA que explica los incidentes y mitigaciones realizadas.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "Portal de Monitoreo SevOne/Zabbix",
        "CRM Salesforce",
        "Remedy ITSM"
      ],
      "dataOrganization": "Dispersa en varios sistemas",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de clientes"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_023_informes_sla_clientes_1793119590984",
      "projectId": "gtd_proj_023_informes_sla_clientes",
      "scoringVersion": "v1",
      "importanceScore": 79,
      "viabilityScore": 72,
      "easeScore": 77,
      "totalScore": 76.05,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "340 casos/mes, 50 Minutos/caso. Equivale a 3.400 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (3400.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Retrasos en facturación condicionada al informe y disputas de cobro con clientes AAA.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Dispersa en varios sistemas",
            "scoreObtained": 5,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Portal de Monitoreo SevOne/Zabbix, CRM Salesforce, Remedy ITSM",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de clientes",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_023",
      "projectId": "gtd_proj_023_informes_sla_clientes",
      "analyzedAt": "2026-04-14T09:30:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Solución de reportería automatizada que sintetiza el comportamiento de más de 3.500 enlaces empresariales corporativos en informes ejecutivos de alta calidad visual.",
        "problemaPrincipal": "Consolidación tediosa y repetitiva de métricas de disponibilidad y tickets de falla para 340 cuentas de clientes corporativos.",
        "procesoActual": "El Service Manager descarga planillas de tráfico de SevOne, las filtra por circuito, calcula manualmente el tiempo de caída deducible y diseña una presentación.",
        "consecuenciasPrincipales": [
          "Retraso en la cobranza de facturas corporativas atadas a la entrega de informe",
          "Discrepancias entre las métricas percibidas por el cliente y las calculadas por GTD"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 340,
          "minutosPorCaso": 50,
          "horasAnualesEstimadas": 3400,
          "personasParticipantes": 16,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Entrega del 100% de los informes dentro de las primeras 48 horas de cada mes, mejorando el NPS de cuentas empresariales.",
          "impactoEconomicoReportado": 92000000,
          "tipoImpactoEconomico": "Productividad y aceleración del ciclo de cobro de cartera",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Visibilidad inmediata y transparente de la calidad de su servicio.",
          "riesgosActuales": [
            "Insatisfacción de clientes por informes con errores de cálculo manual"
          ]
        },
        "resultadoEsperado": "Envío automático de borrador al Service Manager para su visto bueno y despacho automático por correo corporativo.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Genera el análisis explicativo en lenguaje natural de las causas raíces de las eventuales degradaciones de red.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Solo procesa métricas agregadas de rendimiento de red sin acceso a datos sensibles o tráfico de usuario.",
        "restriccionesIdentificadas": [
          "Configuración precisa de ventanas de mantenimiento acordadas con cada cliente para no computarlas como caída"
        ],
        "recomendacionesImplementacion": [
          "Plantillas personalizadas con la marca corporativa de Grupo GTD",
          "Publicación de versión interactiva en el portal de clientes GTD Empresas"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_024_pruebas_rfc2544",
    "initiativeName": "Automatización de Pruebas de Estrés RFC 2544 y Y.1564 para Enlaces Carrier Ethernet",
    "area": "Redes y Conectividad",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Aprobado para piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-15T15:00:00.000Z",
    "createdAt": "2026-04-15T14:20:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.984Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "automatizacion_sin_ia",
    "answers": {
      "initiativeName": "Automatización de Pruebas de Estrés RFC 2544 y Y.1564 para Enlaces Carrier Ethernet",
      "area": "Redes y Conectividad",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Ejecución de pruebas de throughput, pérdida de tramas, latencia y variabilidad de retardo para entrega de servicios metro ethernet a clientes corporativos",
      "currentProblem": "Los ingenieros de aprovisionamiento de red deben configurar manualmente generadores de tráfico y responder pruebas de hasta 4 horas por circuito de fibra.",
      "trigger": "Terminación de empalme físico de fibra y solicitud de certificación de enlace Carrier Ethernet",
      "finalResult": "Certificado de pruebas RFC 2544 emitido automáticamente y parámetros validados según el SLA vendido",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 510,
      "timePerCase": 45,
      "timeUnit": "Minutos",
      "peopleInvolved": 11,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Demora en la firma del acta de entrega del servicio y arranque de la facturación mensual.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Script orquestador que provisiona el loopback remoto en el switch de borde, inyecta paquetes de prueba y emite el certificado en PDF.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "Switches Cisco/Nokia/Huawei",
        "Servidores de pruebas iPerf/EXFO",
        "Inventario de Red"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_024_pruebas_rfc2544_1793119590984",
      "projectId": "gtd_proj_024_pruebas_rfc2544",
      "scoringVersion": "v1",
      "importanceScore": 61,
      "viabilityScore": 87,
      "easeScore": 77,
      "totalScore": 74.1,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "510 casos/mes, 45 Minutos/caso. Equivale a 4.590 h/año.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (4590.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Demora en la firma del acta de entrega del servicio y arranque de la facturación mensual.",
            "scoreObtained": 17,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Switches Cisco/Nokia/Huawei, Servidores de pruebas iPerf/EXFO, Inventario de Red",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.984Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_024",
      "projectId": "gtd_proj_024_pruebas_rfc2544",
      "analyzedAt": "2026-04-15T15:10:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Automatización integral del proceso de homologación y estrés de enlaces Carrier Ethernet de acuerdo a estándares internacionales MEF 3.0 / ITU-T Y.1564.",
        "problemaPrincipal": "El proceso manual requiere que dos ingenieros coordinen en paralelo la configuración de loopbacks en extremos opuestos del circuito.",
        "procesoActual": "Conexión vía SSH o consola al switch del cliente, activación de tramas de prueba, captura de resultados en texto plano y formateo manual.",
        "consecuenciasPrincipales": [
          "Cuello de botella en la fase final de despliegue de clientes corporativos",
          "Pruebas incompletas por falta de tiempo en ventanas de entrega"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 510,
          "minutosPorCaso": 45,
          "horasAnualesEstimadas": 4590,
          "personasParticipantes": 11,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de certificación de 3 horas a solo 15 minutos por circuito.",
          "impactoEconomicoReportado": 110000000,
          "tipoImpactoEconomico": "Aceleración de facturación mensual recurrente (MRR)",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Entrega más rápida de sus sedes conectadas con certificado técnico adjunto.",
          "riesgosActuales": [
            "Reclamos post-instalación por saturación o latencia no detectada"
          ]
        },
        "resultadoEsperado": "Ejecución desatendida mediante API/CLI y almacenamiento del certificado firmado en el CRM.",
        "tipoSolucionRecomendada": "automatizacion_tradicional",
        "justificacionTipoSolucion": "Proceso determinístico basado en protocolos estándar y comandos de red sin ambigüedad.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Se ejecuta en enlaces nuevos antes de habilitar el tráfico de producción.",
        "restriccionesIdentificadas": [
          "Compatibilidad de comandos de loopback entre vendors (Cisco, Nokia, Huawei)"
        ],
        "recomendacionesImplementacion": [
          "Módulo de abstracción de red para estandarizar comandos multivendor",
          "Integrar con la orden de activación en el OSS central"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_025_gestion_repuestos_olt",
    "initiativeName": "Gestor Predictivo de Repuestos y Reposición de Tarjetas OLT/DWDM en Bodega Central",
    "area": "Logística",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
    "status": "En backlog",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-16T11:00:00.000Z",
    "createdAt": "2026-04-16T10:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Gestor Predictivo de Repuestos y Reposición de Tarjetas OLT/DWDM en Bodega Central",
      "area": "Logística",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
      "processActivity": "Monitoreo del stock crítico de repuestos ópticos (tarjetas de línea 100G/400G, transceivers SFP+/QSFP28, fuentes de poder) y cálculo de punto de reorden considerando lead time internacional",
      "currentProblem": "Tiempos de reposición de hasta 16 semanas por parte de fabricantes asiáticos que han generado quiebres de stock durante averías críticas de hardware de red.",
      "trigger": "Salida de repuesto por reemplazo de emergencia o alerta de nivel mínimo de stock alcanzado",
      "finalResult": "Orden de compra generada a tiempo con cantidad óptima calculada según pronóstico de fallas",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 180,
      "timePerCase": 35,
      "timeUnit": "Minutos",
      "peopleInvolved": 6,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Retrasos en la atención",
        "Afectación a clientes"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Nodos operando sin redundancia de tarjetas por semanas con alto riesgo de caída total.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Asistente inteligente que calcula el stock de seguridad dinámico considerando la tasa histórica de fallas por vendor y el tiempo de despacho aduanero.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "ERP SAP MM",
        "Historial de RMA de fabricantes",
        "Inventario en tránsito"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_025_gestion_repuestos_olt_1793119590985",
      "projectId": "gtd_proj_025_gestion_repuestos_olt",
      "scoringVersion": "v1",
      "importanceScore": 74,
      "viabilityScore": 87,
      "easeScore": 81,
      "totalScore": 80.3,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "180 casos/mes, 35 Minutos/caso. Equivale a 1.260 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (1260.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Nodos operando sin redundancia de tarjetas por semanas con alto riesgo de caída total.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "ERP SAP MM, Historial de RMA de fabricantes, Inventario en tránsito",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_025",
      "projectId": "gtd_proj_025_gestion_repuestos_olt",
      "analyzedAt": "2026-04-16T11:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Modelo de inventario predictivo para repuestos de alta gama en telecomunicaciones (DWDM, transpondedores y OLTs) que anticipa solicitudes de compra antes de que el stock llegue a niveles críticos.",
        "problemaPrincipal": "El cálculo manual de inventario mínimo no considera la estacionalidad de fallas ni los retrasos en las cadenas globales de suministro.",
        "procesoActual": "El encargado de bodega revisa planillas de Excel quincenalmente y solicita cotizaciones cuando ya queda solo una tarjeta de repuesto.",
        "consecuenciasPrincipales": [
          "Gastos desmedidos en envíos internacionales express (Courier VIP)",
          "Anillos troncales operando sin tarjeta de protección (1+1 desprotegido)"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 180,
          "minutosPorCaso": 35,
          "horasAnualesEstimadas": 1260,
          "personasParticipantes": 6,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Cero quiebres de stock en repuestos de severidad crítica (Nivel 1) en las bodegas regionales de Grupo GTD.",
          "impactoEconomicoReportado": 68000000,
          "tipoImpactoEconomico": "Ahorro logístico directo y optimización del capital inmovilizado",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Garantiza restablecimiento rápido de enlaces ante fallas de hardware.",
          "riesgosActuales": [
            "Escasez global de semiconductores en proveedores ópticos"
          ]
        },
        "resultadoEsperado": "Sugerencia proactiva de pedidos de compra en SAP con simulación de cobertura en días.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Aplica algoritmos de series temporales y machine learning para estimar vida útil y probabilidad de reemplazo.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Implica compromisos presupuestarios de compras que requieren aprobación del líder de compras.",
        "restriccionesIdentificadas": [
          "Contratos de garantía y soporte extendido vigentes con vendors (SmartNet, etc.)"
        ],
        "recomendacionesImplementacion": [
          "Integrar la base de datos de RMA de Huawei, Cisco e Infinera",
          "Dashboard de salud de inventario en tiempo real para la gerencia de operaciones"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_026_migracion_sip_teams",
    "initiativeName": "Asistente para Migración de Troncales SIP Tradicionales a Cloud PBX Teams y Webex",
    "area": "Tecnología",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Juan Ramón Jaramillo Hernández (Gerente de Desarrollo y Preventa - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-17T16:00:00.000Z",
    "createdAt": "2026-04-17T15:20:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Asistente para Migración de Troncales SIP Tradicionales a Cloud PBX Teams y Webex",
      "area": "Tecnología",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Juan Ramón Jaramillo Hernández (Gerente de Desarrollo y Preventa - Gtd Colombia)",
      "processActivity": "Configuración de Session Border Controllers (SBC) y mapeo de planes de numeración (DIDs) hacia entornos de colaboración Microsoft Teams y Cisco Webex",
      "currentProblem": "La migración de PBX físicas a nube requiere configurar manualmente tablas de enrutamiento SIP y perfiles TLS en SBCs Ribbon/Audiocodes, con alta tasa de error en códecs.",
      "trigger": "Solicitud de cliente corporativo para habilitar Direct Routing en Microsoft Teams",
      "finalResult": "Troncal SIP Cloud operativa, numeración migrada y llamadas entrantes/salientes probadas satisfactoriamente",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 95,
      "timePerCase": 120,
      "timeUnit": "Minutos",
      "peopleInvolved": 5,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Pérdida de llamadas telefónicas en clientes corporativos durante la ventana de corte.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Asistente guiado que genera los scripts de configuración certificados de SBC y valida los certificados TLS y conectividad IP antes de la ventana de corte.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "SBC Ribbon / AudioCodes",
        "Microsoft Graph API",
        "Base de datos de numeración GTD"
      ],
      "dataOrganization": "Dispersa en varios sistemas",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de clientes"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_026_migracion_sip_teams_1793119590985",
      "projectId": "gtd_proj_026_migracion_sip_teams",
      "scoringVersion": "v1",
      "importanceScore": 64,
      "viabilityScore": 72,
      "easeScore": 77,
      "totalScore": 70.05,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "95 casos/mes, 120 Minutos/caso. Equivale a 2.280 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2280.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Pérdida de llamadas telefónicas en clientes corporativos durante la ventana de corte.",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Dispersa en varios sistemas",
            "scoreObtained": 5,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "SBC Ribbon / AudioCodes, Microsoft Graph API, Base de datos de numeración GTD",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de clientes",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_026",
      "projectId": "gtd_proj_026_migracion_sip_teams",
      "analyzedAt": "2026-04-17T16:10:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Herramienta de aceleración técnica para ingenieros de voz que automatiza la configuración de SBCs Ribbon y perfiles SIP para integrar centrales telefónicas empresariales con Microsoft 365.",
        "problemaPrincipal": "Cada migración exige editar decenas de parámetros en la consola web del SBC, incrementando la probabilidad de caídas de señalización SIP.",
        "procesoActual": "El ingeniero copia y pega fragmentos de configuración manuales, realiza llamadas de prueba una por una y ajusta rutas por ensayo y error.",
        "consecuenciasPrincipales": [
          "Prolongación de ventanas de corte nocturno hasta la madrugada",
          "Interrupción de comunicaciones en conmutadores corporativos"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 95,
          "minutosPorCaso": 120,
          "horasAnualesEstimadas": 2280,
          "personasParticipantes": 5,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de despliegue de 2 horas a 20 minutos por cliente empresarial.",
          "impactoEconomicoReportado": 74000000,
          "tipoImpactoEconomico": "Eficiencia en horas de consultores senior y satisfacción de cliente",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Migraciones transparentes sin pérdida de llamadas comerciales.",
          "riesgosActuales": [
            "Errores de configuración en certificados de seguridad TLS"
          ]
        },
        "resultadoEsperado": "Plantillas de configuración validadas sintácticamente con botón de aprovisionamiento directo vía API REST.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Asiste al ingeniero en la traducción de dial plans complejos según las reglas de cada cliente.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Las pruebas se ejecutan en troncales paralelas antes de conmutar el tráfico productivo.",
        "restriccionesIdentificadas": [
          "Restricciones de licencias en SBCs físicos desplegados en data center"
        ],
        "recomendacionesImplementacion": [
          "Validación previa de resolución de DNS públicos requeridos por Microsoft",
          "Módulo de llamadas de prueba automatizadas con respuesta interactiva (IVR)"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_027_qoe_streaming_cdn",
    "initiativeName": "Monitoreo de Calidad de Experiencia (QoE) en Streaming de Video y CDN para Red Residencial",
    "area": "Redes y Conectividad",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Pendiente de revisión",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-18T10:00:00.000Z",
    "createdAt": "2026-04-18T09:15:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Piloto de aprendizaje",
    "riskLevel": "bajo",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Monitoreo de Calidad de Experiencia (QoE) en Streaming de Video y CDN para Red Residencial",
      "area": "Redes y Conectividad",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Supervisión de métricas de buffering, tasa de bits y latencia en servidores de caché de contenidos (Netflix Open Connect, Google GGC, Akamai, Cloudflare) en nodos FTTH",
      "currentProblem": "Durante eventos masivos de streaming deportivo, se saturan enlaces de peering locales sin que el NOC detecte degradación de experiencia hasta recibir cientos de llamadas de quejas.",
      "trigger": "Aumento brusco de peticiones TCP/UDP hacia prefijos de servidores CDN en horas punta",
      "finalResult": "Rebalanceo automático de políticas BGP y tráfico hacia cachés alternativas para eliminar el buffering de video",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 800,
      "timePerCase": 15,
      "timeUnit": "Minutos",
      "peopleInvolved": 7,
      "reworkFrequency": "Menos del 5 % de los casos",
      "consequences": [
        "Afectación a clientes",
        "Retrasos en la atención"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Degradación masiva en la percepción de calidad del servicio de Internet hogar y aumento de cancelaciones de servicio.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Agente de ingeniería de tráfico que supervisa flujos NetFlow/IPFIX y ajusta pesos BGP locales de forma instantánea al detectar buffering.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "Routers Core BGP",
        "NetFlow / IPFIX",
        "Telemetría de CDNs locales"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_027_qoe_streaming_cdn_1793119590985",
      "projectId": "gtd_proj_027_qoe_streaming_cdn",
      "scoringVersion": "v1",
      "importanceScore": 57,
      "viabilityScore": 87,
      "easeScore": 77,
      "totalScore": 72.5,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "800 casos/mes, 15 Minutos/caso. Equivale a 2.400 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2400.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Menos del 5 % de los casos",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Degradación masiva en la percepción de calidad del servicio de Internet hogar y aumento de cancelaciones de servicio.",
            "scoreObtained": 13,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Routers Core BGP, NetFlow / IPFIX, Telemetría de CDNs locales",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Piloto de aprendizaje",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_027",
      "projectId": "gtd_proj_027_qoe_streaming_cdn",
      "analyzedAt": "2026-04-18T10:20:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Sistema inteligente de telemetría de flujo y control dinámico de enrutamiento para asegurar la calidad de reproducción de streaming de video para usuarios de fibra óptica de Grupo GTD.",
        "problemaPrincipal": "La falta de visibilidad en tiempo real a nivel de aplicación no permite actuar antes de que el usuario final experimente pausas de carga.",
        "procesoActual": "El NOC observa gráficas de tráfico generales en Cacti/Grafana y solo cuando un enlace supera el 95% interviene cambiando métricas BGP.",
        "consecuenciasPrincipales": [
          "Lluvia de reclamos en redes sociales y saturación de la línea de soporte residencial",
          "Consumo ineficiente de enlaces de tránsito IP costosos frente a peering local gratuito"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 800,
          "minutosPorCaso": 15,
          "horasAnualesEstimadas": 2400,
          "personasParticipantes": 7,
          "nivelReproceso": "Menos del 5 % de los casos"
        },
        "impacto": {
          "descripcion": "Mantenimiento constante de métricas de calidad de experiencia (QoE) superiores a 4.2 puntos en escala MOS para streaming.",
          "impactoEconomicoReportado": 135000000,
          "tipoImpactoEconomico": "Ahorro por retención de clientes y optimización de tráfico",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Experiencia de navegación y video fluida incluso en horarios de máxima audiencia.",
          "riesgosActuales": [
            "Congestión imprevista durante eventos deportivos de transmisión exclusiva"
          ]
        },
        "resultadoEsperado": "Desvío autónomo de tráfico hacia rutas de menor latencia en cuanto el RTT aumente más de 20 ms.",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "Las decisiones de enrutamiento ante picos de demanda deben tomarse en segundos para no interrumpir transmisiones en vivo.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Opera mediante rangos de ajuste BGP previamente acotados y probados por ingeniería de tráfico.",
        "restriccionesIdentificadas": [
          "Límites de capacidad física en los puertos de conexión a los IXPs locales"
        ],
        "recomendacionesImplementacion": [
          "Desplegar sondas sintéticas de medición en las 10 cabeceras urbanas más pobladas",
          "Integrar con los dashboards de telemetría de las principales plataformas de video"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_028_disaster_recovery_ai",
    "initiativeName": "Generador Inteligente de Planes de Contingencia y Disaster Recovery ante Desastres Naturales",
    "area": "Infraestructura",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-19T14:30:00.000Z",
    "createdAt": "2026-04-19T13:50:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Generador Inteligente de Planes de Contingencia y Disaster Recovery ante Desastres Naturales",
      "area": "Infraestructura",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Modelado de escenarios de falla masiva (terremotos, aluviones, incendios forestales) y generación de rutas de desvío de emergencia para la red dorsal",
      "currentProblem": "La actualización de los planes de contingencia para la continuidad de negocio (BCP) toma meses en comités y queda desactualizada frente a los nuevos despliegues de fibra.",
      "trigger": "Simulacro de continuidad de negocio o alerta de emergencia meteorológica nacional",
      "finalResult": "Plan de acción con rutas de red de respaldo, asignación de cuadrillas y enlaces satelitales prioritarios emitido en 10 minutos",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 45,
      "timePerCase": 180,
      "timeUnit": "Minutos",
      "peopleInvolved": 8,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Afectación a clientes",
        "Sobrecostos",
        "Riesgos de seguridad o cumplimiento"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Aislamiento de ciudades completas por no disponer de alternativas de enrutamiento rápido en crisis.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Asistente con IA geoespacial que evalúa la topología física actual y simula el impacto de cortes en tramos geográficos específicos.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "Topología física GIS",
        "Inventario DWDM/IP Core",
        "Sistemas de Protección Civil / Meteorología"
      ],
      "dataOrganization": "Dispersa en varios sistemas",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_028_disaster_recovery_ai_1793119590985",
      "projectId": "gtd_proj_028_disaster_recovery_ai",
      "scoringVersion": "v1",
      "importanceScore": 65,
      "viabilityScore": 72,
      "easeScore": 81,
      "totalScore": 71.45,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "45 casos/mes, 180 Minutos/caso. Equivale a 1.620 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (1620.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Aislamiento de ciudades completas por no disponer de alternativas de enrutamiento rápido en crisis.",
            "scoreObtained": 16,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Dispersa en varios sistemas",
            "scoreObtained": 5,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Topología física GIS, Inventario DWDM/IP Core, Sistemas de Protección Civil / Meteorología",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_028",
      "projectId": "gtd_proj_028_disaster_recovery_ai",
      "analyzedAt": "2026-04-19T14:45:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Plataforma de modelado de resiliencia y planes de contingencia para la red troncal de telecomunicaciones de Grupo GTD, capaz de responder ágilmente ante desastres naturales.",
        "problemaPrincipal": "La interdependencia de anillos de fibra óptica hace imposible predecir manualmente el efecto cascada de cortes simultáneos en múltiples puentes o pasos viales.",
        "procesoActual": "Comité de crisis se reúne tras la emergencia y analiza en mapas impresos las alternativas de fibra disponibles.",
        "consecuenciasPrincipales": [
          "Tiempos de recuperación prolongados tras sismos o desbordes de ríos",
          "Riesgo de corte de telecomunicaciones en centros de atención hospitalaria y gobierno"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 45,
          "minutosPorCaso": 180,
          "horasAnualesEstimadas": 1620,
          "personasParticipantes": 8,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de respuesta estratégica ante desastres de 6 horas a 20 minutos.",
          "impactoEconomicoReportado": 160000000,
          "tipoImpactoEconomico": "Cumplimiento normativo y resguardo de ingresos corporativos",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Garantía de supervivencia de servicios esenciales en momentos de crisis social o climática.",
          "riesgosActuales": [
            "Fenómenos meteorológicos extremos vinculados al cambio climático"
          ]
        },
        "resultadoEsperado": "Matriz de contingencia dinámica con asignación de enlaces de respaldo satelital y microondas en 1 clic.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Sintetiza la información topológica compleja y redacta las órdenes operativas para los jefes de nodo.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Involucra infraestructuras críticas del país que exigen control del comité de crisis.",
        "restriccionesIdentificadas": [
          "Disponibilidad de enlaces satelitales con capacidad suficiente"
        ],
        "recomendacionesImplementacion": [
          "Cargar todas las capas geológicas de riesgo del servicio nacional de prevención",
          "Realizar simulacros trimestrales sin previo aviso utilizando los planes generados"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_029_conciliacion_impuestos",
    "initiativeName": "Conciliación Automatizada de Impuestos Municipales y Retenciones por Tendido de Red",
    "area": "Finanzas",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
    "status": "Implementado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-20T08:30:00.000Z",
    "createdAt": "2026-04-20T08:00:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Piloto de aprendizaje",
    "riskLevel": "bajo",
    "recommendedSolutionType": "automatizacion_sin_ia",
    "answers": {
      "initiativeName": "Conciliación Automatizada de Impuestos Municipales y Retenciones por Tendido de Red",
      "area": "Finanzas",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
      "processActivity": "Cálculo, liquidación y cruce de tasas por derecho de uso de espacio público y patentes comerciales en más de 80 municipios",
      "currentProblem": "Cada municipio maneja estatutos tributarios distintos con fechas de vencimiento dispares, generando riesgo de intereses moratorios y sanciones fiscales.",
      "trigger": "Emisión de avalúos municipales y calendarios tributarios locales",
      "finalResult": "Liquidaciones conciliadas, cargadas en ERP contable y pagos programados sin mora",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Mensual",
      "monthlyCases": 220,
      "timePerCase": 55,
      "timeUnit": "Minutos",
      "peopleInvolved": 4,
      "reworkFrequency": "Menos del 5 % de los casos",
      "consequences": [
        "Sobrecostos",
        "Sanciones regulatorias"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Embargos de cuentas bancarias de la compañía por retraso en el pago de derechos de paso municipal.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Robot contable que descarga liquidaciones de portales municipales, valida las fórmulas de metros lineales y genera la orden de pago bancario.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "ERP SAP FI",
        "Portales de Tesorerías Municipales",
        "Catastro de Metros de Red"
      ],
      "dataOrganization": "Dispersa en varios sistemas",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_029_conciliacion_impuestos_1793119590985",
      "projectId": "gtd_proj_029_conciliacion_impuestos",
      "scoringVersion": "v1",
      "importanceScore": 46,
      "viabilityScore": 72,
      "easeScore": 81,
      "totalScore": 63.85,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "220 casos/mes, 55 Minutos/caso. Equivale a 2.420 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (2420.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Menos del 5 % de los casos",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Embargos de cuentas bancarias de la compañía por retraso en el pago de derechos de paso municipal.",
            "scoreObtained": 12,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Dispersa en varios sistemas",
            "scoreObtained": 5,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "ERP SAP FI, Portales de Tesorerías Municipales, Catastro de Metros de Red",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Piloto de aprendizaje",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_029",
      "projectId": "gtd_proj_029_conciliacion_impuestos",
      "analyzedAt": "2026-04-20T08:45:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Automatización de la gestión tributaria territorial para los gravámenes asociados al despliegue de redes de telecomunicaciones en municipios de operación de Grupo GTD.",
        "problemaPrincipal": "El equipo contable pierde semanas revisando tablas disímiles enviadas por más de 80 alcaldías locales.",
        "procesoActual": "Revisión manual de recibos físicos o PDFs y transcripción número por número en el módulo financiero de SAP.",
        "consecuenciasPrincipales": [
          "Pagos duplicados o tardíos con sobrecosto por intereses",
          "Riesgo de clausura de obras de canalización por certificados impagos"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 220,
          "minutosPorCaso": 55,
          "horasAnualesEstimadas": 2420,
          "personasParticipantes": 4,
          "nivelReproceso": "Menos del 5 % de los casos"
        },
        "impacto": {
          "descripcion": "100% de declaraciones municipales liquidadas y abonadas con cero sanciones en el año calendario.",
          "impactoEconomicoReportado": 64000000,
          "tipoImpactoEconomico": "Ahorro directo en sanciones e intereses moratorios",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Previene frenos legales u órdenes de paralización en obras de tendido de fibra.",
          "riesgosActuales": [
            "Modificaciones tributarias unilaterales en ordenanzas municipales"
          ]
        },
        "resultadoEsperado": "Calendario fiscal unificado en la nube con conciliación automática de pagos.",
        "tipoSolucionRecomendada": "automatizacion_tradicional",
        "justificacionTipoSolucion": "Las fórmulas tributarias son numéricas y determinísticas, sujetas a tablas de metros lineales.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Solo manipula cálculos internos y genera propuestas de pago que autoriza el tesorero.",
        "restriccionesIdentificadas": [
          "Disponibilidad de portales web en alcaldías con menor infraestructura digital"
        ],
        "recomendacionesImplementacion": [
          "Módulo de alerta temprana 15 días antes del vencimiento con notificación a finanzas",
          "Repositorio digital de comprobantes de pago vinculados al número de expediente municipal"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_030_factibilidad_electrica_dc",
    "initiativeName": "Agente de Validación Previa de Factibilidad Eléctrica y Climatización en Racks de Data Center",
    "area": "Infraestructura",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Aprobado para piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-21T11:40:00.000Z",
    "createdAt": "2026-04-21T11:00:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Agente de Validación Previa de Factibilidad Eléctrica y Climatización en Racks de Data Center",
      "area": "Infraestructura",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Evaluación de densidad térmica (kW/rack), capacidad de PDU y flujo de aire en pasillos fríos para nuevas contrataciones de colocation en Data Centers Tier III",
      "currentProblem": "Las cotizaciones de colocation tardan hasta 5 días hábiles esperando que los ingenieros de data center calculen manualmente la carga eléctrica disponible y el PUE proyectado.",
      "trigger": "Solicitud comercial de espacio en rack para servidores corporativos de alta densidad (IA/HPC)",
      "finalResult": "Certificado de factibilidad técnica de espacio, potencia y refrigeración emitido en menos de 10 minutos",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 140,
      "timePerCase": 60,
      "timeUnit": "Minutos",
      "peopleInvolved": 5,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos",
        "Afectación a clientes"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Sobrecarga de circuitos eléctricos con disparo de protecciones térmicas o pérdida de oportunidades comerciales de hosting.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Herramienta digital de modelado de carga térmica y eléctrica que sugiere la mejor posición de rack disponible optimizando el consumo de aire acondicionado.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "DCIM (Data Center Infrastructure Management)",
        "BMS de Energía y Clima",
        "CRM Comercial"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_030_factibilidad_electrica_dc_1793119590985",
      "projectId": "gtd_proj_030_factibilidad_electrica_dc",
      "scoringVersion": "v1",
      "importanceScore": 70,
      "viabilityScore": 87,
      "easeScore": 81,
      "totalScore": 78.7,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "140 casos/mes, 60 Minutos/caso. Equivale a 1.680 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (1680.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Sobrecarga de circuitos eléctricos con disparo de protecciones térmicas o pérdida de oportunidades comerciales de hosting.",
            "scoreObtained": 21,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "DCIM (Data Center Infrastructure Management), BMS de Energía y Clima, CRM Comercial",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_030",
      "projectId": "gtd_proj_030_factibilidad_electrica_dc",
      "analyzedAt": "2026-04-21T11:55:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Gemelo digital y asistente de asignación de racks en los Data Centers de Grupo GTD para validar en segundos la capacidad eléctrica (kVA) y térmica (BTU/h) de nuevos proyectos corporativos.",
        "problemaPrincipal": "El cálculo manual en hojas de cálculo desactualizadas provoca puntos calientes (hotspots) en las salas blancas de cómputo.",
        "procesoActual": "El comercial envía un correo al jefe de Data Center, quien inspecciona físicamente los paneles eléctricos de la sala antes de contestar.",
        "consecuenciasPrincipales": [
          "Pérdida de negocios ante clientes internacionales que exigen propuestas en < 24 horas",
          "Ineficiencia en el uso de los chillers aumentando el PUE global del centro de datos"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 140,
          "minutosPorCaso": 60,
          "horasAnualesEstimadas": 1680,
          "personasParticipantes": 5,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de respuesta técnica de 5 días a solo 10 minutos, con un balance de carga térmica perfecto.",
          "impactoEconomicoReportado": 105000000,
          "tipoImpactoEconomico": "Mayores ventas y eficiencia en el consumo eléctrico de climatización",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Cotizaciones ágiles y certeza del 100% de disponibilidad de energía sin riesgo de sobrecarga.",
          "riesgosActuales": [
            "Requerimientos crecientes de potencia por servidores para modelos de inteligencia artificial"
          ]
        },
        "resultadoEsperado": "Integración con Salesforce para que el ejecutivo comercial obtenga la posición de rack reservada en el momento.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Resuelve problemas de optimización multicriterio (espacio, redundancia A+B, proximidad a patch panels) y explica la recomendación.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "La potencia eléctrica mal calculada puede afectar equipos en producción de otros clientes del data center.",
        "restriccionesIdentificadas": [
          "Estándares de certificación Tier III de Uptime Institute"
        ],
        "recomendacionesImplementacion": [
          "Conectar directamente con los sensores de temperatura en tiempo real de los racks",
          "Validación final con firma electrónica del gerente de data center"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_031_madurez_zero_trust",
    "initiativeName": "Evaluador de Madurez y Postura de Ciberseguridad (Zero Trust) para Clientes Corporativos",
    "area": "Ciberseguridad",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-22T15:20:00.000Z",
    "createdAt": "2026-04-22T14:40:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Evaluador de Madurez y Postura de Ciberseguridad (Zero Trust) para Clientes Corporativos",
      "area": "Ciberseguridad",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Diagnóstico automatizado de la arquitectura de seguridad del cliente frente a marcos NIST CSF y CIS Controls para dimensionar servicios gestionados de SOC",
      "currentProblem": "Los consultores de ciberseguridad dedican semanas completas a entrevistas y auditorías manuales antes de presentar una propuesta técnica y comercial de seguridad.",
      "trigger": "Reunión de preventa con gerencia de seguridad de la información (CISO) de cliente corporativo",
      "finalResult": "Informe de diagnóstico con brechas de ciberseguridad, mapa de ruta Zero Trust y cotización de servicios MSSP GTD",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 110,
      "timePerCase": 75,
      "timeUnit": "Minutos",
      "peopleInvolved": 9,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Pérdida de dinamismo en el pipeline comercial de ciberseguridad corporativa.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Asistente inteligente que procesa cuestionarios interactivos de telemetría y genera un reporte ejecutivo en PDF con benchmarking del sector industrial del cliente.",
      "autonomyLevel": "3. Proponer acciones y ejecutarlas tras confirmación humana",
      "dataSources": [
        "Cuestionario de arquitectura del cliente",
        "Bases de conocimiento NIST/CIS",
        "Catálogo de soluciones SOC GTD"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de clientes"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_031_madurez_zero_trust_1793119590985",
      "projectId": "gtd_proj_031_madurez_zero_trust",
      "scoringVersion": "v1",
      "importanceScore": 68,
      "viabilityScore": 87,
      "easeScore": 77,
      "totalScore": 76.9,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "110 casos/mes, 75 Minutos/caso. Equivale a 1.650 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (1650.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Pérdida de dinamismo en el pipeline comercial de ciberseguridad corporativa.",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Cuestionario de arquitectura del cliente, Bases de conocimiento NIST/CIS, Catálogo de soluciones SOC GTD",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de clientes",
            "scoreObtained": 19,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "3. Proponer acciones y ejecutarlas tras confirmación humana",
            "scoreObtained": 18,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_031",
      "projectId": "gtd_proj_031_madurez_zero_trust",
      "analyzedAt": "2026-04-22T15:35:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Plataforma de evaluación automatizada de madurez cibernética que ayuda al equipo comercial de GTD a posicionar servicios de SOC, EDR y Firewall Gestionado.",
        "problemaPrincipal": "Diagnósticos artesanales que toman hasta 3 semanas por cliente y dependen del criterio disperso de ingenieros individuales.",
        "procesoActual": "El especialista entrevista al cliente, toma notas en papel, compara manualmente con tablas de Excel y redacta un informe de 40 páginas en Word.",
        "consecuenciasPrincipales": [
          "Baja conversión de prospectos a clientes de contrato plurianual",
          "Propuestas comerciales no adaptadas al nivel de riesgo real del cliente"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 110,
          "minutosPorCaso": 75,
          "horasAnualesEstimadas": 1650,
          "personasParticipantes": 9,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Incremento del 35% en la tasa de cierre de contratos de ciberseguridad corporativa en el primer trimestre.",
          "impactoEconomicoReportado": 115000000,
          "tipoImpactoEconomico": "Nuevos ingresos recurrentes por servicios de seguridad",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Diagnóstico claro y priorizado de sus debilidades tecnológicas.",
          "riesgosActuales": [
            "Aumento de ataques de ransomware dirigidos a empresas del sector salud y logística"
          ]
        },
        "resultadoEsperado": "Informe visual con radar de madurez, brechas críticas y catálogo de servicios GTD recomendado.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Capacidad de razonar sobre respuestas cualitativas para asociarlas a controles normativos específicos.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Herramienta orientada a preventa y diagnóstico sin acceso a las credenciales o redes productivas del cliente.",
        "restriccionesIdentificadas": [
          "Cumplimiento de acuerdos de confidencialidad (NDA) estrictos"
        ],
        "recomendacionesImplementacion": [
          "Integrar con la calculadora de precios del área comercial",
          "Brindar versión ejecutiva de una sola página para la junta directiva del cliente"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_032_certificacion_tecnicos",
    "initiativeName": "Asistente de Formación y Certificación Rápida para Técnicos Instaladores de Fibra en Terreno",
    "area": "Recursos Humanos",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
    "status": "En piloto",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-23T10:10:00.000Z",
    "createdAt": "2026-04-23T09:30:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Piloto de aprendizaje",
    "riskLevel": "bajo",
    "recommendedSolutionType": "asistente_ia",
    "answers": {
      "initiativeName": "Asistente de Formación y Certificación Rápida para Técnicos Instaladores de Fibra en Terreno",
      "area": "Recursos Humanos",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Carlos Emilio Viana López (Gerente Administrativo y Financiero - Gtd Colombia)",
      "processActivity": "Capacitación práctica en normas de seguridad en alturas, fusión de hilos de fibra, conectorización mecánica y manejo de OTDR",
      "currentProblem": "La alta rotación de técnicos instaladores en empresas contratistas requiere un proceso de inducción de 6 semanas antes de que puedan salir autónomos a terreno.",
      "trigger": "Ingreso de nuevo personal técnico propio o de contratistas aliados",
      "finalResult": "Técnico evaluado mediante simulaciones interactivas, certificado bajo norma GTD y habilitado para órdenes de trabajo",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Semanal",
      "monthlyCases": 70,
      "timePerCase": 90,
      "timeUnit": "Minutos",
      "peopleInvolved": 4,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Retrasos en la atención",
        "Sobrecostos",
        "Riesgos de seguridad o cumplimiento"
      ],
      "affectedGroup": "Usuarios internos del área",
      "errorConsequences": "Accidentes laborales en postes, fusiones atenuadas y visitas repetidas por mala praxis del instalador.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Tutor virtual en app móvil que guía al instalador con fotos de casos reales, evalúa su técnica y responde dudas técnicas sobre splitters en 15 segundos.",
      "autonomyLevel": "2. Generar sugerencias o borradores que un humano debe revisar",
      "dataSources": [
        "Manuales técnicos de planta externa",
        "Normas de seguridad laboral",
        "Videos de mejores prácticas de fusión"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_032_certificacion_tecnicos_1793119590985",
      "projectId": "gtd_proj_032_certificacion_tecnicos",
      "scoringVersion": "v1",
      "importanceScore": 52,
      "viabilityScore": 87,
      "easeScore": 85,
      "totalScore": 72.5,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "70 casos/mes, 90 Minutos/caso. Equivale a 1.260 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (1260.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Accidentes laborales en postes, fusiones atenuadas y visitas repetidas por mala praxis del instalador.",
            "scoreObtained": 13,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Usuarios internos del área",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Manuales técnicos de planta externa, Normas de seguridad laboral, Videos de mejores prácticas de fusión",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "2. Generar sugerencias o borradores que un humano debe revisar",
            "scoreObtained": 22,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Piloto de aprendizaje",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_032",
      "projectId": "gtd_proj_032_certificacion_tecnicos",
      "analyzedAt": "2026-04-23T10:25:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Asistente móvil interactivo de aprendizaje y micro-certificación para acelerar la habilitación operativa de técnicos instaladores de fibra óptica de Grupo GTD.",
        "problemaPrincipal": "La inducción tradicional en aulas satura a los instructores y no evalúa la destreza real del técnico frente a situaciones anómalas en postes.",
        "procesoActual": "Cursos presenciales con diapositivas seguidos de acompañamiento de un técnico senior durante un mes completo.",
        "consecuenciasPrincipales": [
          "Baja disponibilidad de cuadrillas para absorber picos de altas residenciales",
          "Incremento de garantías de instalación en los primeros 30 días de servicio"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 70,
          "minutosPorCaso": 90,
          "horasAnualesEstimadas": 1260,
          "personasParticipantes": 4,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del tiempo de onboarding de 6 semanas a solo 12 días laborables.",
          "impactoEconomicoReportado": 52000000,
          "tipoImpactoEconomico": "Ahorro de horas de técnicos senior y menor tasa de fallas iniciales",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Instalaciones domiciliarias más limpias y rápidas con menos visitas de corrección.",
          "riesgosActuales": [
            "Rotación laboral en el sector de técnicos de telecomunicaciones"
          ]
        },
        "resultadoEsperado": "App con módulos prácticos y cuestionarios con validación por visión artificial de fotos de empalmes.",
        "tipoSolucionRecomendada": "asistente_ia",
        "justificacionTipoSolucion": "Adapta el ritmo de aprendizaje y responde dudas concretas en lenguaje natural con soporte fotográfico.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Ámbito pedagógico y formativo que complementa la supervisión del líder de cuadrilla.",
        "restriccionesIdentificadas": [
          "Disponibilidad de teléfonos móviles corporativos con buena cámara para el personal"
        ],
        "recomendacionesImplementacion": [
          "Incluir simulador de lectura de trazas de reflectometría óptica (OTDR)",
          "Insignias digitales de certificación válidas para acceso a cámaras subterráneas"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_033_tormentas_microondas",
    "initiativeName": "Correlación de Eventos de Tormentas Eléctricas con Descargas Atmosféricas en Torres de Microondas",
    "area": "Operaciones",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Analizado por IA",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-24T12:00:00.000Z",
    "createdAt": "2026-04-24T11:20:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Quick Win",
    "riskLevel": "medio",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Correlación de Eventos de Tormentas Eléctricas con Descargas Atmosféricas en Torres de Microondas",
      "area": "Operaciones",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Monitoreo en tiempo real de redes de detección de rayos y correlación con alarmas de pérdida de enlace en radioenlaces de alta montaña",
      "currentProblem": "Cuando cae un rayo en una torre de telecomunicaciones, el NOC tarda horas en determinar si la caída fue por desalineamiento mecánico de la antena o por daño en la unidad de radio (ODU).",
      "trigger": "Impacto de rayo registrado a menos de 500 metros de la torre o corte intempestivo de microondas durante tormenta",
      "finalResult": "Diagnóstico automático de causa de falla y despacho de cuadrilla con los repuestos precisos (tarjeta IF, ODU o fusible de puesta a tierra)",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 90,
      "timePerCase": 40,
      "timeUnit": "Minutos",
      "peopleInvolved": 6,
      "reworkFrequency": "Entre el 5 % y el 15 % de los casos",
      "consequences": [
        "Afectación a clientes",
        "Sobrecostos"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Viajes infructuosos de técnicos a cerros de difícil acceso sin el repuesto adecuado.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Agente que correlaciona datos de sensores de rayos en tiempo real con la telemetría SNMP del radioenlace y define el plan de reparación en 3 minutos.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "Red Nacional de Detección de Rayos",
        "NMS de Radios Aviat/NEC",
        "Estaciones meteorológicas"
      ],
      "dataOrganization": "Dispersa en varios sistemas",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna",
        "Información de terceros"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_033_tormentas_microondas_1793119590985",
      "projectId": "gtd_proj_033_tormentas_microondas",
      "scoringVersion": "v1",
      "importanceScore": 60,
      "viabilityScore": 72,
      "easeScore": 77,
      "totalScore": 68.45,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "90 casos/mes, 40 Minutos/caso. Equivale a 720 h/año.",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (720.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Entre el 5 % y el 15 % de los casos",
            "scoreObtained": 10,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Viajes infructuosos de técnicos a cerros de difícil acceso sin el repuesto adecuado.",
            "scoreObtained": 16,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Dispersa en varios sistemas",
            "scoreObtained": 5,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Red Nacional de Detección de Rayos, NMS de Radios Aviat/NEC, Estaciones meteorológicas",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna, Información de terceros",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_033",
      "projectId": "gtd_proj_033_tormentas_microondas",
      "analyzedAt": "2026-04-24T12:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Sistema de correlación analítica entre descargas atmosféricas (kiloamperios e impacto geoespacial) y el comportamiento de enlaces de microondas para acelerar el restablecimiento de conectividad en zonas remotas.",
        "problemaPrincipal": "La falta de certeza sobre si la falla fue por caída de tensión comercial o quema del transceptor ODU obliga a trasladar cuadrillas sin el equipamiento exacto.",
        "procesoActual": "El operador del NOC consulta radares meteorológicos públicos en internet y espera a que baje la tormenta para comenzar pruebas de ping.",
        "consecuenciasPrincipales": [
          "Sitios rurales desconectados durante más de 24 horas por traslados fallidos",
          "Gastos desproporcionados en logística de vehículos todo terreno a caminos nevados o con fango"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 90,
          "minutosPorCaso": 40,
          "horasAnualesEstimadas": 720,
          "personasParticipantes": 6,
          "nivelReproceso": "Entre el 5 % y el 15 % de los casos"
        },
        "impacto": {
          "descripcion": "Reducción del 50% en el tiempo medio de reparación (MTTR) de radioenlaces troncales afectados por rayos.",
          "impactoEconomicoReportado": 98000000,
          "tipoImpactoEconomico": "Ahorro logístico directo y menor penalización contractual",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Restablecimiento expedito de servicios para mineras, puertos y zonas rurales.",
          "riesgosActuales": [
            "Aumento de tormentas eléctricas severas en cordillera"
          ]
        },
        "resultadoEsperado": "Ficha de diagnóstico emitida automáticamente que incluye el repuesto recomendado y la ruta de acceso vial recomendada.",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "Cruza flujos masivos de eventos meteorológicos con telemetría de red de forma continua y desatendida.",
        "nivelRiesgo": "medio",
        "justificacionNivelRiesgo": "Gestiona despachos de personal a zonas geográficas con riesgos climáticos severos.",
        "restriccionesIdentificadas": [
          "Disponibilidad de API de la red meteorológica de detección de rayos"
        ],
        "recomendacionesImplementacion": [
          "Integrar sensores de corriente en el cable bajante del pararrayos de la torre",
          "Establecer protocolo de seguridad que alerte a la cuadrilla si la tormenta sigue activa en la zona"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  },
  {
    "id": "gtd_proj_034_anycast_dns_optim",
    "initiativeName": "Optimizador de Ancho de Banda y Enrutamiento DNS Anycast para Red Nacional de Grupo GTD",
    "area": "Redes y Conectividad",
    "processOwner": "elkin.zapata@grupogtd.com",
    "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
    "status": "Priorizado",
    "requesterId": "admin_elkin_uid_2026",
    "requesterEmail": "elkin.zapata@grupogtd.com",
    "submittedAt": "2026-04-25T14:00:00.000Z",
    "createdAt": "2026-04-25T13:15:00.000Z",
    "updatedAt": "2026-10-27T16:46:30.985Z",
    "category": "Quick Win",
    "riskLevel": "bajo",
    "recommendedSolutionType": "agente_autonomo",
    "answers": {
      "initiativeName": "Optimizador de Ancho de Banda y Enrutamiento DNS Anycast para Red Nacional de Grupo GTD",
      "area": "Redes y Conectividad",
      "processOwner": "elkin.zapata@grupogtd.com",
      "sponsor": "Andrés Felipe Giraldo Henao (Gerente Técnico - Gtd Colombia)",
      "processActivity": "Gestión de resolución de nombres recursivos (DNS) distribuidos Anycast para más de 450.000 abonados corporativos y residenciales",
      "currentProblem": "Ataques volumétricos de amplificación DNS o caídas de servidores locales provocan fuga de consultas hacia nodos internacionales, elevando la latencia de navegación de todos los usuarios.",
      "trigger": "Sobrecarga de consultas QPS (Queries Per Second) o incremento de latencia DNS superior a 15 ms",
      "finalResult": "Reenrutamiento Anycast BGP que distribuye la carga entre los 6 clusters nacionales en milisegundos",
      "standardizationLevel": "Está documentado y siempre se ejecuta de la misma manera",
      "frequency": "Varias veces al día",
      "monthlyCases": 320,
      "timePerCase": 30,
      "timeUnit": "Minutos",
      "peopleInvolved": 5,
      "reworkFrequency": "Menos del 5 % de los casos",
      "consequences": [
        "Afectación a clientes",
        "Sobrecostos"
      ],
      "affectedGroup": "Toda la compañía",
      "errorConsequences": "Navegación lenta percibida como caída total de internet por millones de consultas web demoradas.",
      "canEstimateEconomicImpact": "Pendiente de cuantificación formal con Gerencia de Proyectos",
      "annualValueCop": 0,
      "impactType": "Eficiencia operativa y calidad de servicio (Por cuantificar en factibilidad)",
      "economicExplanation": "El valor económico auditado se calculará durante la fase de levantamiento de detalle con la Gerencia de Proyectos y el área financiera.",
      "expectedOutcome": "Agente autónomo de balanceo Anycast que monitorea el rendimiento de BIND/Knot DNS y modifica los anuncios de ruta BGP automáticamente ante anomalías.",
      "autonomyLevel": "4. Tomar decisiones bajo reglas estrictas de negocio",
      "dataSources": [
        "Servidores DNS Knot/PowerDNS",
        "Routers BGP de borde",
        "Sondas sintéticas RIPE Atlas"
      ],
      "dataOrganization": "Centralizada en un solo sistema",
      "availableExamples": "Sí, más de 100 casos",
      "dataType": [
        "Información interna"
      ],
      "canObtainAutomatically": "Sí, los sistemas ya permiten integraciones automáticas",
      "hasDocumentation": "Sí, está completa y actualizada"
    },
    "score": {
      "id": "score_gtd_proj_034_anycast_dns_optim_1793119590985",
      "projectId": "gtd_proj_034_anycast_dns_optim",
      "scoringVersion": "v1",
      "importanceScore": 64,
      "viabilityScore": 87,
      "easeScore": 77,
      "totalScore": 75.3,
      "factorBreakdown": {
        "importance": [
          {
            "factor": "Esfuerzo humano anual",
            "userAnswer": "320 casos/mes, 30 Minutos/caso. Equivale a 1.920 h/año.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Asignado según volumen e inversión de tiempo anual (1920.0 h/año)."
          },
          {
            "factor": "Frecuencia de reprocesos",
            "userAnswer": "Menos del 5 % de los casos",
            "scoreObtained": 5,
            "maxScore": 15,
            "explanation": "Mayor tasa de corrección o reproceso eleva el impacto potencial de la solución."
          },
          {
            "factor": "Consecuencias e impacto operativo",
            "userAnswer": "Navegación lenta percibida como caída total de internet por millones de consultas web demoradas.",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Evaluación de la severidad operativa, retrasos y riesgos reportados."
          },
          {
            "factor": "Alcance de la afectación",
            "userAnswer": "Toda la compañía",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Puntuación basada en quién se ve afectado principalmente por el problema."
          },
          {
            "factor": "Impacto económico",
            "userAnswer": "Pendiente de cuantificación formal con Gerencia de Proyectos",
            "scoreObtained": 4,
            "maxScore": 20,
            "explanation": "Puntos base (4) ajustados por nivel de certidumbre (40%)."
          }
        ],
        "viability": [
          {
            "factor": "Estandarización del proceso",
            "userAnswer": "Está documentado y siempre se ejecuta de la misma manera",
            "scoreObtained": 20,
            "maxScore": 25,
            "explanation": "Procesos estandarizados reducen excepciones y facilitan la lógica de software."
          },
          {
            "factor": "Documentación disponible",
            "userAnswer": "Sí, está completa y actualizada",
            "scoreObtained": 15,
            "maxScore": 15,
            "explanation": "Manuales y documentación reducen el tiempo de levantamiento funcional."
          },
          {
            "factor": "Organización de la información",
            "userAnswer": "Centralizada en un solo sistema",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "La centralización y estructuración de los datos facilita el procesamiento."
          },
          {
            "factor": "Ejemplos de entrenamiento/pruebas",
            "userAnswer": "Sí, más de 100 casos",
            "scoreObtained": 20,
            "maxScore": 20,
            "explanation": "Disponer de casos reales anteriores acelera la validación y pruebas."
          },
          {
            "factor": "Alineación Google Enterprise & Vertex AI",
            "userAnswer": "Workspace: Estándar, Agente/IA: Apto",
            "scoreObtained": 12,
            "maxScore": 20,
            "explanation": "Nivel de integración con APIs de Google Cloud / Vertex AI para automatización inteligente."
          }
        ],
        "ease": [
          {
            "factor": "Cantidad de sistemas y fuentes",
            "userAnswer": "Servidores DNS Knot/PowerDNS, Routers BGP de borde, Sondas sintéticas RIPE Atlas",
            "scoreObtained": 15,
            "maxScore": 25,
            "explanation": "Menor número de fuentes simplifica las integraciones de datos."
          },
          {
            "factor": "Extracción automática de información",
            "userAnswer": "Sí, los sistemas ya permiten integraciones automáticas",
            "scoreObtained": 25,
            "maxScore": 25,
            "explanation": "Disponibilidad de conectores o APIs acelera la implementación."
          },
          {
            "factor": "Seguridad y sensibilidad de datos",
            "userAnswer": "Información interna",
            "scoreObtained": 23,
            "maxScore": 25,
            "explanation": "Gobernanza y requerimientos de seguridad según el tipo de datos procesados."
          },
          {
            "factor": "Nivel de autonomía solicitado",
            "userAnswer": "4. Tomar decisiones bajo reglas estrictas de negocio",
            "scoreObtained": 14,
            "maxScore": 25,
            "explanation": "Autonomía asistida o bajo supervisión reduce el riesgo técnico inicial."
          }
        ]
      },
      "restrictions": [],
      "category": "Quick Win",
      "calculatedAt": "2026-10-27T16:46:30.985Z"
    },
    "analysis": {
      "id": "analysis_gtd_proj_034",
      "projectId": "gtd_proj_034_anycast_dns_optim",
      "analyzedAt": "2026-04-25T14:15:00.000Z",
      "structuredAnalysis": {
        "resumenEjecutivo": "Orquestador autónomo de la infraestructura DNS Anycast distribuida de Grupo GTD para mitigar picos de latencia, ataques DoS y optimizar el tiempo de carga web de los abonados.",
        "problemaPrincipal": "Un problema en uno de los servidores DNS provinciales provoca que los routers desvíen el tráfico a Miami o Santiago, duplicando la latencia percibida.",
        "procesoActual": "El ingeniero de infraestructura de servicios detecta la lentitud a través de alertas de Zabbix y desactiva manualmente la sesión BGP del nodo afectado.",
        "consecuenciasPrincipales": [
          "Degradación del rendimiento de aplicaciones corporativas en la nube",
          "Sobrecarga de peticiones en los firewalls de borde"
        ],
        "volumenYEsfuerzo": {
          "casosMensuales": 320,
          "minutosPorCaso": 30,
          "horasAnualesEstimadas": 1920,
          "personasParticipantes": 5,
          "nivelReproceso": "Menos del 5 % de los casos"
        },
        "impacto": {
          "descripcion": "Tiempo promedio de respuesta DNS por debajo de los 10 milisegundos en el 98% del territorio nacional.",
          "impactoEconomicoReportado": 175000000,
          "tipoImpactoEconomico": "Ahorro en enlaces internacionales y retención de abonados",
          "nivelEvidencia": "documentado",
          "afectacionClientes": "Navegación inmediata y ultra veloz para todas las conexiones empresariales y residenciales.",
          "riesgosActuales": [
            "Ataques cibernéticos masivos de botnets hacia infraestructura de resolución de nombres"
          ]
        },
        "resultadoEsperado": "Gestión desatendida del anuncio de rutas de prefijos Anycast con retiro automático de nodos en caso de degradación de servicio.",
        "tipoSolucionRecomendada": "agente_autonomo",
        "justificacionTipoSolucion": "La velocidad de conmutación de paquetes DNS debe medirse en segundos ante la saturación de un servidor.",
        "nivelRiesgo": "bajo",
        "justificacionNivelRiesgo": "Protocolo Anycast inherente a la arquitectura BGP que conmuta limpiamente sin pérdida de paquetes.",
        "restriccionesIdentificadas": [
          "Conectividad BGP con todos los proveedores de tránsito y puntos de intercambio IXP"
        ],
        "recomendacionesImplementacion": [
          "Implementar DNS over HTTPS (DoH) y DNS over TLS (DoT) protegidos",
          "Dashboard de métricas de QPS y latencia visible en el Centro de Control de Operaciones"
        ]
      }
    },
    "createdBy": "elkin.zapata@grupogtd.com"
  }
];
