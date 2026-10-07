import { ParishMark } from "@/components/brand";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <span className="relative flex size-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/20 [animation-duration:1.8s]" />
        <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 text-gold-300 shadow-lg ring-1 ring-gold-500/30">
          <ParishMark className="size-10 animate-pulse" />
        </span>
      </span>
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-muted-foreground">
        St. Mary's Church, Alencherry
      </p>
    </div>
  );
}
