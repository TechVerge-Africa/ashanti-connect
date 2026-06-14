import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/80 to-background" />
      <div className="absolute inset-0 -z-10 bg-kente-grid bg-[size:40px_40px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="container py-14 sm:py-16">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
