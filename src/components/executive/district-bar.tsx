"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const GREEN = "hsl(156 66% 24%)";
const GOLD = "hsl(40 86% 48%)";

export function DistrictHealthBar({ data }: { data: { name: string; healthScore: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 14% 90%)" vertical={false} />
        <XAxis dataKey="name" stroke="hsl(160 8% 42%)" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
        <YAxis domain={[0, 100]} stroke="hsl(160 8% 42%)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid hsl(150 14% 90%)", fontSize: 12 }}
          cursor={{ fill: "hsl(150 16% 95%)" }}
        />
        <Bar dataKey="healthScore" radius={[6, 6, 0, 0]} name="Health Score">
          {data.map((d, i) => (
            <Cell key={i} fill={d.healthScore >= 75 ? GREEN : GOLD} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
