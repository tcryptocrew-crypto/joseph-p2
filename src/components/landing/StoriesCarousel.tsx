import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import s1 from "@/assets/story-1.jpg";
import s2 from "@/assets/story-2.jpg";
import s3 from "@/assets/story-3.jpg";

const stories = [
  { img: s1, alt: "Homeowner couple sharing their story" },
  { img: s2, alt: "Homeowner sharing her story" },
  { img: s3, alt: "Homeowner sharing his story" },
  { img: s1, alt: "Homeowner couple sharing their story" },
];

// duplicated track so the centred video always has a neighbour on both sides
const track = [...stories, ...stories];

export function StoriesCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center" });
  const [sel, setSel] = useState(0);

  useEffect(() => {
    if (!api) return;
    const on = () => setSel(api.selectedScrollSnap());
    api.on("select", on);
    on();
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
              <button
                aria-label="Play homeowner story"
                className={`group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl transition-all duration-500 ${
                  active === i % stories.length ? "gold-frame scale-100 opacity-100" : "scale-[0.85] border border-border opacity-40"
                }`}
              >
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  width={608}
                  height={1088}
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-background/35" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background/60 text-primary backdrop-blur-sm transition group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
              </button>
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
