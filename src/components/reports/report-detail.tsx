import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ImageIcon,
  MapPin,
  Sparkles,
  ThumbsUp,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/components/shared/icon";
import { PriorityBadge, ReportTimeline, StatusBadge } from "@/components/reports/report-bits";
import { Conversation } from "@/components/reports/conversation";
import { categoryIcons, categoryLabels } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { Report } from "@/lib/types";

const attachmentIcon = { image: ImageIcon, video: Video, document: FileText };

export function ReportDetail({
  report,
  role,
  backHref,
  actions,
}: {
  report: Report;
  role: "citizen" | "officer";
  backHref: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to reports
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon name={categoryIcons[report.category]} className="h-6 w-6" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{report.trackingNumber}</span>
              <StatusBadge status={report.status} />
              <PriorityBadge priority={report.priority} />
            </div>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight">{report.title}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{categoryLabels[report.category]}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {report.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" /> {report.upvotes} supporters
              </span>
            </div>
          </div>
        </div>
        {actions}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Resolution progress</span>
            <span className="font-semibold text-primary">{report.progress}%</span>
          </div>
          <Progress
            value={report.progress}
            className="mt-2"
            indicatorClassName="bg-gradient-to-r from-primary to-gold-500"
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Meta label="Department" value={report.department} />
            <Meta label="District" value={report.district} />
            <Meta label="Reported" value={formatDate(report.createdAt)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="conversation">
            <TabsList>
              <TabsTrigger value="conversation">Conversation</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="conversation">
              <Card>
                <CardContent className="pt-6">
                  <Conversation messages={report.conversation} as={role} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timeline">
              <Card>
                <CardContent className="pt-6">
                  <ReportTimeline report={report} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Description</div>
                    <p className="mt-1 text-sm text-foreground">{report.description}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Attachments</div>
                    {report.attachments.length === 0 ? (
                      <p className="mt-1 text-sm text-muted-foreground">No attachments.</p>
                    ) : (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {report.attachments.map((a) => {
                          const AIcon = attachmentIcon[a.type];
                          return (
                            <span
                              key={a.name}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs"
                            >
                              <AIcon className="h-3.5 w-3.5" /> {a.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Reporter</div>
                    <p className="mt-1 text-sm text-foreground">{report.reporter}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/30 bg-primary/[0.03]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-gold-600" /> AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Meta label="Detected category" value={categoryLabels[report.aiClassification.category]} />
              <Meta label="Routed to" value={report.aiClassification.department} />
              <Meta label="Priority" value={<span className="capitalize">{report.aiClassification.priority}</span>} />
              <Meta
                label="Sentiment"
                value={
                  <Badge
                    variant={
                      report.aiClassification.sentiment === "negative"
                        ? "destructive"
                        : report.aiClassification.sentiment === "positive"
                          ? "success"
                          : "secondary"
                    }
                    className="capitalize"
                  >
                    {report.aiClassification.sentiment}
                  </Badge>
                }
              />
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Confidence</span>
                  <span>{Math.round(report.aiClassification.confidence * 100)}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-gold-500"
                    style={{ width: `${report.aiClassification.confidence * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium text-foreground">{value}</div>
    </div>
  );
}
