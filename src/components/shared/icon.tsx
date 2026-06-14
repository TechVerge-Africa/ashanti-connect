import { icons, type LucideProps } from "lucide-react";
import { CircleDot } from "lucide-react";

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = icons[name as IconName] ?? CircleDot;
  return <LucideIcon {...props} />;
}
