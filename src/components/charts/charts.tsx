"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const GREEN = "hsl(156 66% 24%)";
const GOLD = "hsl(40 86% 48%)";
const GRID = "hsl(150 14% 90%)";
const MUTED = "hsl(160 8% 42%)";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(150 14% 90%)",
  fontSize: 12,
  boxShadow: "0 8px 24px -8px rgba(16,24,40,0.18)",
};

export function ReportsTrendChart({
  data,
}: {
  data: { label: string; reports: number; resolved: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="g-reports" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={GREEN} stopOpacity={0.3} />
            <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g-resolved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
            <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="label" stroke={MUTED} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={MUTED} fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="reports" stroke={GREEN} strokeWidth={2} fill="url(#g-reports)" name="Reports" />
        <Area type="monotone" dataKey="resolved" stroke={GOLD} strokeWidth={2} fill="url(#g-resolved)" name="Resolved" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SatisfactionChart({ data }: { data: { label: string; satisfaction: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="label" stroke={MUTED} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis domain={[60, 80]} stroke={MUTED} fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="satisfaction" stroke={GREEN} strokeWidth={2.5} dot={{ r: 3, fill: GOLD }} name="Satisfaction %" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ConcernsBarChart({ data }: { data: { label: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 24, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
        <XAxis type="number" stroke={MUTED} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="label" stroke={MUTED} fontSize={12} tickLine={false} axisLine={false} width={80} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(150 16% 95%)" }} />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Reports">
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? GREEN : GOLD} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = [GREEN, GOLD, "hsl(150 40% 44%)", "hsl(36 84% 42%)", "hsl(156 66% 18%)"];

export function StatusPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}
