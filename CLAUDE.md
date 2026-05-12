# Website

Personal site at [nickdonohue.net](https://nickdonohue.net). Astro 5, deployed to GitHub Pages via GitHub Actions. **Public repo** — advanced drafts (`draft: true`) and published content live here; raw capture / develop / shape happens in `~/git/vault/writing/`. Drafts are visible in the source tree but filtered out of the production build.

## Structure

```
src/pages/                    Landing, projects, blog index, blog detail, 404
src/content/blog/             Blog content collection — drafts (draft: true) + published (draft: false)
src/components/               BaseHead, Header, Footer, ThemeToggle, Footnote, Aside, Chart, Embed, PostHog
src/layouts/                  BlogPost wrapper
src/styles/                   tokens.css (light/dark theme), global.css
src/data/projects.json        Projects page data
public/                       Static assets (avatar, favicon, robots, fonts)
.cloudflare/redirect/         chronick.net → nickdonohue.net Worker (lives in CF; deploy via wrangler)
public/CNAME                  GitHub Pages custom domain
.github/workflows/deploy.yml  Build + publish on push to main
.env.example                  PostHog key placeholder
```

There is no `drafts/`, `captures/`, or `research/` directory — drafts live alongside published posts with `draft: true`, filtered out at build via `import.meta.env.PROD` in `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro`.

## Where ideas come from

The vault drives the capture and triage workflow. See `~/git/vault/writing/CONTEXT.md` for the full pipeline. In short:

1. Capture in `~/git/vault/writing/inbox/`
2. Develop in `~/git/vault/writing/topics/<slug>/`
3. Shape into `~/git/website/src/content/blog/<slug>.md` with `draft: true` (visible from the vault via the `writing/in-flight/` symlink — same file, two paths)
4. Publish: flip `draft: false`, set `pubDate`, commit, push

Use `/write` skill to drive 1-4.

## Frontmatter (locked schema — see `src/content.config.ts`)

```yaml
---
title: "Title"                    # required
description: "1-2 sentence summary" # required
pubDate: 2026-05-12                # required
updatedDate: 2026-05-15            # optional
draft: true                        # required for drafts
tags: [ai, agents]                 # optional
heroImage: ../assets/hero.jpg      # optional (image, not URL)
series: "series-slug"              # optional
canonical: "https://other/post"    # optional
tweet: |                           # optional — Twitter/X thread
  Line 1
  ---
  Line 2
---
```

`pubDate` is the field (not `date`).

## Voice

- Direct and opinionated — strong takes, no softening
- Technical but accessible — code welcome, jargon explained
- Conversational — smart friend, not academic paper
- No filler — cut "In this post, I will discuss..."
- Short paragraphs, web-native

Re-read `~/.claude/skills/write/references/voice-guide.md` before any shape or publish pass.

## Commands

```bash
npm run dev       # localhost:4321 — drafts visible
npm run build     # production build — drafts filtered out
npm run preview   # local preview of production build
```

## Deploy

GitHub Pages, source = GitHub Actions, repo `chronick/chronick.github.io` (public). The workflow at `.github/workflows/deploy.yml` runs `npm ci && npm run build` and uploads `dist/` to Pages. Auto-deploys on push to `main`. Custom domain `nickdonohue.net` (set via `public/CNAME` + GitHub Pages settings).

PostHog analytics need the `PUBLIC_POSTHOG_KEY` repository secret — `gh secret set PUBLIC_POSTHOG_KEY --repo chronick/chronick.github.io` once available. The PostHog component is gated on `import.meta.env.PROD && Boolean(apiKey)` so absence is fine.

The chronick.net 301-redirect Worker lives under `.cloudflare/redirect/` — `wrangler deploy` to ship. Cloudflare hosts the redirect; GitHub Pages hosts the site itself.
