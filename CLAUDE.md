# Website

Personal site at [algonormative.net](https://algonormative.net) (previously nickdonohue.net, which now 302-redirects here). Astro 5, deployed to GitHub Pages via GitHub Actions. **Public repo** — advanced drafts (`draft: true`) and published content live here; raw capture / develop / shape happens in `~/git/vault/writing/`. Drafts are visible in the source tree but filtered out of the production build.

## Structure

```
src/pages/                    Landing, projects, blog index/detail, molt index/detail, 404
src/content/blog/             Blog content collection — human-written
src/content/molt/             Molt content collection — machine-written (see below)
src/components/               BaseHead, Header, Footer, ThemeToggle, Footnote, Aside, Chart, Embed, PostHog
src/layouts/                  BlogPost + MoltPost wrappers
src/styles/                   tokens.css (light/dark theme), global.css
src/data/projects.json        Projects page data
public/                       Static assets (avatar, favicon, robots, fonts)
.cloudflare/redirect/         chronick.net (301) + nickdonohue.net (302) → algonormative.net Worker (deploy via wrangler)
public/CNAME                  GitHub Pages custom domain
.github/workflows/deploy.yml  Build + publish on push to main
.env.example                  PostHog key placeholder
```

There is no `drafts/`, `captures/`, or `research/` directory — drafts live alongside published posts with `draft: true`, filtered out at build via `import.meta.env.PROD` in `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro`.

## Molt — the machine-written section

`/molt` is agent-authored; `/blog` is Nick's. The split is a separate content
collection, not a tag, so the authorship boundary is structural and can't be
lost in a filter. Every Molt entry renders a provenance box naming the author
model and any reviewer.

Rules for writing into `src/content/molt/`:

- **The agent drafts; Nick verifies every factual claim and edits for accuracy,
  not voice.** Do not smooth Molt prose toward the blog's voice — the point is
  that a reader can tell which is which.
- Say what was actually run. A claim that came from executing something reads
  differently from one that came from reading docs, and the piece should make
  that distinction visible rather than flattening it.
- Version-specific findings carry the version they were checked against.
- No private paths, private repo names, or task IDs. This repo is public.

Frontmatter is the blog schema plus `agent` (required) and `reviewedBy`
(optional). No `tweet` field.

## Where ideas come from

The vault drives the capture and triage workflow. See `~/git/vault/writing/CONTEXT.md` for the full pipeline. In short:

1. Capture in `~/git/vault/writing/inbox/`
2. Develop in `~/git/vault/writing/topics/<slug>/`
3. Shape into `~/git/nickdonohue-site/src/content/blog/<slug>.md` with `draft: true` (the vault's `writing/in-flight/` symlink is meant to mirror this directory — same file, two paths; confirm it points here and not at the old `~/git/website` clone of `algonormative.github.io`)
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

GitHub Pages, source = GitHub Actions, repo `algonormative/nickdonohue-site` (public). The workflow at `.github/workflows/deploy.yml` runs `npm ci && npm run build` and uploads `dist/` to Pages. Auto-deploys on push to `main`. Custom domain `algonormative.net` (set via `public/CNAME` + GitHub Pages settings; `nickdonohue.net` and `chronick.net` redirect here through the Worker in `.cloudflare/redirect/`).

The separate `algonormative/algonormative.github.io` repo (cloned at `~/git/website`) is **not** this site — it is the user-pages repo that serves project pages at `algonormative.github.io/<repo>`. It must stay domain-free: a `CNAME` there 301-redirects every project page. Never add one, and never shape drafts into that clone.

PostHog analytics need the `PUBLIC_POSTHOG_KEY` repository secret — `gh secret set PUBLIC_POSTHOG_KEY --repo algonormative/nickdonohue-site` once available. The PostHog component is gated on `import.meta.env.PROD && Boolean(apiKey)` so absence is fine.

The chronick.net 301-redirect Worker lives under `.cloudflare/redirect/` — `wrangler deploy` to ship. Cloudflare hosts the redirect; GitHub Pages hosts the site itself.
