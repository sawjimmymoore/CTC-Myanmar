# CTC website (Click to Create)

Next.js 16 + Tailwind 4 + Supabase. Fonts: Bebas Neue (display), Montserrat (body), Oswald (labels), Noto Sans Myanmar (Burmese).

## Run locally
- npm install
- copy .env.local.example to .env.local and fill it in
- npm run dev

## One-time Supabase setup (same flow as the MMG site)
- Create a project at supabase.com. Put Project URL, anon key and service_role key in .env.local (and in Vercel)
- SQL Editor: paste supabase/schema.sql and Run
- Authentication > Users > Add user: create your admin login, then visit /admin/login

## What is in it
- Pages: Home, Services (+12 service pages), Who we help (4), Website types, Packages (4 families with comparison tables, no prices), How it works, About, Updates, Book, Quote, Contact, Privacy, Terms
- English / Burmese toggle in the nav. Burmese is written for the nav, hero, About, service names and key headings. Everything else falls back to English until you fill the Burmese field in the admin. Please have a native speaker review the Burmese
- Admin (/admin):
  - Site content: edit hero, services, audiences, platforms, packages, steps, FAQ, About, footer, CTA in both languages, draft then publish (same system as MMG)
  - Updates: write news, draft/publish, cover upload
  - Bookings and Messages (quote requests arrive as messages)
- Effects reused from your sites: Lenis smooth scroll, cursor glow, magnetic buttons, tilt cards, scroll-lit text, word reveal, marquee, motion background, FAQ accordion, cookie consent, back to top

## Brand
- Colors: paper #F6F7F5, navy #162A4A (text, buttons, dark sections), logo sage #8FB08A (accents only). No gold
- Logo files: public/assets/logo-mark.png (nav, favicon) and logo-full.png (footer)

## Deploy
- Push to GitHub, import in Vercel, add the env vars, point ctcmyanmar.com at it

## Not done yet
- Phone number (edit footer.phone in Site content, or content/site-content.ts)
- Not checked in a browser: look over the home hero and the Burmese pages after the first deploy
- Email notifications, photos and portfolio, Privacy/Terms legal review
