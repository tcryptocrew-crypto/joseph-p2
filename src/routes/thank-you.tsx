import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Phone, ArrowLeft } from "lucide-react";
import logoDarkAsset from "@/assets/joseph-aziz-logo-dark.png";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Request Received | Joseph Aziz Real Estate" },
      { name: "description", content: "Your next move starts here. Joseph's team will contact you to arrange your free home evaluation." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  useEffect(() => {
    // Fire Meta Pixel Lead event once on thank-you page load if not already tracked
    if (typeof window !== "undefined") {
      try {
        const alreadyTracked = sessionStorage.getItem("meta_lead_tracked");
        if (!alreadyTracked) {
          sessionStorage.setItem("meta_lead_tracked", "true");
          const win = window as unknown as { fbq?: (...args: unknown[]) => void };
          if (typeof win.fbq === "function") {
            win.fbq("track", "Lead", {
              content_name: "Joseph Aziz Free Home Evaluation",
              content_category: "Real Estate Evaluation",
            });
          }
        }
      } catch {
        const win = window as unknown as { fbq?: (...args: unknown[]) => void };
        if (typeof win.fbq === "function") {
          win.fbq("track", "Lead", {
            content_name: "Joseph Aziz Free Home Evaluation",
            content_category: "Real Estate Evaluation",
          });
        }
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFBF7] text-foreground flex flex-col justify-between selection:bg-primary/10">
      {/* NAVBAR */}
      <header className="w-full border-b border-[#323644]/10 bg-[#FFFBF7]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:py-4">
          <Link to="/" aria-label="Joseph Aziz Real Estate" className="flex items-center gap-2">
            <span
              role="img"
              aria-label="Joseph Aziz Real Estate"
              className="h-6 sm:h-7.5 brand-logo block bg-primary"
              style={{ maskImage: `url(${logoDarkAsset})` }}
            />
          </Link>

          <a
            href="tel:9738607595"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Phone className="size-3.5" />
            <span>973-860-7595</span>
          </a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16 text-center">
        {/* REQUEST RECEIVED BADGE */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-xs mb-5">
          <Check className="size-3.5 stroke-[3]" />
          <span>REQUEST RECEIVED</span>
        </div>

        {/* HEADINGS */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
          Your next move starts here.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
          Joseph’s team will contact you to arrange your free home evaluation.
        </p>

        {/* WHAT WE'LL TALK THROUGH CARD */}
        <div className="mt-10 rounded-2xl border border-border/80 bg-white p-6 sm:p-8 shadow-xs text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-6">
            WHAT WE’LL TALK THROUGH
          </p>

          <div className="space-y-6">
            {/* ITEM 01 */}
            <div className="flex items-start gap-4">
              <span className="font-serif text-2xl font-bold text-primary/40 leading-none pt-0.5">
                01
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">
                  Your options.
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Whether renovating, adding space, or buying a different home makes the most sense for you.
                </p>
              </div>
            </div>

            <div className="border-t border-border/60" />

            {/* ITEM 02 */}
            <div className="flex items-start gap-4">
              <span className="font-serif text-2xl font-bold text-primary/40 leading-none pt-0.5">
                02
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">
                  Your numbers and next steps.
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  What your home could be worth, the costs to compare, and how the timing could work around your plans.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CALL JOSEPH DIRECTLY CALLOUT */}
        <div className="mt-8 rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 sm:p-7 text-center">
          <p className="text-sm sm:text-base font-medium text-foreground">
            Want to speak with Joseph directly?
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Call him now</p>

          <a
            href="tel:9738607595"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm sm:text-base font-bold text-white shadow-xs hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Phone className="size-4" />
            <span>973-860-7595</span>
          </a>

          <p className="mt-4 text-xs font-medium text-muted-foreground tracking-wide">
            Free valuation. No obligation to list.
          </p>
        </div>

        {/* BACK TO HOMEPAGE LINK */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground bg-white/50">
        <p>© {new Date().getFullYear()} Joseph Aziz Real Estate. Prestige Property Group — All rights reserved.</p>
      </footer>
    </main>
  );
}
