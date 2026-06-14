import { AppShell } from "@/components/layout/app-shell";
import { govNav } from "@/lib/navigation";

export default function GovLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      nav={govNav}
      workspaceLabel="Government Ops"
      accent="gold"
      user={{ name: "Kwabena Mensah", role: "Officer · Roads & Highways" }}
    >
      {children}
    </AppShell>
  );
}
