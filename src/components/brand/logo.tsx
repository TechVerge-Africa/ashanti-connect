import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="hsl(156 66% 18%)" />
      <path
        d="M24 9c4 5 4 9 0 14-4-5-4-9 0-14Z"
        fill="hsl(40 86% 52%)"
      />
      <path
        d="M24 39c-4-5-4-9 0-14 4 5 4 9 0 14Z"
        fill="hsl(40 86% 52%)"
        opacity="0.85"
      />
      <path
        d="M9 24c5-4 9-4 14 0-5 4-9 4-14 0Z"
        fill="hsl(150 44% 88%)"
      />
      <path
        d="M39 24c-5-4-9-4-14 0 5 4 9 4 14 0Z"
        fill="hsl(150 44% 88%)"
      />
      <circle cx="24" cy="24" r="3.4" fill="hsl(40 86% 52%)" />
    </svg>
  );
}

export function Logo({
  className,
  subtitle = true,
}: {
  className?: string;
  subtitle?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <div className="leading-none">
        <div className="font-display text-base font-bold tracking-tight text-foreground">
          Ashanti<span className="text-gold-600"> Connect</span>
        </div>
        {subtitle && (
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Digital Governance
          </div>
        )}
      </div>
    </div>
  );
}
