import { notFound } from "next/navigation";
import { ReportDetail } from "@/components/reports/report-detail";
import { getReportById, reports } from "@/lib/data";

export function generateStaticParams() {
  return reports.map((r) => ({ id: r.id }));
}

export default async function ReportTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getReportById(id);
  if (!report) notFound();
  return <ReportDetail report={report} role="citizen" backHref="/portal/track" />;
}
