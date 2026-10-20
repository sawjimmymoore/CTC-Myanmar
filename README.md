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
- Six categories, each with its own page: Websites and Web Apps, Business Systems and Software, AI Workflow and Automation, Marketing and Growth, Video and Creative Production, Care/Security/Training. 58 specific services (e.g. 12 website types, 12 business systems, 12 AI set-ups)
- Each category page: services with icons, animated screen mockup, category road map, packages and add-ons, and a project brief form with suggested questions per topic
- Package builder (/packages): choose a category, add tiers and add-ons, then request one quote or add a brief
- Project brief (/start): pick a category and topics, answer suggested questions, send. Arrives as a message in Admin > Messages with the subject "Brief: ..."
- Road map (home and /how-it-works): seven stages from Discover to Care and grow, drawn as a road that fills in while you scroll
- Journey bar: Explore > Choose > Brief > Book on every conversion page
- Hero: animated dot-matrix backdrop, category cards, mini journey line
- Also: Find-your-fit quiz, Events with registration, Updates, About with founders, EN/Burmese toggle, admin for all content
- Phone: add in Admin > Site content > contact (phone, viber, telegram). It then appears in the footer and Contact page
- Edit services, offerings, packages, add-ons, suggested questions and road maps in Admin > Site content (services, packages, roadmap)

## Brand
- Colors: paper #F6F7F5, navy #162A4A (text, buttons, dark sections), logo sage #8FB08A (accents only). No gold
- Logo files: public/assets/logo-mark.png (nav, favicon) and logo-full.png (footer)

## Deploy
- Push to GitHub, import in Vercel, add the env vars, point ctcmyanmar.com at it

## Not done yet
- Phone number (edit footer.phone in Site content, or content/site-content.ts)
- Not checked in a browser: look over the home hero and the Burmese pages after the first deploy
- Email notifications, photos and portfolio, Privacy/Terms legal review
