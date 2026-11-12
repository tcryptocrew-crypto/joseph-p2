import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Trophy, Layers, Home, Star, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LeadForm } from "@/components/landing/LeadForm";
import { StoriesCarousel } from "@/components/landing/StoriesCarousel";
import { StayOrMoveSection } from "@/components/landing/StayOrMoveSection";
import { HeroVideo } from "@/components/landing/HeroVideo";
import logoDarkAsset from "@/assets/joseph-aziz-logo-dark.png";
import logoLightAsset from "@/assets/joseph-aziz-logo-light.png";
import prestigeLogoLight from "@/assets/prestige-logo-light.png";
import josephAsset from "@/assets/joseph-aziz-keys.png";
import formHouse from "@/assets/form-house.jpg";

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
    scripts: [
      { src: "https://fast.wistia.com/player.js", async: true },
      ...["xmlj72mfsq", "26kunyl0qb", "s0jsdzilad", "s0cb5zf8yx"].map((id) => ({
        src: `https://fast.wistia.com/embed/${id}.js`,
        async: true,
        type: "module",
      })),
      { src: "https://link.msgsndr.com/js/form_embed.js", async: true },
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

function CTA() {
  return (
    <a href="#evaluation" className="evaluation-button">
      <span>Request My Free Home Evaluation</span> <ChevronRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function Logo({ compact, light }: { compact?: boolean; light?: boolean }) {
  if (!light) {
    return (
      <span
        role="img"
        aria-label="Joseph Aziz Real Estate"
        className={`${compact ? "h-8" : "mx-auto h-5 sm:h-7"} brand-logo block bg-primary`}
        style={{ maskImage: `url(${logoDarkAsset})` }}
      />
    );
  }

  return (
    <img
      src={light ? logoLightAsset : logoDarkAsset}
      alt="Joseph Aziz Real Estate"
      className={`${compact ? "h-8" : "mx-auto h-5 sm:h-7"} w-auto`}
    />
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="section-rule w-16 sm:w-28" />
      <span className="section-eyebrow text-sm font-semibold uppercase tracking-[0.25em]">{children}</span>
      <span className="section-rule w-16 sm:w-28" />
    </div>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden text-foreground">
      {/* HERO */}
      <section className="relative">
        <div className="relative mx-auto max-w-5xl px-5 pb-10 pt-4 text-center fade-up sm:pb-12 sm:pt-6">
          <Logo />
          <div className="mt-3 inline-block rounded-full border border-border bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm sm:mt-4 sm:text-sm shadow-xs">
            <span className="text-primary font-bold">FOR BERGEN COUNTY HOMEOWNERS</span>
          </div>
          <h1 className="hero-title mx-auto mt-3 max-w-4xl text-foreground sm:mt-4">
            Before You List Your Home, Know How You’ll Buy the{" "}
            <span className="hero-highlight headline-mark text-white shadow-md">Bigger, Better</span>{" "}
            <em className="hero-outcome text-primary">One.</em>
          </h1>
          <HeroVideo />
          <p className="landing-copy mx-auto mt-5 max-w-[46ch] text-lg text-foreground sm:mt-6 sm:max-w-3xl sm:text-xl font-normal leading-relaxed">
            Find out what you could keep after selling, what your next home would cost, and how the two transactions could work together.
          </p>
          <div className="mt-6 sm:mt-8">
            <CTA />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-5 pb-14">
        <p className="mx-auto mb-6 max-w-md text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary lg:hidden">
          Free Evaluation · No Obligation to List
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4 lg:items-stretch lg:gap-5 lg:py-4">
          <p className="hidden self-center border-l-2 border-primary pl-4 text-base font-semibold uppercase leading-snug tracking-wide lg:block">
            Free evaluation. No obligation to list.
          </p>
          {[
            { Icon: Trophy, value: "#28", label: "in New Jersey" },
            { Icon: Layers, value: "$600M+", label: "Total Sales", featured: true },
            { Icon: Home, value: "Built", label: "His Own Home" },
          ].map(({ Icon, value, label, featured }) => (
            <div key={label} className={featured ? "trust-stat trust-stat-featured" : "trust-stat"}>
              <span className="trust-stat-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></span>
              <div>
                <div className="trust-stat-value">{value}</div>
                <div className="trust-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full panel px-4 py-2 text-xs sm:text-lg">
          <span className="flex text-rating">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-6 sm:w-6" />)}</span>
          <span><b>5.0</b> on Zillow • 100+ team reviews</span>
        </div>
        <div className="mt-6 hidden text-center sm:block"><CTA /></div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative bg-transparent py-12 sm:py-16">
        <Eyebrow>Case Studies</Eyebrow>
        <h2 className="landing-section-title mt-3 mb-6 px-5 text-center text-4xl sm:mb-10 sm:text-[44px]">Real Homeowner Stories</h2>
        <StoriesCarousel />
      </section>

      {/* DECISION SECTION */}
      <StayOrMoveSection />

      {/* AGENT */}
      <section className="relative bg-transparent px-5 py-12 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="landing-section-title mx-auto max-w-3xl text-center text-[32px] leading-[1.15] sm:text-[48px]">
            The Agent Selling Your Home Should Also Understand the One{" "}
            <em className="text-primary">You’re Buying.</em>
          </h2>
          <div className="mt-8 grid items-center gap-8 sm:mt-14 sm:gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_70%)]" />
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-primary/40" />
              <img src={josephAsset} alt="Joseph Aziz handing house keys to new homeowners" loading="lazy" width={921} height={1024} className="relative aspect-[9/10] w-full rounded-2xl object-cover" />
            </div>
            <div className="landing-copy space-y-4 text-center text-[17px] leading-[1.75] text-foreground/90 sm:space-y-6 sm:text-lg md:border-l md:border-primary/40 md:pl-12 md:text-left">
              <p>I’m Joseph Aziz. I’ve built <span className="text-primary">my own custom home</span>, helped homeowners sell and buy new construction, and worked directly with builders to negotiate prices, finishes, and extras.</p>
              <p>I’m particular about the homes I show because <span className="text-primary">more square footage</span> does not automatically make a house a better fit.</p>
              <p className="text-muted-foreground">I research the layout, lot, and what you’re getting for the price. Then I help negotiate the purchase and coordinate it with your sale.</p>
              <p className="font-medium text-foreground">The goal is not just to sell your house. It is to get you into <span className="text-primary">a home worth moving for.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section relative px-5 py-12 sm:py-16">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="landing-section-title mt-3 text-center text-4xl sm:text-[44px]">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mx-auto mt-7 max-w-4xl space-y-3 sm:mt-10">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={`f${i}`} className="panel rounded-lg px-4 text-foreground transition-colors sm:px-6">
              <AccordionTrigger className="landing-copy min-h-11 gap-3 py-3 text-left font-sans text-lg font-semibold hover:no-underline sm:py-5">{q}</AccordionTrigger>
              <AccordionContent className="landing-copy pb-4 text-lg text-muted-foreground sm:pb-5">{a}</AccordionContent>
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
            alt="Modern white home at twilight"
            loading="lazy"
            width={1024}
            height={1024}
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

        <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-5 py-12 sm:gap-10 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:pl-[20%]">
          <div className="relative mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <div className="relative flex items-center justify-center gap-3 lg:justify-start">
              <span className="section-rule w-8 sm:w-14" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm">Free Evaluation</span>
              <span className="section-rule w-8 sm:w-14 lg:hidden" />
            </div>
            <h2 className="landing-section-title relative mt-5 text-[28px] leading-[1.2] text-balance sm:text-[38px] lg:text-[44px]">
              Before You List Your Home, Know How You’ll Buy the{" "}
              <span className="relative inline-block">
                <em className="text-primary">Bigger, Better One.</em>
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
      <footer className="relative border-t border-primary/20 bg-primary px-5 py-12 text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-base md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <img
              src={prestigeLogoLight}
              alt="Prestige Property Group Montclair"
              className="h-10 sm:h-12 w-auto object-contain"
              loading="lazy"
            />
            <img
              src={logoLightAsset}
              alt="Joseph Aziz Real Estate"
              className="h-5 sm:h-5.5 w-auto object-contain opacity-90"
              loading="lazy"
            />
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-1 h-5 w-5 text-accent shrink-0" />
            <span>151 Forest St, Unit H<br />Montclair, NJ 07042</span>
          </div>
          <a href="tel:9738607595" className="flex items-center gap-2 hover:text-white hover:underline transition-colors text-white">
            <Phone className="h-5 w-5 text-accent shrink-0" />
            973-860-7595
          </a>
          <div className="flex gap-2 text-sm text-secondary">
            <a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
            <span className="text-secondary/60">|</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
        <p className="mt-8 text-center text-sm italic text-secondary/85">
          Property values are estimates, not guarantees of a future sale price. Individual client outcomes vary.
        </p>
      </footer>
    </main>
  );
}
