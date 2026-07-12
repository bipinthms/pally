import * as React from "react";
import {
  Church,
  HeartHandshake,
  Sparkles,
  Cross,
  Flame,
  Users,
  Heart,
  Shield,
  Sprout,
  Music,
  BookOpen,
  Landmark,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Church,
  HeartHandshake,
  Sparkles,
  Cross,
  Flame,
  Users,
  Heart,
  Shield,
  Sprout,
  Music,
  BookOpen,
  Landmark,
};

/** Render a lucide icon by its string name (used with data-driven content). */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
