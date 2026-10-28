import { Project, FormAnswers } from "../types";

export interface ProjectKPI {
  id: string;
  indicator: string;
  currentValue: string;
  targetValue: string;
  targetNumeric: string;
  unit: string;
  impact: string;
  category: "Tiempo" | "Eficiencia" | "Financiero" | "Calidad" | "Escalabilidad";
}

/**
 * Calculates a list of success KPIs with numeric target goals (e.g. Meta: -80%)
 * based on the form answers and AI analysis.
 */
export function calculateProjectKPIs(project: Project): ProjectKPI[] {
  const answers: Partial<FormAnswers> = project.answers || {};
  const structured = project.analysis?.structuredAnalysis;
  const kpis: ProjectKPI[] = [];

  // 1. KPI de Tiempo de Respuesta / Ciclo
  const timePerCase = Number(answers.timePerCase) || 1;
  const timeUnit = answers.timeUnit || "Horas";
  
  let targetTimeFormatted = "Meta: -80%";
  let targetTimeNumeric = "Meta: -80%";
  if (timeUnit === "Días laborales") {
    targetTimeFormatted = `Meta: -85% (Reducción de ${timePerCase} días a < 3 horas)`;
    targetTimeNumeric = "Meta: -85%";
  } else if (timeUnit === "Horas") {
    targetTimeFormatted = `Meta: -80% (Reducción a < ${Math.max(5, Math.round(timePerCase * 12))} min)`;
    targetTimeNumeric = "Meta: -80%";
  } else {
    targetTimeFormatted = `Meta: -75% (Reducción a < ${Math.max(2, Math.round(timePerCase * 0.25))} min)`;
    targetTimeNumeric = "Meta: -75%";
  }

  kpis.push({
    id: "kpi-tiempo",
    indicator: "Tiempo de atención y ciclo por caso (Lead Time)",
    currentValue: `${timePerCase} ${timeUnit} / caso`,
    targetValue: targetTimeFormatted,
    targetNumeric: targetTimeNumeric,
    unit: timeUnit,
    impact: "Reducción drástica de cuellos de botella y respuesta inmediata al usuario.",
    category: "Tiempo",
  });

  // 2. KPI de Esfuerzo Operativo (Horas Anuales Liberadas)
  const casesPerMonth = Number(answers.monthlyCases) || 10;
  let minutesPerCase = timePerCase;
  if (timeUnit === "Horas") minutesPerCase = timePerCase * 60;
  if (timeUnit === "Días laborales") minutesPerCase = timePerCase * 8 * 60;

  const annualHours = structured?.volumenYEsfuerzo?.horasAnualesEstimadas || Math.round((casesPerMonth * minutesPerCase * 12) / 60);
  const targetHoursSaved = Math.round(annualHours * 0.85);

  kpis.push({
    id: "kpi-esfuerzo",
    indicator: "Horas Hombre Liberadas / Eficiencia Operativa Anual",
    currentValue: `${annualHours.toLocaleString("es-CO")} hrs/año dedicadas`,
    targetValue: `Meta: ${targetHoursSaved.toLocaleString("es-CO")} hrs/año liberadas (-85%)`,
    targetNumeric: `Meta: ${targetHoursSaved.toLocaleString("es-CO")} h/año`,
    unit: "Horas/año",
    impact: "Reasignación de capacidad humana hacia tareas estratégicas de mayor valor.",
    category: "Eficiencia",
  });

  // 3. KPI de Calidad / Tasa de Error & Reproceso
  const reworkFreq = answers.reworkFrequency || "Entre el 5 % y el 15 % de los casos";
  kpis.push({
    id: "kpi-calidad",
    indicator: "Tasa de Error y Reproceso Operativo",
    currentValue: reworkFreq,
    targetValue: "Meta: < 2% de casos con reproceso",
    targetNumeric: "Meta: < 2%",
    unit: "% de casos",
    impact: "Estandarización de reglas de negocio y eliminación de fallas por digitación o cálculo manual.",
    category: "Calidad",
  });

  // 4. KPI Financiero / Impacto Económico
  if (answers.annualValueCop && Number(answers.annualValueCop) > 0) {
    const valueCop = Number(answers.annualValueCop);
    const impactType = answers.impactType || "Ahorro de costos";
    kpis.push({
      id: "kpi-financiero",
      indicator: `Retorno Económico Estimado (${impactType})`,
      currentValue: `COP ${valueCop.toLocaleString("es-CO")} / año`,
      targetValue: `Meta: 100% de captura de beneficio (COP ${valueCop.toLocaleString("es-CO")}/año)`,
      targetNumeric: `Meta: COP ${(valueCop / 1000000).toFixed(1)}M/año`,
      unit: "COP/año",
      impact: "Captura directa del retorno de inversión y optimización presupuestal.",
      category: "Financiero",
    });
  } else {
    kpis.push({
      id: "kpi-financiero",
      indicator: "Optimización de Capacidad Operativa y Costo Oculto",
      currentValue: "Procesamiento manual con costo operativo no estandarizado",
      targetValue: "Meta: +30% de ROI indirecto por optimización de capacidad",
      targetNumeric: "Meta: +30% ROI",
      unit: "ROI %",
      impact: "Reducción de costos de oportunidad y prevención de sobrecostos por demoras.",
      category: "Financiero",
    });
  }

  // 5. KPI de Escalabilidad
  kpis.push({
    id: "kpi-escalabilidad",
    indicator: "Capacidad de Absorción de Demanda (Escalabilidad)",
    currentValue: `${casesPerMonth} casos / mes actualmente`,
    targetValue: `Meta: +200% capacidad sin incremento en costo operativo`,
    targetNumeric: "Meta: +200%",
    unit: "Casos/mes",
    impact: "Soporta el crecimiento del volumen de la operación de forma transparente.",
    category: "Escalabilidad",
  });

  return kpis;
}
