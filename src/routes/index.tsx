import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Play, Trophy, Layers, Home, Star, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LeadForm } from "@/components/landing/LeadForm";
import { StoriesCarousel } from "@/components/landing/StoriesCarousel";
import { StayOrMoveSection } from "@/components/landing/StayOrMoveSection";
import vsl from "@/assets/vsl-stock.jpg";
import logoDarkAsset from "@/assets/joseph-aziz-logo-dark.png";
import logoLightAsset from "@/assets/joseph-aziz-logo-light.png";
import josephAsset from "@/assets/joseph-aziz-keys.png";
import formHouse from "@/assets/form-house-stock.jpg";

const TITLE = "Sell & Buy Evaluation | Joseph Aziz Real Estate, Bergen County";
const DESC =
  "Find out what you could keep after selling, what your next home would cost, and how the two transactions could work together. Joseph Aziz helps you plan both.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const faqs = [
  [
    "Can I buy my next home before selling this one?",
    "Possibly. It depends on your financing, whether you need the sale proceeds to close, and the terms available on the next purchase. Joseph’s goal is to help secure the right home before listing yours, but the sequence needs to work for your situation.",
  ],
  [
    "What if the two closing dates do not line up?",
    "We need to account for the gap, including where you would stay and when your sale funds become available. Joseph works with your lender and attorney to review the options before you commit. Matching closing dates cannot be guaranteed.",
  ],
  [
    "Do I need to know which home I want before we talk?",
    "No. Start with your current home and what the next one needs to offer. We can narrow down the towns, price range, and features before looking at specific properties.",
  ],
  [
    "Do you only help people move into new construction?",
    "No. We can compare existing homes and new construction based on your needs and budget. The priority is finding a home that gives you what you are moving for.",
  ],
];

function CTA({ small }: { small?: boolean }) {
  return (
    <a href="#evaluation" className={`btn-gold ${small ? "!py-3 !px-6 !text-base" : ""}`}>
      Request My Free Home Evaluation <ChevronRight className="h-5 w-5" />
    </a>
  );
}

function Logo({ compact, light }: { compact?: boolean; light?: boolean }) {
  return (
    <img
      src={light ? logoLightAsset : logoDarkAsset}
      alt="Joseph Aziz Real Estate"
      className={`${compact ? "h-10" : "mx-auto h-7 sm:h-8"} w-auto`}
    />
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="gold-divider w-16 sm:w-28" />
      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#26392B]">{children}</span>
      <span className="gold-divider w-16 sm:w-28" />
    </div>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden text-foreground">
      {/* Top-Left Luxury Gold Satin Ribbon */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-0 h-44 w-44 sm:h-64 sm:w-64 opacity-80"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 180 C40 160 140 90 200 -40 L160 -40 C110 70 30 130 -50 150 Z"
          fill="url(#goldSilk1)"
        />
        <path
          d="M-50 140 C50 120 160 50 230 -40 L270 -40 C190 70 60 150 -50 180 Z"
          fill="url(#goldSilk2)"
          opacity="0.75"
        />
        <defs>
          <linearGradient id="goldSilk1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C59B4B" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F5DFAB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9C722B" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="goldSilk2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9C722B" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#FFF2D1" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B38638" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom-Right Luxury Gold Satin Ribbon */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-0 z-0 h-44 w-44 sm:h-64 sm:w-64 opacity-80"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M350 120 C260 140 160 210 100 340 L140 340 C190 230 270 170 350 150 Z"
          fill="url(#goldSilkBottom1)"
        />
        <path
          d="M350 160 C250 180 140 250 70 340 L30 340 C110 230 240 150 350 120 Z"
          fill="url(#goldSilkBottom2)"
          opacity="0.75"
        />
        <defs>
          <linearGradient id="goldSilkBottom1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C59B4B" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F5DFAB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9C722B" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="goldSilkBottom2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9C722B" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#FFF2D1" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B38638" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10">
      {/* HERO */}
      <section className="relative bg-transparent">
        <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-6 text-center fade-up">
          <Logo />
          <div className="mt-4 inline-block rounded-full border border-primary/60 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm sm:text-sm shadow-xs">
            <span className="text-[#7C132B] font-bold">FOR BERGEN COUNTY HOMEOWNERS</span>{" "}
            <span className="text-[#3D3335] font-medium">WHO NEED TO SELL TO BUY THEIR NEXT HOME</span>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.2] sm:text-5xl lg:text-[64px] lg:leading-[1.18] text-[#460711]">
            Before You List Your Home, Know How You’ll Buy the{" "}
            <span className="relative inline-block whitespace-nowrap px-[0.34em] py-[0.1em] align-baseline text-[0.98em] leading-none rounded-2xl bg-gradient-to-r from-[#7C132B] via-[#5C0A1A] to-[#3B0510] text-white shadow-md border border-[#941A35]/50">
              <span className="relative font-serif italic font-normal text-white">Bigger, Better</span>
            </span>{" "}
            <span className="relative inline-block whitespace-nowrap">
              <em className="gold-text not-italic font-serif">One.</em>
              <svg
                aria-hidden="true"
                className="absolute -bottom-2.5 left-0 w-full overflow-visible"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3C25 10 65 10 98 2"
                  stroke="url(#goldSwoosh)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="goldSwoosh" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C59B4B" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#E5C27C" stopOpacity="1" />
                    <stop offset="100%" stopColor="#996F28" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <button aria-label="Watch the video" className="group gold-frame relative mx-auto mt-8 block aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <img src={vsl} alt="Modern luxury architectural home" loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-black/35" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-black/55 text-primary shadow-[var(--glow-gold)] transition group-hover:scale-110">
                <Play className="ml-1 h-9 w-9 fill-current" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">Watch the video</span>
            </span>
          </button>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-[#3D3335] sm:text-xl font-normal leading-relaxed">
            Find out what you could keep after selling, what your next home would cost, and how the two transactions could work together.
          </p>
          <div className="mt-8 [&>a]:!px-6 [&>a]:!py-3.5 [&>a]:!text-base sm:[&>a]:!px-9 sm:[&>a]:!py-4 sm:[&>a]:!text-lg [&>a>svg]:h-5 [&>a>svg]:w-5">
            <CTA />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-transparent px-5 pb-14">
        <p className="mx-auto mb-6 max-w-md text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary lg:hidden">
          Free Evaluation · No Obligation to List
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-8 lg:border-y lg:border-border/40 lg:py-8 lg:divide-x lg:divide-border/40">
          <p className="hidden border-l-2 border-primary pl-4 text-base font-semibold uppercase leading-snug tracking-wide lg:block">
            Free evaluation. No obligation to list.
          </p>
          {[
            [Trophy, "#28", "in New Jersey"],
            [Layers, "$400M+", "Total Sales"],
            [Home, "Built", "His Own Home"],
          ].map(([Icon, a, b]) => {
            const I = Icon as typeof Trophy;
            return (
              <div key={a as string} className="gold-frame flex flex-col items-center gap-1.5 rounded-xl panel px-2 py-4 text-center lg:flex-row lg:justify-center lg:gap-4 lg:rounded-none lg:bg-transparent lg:p-0 lg:text-left lg:[border:none] lg:shadow-none">
                <I className="h-6 w-6 text-primary lg:h-10 lg:w-10" strokeWidth={1.4} />
                <div>
                  <div className="font-serif text-xl font-semibold leading-none text-primary lg:font-sans lg:text-xl lg:text-foreground">{a as string}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground lg:text-base lg:normal-case lg:tracking-normal lg:text-foreground">{b as string}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-border/40 panel px-4 py-2 text-xs sm:text-lg">
          <span className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-6 sm:w-6" />)}</span>
          <span><b>5.0</b> on Zillow • 100+ team reviews</span>
        </div>
        <div className="mt-6 hidden text-center sm:block"><CTA small /></div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-transparent py-16">
        <Eyebrow>Case Studies</Eyebrow>
        <h2 className="mt-3 mb-10 text-center text-4xl sm:text-[44px]">Real Homeowner Stories</h2>
        <StoriesCarousel />
      </section>

      {/* DECISION SECTION */}
      <StayOrMoveSection />

      {/* AGENT */}
      <section className="bg-transparent px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center text-[32px] leading-[1.15] sm:text-[48px]">
            The Agent Selling Your Home Should Also Understand the One{" "}
            <em className="gold-text">You’re Buying.</em>
          </h2>
          <div className="mt-14 grid items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_70%)]" />
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-primary/40" />
              <img src={josephAsset} alt="Joseph Aziz handing house keys to new homeowners" loading="lazy" width={315} height={350} className="relative aspect-[9/10] w-full rounded-2xl object-cover" />
            </div>
            <div className="space-y-6 text-center text-[17px] leading-[1.75] text-foreground/90 sm:text-lg md:border-l md:border-primary/40 md:pl-12 md:text-left">
              <p>I’m Joseph Aziz. I’ve built <span className="text-primary">my own custom home</span>, helped homeowners sell and buy new construction, and worked directly with builders to negotiate prices, finishes, and extras.</p>
              <p>I’m particular about the homes I show because <span className="text-primary">more square footage</span> does not automatically make a house a better fit.</p>
              <p className="text-muted-foreground">I research the layout, lot, and what you’re getting for the price. Then I help negotiate the purchase and coordinate it with your sale.</p>
              <p className="font-medium text-foreground">The goal is not just to sell your house. It is to get you into <span className="text-primary">a home worth moving for.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-transparent px-5 py-16">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="mt-3 text-center text-4xl sm:text-[44px]">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mx-auto mt-10 max-w-4xl space-y-3">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={`f${i}`} className="panel rounded-lg border border-border/40 px-6 transition hover:border-primary/70">
              <AccordionTrigger className="py-5 text-left font-sans text-lg font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-lg text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FORM */}
      <section id="evaluation" className="relative scroll-mt-4 bg-transparent overflow-hidden">
        {/* Ambient image with smooth multi-directional fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden lg:block">
          <img
            src={formHouse}
            alt="Luxury modern custom home at dusk"
            loading="lazy"
            width={1200}
            height={1800}
            className="h-full w-full object-cover object-center opacity-65"
          />
          {/* Smooth Right Fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--background) 50%, transparent) 35%, var(--background) 85%)",
            }}
          />
          {/* Smooth Top & Bottom Fades to melt into pure black background */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Subtle Left Edge Fade */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/50 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:pl-[20%]">
          <div className="relative mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <div className="relative flex items-center justify-center gap-3 lg:justify-start">
              <span className="gold-divider w-8 sm:w-14" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">Free Evaluation</span>
              <span className="gold-divider w-8 sm:w-14 lg:hidden" />
            </div>
            <h2 className="relative mt-5 text-[28px] leading-[1.2] text-balance sm:text-[38px] lg:text-[44px]">
              Before You List Your Home, Know How You’ll Buy the{" "}
              <span className="relative inline-block">
                <em className="gold-text">Bigger, Better One.</em>
                <svg viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-1 left-0 h-3 w-full text-primary/80">
                  <path d="M3 9C38 3 74 12 112 6S186 3 217 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-primary/30 bg-[#1B291F] px-5 py-12 text-[#FAF7F2] border-t border-[#26392B]/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-base md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Logo compact light />
            <span className="text-xs text-[#CBD5CC]/70">Prestige Property Group Montclair</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-1 h-5 w-5 text-primary shrink-0" />
            <span>151 Forest St, Unit H<br />Montclair, NJ 07042</span>
          </div>
          <a href="tel:2017085067" className="flex items-center gap-2 hover:text-primary transition-colors text-white">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            201-708-5067
          </a>
          <div className="flex gap-2 text-sm text-[#CBD5CC]/80">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-primary/40">|</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
        <p className="mt-8 text-center text-sm italic text-[#CBD5CC]/60">
          Property values are estimates, not guarantees of a future sale price. Individual client outcomes vary.
        </p>
      </footer>
      </div>
    </main>
  );
}
