import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { publicNav, workspaces } from "@/lib/navigation";

const resources = [
  { label: "Report an Issue", href: "/portal/report" },
  { label: "Track a Report", href: "/portal/track" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Town Hall", href: "/portal/town-hall" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary-900 text-primary-50">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white/95 p-2 inline-block">
            <Logo />
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-100/80">
            The digital operating system of the Ashanti Region — connecting citizens and government
            for a more transparent, accountable, and responsive future.
          </p>
          <p className="mt-6 text-xs text-primary-100/60">
            Ashanti Regional Coordinating Council · Kumasi, Ghana
          </p>
        </div>

        <FooterCol title="Explore" links={publicNav.slice(0, 5)} />
        <FooterCol title="Services" links={resources} />
        <FooterCol title="Workspaces" links={workspaces.map((w) => ({ label: w.label, href: w.href }))} />
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-100/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Ashanti Connect. A civic technology initiative.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white">Privacy</Link>
            <Link href="/about" className="hover:text-white">Terms</Link>
            <Link href="/about" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-sm text-primary-100/75 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
