"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  ImagePlus,
  Loader2,
  MapPin,
  Sparkles,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/shared/icon";
import { categoryIcons, categoryLabels } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { IssueCategory, Priority } from "@/lib/types";

const categories = Object.keys(categoryLabels) as IssueCategory[];

const categoryToDept: Record<IssueCategory, string> = {
  roads: "Roads & Highways",
  water: "Water & Sanitation",
  electricity: "Energy & Power",
  security: "Security & Safety",
  sanitation: "Sanitation & Waste",
  education: "Education",
  healthcare: "Health Services",
  agriculture: "Agriculture",
};

function classify(category: IssueCategory | null, text: string): { priority: Priority; confidence: number } {
  const t = text.toLowerCase();
  let priority: Priority = "medium";
  if (/urgent|danger|accident|emergency|days|week|child|hospital|death|fire/.test(t)) priority = "high";
  if (/critical|no water|collapse|outbreak|flood/.test(t)) priority = "critical";
  if (text.length < 30 && !category) priority = "low";
  const confidence = Math.min(0.98, 0.7 + text.length / 600 + (category ? 0.12 : 0));
  return { priority, confidence: Number(confidence.toFixed(2)) };
}

export function ReportForm() {
  const [category, setCategory] = React.useState<IssueCategory | null>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [files, setFiles] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [tracking, setTracking] = React.useState<string | null>(null);

  const ai = classify(category, description);

  const addMockFile = () => {
    setFiles((f) => [...f, `evidence-${f.length + 1}.jpg`]);
  };

  const useLocation = () => {
    setLocation("Detecting…");
    setTimeout(() => setLocation("Bantama High Street, Kumasi (6.7012, -1.6300)"), 700);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || !description) {
      toast.error("Please complete category, title, and description.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const num = `ASH-2026-0${Math.floor(4000 + Math.random() * 5999)}`;
      setTracking(num);
      setSubmitting(false);
      toast.success("Report submitted", { description: `Tracking number ${num}` });
    }, 1100);
  };

  if (tracking) {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold">Report submitted!</h2>
        <p className="mt-2 text-muted-foreground">
          Your issue has been received and routed to {category ? categoryToDept[category] : "the right team"}.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/[0.03] px-5 py-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Tracking number</div>
            <div className="font-display text-2xl font-bold text-primary">{tracking}</div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              navigator.clipboard?.writeText(tracking);
              toast.success("Copied");
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/portal/track">Track this report</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setTracking(null);
              setCategory(null);
              setTitle("");
              setDescription("");
              setLocation("");
              setFiles([]);
            }}
          >
            Report another issue
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Card className="p-6">
          <Label className="text-base">What kind of issue is it?</Label>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all",
                  category === c
                    ? "border-primary bg-primary/10 text-primary shadow-soft"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                <Icon name={categoryIcons[c]} className="h-6 w-6" />
                {categoryLabels[c]}
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken streetlight on Bantama High Street"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">Describe the issue</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Give as much detail as you can — what, where, how long, and who is affected."
            />
          </div>

          <div className="space-y-1.5">
            <Label>Location</Label>
            <div className="flex gap-2">
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter address or landmark"
              />
              <Button type="button" variant="outline" onClick={useLocation}>
                <MapPin className="h-4 w-4" /> Use GPS
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Evidence (photos, video, documents)</Label>
            <button
              type="button"
              onClick={addMockFile}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-8 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <ImagePlus className="h-7 w-7" />
              Click to add files
            </button>
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {files.map((f) => (
                  <Badge key={f} variant="secondary" className="gap-1">
                    <Upload className="h-3 w-3" /> {f}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            "Submit report"
          )}
        </Button>
      </div>

      <aside>
        <Card className="sticky top-24 border-primary/30 bg-primary/[0.03] p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold-600" />
            <span className="text-sm font-semibold">AI Smart Classification</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Updated live as you type — this is how your report will be routed.
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <Field label="Category" value={category ? categoryLabels[category] : "—"} />
            <Field label="Department" value={category ? categoryToDept[category] : "—"} />
            <Field
              label="Priority"
              value={<span className="capitalize">{description ? ai.priority : "—"}</span>}
            />
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Confidence</span>
                <span>{description ? `${Math.round(ai.confidence * 100)}%` : "—"}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-gold-500 transition-all"
                  style={{ width: description ? `${ai.confidence * 100}%` : "0%" }}
                />
              </div>
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-card p-3 text-xs text-muted-foreground">
            Tip: clear photos and an exact location help us resolve issues faster.
          </p>
        </Card>
      </aside>
    </form>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
