# Handoff: Perro Grooming Co. — Marketing Website

## Overview
A 6-page marketing website for **Perro Grooming Co.**, a mobile dog-grooming business in Chattanooga, TN. The groomer travels to customers' homes (indoors or backyard). Goals: showcase services + pricing, build trust (gallery, testimonials), show the service area on a map, and drive bookings via **Square Go** and click-to-call.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, **not production code to copy directly**. The task is to **recreate these designs in your target codebase's environment** (React, Next.js, Astro, plain HTML/CSS, etc.) using its established patterns. If no environment exists yet, a static-site or Next.js setup is a good fit — this is a content site with one interactive widget (the map).

Note: the `.dc.html` files use a proprietary template runtime (`<x-dc>`, `<helmet>`, `<x-import>`, `support.js`). Ignore that machinery — read them for **markup structure and inline styles**, which fully describe the design.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, shadows, copy, and interactions are final (subject to the placeholder caveats under Assets). Recreate pixel-perfectly.

## Design System — Botanica
All values come from the bundled Botanica token files (`_ds/tokens/*.css` in this bundle). Key tokens:

**Colors**
- Brand ramp: rose `#DB2265` · coral `#FF5969` · orange `#FF8840` · amber `#FFBB63` · gold `#FFDB99`
- Gradients (pairs of adjacent stops): `--gradient-rose-coral`, `--gradient-coral-orange`, `--gradient-orange-amber`, `--gradient-amber-gold`, `--gradient-sunset-full` (all 5 stops). **Usage rule from the client: gradients appear ONLY in the Home hero (background wash at 12% opacity + the arch behind the puppy photo) and as gallery-card placeholder backgrounds. Everything else uses solid colors.**
- Neutrals (warm, oklch-derived): `--surface-background` (warm cream), `--surface-card` (white-ish), `--surface-muted` (soft clay), `--text-foreground` `#2B1D1B`-ish, `--text-secondary`, `--text-muted`, `--border-default`, `--border-subtle`. Exact values in `_ds/tokens/colors.css`.

**Typography**
- Display headings: `--font-display` (Spectral — a stand-in for Canela; swap if Canela is licensed), weight 500, italic single-word emphasis in accent color (e.g. "at your home" in orange `#FF8840`).
- Headings/UI: Poppins 500–700. Button labels: uppercase, `.08em` tracking, 600.
- Body: Lora (serif).
- Scale: `--text-xs` … `--text-6xl` per `_ds/tokens/typography.css`. Section eyebrow labels: `--text-xs`, uppercase, `.18em` tracking, rose.

**Radius**: cards 24px (`--radius-lg`), pills `999px` (`--radius-full`), signature arch crop `--radius-arch` (Roman-arch top: `50% 50% 24px 24px / ~66% 66% 24px 24px`) for gallery/hero imagery.

**Shadows**: warm-tinted `rgba(43,29,27,…)`, 4 steps (`--shadow-sm/md/lg/xl`). Never pure black.

**Motion**: hovers 300ms, card lifts 500ms, all `cubic-bezier(0.22,1,0.36,1)`. Cards lift `translateY(-4px)` + shadow bloom; logo scales to 0.96 on hover.

**Grain**: every page has a fixed full-viewport 3%-opacity fractal-noise overlay (`.grain-overlay` in `_ds/tokens/base.css`), `pointer-events:none`, above content (z-index 60).

## Pages

### Shared header (all pages except 404's slim variant)
Sticky, white card background, `--shadow-sm`, padding `10px 40px`, flex space-between:
1. Logo `perro-logo-horizontal.png` at 58px height, links home, hover scales to 0.96 (300ms).
2. Center nav: Home / Services / Gallery / About / Contact — Poppins 500, `--text-sm`; active page gets foreground color + 2px rose bottom border; others `--text-secondary`, rose on hover.
3. Right: phone pill `(423) 555-0134` (1px border, pill radius, `tel:` link, rose border+text on hover) + primary "Book Now" pill button → Square Go URL (placeholder `https://book.squareup.com`, new tab).

### Shared footer (all pages except 404)
Dark (`--text-foreground` bg, cream text), 4 columns (auto-fit, min 220px, 40px gap): brand lockup ("Perro" display font / "GROOMING CO." amber caps) + blurb + Instagram link `@perrogroomingco`; Explore nav links; Hours (Mon–Fri 8–6, Sat 9–4, Sun closed); Service Area (Chattanooga · Hixson · Red Bank, Hamilton +$15 travel fee, plus italic "Outside these areas? A travel fee applies — call us.", phone, email `hello@perrogrooming.co`). Bottom bar: copyright + "Booking powered by Square Go".

### 1. Home (`Home.dc.html`)
- **Hero** (split, ~1160px max width, 2-col auto-fit min 380px): headline "Spa-day grooming, / *at your home*" (display font, clamp to `--text-6xl`), subhead naming the 4 areas, primary "Book with Square Go" + secondary "See Services" buttons, and a floating testimonial card (white, 24px radius, `--shadow-md`, 44px circular avatar image slot + italic quote + attribution). Right: square arch-radius panel with `--gradient-coral-orange` fill and the puppy photo overflowing the top (`rotate(3deg)`, drop-shadow), plus a floating "4.9 ★ · 120 reviews" pill (top-left, overhanging). Hero section background: `--gradient-sunset-full` wash at 0.12 opacity.
- **Why in-home strip** (3-up, icon in 48px gold circle + title + body): "No car rides, no cages" / "One-on-one, start to finish" / "All over greater Chattanooga". Section padding `56px 56px 72px`.
- **Services teaser** (white band): eyebrow "OUR SERVICES", heading "Everything your dog needs, *delivered*", 3 linked cards (Full Groom $85 / Bath & Brush $55 / Puppy First Groom $50) on `--surface-muted`, 52px solid-color icon circles (rose/orange/amber), hover lift; "All Services & Pricing" secondary button below.
- **Gallery teaser**: 4 arch-crop cards (see Gallery page) + "See Full Gallery" button.
- **Testimonials** (white band): eyebrow "TESTIMONIALS", heading "Tails are *wagging*", 3 `<article>` cards on `--surface-muted`: 56px circular dog photo slot, dog name + breed/area, italic quote, "— Owner ★★★★★".
- **CTA banner**: solid rose `#DB2265`, 24px radius, centered heading + hours line + white "Book on Square Go" pill (rose text) + outlined white "Call" pill.

### 2. Services (`Services.dc.html`)
- Header band with gold wash (solid `--color-gold-300` at 0.22 opacity): eyebrow "SERVICES & PRICING", heading "From nose to *tail*", intro paragraph, Book button right-aligned.
- **6 stacked service rows** (white cards, 24px radius, grid `52px 1fr auto auto`, 22px gap): icon in 52px solid circle / name + one-line description / italic duration / bold rose price:
  1. Full Groom — bath, blow-dry, breed-styled haircut, nails, ears, cologne — ~2 hrs — from $85
  2. Bath & Brush — shampoo, conditioner, blow-dry, brush-out, nail check — ~1 hr — from $55
  3. De-shedding Treatment — undercoat rake, de-shed shampoo, high-velocity dry — ~90 min — from $65
  4. Puppy First Groom — gentle intro, mini bath, light trim, under 6 months — ~45 min — from $50
  5. Nail Trim — trim + file, paw-pad tidy — ~20 min — $20
  6. Teeth Cleaning — enzymatic paste, breath finish — ~15 min — $15
- **Two note cards** (`--surface-muted`): Travel (Chattanooga/Hixson/Red Bank included; Hamilton flat $15; outside Chattanooga assessed by distance; link to coverage map) and Hours.
- CTA banner (solid rose): "Not sure which service fits?" + Book / Call buttons.

### 3. Gallery (`Gallery.dc.html`)
- Rose wash (0.07) header: eyebrow "FRESH CUTS", heading "Recent *good boys & girls*", intro line.
- **8 arch-crop photo cards** (auto-fit grid min 230px, bottom-aligned, alternating aspect ratios 3/4 and 3/4.4 for rhythm). Each card: solid gradient placeholder background (rotating through the 4 brand gradients) with a drag-and-drop image slot on top (image covers the gradient when supplied); below, a white pill label: "**Name** · *service*" (Biscuit, Luna, Moose, Pepper, Winston, Daisy, Rufus, Olive).
- Footer CTA: italic "Want your pup featured here?" + primary "Book a Groom".

### 4. About (`About.dc.html`)
- Amber wash (0.16) hero: heading "Grooming that comes *wagging to your door*", two story paragraphs, Book + See Our Work buttons; right: 4/5 arch photo slot ("groomer at work") with overhanging pill "Certified · Insured · Dog-obsessed".
- **What to Expect** (white band): 4 numbered cards (display-font italic rose numerals): Book online or call → We arrive fully equipped → One-on-one groom → Photos & report card.
- **Our Promise**: text block (gentle products, never rush, clean-up, 48-hour free fix-it guarantee) + 2×2 stat cards: 120+ five-star reviews / 4 neighborhoods / 1:1 groomer to dog / 0 cages.
- CTA banner (solid rose): "Let's meet your dog".

### 5. Contact (`Contact.dc.html`)
- Gold wash (0.2) header: heading "We're probably *already nearby*", intro ("fully mobile — no shop to visit").
- **Two-column grid** (min 340px): left, a 460px-min map card (24px radius, `--shadow-lg`, map fills card absolutely). Right column, three white cards:
  - **Where we go**: 4 rows (Chattanooga / Red Bank / Hixson — "no travel fee"; Hamilton — orange "+$15 travel fee") + italic note: outside these areas / outside Chattanooga a distance-based travel fee is assessed, call for a quote.
  - **Get in touch**: phone, email, Instagram rows — 38px gold icon circles + Poppins 600 labels, rose on hover.
  - **Hours** + Book button.
- **Map** (see `perro-map.js`, Leaflet 1.9.4): CARTO Voyager tiles (light) / CARTO dark_all (dark); center `[35.09, -85.23]` zoom 11; scroll-wheel zoom off; a custom top-right pill button toggles "Dark map"/"Light map" (dark bg `#2B1D1B` / cream `#FFF6EB`, swaps on toggle); 4 labeled pill markers (divIcon, white dot + name, rose `#DB2265` for no-fee areas, orange `#FF8840` for Hamilton) at Chattanooga `[35.0456,-85.3097]`, Red Bank `[35.1112,-85.2947]`, Hixson `[35.1573,-85.2680]`, Hamilton `[35.0367,-85.1560]`, each with a fee popup; plus a default marker at the Chattanooga point ("Home base — we come to you!").

### 6. 404 (`404.dc.html`)
Slim header (logo + phone pill only, not sticky). Full-height centered column on gold wash (0.2): 140px white circle containing the medallion logo, eyebrow "404 — PAGE NOT FOUND", heading "Uh oh — this page *slipped its leash*", body line, primary "Back Home" + secondary "Book a Groom", italic text links to Services / Gallery / Contact.

## Interactions & Behavior
- Smooth scrolling (`scroll-behavior:smooth`).
- All "Book" CTAs open the Square Go booking URL in a new tab (`rel="noopener"`). **Replace `https://book.squareup.com` with the business's real Square Go link.**
- Phone is `tel:+14235550134` everywhere (click-to-call); email `mailto:`.
- Card hovers: `translateY(-4px)` + `--shadow-md`, 500ms honeyed ease. Nav links recolor to rose, 300ms.
- Map: layer toggle as above; markers open popups on click.
- Responsive: layouts use CSS grid `repeat(auto-fit, minmax(Npx, 1fr))` throughout — hero stacks under ~800px, service rows may collapse the 4-col grid to stacked on small screens (recommend restacking icon/text/price vertically under 640px), header wraps (`flex-wrap`). A hamburger menu for mobile nav is desired per the original brief but not built in the prototype — implement one at your breakpoint of choice.
- 44px+ touch targets on mobile.

## State Management
None beyond the map's light/dark layer boolean. All content is static. (The prototype's image slots persist dropped images locally; in production these are just `<img>` content.)

## Assets (in `assets/`)
- `perro-logo-horizontal.png` — header/footer wordmark (do not redraw)
- `perro-logo.png` / `logo-medallion.png` — square medallion mark (404 page, favicon)
- `puppy-hero.png` — the one real photo (Home hero)
- All gallery/testimonial/about photos are **placeholders** — real photography needed (warm, natural light per brand guide).
- Leaflet 1.9.4 (unpkg CDN) + CARTO basemap tiles (attribution required: © OpenStreetMap contributors © CARTO).
- Fonts: Poppins (self-hosted TTFs in `_ds/assets-fonts` of the design system), Lora + Spectral via Google Fonts.

## Placeholder content to replace before launch
- Square Go booking URL, phone number, email, Instagram handle
- Prices/durations (industry-standard placeholders, owner to confirm)
- Testimonial quotes and dog names (believable placeholders)
- Review count/rating badges ("4.9 ★ · 120 reviews", "120+ five-star reviews")
- All photos except the hero puppy

## Files in this bundle
- `Home.dc.html`, `Services.dc.html`, `Gallery.dc.html`, `About.dc.html`, `Contact.dc.html`, `404.dc.html` — page design references
- `perro-map.js` — working Leaflet map widget (portable: plain custom element, reusable as-is or as reference)
- `_ds/tokens/` — colors, typography, spacing, radius, shadows, base (grain overlay) CSS token files
- `_ds/styles.css` — design-system root stylesheet
- `assets/` — logos + hero photo
