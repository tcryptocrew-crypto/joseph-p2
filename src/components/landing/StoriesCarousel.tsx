import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import thumb1 from "@/assets/story-thumb-1.jpg";
import thumb2 from "@/assets/story-thumb-2.jpg";
import thumb3 from "@/assets/story-thumb-3.jpg";

interface Story {
  id: string;
  video: string;
  thumb: string;
  aspectRatio: string;
  modalMaxWidth: string;
}

const stories: Story[] = [
  {
    id: "1xfdqQBR0NwkXVi4GQ6TOnQ-20Iw7OWZl",
    video: "https://drive.google.com/file/d/1xfdqQBR0NwkXVi4GQ6TOnQ-20Iw7OWZl/preview",
    thumb: thumb1,
    aspectRatio: "3 / 4",
    modalMaxWidth: "max-w-2xl",
  },
  {
    id: "1KutRfXHznPrM-B1W29caQ7jNNToOSn7h",
    video: "https://drive.google.com/file/d/1KutRfXHznPrM-B1W29caQ7jNNToOSn7h/preview",
    thumb: thumb2,
    aspectRatio: "9 / 16",
    modalMaxWidth: "max-w-md",
  },
  {
    id: "1veii6vEZsMbOlbQ6vwnStxRJqfbBGmwr",
    video: "https://drive.google.com/file/d/1veii6vEZsMbOlbQ6vwnStxRJqfbBGmwr/preview",
    thumb: thumb3,
    aspectRatio: "9 / 16",
    modalMaxWidth: "max-w-md",
  },
];

// duplicated track so the centred video always has a neighbour on both sides
const track = [...stories, ...stories];

export function StoriesCarousel() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center" });
  const [sel, setSel] = useState(0);
  const [modalStoryIndex, setModalStoryIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Handle ESC key and arrows inside modal
  useEffect(() => {
    if (modalStoryIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalStoryIndex(null);
      } else if (e.key === "ArrowLeft") {
        setModalStoryIndex((prev) =>
          prev !== null ? (prev - 1 + stories.length) % stories.length : 0,
        );
      } else if (e.key === "ArrowRight") {
        setModalStoryIndex((prev) =>
          prev !== null ? (prev + 1) % stories.length : 0,
        );
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalStoryIndex]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  const active = sel % stories.length;

  const currentModalStory =
    modalStoryIndex !== null ? stories[modalStoryIndex] : null;

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

            return (
              <div
                key={i}
                className="min-w-0 shrink-0 basis-[70%] px-2 sm:basis-[34%] sm:px-3"
              >
                <div
                  onClick={() => setModalStoryIndex(i % stories.length)}
                  className={`group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-2xl bg-black transition-all duration-500 ${
                    isActive
                      ? "gold-frame scale-100 shadow-xl"
                      : "scale-[0.88] border border-border shadow-md"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Play video"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setModalStoryIndex(i % stories.length);
                    }
                  }}
                >
                  {/* Poster thumbnail image */}
                  <img
                    src={s.thumb}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark fade overlay - subtle on active, balanced dark fade on side cards */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive
                        ? "bg-black/10 group-hover:bg-black/0"
                        : "bg-black/45 group-hover:bg-black/30"
                    }`}
                  />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`flex items-center justify-center rounded-full border border-primary/70 shadow-[var(--glow-gold)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 ${
                        isActive
                          ? "h-11 w-11 sm:h-13 sm:w-13 bg-background/80 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                          : "h-9 w-9 sm:h-11 sm:w-11 bg-black/45 text-white/90 group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}
                    >
                      <Play className={`fill-current ${isActive ? "ml-0.5 sm:ml-1 h-5 w-5 sm:h-6 sm:w-6" : "ml-0.5 h-4 w-4 sm:h-5 sm:w-5"}`} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel Navigation */}
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
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
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

      {/* VIDEO POPUP MODAL - Plays video in TRUE Original Size & Aspect Ratio */}
      {modalStoryIndex !== null && currentModalStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalStoryIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative flex w-full flex-col items-center justify-center ${currentModalStory.modalMaxWidth}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button top-right */}
            <div className="mb-2 flex w-full justify-end">
              <button
                onClick={() => setModalStoryIndex(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground transition hover:border-primary hover:text-primary cursor-pointer shadow-lg"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Player in Original Size / Aspect Ratio with Full Player Controls */}
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-primary/60 bg-black shadow-[var(--glow-gold)]"
              style={{
                aspectRatio: currentModalStory.aspectRatio,
                maxHeight: "84vh",
              }}
            >
              <iframe
                src={`${currentModalStory.video}?autoplay=1`}
                title="Case Study Video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
