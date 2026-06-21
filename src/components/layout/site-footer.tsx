import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { publicNav, workspaces } from "@/lib/navigation";
import {
  MapPin, Mail, ArrowUpRight,
  Share2, MessageCircle, Play, Globe,
} from "lucide-react";



const resources = [
  { label: "Report an Issue", href: "/portal/report" },
  { label: "Track a Report", href: "/portal/track" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Town Hall", href: "/portal/town-hall" },
];

const socials = [
  { label: "Facebook Page", href: "https://facebook.com", icon: Share2 },
  { label: "Twitter / X", href: "https://twitter.com", icon: MessageCircle },
  { label: "YouTube Channel", href: "https://youtube.com", icon: Play },
  { label: "Official Website", href: "https://ashanti.gov.gh", icon: Globe },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[hsl(160_40%_3%)]" aria-label="Site footer">
      {/* Kente texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 kente-texture opacity-100"
        aria-hidden="true"
      />

      {/* Top gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(162 72% 46% / 0.6) 30%, hsl(38 92% 50% / 0.6) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full opacity-30 ambient-orb-emerald"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full opacity-20 ambient-orb-gold"
        aria-hidden="true"
      />

      <div className="relative container">
        {/* Main grid */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo on dark */}
            <div className="inline-block rounded-xl bg-white/[0.06] p-2 border border-white/[0.08] backdrop-blur-sm">
              <Logo />
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-primary-100/70">
              The digital operating system of the Ashanti Region — connecting citizens
              and government for a more transparent, accountable, and responsive future.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm text-primary-100/60">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-primary/70 shrink-0" />
                <span>Ashanti Regional Coordinating Council, Kumasi, Ghana</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary/70 shrink-0" />
                <a href="mailto:connect@ashanti.gov.gh" className="hover:text-white transition-colors">
                  connect@ashanti.gov.gh
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-primary-100/50 transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary cursor-pointer"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <FooterCol title="Explore" links={publicNav.slice(0, 5)} />
          <FooterCol title="Services" links={resources} />
          <FooterCol title="Workspaces" links={workspaces.map((w) => ({ label: w.label, href: w.href }))} />

          {/* Live status column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white font-display">Platform Status</h4>
            <div className="space-y-3">
              {[
                { label: "Citizen Portal", status: "Operational" },
                { label: "AI Assistant", status: "Operational" },
                { label: "Gov Operations", status: "Operational" },
                { label: "Report System", status: "Operational" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-primary-100/60">{item.label}</span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Region badge */}
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-primary/60 mb-1">Region</div>
              <div className="text-sm font-semibold text-foreground font-display">Ashanti</div>
              <div className="text-xs text-primary-100/50">Greater Kumasi, Ghana 🇬🇭</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-5">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-primary-100/40 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Ashanti Connect · A civic technology initiative by the Ashanti Regional Coordinating Council
            </p>
            <div className="flex items-center gap-5">
              {[
                { label: "Privacy Policy", href: "/about" },
                { label: "Terms of Use", href: "/about" },
                { label: "Accessibility", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-white font-display">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1 text-sm text-primary-100/60 transition-colors duration-150 hover:text-white"
            >
              {l.label}
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-150 group-hover:opacity-60" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
