import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  MapPin,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/shared/icon";
import { EligibilityChecker } from "@/components/services/eligibility-checker";
import { ServiceGuide } from "@/components/services/service-guide";
import { serviceCategoryLabels } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { Service } from "@/lib/types";

export function ServiceDetail({
  service,
  backHref = "/services",
}: {
  service: Service;
  backHref?: string;
}) {
  const lowestFee = Math.min(...service.fees.map((f) => f.amount));

  return (
    <div>
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> All services
      </Link>

      <div className="mt-6 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon name={service.icon} className="h-7 w-7" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{serviceCategoryLabels[service.category]}</Badge>
              {service.popular && <Badge variant="gold">Popular</Badge>}
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {service.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" /> {service.agency}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <p className="text-base leading-relaxed text-muted-foreground">{service.description}</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <Clock className="h-5 w-5 text-primary" />
              <div className="mt-2 text-xs text-muted-foreground">Processing time</div>
              <div className="text-sm font-semibold">{service.processingTime}</div>
            </Card>
            <Card className="p-4">
              <Globe className="h-5 w-5 text-primary" />
              <div className="mt-2 text-xs text-muted-foreground">Channels</div>
              <div className="text-sm font-semibold">
                {service.channels.map((c) => (c === "online" ? "Online" : "In person")).join(" · ")}
              </div>
            </Card>
            <Card className="p-4">
              <Wallet className="h-5 w-5 text-primary" />
              <div className="mt-2 text-xs text-muted-foreground">From</div>
              <div className="text-sm font-semibold">
                {lowestFee === 0 ? "Free" : formatCurrency(lowestFee)}
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-5">
                {service.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                      <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-primary" /> Required documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {service.requiredDocuments.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wallet className="h-4 w-4 text-primary" /> Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {service.fees.map((fee) => (
                    <li key={fee.label} className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                      <div>
                        <div className="text-sm text-foreground">{fee.label}</div>
                        {fee.note && <div className="text-xs text-muted-foreground">{fee.note}</div>}
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-primary">
                        {fee.amount === 0 ? "Free" : formatCurrency(fee.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently asked questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {service.faqs.map((faq) => (
                <div key={faq.question}>
                  <h4 className="text-sm font-semibold text-foreground">{faq.question}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-primary" /> Where to access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {service.offices.map((office) => (
                  <span
                    key={office}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <MapPin className="h-3.5 w-3.5" /> {office}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Am I eligible?</CardTitle>
            </CardHeader>
            <CardContent>
              <EligibilityChecker criteria={service.eligibility} />
            </CardContent>
          </Card>

          <ServiceGuide service={service} />
        </div>
      </div>
    </div>
  );
}
