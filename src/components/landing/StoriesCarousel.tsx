import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stories = [
  {
    video: "https://drive.google.com/file/d/1xfdqQBR0NwkXVi4GQ6TOnQ-20Iw7OWZl/preview",
  },
  {
    video: "https://drive.google.com/file/d/1KutRfXHznPrM-B1W29caQ7jNNToOSn7h/preview",
  },
  {
    video: "https://drive.google.com/file/d/1veii6vEZsMbOlbQ6vwnStxRJqfbBGmwr/preview",
  },
];

// duplicated track so the centred video always has a neighbour on both sides
const track = [...stories, ...stories];

export function StoriesCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center" });
  const [sel, setSel] = useState(0);

  useEffect(() => {
    if (!api) return;
    const on = () => {
      setSel(api.selectedScrollSnap());
    };
    api.on("select", on);
    on();
    return () => {
      api.off("select", on);
    };
  }, [api]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  const active = sel % stories.length;

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* warm glow behind the centred video */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] h-[62%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />

      <div ref={ref} className="relative overflow-hidden px-4 py-2 sm:px-6">
        <div className="flex">
          {track.map((s, i) => (
            <div key={i} className="min-w-0 shrink-0 basis-[70%] px-2 sm:basis-[34%] sm:px-3">
              <div
                className={`group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl transition-all duration-500 ${
                  active === i % stories.length
                    ? "gold-frame scale-100 opacity-100"
                    : "scale-[0.85] border border-border opacity-40"
                }`}
              >
                <iframe
                  key={`${i}-${sel}`}
                  src={s.video}
                  title={`Case study ${(i % stories.length) + 1}`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        <button
          onClick={prev}
          aria-label="Previous story"
          className="rounded-full border border-border p-2 text-foreground transition hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {stories.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to story ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${active === i ? "w-6 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next story"
          className="rounded-full border border-border p-2 text-foreground transition hover:border-primary hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
