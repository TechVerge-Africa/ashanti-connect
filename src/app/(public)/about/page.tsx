import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Handshake, Lightbulb, Scale, Target, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { districts } from "@/lib/data";
import { compactNumber, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About the Region",
  description: "About Ashanti Connect and the Ashanti Region's digital governance vision.",
};

const values = [
  { icon: Eye, title: "Transparency", desc: "Every government action is visible and trackable by default." },
  { icon: Scale, title: "Accountability", desc: "Measurable workflows hold every institution to its commitments." },
  { icon: Lightbulb, title: "Innovation", desc: "Modern technology applied to real civic challenges." },
  { icon: Handshake, title: "Participation", desc: "Citizens are partners in governance, not just recipients." },
  { icon: Target, title: "Efficiency", desc: "Faster service delivery through smart routing and automation." },
  { icon: Users, title: "Inclusion", desc: "Accessible, mobile-first, and multilingual for everyone." },
];

const totalPop = districts.reduce((s, d) => s + d.population, 0);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Region"
        title="Building Ghana's model for digital governance"
        description="Ashanti Connect is the digital operating system of the Ashanti Region — a two-way platform reimagining how citizens and government work together."
      />

      <section className="container grid gap-10 py-16 lg:grid-cols-2">
        <Reveal>
          <div>
            <SectionHeading eyebrow="Our mission" title="Government that listens, responds, and delivers" />
            <p className="mt-4 text-muted-foreground">
              For too long, the relationship between citizens and government has been one-directional.
              Ashanti Connect changes that — every citizen can report, track, and participate, while
              every institution is measured on how it responds.
            </p>
            <p className="mt-4 text-muted-foreground">
              Home to Kumasi, the Garden City and seat of the Asante Kingdom, the Ashanti Region is
              one of Ghana&apos;s most populous and dynamic regions. This platform is built to serve
              all of it — and to become a blueprint for districts, ministries, and governments
              across Africa.
            </p>
            <Button asChild className="mt-6">
              <Link href="/departments">
                Explore our departments <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
        <Reveal index={1}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: compactNumber(totalPop) + "+", l: "Citizens in covered districts" },
              { v: "43", l: "Districts region-wide" },
              { v: "8", l: "Connected departments" },
              { v: "81%", l: "Issue resolution rate" },
            ].map((s) => (
              <Card key={s.l} className="p-6">
                <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="container">
          <SectionHeading align="center" eyebrow="Our values" title="The principles behind the platform" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} index={i % 3}>
                <Card className="h-full p-6">
                  <v.icon className="h-7 w-7 text-gold-600" />
                  <h3 className="mt-3 font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <SectionHeading eyebrow="Districts" title="Connected across the region" description="A snapshot of districts already live on Ashanti Connect." />
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-card/40 backdrop-blur-md shadow-glass">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-widest text-muted-foreground border-b border-white/[0.06]">
              <tr>
                <th className="px-5 py-4 font-bold">District</th>
                <th className="px-5 py-4 font-bold">Capital</th>
                <th className="hidden px-5 py-4 font-bold sm:table-cell">Population</th>
                <th className="px-5 py-4 font-bold">Health Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {districts.map((d) => (
                <tr key={d.id} className="bg-transparent hover:bg-white/[0.02] transition-colors duration-200">
                  <td className="px-5 py-4 font-semibold text-foreground">{d.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{d.capital}</td>
                  <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">{formatNumber(d.population)}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-3">
                      <span className="font-bold text-primary font-display w-6">{d.healthScore}</span>
                      <span className="h-2 w-20 overflow-hidden rounded-full bg-secondary/80 border border-white/[0.04]">
                        <span className="block h-full rounded-full bg-gradient-to-r from-primary to-gold shimmer" style={{ width: `${d.healthScore}%` }} />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
