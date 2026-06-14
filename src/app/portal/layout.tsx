import { AppShell } from "@/components/layout/app-shell";
import { citizenNav } from "@/lib/navigation";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      nav={citizenNav}
      workspaceLabel="Citizen Portal"
      user={{ name: "Akosua Frimpong", role: "Citizen · Kumasi" }}
    >
      {children}
    </AppShell>
  );
}
