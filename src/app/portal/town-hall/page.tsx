import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TownHall } from "@/components/townhall/town-hall";
import { townHallTopics } from "@/lib/data";

export default function TownHallPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Digital Town Hall</h1>
          <p className="text-sm text-muted-foreground">
            Ask questions, vote on what matters, and join live sessions with leadership.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Start a topic
        </Button>
      </div>
      <div className="mx-auto max-w-3xl">
        <TownHall topics={townHallTopics} />
      </div>
    </div>
  );
}
