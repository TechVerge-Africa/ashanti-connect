import { AiChat } from "@/components/shared/ai-chat";

export default function PortalAssistantPage() {
  return (
    <div className="flex h-full flex-col space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask anything about services, reporting, or opportunities — in English or Twi.
        </p>
      </div>
      <AiChat className="h-[calc(100vh-220px)] min-h-[480px]" />
    </div>
  );
}
