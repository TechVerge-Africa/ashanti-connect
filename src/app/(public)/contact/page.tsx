import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Ashanti Regional Coordinating Council.",
};

const channels = [
  { icon: Phone, label: "Call", value: "0322 022 000", sub: "Mon–Fri, 8am–5pm" },
  { icon: Mail, label: "Email", value: "connect@ashanti.gov.gh", sub: "We reply within 24h" },
  { icon: MapPin, label: "Visit", value: "Regional Coordinating Council", sub: "Adum, Kumasi" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        description="Reach the Regional Coordinating Council, or use the platform's tools for the fastest response."
      />
      <section className="container grid gap-10 py-12 lg:grid-cols-2">
        <div>
          <div className="grid gap-4 sm:grid-cols-1">
            {channels.map((c) => (
              <Card key={c.label} className="flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</div>
                  <div className="font-semibold text-foreground">{c.value}</div>
                  <div className="text-xs text-muted-foreground">{c.sub}</div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-primary/30 bg-primary/[0.03] p-6">
            <Sparkles className="h-6 w-6 text-gold-600" />
            <h3 className="mt-3 font-display text-lg font-semibold">Looking for something specific?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              For service issues, reporting and tracking get the fastest response. The AI assistant
              can also guide you instantly.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/portal/report">Report an Issue</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/assistant">
                  <MessageSquare className="h-4 w-4" /> Ask the AI
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold">Send us a message</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the form and the right team will get back to you.
          </p>
          <ContactForm />
        </Card>
      </section>
    </>
  );
}
