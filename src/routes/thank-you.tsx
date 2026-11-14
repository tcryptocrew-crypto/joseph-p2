import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Phone, ArrowLeft, ShieldCheck } from "lucide-react";
import logoDarkAsset from "@/assets/joseph-aziz-logo-dark.png";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You | Joseph Aziz Real Estate" },
      { name: "description", content: "Thank you for requesting your free Bergen County home evaluation." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  useEffect(() => {
    // Fire Meta Pixel Lead event once on thank-you page load
    if (typeof window !== "undefined") {
      const win = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof win.fbq === "function") {
        win.fbq("track", "Lead", {
          content_name: "Joseph Aziz Free Home Evaluation",
          content_category: "Real Estate Evaluation",
        });
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-foreground flex flex-col justify-between">
      {/* NAVBAR */}
      <header className="w-full border-b border-[#323644]/10 bg-[#FFFBF7]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" aria-label="Joseph Aziz Real Estate" className="flex items-center">
            <span
              role="img"
              aria-label="Joseph Aziz Real Estate"
              className="h-6 sm:h-7.5 brand-logo block bg-primary"
              style={{ maskImage: `url(${logoDarkAsset})` }}
            />
          </Link>

          <a
            href="tel:2013212604"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Phone className="size-3.5" />
            <span>(201) 321-2604</span>
          </a>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16 text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex size-16 sm:size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm animate-in zoom-in-50 duration-500">
          <CheckCircle2 className="size-9 sm:size-11" />
        </div>

        {/* Badge */}
        <div className="inline-block rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-xs mb-4">
          Request Successfully Received
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
          Thank You! Your Free Evaluation is in Motion.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Joseph Aziz has received your property details and is already preparing your personalized Bergen County net-proceeds and transition plan.
        </p>

        {/* Steps Card */}
        <div className="mt-10 rounded-2xl border border-border/80 bg-white p-6 sm:p-8 shadow-sm text-left">
          <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            What happens next?
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4 items-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Comprehensive Market Analysis</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  We evaluate recent neighborhood sales, current market demand, and realistic net proceeds for your property.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Direct Follow-up within 24 Hours</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Joseph will reach out via call or text to clarify any specific timing preferences or goals you have for your next home.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Zero-Pressure Walkthrough</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  You’ll get full numbers and next steps without any listing contracts or obligations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact & Return */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:2013212604"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 transition-all"
          >
            <Phone className="size-4" />
            <span>Call Joseph: (201) 321-2604</span>
          </a>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-input bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Joseph Aziz Real Estate. Prestige Property Group - All rights reserved.</p>
      </footer>
    </main>
  );
}
