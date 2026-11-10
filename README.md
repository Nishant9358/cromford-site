# Cromford website

The marketing site for [cromford.in](https://cromford.in). It has a single page with anchor navigation, plus `/privacy`.

Built with Next.js (App Router), TypeScript in strict mode, Tailwind CSS v4 and zod. It uses no UI kit and no animation library.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Other scripts:

| Script                 | What it does                   |
| ---------------------- | ------------------------------ |
| `npm run lint`         | ESLint (Next.js rules)         |
| `npm run typecheck`    | TypeScript, no emit            |
| `npm run format`       | Prettier, writes changes       |
| `npm run format:check` | Prettier, reports only         |

## Environment variables

Copy `.env.example` to `.env.local` and fill it in.

| Variable             | Required | Purpose                                                                                                   |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | For email | API key from [Resend](https://resend.com).                                                               |
| `CONTACT_TO_EMAIL`   | For email | The inbox that receives enquiries. Separate several addresses with commas.                               |
| `CONTACT_FROM_EMAIL` | No        | Sender, e.g. `Cromford website <website@cromford.in>`. The domain must be verified in Resend. Defaults to Resend's test sender `onboarding@resend.dev`. |

**If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is not set**, the contact form still works. The server logs each valid submission to the console with `[contact]` and the visitor sees the normal success message. This is useful in development. Set both variables in production, or enquiries will only appear in your server logs.

## How the contact form works

- `components/ContactForm.tsx` validates on the client with the zod schema in `lib/validation.ts`, then calls the server action `submitContact` in `app/actions.ts`.
- The server action validates again with the same schema, so it never trusts the client.
- **Honeypot:** a hidden `website` field. If it is filled in, the submission is dropped quietly and the bot sees a success message.
- **Rate limit:** 5 submissions per IP per 10 minutes (`lib/rate-limit.ts`). This is in memory, so each server instance counts on its own. That is enough as a speed bump. Move it to a shared store such as Upstash Redis if spam becomes a problem.
- Email is sent through Resend's HTTP API in `lib/email.ts`. The reply-to address is set to the visitor's email.
- Without JavaScript, the form still posts to the server action.

## Editing copy

All visible text is in **`content/site.ts`**: navigation, every section, form labels and messages, footer and the privacy policy. Edit the strings there. You don't need to touch the components.

Voice rules: plain, specific and calm. Use short sentences. No exclamation marks, emoji or hype words (*revolutionary, cutting-edge, next-gen, unleash, supercharge, seamless, magic*). Don't add clients, testimonials, numbers or products that don't exist.

Eyebrow labels are written in sentence case in `site.ts`. CSS sets them in capitals.

## Design system

- **Tokens** are defined once at the top of `app/globals.css`. The raw Mill and Night palettes map to semantic variables (`--surface`, `--ink`, `--derwent` …). `.theme-light`, `.theme-dark` and `.theme-derwent` swap them per section.
- Tailwind's default colour palette, shadows and radii are switched off. Only token utilities exist, for example `bg-surface`, `text-ink-muted`, `border-line`, `bg-derwent` and `text-copper`. Components contain no hex values.
- `lib/tokens.ts` repeats a few palette values for the generated Open Graph image and the browser theme colour, which cannot read CSS variables. Keep it in sync with `globals.css`.
- The type styles are `type-display-xl`, `type-display`, `type-heading-1/2/3`, `type-intro`, `type-small`, `type-eyebrow` and `type-mono`.
- The layout grid is `.grid-12`: 12 columns with 24px gutters, or 4 columns with 16px gutters on phones. The content width is 1200px (`components/Container.tsx`).
- The logo always comes from the supplied SVGs in `public/brand/logo/`, through `components/Logo.tsx`. Use `tone="ink"` on light sections and `tone="mill"` on dark ones.
- Motion: the hero shaft and wheel animate once on load, and other blocks fade up the first time they scroll into view. Both are turned off under `prefers-reduced-motion`.

## Project layout

```
app/          routes, layout, server action, metadata (OG image, sitemap, robots, icons)
app/fonts/    TeX Gyre Pagella (GUST Font License, see LICENSE.txt)
components/   one component per file
content/      site.ts, all copy
lib/          validation, email, rate limiting, OG image, palette for non-CSS contexts
public/brand/ supplied logo files
```

## Deploy to Vercel

1. Push this folder to a Git repository, then **Add New → Project** in Vercel and import it. Vercel detects Next.js, so you don't need to change any build settings.
2. Under **Settings → Environment Variables**, add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and optionally `CONTACT_FROM_EMAIL`.
3. In Resend, verify the `cromford.in` domain so you can send from an `@cromford.in` address.
4. Under **Settings → Domains**, add `cromford.in` and point DNS at Vercel as instructed.
5. Redeploy after you change environment variables.

## Before launch

Search the code for `TODO`. Open items:

- Confirm the `hello@cromford.in` inbox exists and is monitored (`content/site.ts`, `components/Contact.tsx`).
- Replace the placeholder social links (`#`) in `content/site.ts`.
- Have the privacy policy reviewed (`content/site.ts`, `app/privacy/page.tsx`).
- Consider a shared rate-limit store (`lib/rate-limit.ts`).
