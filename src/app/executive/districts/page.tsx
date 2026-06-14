import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DistrictHealthBar } from "@/components/executive/district-bar";
import { districts } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";

export default function ExecutiveDistrictsPage() {
  const ranked = [...districts].sort((a, b) => b.healthScore - a.healthScore);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">District Performance</h1>
        <p className="text-sm text-muted-foreground">Compare districts across health, resolution, and satisfaction.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health score by district</CardTitle>
        </CardHeader>
        <CardContent>
          <DistrictHealthBar data={ranked.map((d) => ({ name: d.capital, healthScore: d.healthScore }))} />
        </CardContent>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b border-border bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">District</th>
                <th className="px-4 py-3 font-semibold">Population</th>
                <th className="px-4 py-3 font-semibold">Open</th>
                <th className="px-4 py-3 font-semibold">Resolved</th>
                <th className="px-4 py-3 font-semibold">Avg days</th>
                <th className="px-4 py-3 font-semibold">Satisfaction</th>
                <th className="px-4 py-3 font-semibold">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ranked.map((d, i) => (
                <tr key={d.id} className="bg-card transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3 font-semibold text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.capital}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatNumber(d.population)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.openReports}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatNumber(d.resolvedReports)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.avgResolutionDays}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        d.satisfaction >= 72 ? "bg-success/12 text-success" : d.satisfaction >= 65 ? "bg-gold/15 text-gold-700" : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {d.satisfaction}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                        <span className="block h-full rounded-full bg-gradient-to-r from-primary to-gold-500" style={{ width: `${d.healthScore}%` }} />
                      </span>
                      <span className="font-semibold text-primary">{d.healthScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
