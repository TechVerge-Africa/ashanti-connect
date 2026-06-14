import { AppShell } from "@/components/layout/app-shell";
import { executiveNav } from "@/lib/navigation";

export default function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      nav={executiveNav}
      workspaceLabel="Executive"
      user={{ name: "Hon. Dr. Amoako Boafo", role: "Regional Minister" }}
    >
      {children}
    </AppShell>
  );
}
