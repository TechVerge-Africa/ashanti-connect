import { CommunicationCenter } from "@/components/gov/communication-center";
import { reports } from "@/lib/data";

export default function CommunicationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Communication Center</h1>
        <p className="text-sm text-muted-foreground">
          Every issue is a conversation. Respond to citizens directly — history stays visible.
        </p>
      </div>
      <CommunicationCenter reports={reports} />
    </div>
  );
}
