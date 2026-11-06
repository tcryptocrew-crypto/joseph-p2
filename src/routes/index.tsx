import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Play, Trophy, Layers, Home, Star, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LeadForm } from "@/components/landing/LeadForm";
import { StoriesCarousel } from "@/components/landing/StoriesCarousel";
import hero from "@/assets/hero-mansion.jpg";
import vsl from "@/assets/vsl-interior.jpg";
import logoAsset from "@/assets/joseph-aziz-logo-light.png.asset.json";
import josephAsset from "@/assets/joseph-aziz-keys.png.asset.json";
import formHouse from "@/assets/form-house.jpg";

const TITLE = "Stay-or-Move Evaluation | Joseph Aziz Real Estate, Bergen County";
const DESC =
  "Before you spend $250,000 on an addition, compare what your home could sell for, be worth after the work, and what you could buy instead. Free home evaluation.";

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
  ["We love our location. What if staying makes more sense?", "Then that belongs in the comparison. We will look at what you want to change, whether the proposed work addresses it, and how the numbers compare with moving."],
  ["We already have an architect or construction estimate.", "Bring the plans and estimates you have. Joseph can evaluate the real-estate side of the decision while your architect and construction professionals address design, feasibility, and project costs."],
  ["We do not have plans or estimates yet.", "Start with the home you own and what is no longer working. We can discuss the alternatives and identify what information is still needed before making a meaningful cost comparison."],
  ["Is this an instant online valuation?", "No. The form starts a conversation with Joseph’s team. The evaluation considers your specific home and the changes you are considering, rather than returning an automated number."],
];

function CTA({ small }: { small?: boolean }) {
  return (
    <a href="#evaluation" className={`btn-gold ${small ? "!py-3 !px-6 !text-base" : ""}`}>
      Request My Free Home Evaluation <ChevronRight className="h-5 w-5" />
    </a>
  );
}

function Logo({ compact }: { compact?: boolean }) {
  return (
    <img
      src={logoAsset.url}
      alt="Joseph Aziz Real Estate"
      className={`${compact ? "h-10" : "mx-auto h-10 sm:h-12"} w-auto`}
    />
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="gold-divider w-16 sm:w-28" />
      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{children}</span>
      <span className="gold-divider w-16 sm:w-28" />
    </div>
  );
}

function Index() {
  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      {/* HERO */}
      <section className="relative">
        <img src={hero} alt="Luxury Bergen County home at dusk" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-left" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--background)_55%,transparent),var(--background)_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        <div className="relative mx-auto max-w-5xl px-5 pb-12 pt-10 text-center fade-up">
          <Logo />
          <div className="mt-8 inline-block rounded-full border border-primary/70 bg-background/50 px-5 py-2 text-xs font-semibold uppercase tracking-wider sm:text-sm">
            For Bergen County homeowners considering an addition, <span className="text-primary">renovation, or rebuild</span>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-[64px]">
            Before You Spend{" "}
            <span className="rounded-md px-2 text-primary-foreground" style={{ background: "var(--gradient-gold)" }}>$250,000</span>{" "}
            on an Addition, Find Out What It Would Take to Move Into{" "}
            <em className="gold-text">the Home You Actually Want.</em>
          </h1>
          <button aria-label="Watch the video" className="group gold-frame relative mx-auto mt-8 block aspect-video w-full max-w-3xl overflow-hidden rounded-xl">
            <img src={vsl} alt="Luxury kitchen interior" loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-background/35" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background/60 text-primary shadow-[var(--glow-gold)] transition group-hover:scale-110">
                <Play className="ml-1 h-9 w-9 fill-current" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.25em]">Watch the video</span>
            </span>
          </button>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/90 sm:text-xl">
            Joseph Aziz’s Stay-or-Move Evaluation compares what your home could sell for today, what it could be worth after the work, and what you could buy instead, including the costs of selling and moving.
          </p>
          <div className="mt-8 [&>a]:!px-5 [&>a]:!py-3 [&>a]:!text-sm sm:[&>a]:!px-8 sm:[&>a]:!py-4 sm:[&>a]:!text-lg [&>a>svg]:h-4 [&>a>svg]:w-4"><CTA /></div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-5 pb-14">
        <p className="mx-auto mb-6 max-w-md text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary lg:hidden">
          Free evaluation · No obligation to sell
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-8 lg:border-y lg:border-border/60 lg:py-8 lg:divide-x lg:divide-border/60">
          <p className="hidden border-l-2 border-primary pl-4 text-base font-semibold uppercase leading-snug tracking-wide lg:block">
            Start with a free home evaluation. You do not have to decide to sell.
          </p>
          {[
            [Trophy, "#28", "in New Jersey"],
            [Layers, "$400M+", "Total Sales"],
            [Home, "Built", "His Own Home"],
          ].map(([Icon, a, b]) => {
            const I = Icon as typeof Trophy;
            return (
              <div key={a as string} className="gold-frame flex flex-col items-center gap-1.5 rounded-xl bg-secondary/60 px-2 py-4 text-center lg:flex-row lg:justify-center lg:gap-4 lg:rounded-none lg:bg-transparent lg:p-0 lg:text-left lg:[border:none] lg:shadow-none">
                <I className="h-6 w-6 text-primary lg:h-10 lg:w-10" strokeWidth={1.4} />
                <div>
                  <div className="font-serif text-xl font-semibold leading-none text-primary lg:font-sans lg:text-xl lg:text-foreground">{a as string}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground lg:text-base lg:normal-case lg:tracking-normal lg:text-foreground">{b as string}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-2 text-xs sm:text-lg">
          <span className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-6 sm:w-6" />)}</span>
          <span><b>5.0</b> on Zillow · 100+ reviews</span>
        </div>
        <div className="mt-6 hidden text-center sm:block"><CTA small /></div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-secondary py-16">
        <Eyebrow>Case Studies</Eyebrow>
        <h2 className="mt-3 mb-10 text-center text-4xl sm:text-[44px]">Real Homeowner Stories</h2>
        <StoriesCarousel />
      </section>

      {/* WRONG HOUSE */}
      <section className="bg-section px-5 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl sm:text-[46px]">A Bigger Version of Your House May Still Be the Wrong House.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Another bedroom could solve the space problem. But what about the layout, the location, or the things you would still want to change?
          </p>
          <p className="mt-8 font-serif text-2xl italic text-primary">Before committing to construction, ask yourself:</p>
          <div className="gold-frame mx-auto mt-5 flex max-w-3xl items-center justify-center gap-4 rounded-lg bg-background/40 px-6 py-5">
            <Home className="hidden h-8 w-8 shrink-0 text-primary sm:block" />
            <p className="font-serif text-2xl italic text-accent sm:text-[28px]">When the work is finished, will this be the home I want to stay in?</p>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-lg">If you love your location and an addition gives you what you need, staying deserves a serious look.</p>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">But before you commit, you should also know what your current home could help you buy.</p>
          <p className="mt-6 font-serif text-2xl italic text-primary">Compare both paths before you start paying for one.</p>
        </div>
      </section>

      {/* AGENT */}
      <section className="border-y border-border/50 bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[2fr_3fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_25%,transparent),transparent_70%)]" />
            <img src={josephAsset.url} alt="Joseph Aziz handing house keys to new homeowners" loading="lazy" width={315} height={350} className="relative rounded-lg border border-border object-cover" />
          </div>
          <div className="md:border-l md:border-primary/60 md:pl-10">
            <h2 className="text-3xl sm:text-[42px]">Work With an Agent Who Has Made Construction Decisions With His Own Money.</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg text-foreground/90">
              <p>I’m Joseph Aziz. I’ve built my own custom home, helped homeowners sell and move into new construction, and worked directly with builders to negotiate purchase prices, finishes, and extras.</p>
              <p>That experience matters when you’re deciding whether to put more money into the house you own or buy something else.</p>
              <p className="text-muted-foreground">We need to consider more than an attractive floor plan or a listing price. We need to look at what the work would accomplish, what the finished property could be worth, and what else you could buy.</p>
              <p>If moving is the better fit, I can also help you negotiate the next purchase and coordinate it with the sale of your current home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary px-5 py-16">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="mt-3 text-center text-4xl sm:text-[44px]">You Do Not Need to Decide to Sell Before We Talk.</h2>
        <Accordion type="single" collapsible className="mx-auto mt-10 max-w-4xl space-y-3">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={`f${i}`} className="panel rounded-lg border px-6 transition hover:border-primary/70">
              <AccordionTrigger className="py-5 text-left font-sans text-lg font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-lg text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FORM */}
      <section id="evaluation" className="relative scroll-mt-4">
        <img src={formHouse} alt="Stone home at night" loading="lazy" width={1024} height={1024} className="absolute inset-y-0 left-0 hidden h-full w-1/3 object-cover lg:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-background/90 to-background lg:block" style={{ backgroundImage: "linear-gradient(90deg, transparent 0%, var(--background) 38%)" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[2fr_3fr] lg:pl-[20%]">
          <div>
            <h2 className="text-4xl sm:text-[44px]">Before You Commit to Construction, Know What Your Other Option Looks Like.</h2>
            <p className="mt-5 text-lg text-foreground/90">Start with a free home evaluation. Tell us what you own and what you want to change, and Joseph’s team will contact you to arrange a conversation.</p>
            <p className="mt-6 flex items-center gap-2 font-serif text-xl italic text-primary">
              <CheckCircle2 className="h-5 w-5" /> You do not need finished plans or a decision to sell.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-background px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-base md:flex-row">
          <Logo compact />
          <div className="flex items-start gap-2"><MapPin className="mt-1 h-5 w-5 text-primary" /><span>151 Forest St, Unit H<br />Montclair, NJ 07042</span></div>
          <a href="tel:2017085067" className="flex items-center gap-2 hover:text-primary"><Phone className="h-5 w-5 text-primary" />201-708-5067</a>
          <div className="flex gap-2"><a href="#" className="hover:text-primary">Privacy Policy</a><span className="text-border">|</span><span>Equal Housing Opportunity</span></div>
        </div>
        <p className="mt-8 text-center text-sm italic text-muted-foreground">Property values are estimates, not guarantees of a future sale price. Individual client outcomes vary.</p>
      </footer>
    </main>
  );
}
