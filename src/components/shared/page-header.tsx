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
    <section className={cn("relative overflow-hidden border-b border-border bg-background", className)}>
      {/* Premium dark depth scene */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/[0.08] via-background to-background" aria-hidden="true" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px] -z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold/5 blur-[80px] -z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 kente-texture opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" aria-hidden="true" />
      
      <div className="container py-14 sm:py-16">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary shadow-glow-sm">
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
