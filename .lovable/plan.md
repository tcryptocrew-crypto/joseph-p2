# Joseph Aziz Real Estate — Luxury Landing Page

Recreate the uploaded mockup as a single, fully responsive landing page at `/`, using the PDF copy verbatim and the master prompt's design system.

## Sections (in mockup order)
1. Logo header (house mark, "Joseph Aziz Real Estate", "Prestige Property Group Montclair")
2. Hero over dusk-mansion image: gold pill eyebrow, headline with gold-highlighted "$250,000" and italic gold "the Home You Actually Want.", subcopy, glowing CTA
3. VSL video frame with gold border, glow and play button (placeholder until real video is supplied)
4. Trust bar: "Start with a free home evaluation…", Ranked #28 in NJ, $400M+ in Total Sales, Built His Own Custom Home, 5.0 Zillow stars, second CTA
5. Case studies carousel ("Real Homeowner Stories") with arrows and dots, video thumbnails
6. "A Bigger Version of Your House May Still Be the Wrong House." with framed gold question callout
7. Agent intro with Joseph's portrait and copy
8. FAQ accordion ("You Do Not Need to Decide to Sell Before We Talk.") with all PDF questions
9. Final lead form: full name, email, phone, property address, optional "what is missing" note; reassurance line
10. Footer: address, phone, Privacy Policy, Equal Housing Opportunity, disclaimer

All CTAs smooth-scroll to the form.

## Design
- Colors exactly from brief (#080C0A background, #C5A36A gold, etc.), warm architectural gold glows, thin fading gold dividers
- DM Serif Display headings, Manrope body; large readable sizes for 50–60 audience
- Subtle fade-up on scroll, hover glows (300ms)

## Images
Generated photorealistic: dusk mansion hero, luxury interior for VSL poster, three homeowner testimonial thumbnails, Joseph portrait placeholder, stone house for form section. Real photos/videos of Joseph can replace these later.

## Form behavior
First version: validated form with a success message, submissions not yet saved. Next step (optional): store leads with Lovable Cloud and email notifications.

## Technical
- Rewrite `src/routes/index.tsx` with section components under `src/components/landing/`
- Tokens in `src/styles.css`, fonts via `<link>` in `__root.tsx`; page head() with real title/description
- shadcn Accordion; embla carousel; zod validation
