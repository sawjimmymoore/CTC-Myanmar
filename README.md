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
- Pages: Home, Services (+12 service pages with animated screen mockups), Packages (package builder: add tiers, then request one quote), Website types, How it works, About (story, mission, values, founders), Updates, Events (+ registration), Book, Quote, Contact, Privacy, Terms
- Journey: Home hero > see it in action showcase > guided steps > Find-your-fit quiz > services > package builder > quote or free scoping call. Primary CTA is always "Book a free scoping call"; secondary is "Build your package"
- English / Burmese toggle. Burmese is written for the nav, hero, About and key headings; the rest falls back to English until filled in the admin. Please have a native speaker review
- Admin (/admin): Site content (hero, services, packages, steps, FAQ, About incl. founders, showcase, quiz, footer; both languages; draft then publish), Updates, Events, Registrations, Bookings, Messages
- Founders: edit in Admin > Site content > about > founders. Entries with an empty name are hidden. Add each founder's own story text
- Icons: app/icon.png, app/apple-icon.png, app/favicon.ico and app/opengraph-image.png are generated from the CTC logo on navy
- Fonts: Bebas Neue (display), Montserrat (headings, body), JetBrains Mono (labels), Noto Sans Myanmar (Burmese)

## Brand
- Colors: paper #F6F7F5, navy #162A4A (text, buttons, dark sections), logo sage #8FB08A (accents only). No gold
- Logo files: public/assets/logo-mark.png (nav, favicon) and logo-full.png (footer)

## Deploy
- Push to GitHub, import in Vercel, add the env vars, point ctcmyanmar.com at it

## Not done yet
- Phone number (edit footer.phone in Site content, or content/site-content.ts)
- Not checked in a browser: look over the home hero and the Burmese pages after the first deploy
- Email notifications, photos and portfolio, Privacy/Terms legal review
