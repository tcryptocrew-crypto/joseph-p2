import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

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

function Skeleton() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary/80">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-background/40">
        <Play className="ml-0.5 h-6 w-6 text-primary/70 fill-current" />
      </div>
      <div className="h-2 w-24 animate-pulse rounded-full bg-border/60" />
    </div>
  );
}

export function StoriesCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center" });
  const [sel, setSel] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [loadedFrames, setLoadedFrames] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  // Only start loading iframes when section scrolls into view
  useEffect(() => {
    if (!sectionRef.current || !window.IntersectionObserver) {
      setSectionVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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

  // Determine which slides should have their iframe mounted
  // Only the active slide and its immediate neighbours
  const shouldMount = (slideIndex: number) => {
    if (!sectionVisible) return false;
    const storyIdx = slideIndex % stories.length;
    const prevIdx = (active - 1 + stories.length) % stories.length;
    const nextIdx = (active + 1) % stories.length;
    return storyIdx === active || storyIdx === prevIdx || storyIdx === nextIdx;
  };

  const onIframeLoad = (slideIndex: number) => {
    setLoadedFrames((prev) => new Set(prev).add(slideIndex % stories.length));
  };

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-5xl">
      {/* warm glow behind the centred video */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] h-[62%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />

      <div ref={ref} className="relative overflow-hidden px-4 py-2 sm:px-6">
        <div className="flex">
          {track.map((s, i) => {
            const isActive = active === i % stories.length;
            const mount = shouldMount(i);
            const loaded = loadedFrames.has(i % stories.length);

            return (
              <div key={i} className="min-w-0 shrink-0 basis-[70%] px-2 sm:basis-[34%] sm:px-3">
                <div
                  className={`group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl transition-all duration-500 ${
                    isActive
                      ? "gold-frame scale-100 opacity-100"
                      : "scale-[0.85] border border-border opacity-40"
                  }`}
                >
                  {mount ? (
                    <>
                      {!loaded && <Skeleton />}
                      <iframe
                        src={s.video}
                        title={`Case study ${(i % stories.length) + 1}`}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        loading="lazy"
                        onLoad={() => onIframeLoad(i)}
                        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                      />
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </div>
              </div>
            );
          })}
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
