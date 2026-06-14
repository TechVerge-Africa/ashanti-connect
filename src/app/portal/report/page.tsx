import { ReportForm } from "@/components/reports/report-form";

export default function ReportIssuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Report an Issue</h1>
        <p className="text-sm text-muted-foreground">
          Tell us what&apos;s wrong. Our AI routes it to the right department instantly, and you&apos;ll
          get a tracking number to follow every update.
        </p>
      </div>
      <ReportForm />
    </div>
  );
}
