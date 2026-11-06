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

  return (
    <div className="relative mx-auto max-w-6xl px-12 sm:px-16">
      <div ref={ref} className="overflow-hidden">
        <div className="flex">
          {stories.map((s, i) => (
            <div key={i} className="min-w-0 shrink-0 basis-[85%] px-3 sm:basis-1/2 lg:basis-[38%]">
              <button
                aria-label="Play homeowner story"
                className={`group relative block aspect-video w-full overflow-hidden rounded-lg transition-all duration-500 ${
                  sel === i ? "gold-frame scale-100 opacity-100" : "scale-90 border border-border opacity-60"
                }`}
              >
                <img src={s.img} alt={s.alt} loading="lazy" width={1088} height={608} className="h-full w-full object-cover" />
                <span className="absolute inset-0 bg-background/25" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background/60 text-primary transition group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={prev} aria-label="Previous story" className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-border p-2.5 text-foreground transition hover:border-primary hover:text-primary">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} aria-label="Next story" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-border p-2.5 text-foreground transition hover:border-primary hover:text-primary">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="mt-6 flex justify-center gap-2">
        {stories.map((_, i) => (
          <button key={i} aria-label={`Go to story ${i + 1}`} onClick={() => api?.scrollTo(i)} className={`h-2 rounded-full transition-all ${sel === i ? "w-6 bg-primary" : "w-2 bg-border"}`} />
        ))}
      </div>
    </div>
  );
}
