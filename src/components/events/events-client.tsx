"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChurchEvent } from "@/lib/data";
import { EventCard } from "@/components/cards";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function EventsClient({ events }: { events: ChurchEvent[] }) {
  const { t } = useLocale();
  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(events.map((e) => e.category)))],
    [events],
  );
  const [active, setActive] = React.useState<string>("All");

  const filtered =
    active === "All" ? events : events.filter((e) => e.category === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active === c
                ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-gold-500 hover:text-primary",
            )}
          >
            {t.cats.events[c] ?? c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((e) => (
            <motion.div
              layout
              key={e.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <EventCard event={e} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
