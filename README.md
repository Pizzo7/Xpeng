# XPENG G9L Ghana

Premium Next.js marketing site for the authorized XPENG distributor in Ghana, focused on the XPENG G9L.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- `next/image` + `next/font`
- Deployable on Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Edit content (no code required)

| File | What to replace |
|------|-----------------|
| [`data/site.json`](data/site.json) | Company name, phone, WhatsApp, email, Accra contactLocation (map), showrooms, Ghana notes, about/privacy/terms |
| [`data/models.json`](data/models.json) | Full Ghana lineup cards (SUV / sedan / MPV) |
| [`data/models/*.json`](data/models/) | Per-model detail pages (gallery, specs, colours, price) — e.g. `g9l.json` |
| [`data/discover.json`](data/discover.json) | Charging points, news, and services (Discover menu) |

All marketing numbers and legal statements are marked **PLACEHOLDER**. Do not publish invented range, price, or warranty claims.

Distributor wording is currently:

`[Authorized XPENG distributor in Ghana]`

Confirm exact wording with the client before launch.

## Brand & media assets

Replace these files with official assets (keep the same paths):

```text
public/brand/logo.svg
public/brand/logo-light.svg
public/videos/hero.mp4
public/videos/hero-poster.jpg
public/videos/assembly.mp4
public/videos/assembly-poster.jpg
public/videos/interior.mp4
public/videos/interior-poster.jpg
public/videos/tracking.mp4
public/videos/tracking-poster.jpg
public/images/g9l/*.jpg
```

### Video guidelines

- Provide muted-friendly clips (site plays muted by default).
- Use H.264 MP4, ideally under ~8–15 MB for hero where possible; compress for mobile data.
- Always ship a matching poster JPG/WebP.
- Site behaviour:
  - Poster shown first
  - Clear play/pause control
  - `playsInline`, muted, loop where suitable
  - Lazy load below the fold
  - No autoplay on mobile, slow connections, or `prefers-reduced-motion`

## Forms / CRM

`POST /api/test-drive` validates and **logs** submissions.

```text
TODO: Connect email (Resend/SendGrid) or CRM webhook before production.
```

## Design tokens

Colours, fonts, and spacing live in [`tailwind.config.ts`](tailwind.config.ts) and CSS variables in [`app/globals.css`](app/globals.css).

- Display font: Cormorant Garamond
- Body font: Outfit
- Palette: ink / mist / silver / gold
- **Dark mode** is the default brand look
- **Light mode** toggle is in the header (choice saved in `localStorage`)

## Deploy on Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Framework preset: Next.js (auto-detected).
4. Set `site.siteUrl` in `data/site.json` to your production domain.
5. Deploy.
6. Replace placeholders and media before public launch.

## Accessibility & SEO

- Skip link, keyboard-friendly nav/forms, ARIA on accordions/video controls
- Per-page metadata, Open Graph defaults, `sitemap.xml`, `robots.txt`
- Organization JSON-LD in the root layout

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint |
