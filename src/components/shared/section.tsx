import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-2.5 mb-4", align === "center" && "justify-center")}>
          {align !== "center" && (
            <span className="h-px w-6 bg-gradient-to-r from-primary to-transparent" aria-hidden="true" />
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl lg:text-4xl leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base lg:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

