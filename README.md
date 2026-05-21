# themapscraper.com

> Google Maps lead scraper for sales teams, agencies, and cold callers. Type a business type and location, get a clean CSV of leads in seconds.

---

## What is this

themapscraper.com is a simple web app that lets non-technical users extract business leads from Google Maps without touching any API or spreadsheet tool. The user types a category and location, sees a live preview of results, and downloads a CSV after paying with credits.

The backend scraping is handled entirely by an [Apify](https://apify.com) actor (Google Maps Scraper). This project is a clean UI wrapper on top of that actor — competing on UX, simplicity, and pricing, not on scraping technology.

The model is inspired by Nico's story from the "API arbitrage" podcast concept: a non-technical founder wraps an Apify actor in a simple storefront, charges a markup, and runs a lean SaaS with near-zero infrastructure costs.

---

## Core user flow

1. User arrives at `themapscraper.com`
2. Types a business type (e.g. "Dentists") and a location (e.g. "Texas")
3. Sees a preview of 3 real results — remaining rows are blurred
4. Clicks **"Get full list"** → sign-up modal (email + password)
5. After sign-up, sees full results but CSV export is locked behind credits
6. Buys a credit pack via Stripe
7. Downloads CSV instantly

> The preview-before-login pattern is critical for conversion. Users must see real data before being asked to register.

---

## Pricing model

Credits-based. No subscription required. **Credits never expire.**

This is intentional: most users scrape occasionally, not monthly. Forcing a subscription creates churn. Credits that never expire reduce friction on the initial purchase and encourage users to come back months later.

### Credit packs (suggested)

| Pack | Price | Credits | Cost per lead |
|------|-------|---------|---------------|
| Starter | €9 | 500 leads | €0.018 |
| Growth | €29 | 2,000 leads | €0.0145 |
| Pro | €69 | 6,000 leads | €0.0115 |

One credit = one lead row in the CSV.

Apify costs are fractions of a cent per result, so margins are ~90%+.

Users can also top up credits at any time from their dashboard. No auto-renewal, no subscriptions.

---

## Data fields per lead

The Apify Google Maps Scraper actor returns the following fields. All are included in the CSV export. The preview table shows a subset only.

**Shown in preview table:**
- Business name
- Phone number
- Full address
- Star rating + review count
- Website URL

**Included in CSV (not shown in UI):**
- Business category (e.g. "Dental clinic")
- Opening hours
- Email (when available in the Google Maps listing)
- Latitude / Longitude coordinates
- Google Maps URL
- Whether the business has online booking
- Photo URLs

The extra fields in the CSV are a positive surprise for the user after downloading.

---

## SEO strategy

The homepage search bar is not SEO-friendly on its own (dynamic content, no static HTML for Google to index). The SEO strategy is based on programmatic static landing pages:

**By business type:**
- `/dentist-scraper`
- `/roofer-scraper`
- `/gym-scraper`
- `/lawyer-scraper`
- `/restaurant-scraper`

**By location:**
- `/google-maps-scraper-texas`
- `/google-maps-scraper-florida`
- `/google-maps-scraper-london`

**Combined (long tail, high intent):**
- `/dentists-texas`
- `/roofers-florida`
- `/gyms-barcelona`

Each subpage has a static H1, description, and example results table. These pages are generated from a template — only the business type and location change. This is programmatic SEO.

The blog (`/blog`) is phase 2 — articles like "how to scrape google maps leads", "best google maps scraper tools 2025", etc.

---

## Tech stack

### Frontend
- **React** with **Vite** as build tool
- **Tailwind CSS** for styling
- The design follows the **Replicate DESIGN.md** system (see `/DESIGN.md` in project root)

### Design system summary (from DESIGN.md)
- Background: warm cream `#f9f7f3` (never pure white at page level)
- Primary accent: orange `#ea2804` — used only for the main CTA button and links
- Typography display: `rb-freigeist-neue` (substitute: Bricolage Grotesque from Google Fonts)
- Typography body/UI: `basier-square` (substitute: Geist or Inter)
- Typography code: `JetBrains Mono`
- All interactive elements (buttons, inputs, badges): `border-radius: 9999px` (fully rounded)
- Content cards: `border-radius: 10px`
- No shadows on cream surfaces — elevation via color blocking
- Section rhythm: cream → dark code band → cream → black footer

### Backend
- **Supabase** for auth and database (users, credit balances, search history)
- **Stripe** for payments (one-time credit packs, no subscriptions)
- **Apify API** for Google Maps scraping (actor: `compass/crawler-google-places` or equivalent)

### Hosting
- Frontend: Vercel
- No custom backend server needed — Apify and Supabase handle everything

---

## Sitemap

```
themapscraper.com/
├── /                          → Homepage (hero + search bar)
├── /search                    → Results page (post-search, pre-login preview)
├── /pricing                   → Credit packs
├── /login
├── /signup
├── /dashboard
│   ├── /dashboard/search      → Search for logged-in users
│   ├── /dashboard/history     → Past searches and downloads
│   └── /dashboard/credits     → Credit balance + buy more
├── /[niche]-scraper           → Programmatic SEO pages (e.g. /dentist-scraper)
├── /google-maps-scraper-[loc] → Programmatic SEO pages (e.g. /google-maps-scraper-texas)
├── /[niche]-[location]        → Combined SEO pages (e.g. /dentists-texas)
└── /blog                      → Phase 2
```

---

## Pages to build (in order)

### Phase 1 — MVP

1. **Homepage** (`/`) — hero, search bar (business type + location), example pills, live preview table with blurred rows, single CTA "Get full list", "How it works" section, minimal footer
2. **Sign-up modal** — triggered by CTA, email + password, no OAuth for now
3. **Results page** (`/dashboard/search`) — full unblurred results table, export locked behind credits, "Buy credits" CTA
4. **Pricing page** (`/pricing`) — 3 credit pack cards, Stripe checkout
5. **Dashboard** (`/dashboard`) — search bar + history + credit balance

### Phase 2 — SEO + growth

6. Programmatic SEO landing pages (niche + location templates)
7. Blog
8. Email nurture (welcome email, low-credits reminder)

---

## Key UX decisions

- **Preview before login**: show 3 real rows blurred before asking for sign-up. Non-negotiable for conversion.
- **Single CTA on homepage**: only "Get full list". No "See pricing" button competing for attention.
- **Credits never expire**: reduces subscription fatigue, increases initial purchase conversion.
- **No mention of Apify**: the product is the experience, not the infrastructure behind it.
- **CSV is the output**: no fancy dashboards or visualizations in v1. The user wants a file they can open in Excel.

---

## Environment variables needed

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
APIFY_API_TOKEN=          # server-side only, never exposed to client
STRIPE_SECRET_KEY=        # server-side only
SUPABASE_SERVICE_KEY=     # server-side only
```

---

## Apify integration notes

- Actor to use: `compass/crawler-google-places` (most maintained Google Maps actor on Apify)
- Calls are made server-side only (never expose the Apify token to the frontend)
- One Apify run = one search query. Results are paginated; the actor returns up to N results depending on input config.
- Deduct credits from user balance before triggering the Apify run
- Store results in Supabase so the user can re-download without triggering a new scrape

---

## Supabase schema (simplified)

```sql
users          id, email, created_at
profiles       user_id, credits_balance, updated_at
searches       id, user_id, query, location, result_count, apify_run_id, created_at
search_results id, search_id, data (jsonb), created_at
orders         id, user_id, stripe_session_id, credits_purchased, amount_eur, created_at
```

---

## DESIGN.md

The full Replicate-inspired design system file is located at `/DESIGN.md` in the project root.

**Always read `/DESIGN.md` before writing any UI component.**

Key rules to follow at all times:
- Page background is always `#f9f7f3` (cream), never white
- Orange `#ea2804` is used only for the primary CTA and links — nowhere else
- All buttons, inputs, and badges are fully rounded (`border-radius: 9999px`)
- Content cards use `border-radius: 10px`
- No drop shadows on cream surfaces
- Display font: Bricolage Grotesque (Google Fonts substitute for rb-freigeist-neue)
- Body/UI font: Geist (Google Fonts substitute for basier-square)
- Code font: JetBrains Mono
