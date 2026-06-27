import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, FolderKanban, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { getDepartments } from "@/lib/data/server";

export const metadata: Metadata = {
  title: "Departments",
  description: "Government departments and services on Ashanti Connect with live performance metrics.",
};

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  return (
    <>
      <PageHeader
        eyebrow="Departments"
        title="Every service, connected and accountable"
        description="Eight departments coordinate service delivery across the region. Each publishes its response times, active projects, and resolution rates."
      />
      <section className="container py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <Reveal key={d.id} index={i % 3}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={d.icon} className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-success/12 px-2.5 py-1 text-xs font-semibold text-success">
                    {d.resolutionRate}% resolved
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{d.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{d.description}</p>
                <div className="mt-4 text-xs text-muted-foreground">Led by {d.lead}</div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
                  <Metric icon={FolderKanban} value={d.activeProjects} label="Projects" />
                  <Metric icon={CheckCircle2} value={d.openCases} label="Open" />
                  <Metric icon={Clock} value={`${d.avgResponseHours}h`} label="Response" />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
          <h3 className="font-display text-xl font-semibold">Need help from a department?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
             Report an issue and our smart triage will route it to the right department automatically.
          </p>
          <Button asChild className="mt-5">
            <Link href="/portal/report">
              Report an Issue <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function Metric({
  icon: IconCmp,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <IconCmp className="mx-auto h-4 w-4 text-muted-foreground" />
      <div className="mt-1 font-display text-base font-bold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
