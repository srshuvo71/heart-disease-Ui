export type RiskLevel = "low" | "moderate" | "high";

export const RISK_META: Record<
  RiskLevel,
  { label: string; message: string; ring: string; text: string; bg: string; glow: string }
> = {
  low: {
    label: "Low Risk",
    message: "Your heart health looks great. Keep up the good habits.",
    ring: "#22c55e",
    text: "text-emerald-600",
    bg: "bg-emerald-500",
    glow: "bg-emerald-400/35",
  },
  moderate: {
    label: "Moderate Risk",
    message: "A few areas need attention. Small changes can make a big difference.",
    ring: "#f59e0b",
    text: "text-amber-600",
    bg: "bg-amber-500",
    glow: "bg-amber-400/35",
  },
  high: {
    label: "High Risk",
    message: "Please consult a doctor soon and follow the recommendations below.",
    ring: "#b92229",
    text: "text-brand-primary",
    bg: "bg-brand-primary",
    glow: "bg-brand-primary/35",
  },
};

export type MetricStatus = "normal" | "watch" | "high";

export type Metric = {
  key: string;
  label: string;
  value: string;
  unit?: string;
  status: MetricStatus;
};

export type HistoryEntry = { date: string; score: number; level: RiskLevel };

export type Assessment = {
  userName: string;
  date: string;
  score: number;
  level: RiskLevel;
  metrics: Metric[];
  history: HistoryEntry[];
  recommendations: string[];
};

// Placeholder until a real prediction API / auth session feeds this page.
export const MOCK_ASSESSMENT: Assessment = {
  userName: "Alex",
  date: "September 10, 2026",
  score: 24,
  level: "low",
  metrics: [
    { key: "bp", label: "Blood Pressure", value: "118/76", unit: "mmHg", status: "normal" },
    { key: "chol", label: "Cholesterol", value: "182", unit: "mg/dL", status: "normal" },
    { key: "hr", label: "Resting Heart Rate", value: "72", unit: "bpm", status: "normal" },
    { key: "bmi", label: "BMI", value: "23.4", status: "normal" },
    { key: "sugar", label: "Blood Sugar", value: "94", unit: "mg/dL", status: "normal" },
    { key: "maxhr", label: "Max Heart Rate", value: "168", unit: "bpm", status: "watch" },
  ],
  history: [
    { date: "Sep 10, 2026", score: 24, level: "low" },
    { date: "Jun 02, 2026", score: 31, level: "low" },
    { date: "Feb 14, 2026", score: 46, level: "moderate" },
  ],
  recommendations: [
    "Keep up 30 minutes of cardio, 5 days a week",
    "Maintain your balanced, low-sodium diet",
    "Schedule your next checkup within 12 months",
  ],
};
