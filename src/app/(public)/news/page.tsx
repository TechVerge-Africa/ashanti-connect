import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, Radio, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { news, events } from "@/lib/data";
import { formatDate, relativeTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Latest news, announcements, and upcoming events from across the Ashanti Region.",
};

const eventTypeLabels: Record<string, string> = {
  town_hall: "Town Hall",
  launch: "Launch",
  consultation: "Consultation",
  deadline: "Deadline",
};

const gradients = [
  "from-primary-500 to-primary-700",
  "from-gold-500 to-gold-700",
  "from-primary-700 to-primary-900",
  "from-emerald-500 to-teal-700",
];

export default function NewsPage() {
  const [featured, ...rest] = news;
  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="What's happening across the region"
        description="Stay informed with the latest announcements, progress updates, and opportunities to participate."
      />

      <section className="container grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <Reveal>
            <Card className="overflow-hidden p-0">
              <div className={`flex h-44 items-end bg-gradient-to-br ${gradients[0]} p-6`}>
                <Badge variant="gold" className="bg-white/90">{featured.category}</Badge>
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold tracking-tight">{featured.title}</h2>
                <p className="mt-2 text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{featured.author}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featured.readMins} min read
                  </span>
                  <span>{formatDate(featured.publishedAt)}</span>
                </div>
              </div>
            </Card>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {rest.map((a, i) => (
              <Reveal key={a.id} index={i % 2}>
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div className={`h-24 bg-gradient-to-br ${gradients[(i + 1) % gradients.length]}`} />
                  <div className="flex flex-1 flex-col p-5">
                    <Badge variant="secondary" className="w-fit">{a.category}</Badge>
                    <h3 className="mt-2 font-display text-base font-semibold leading-snug">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{relativeTime(a.publishedAt)}</span>
                      <span>{a.readMins} min</span>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <aside>
          <div className="sticky top-20">
            <h3 className="font-display text-lg font-semibold">Upcoming events</h3>
            <div className="mt-4 space-y-3">
              {events.map((e) => (
                <Card key={e.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={e.isLive ? "destructive" : "outline"}>
                      {e.isLive && <Radio className="h-3 w-3" />} {eventTypeLabels[e.type]}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" /> {formatDate(e.date, { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h4 className="mt-2 text-sm font-semibold">{e.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{e.location}</p>
                </Card>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/portal/town-hall">
                Join the Town Hall <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
