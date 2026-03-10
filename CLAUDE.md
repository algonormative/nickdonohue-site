# Blog

Personal blog. AI, creative tools, music, plotter art, and the future of work.

## Structure

```
src/content/blog/   Published posts (deployed to GitHub Pages)
drafts/             Work in progress (private, not deployed)
captures/           Promoted ideas from vault captures (private)
research/           Supporting material and notes (private)
```

## Writing Workflow

Use the `/write` skill for blog writing sessions:
- `/write` or `/write review` — see what's accumulated
- `/write develop [topic]` — interview-based writing session
- `/write shape [draft]` — turn notes into a post
- `/write publish [draft]` — finalize and move to posts

## Post Format

Posts live in `src/content/blog/` as markdown:

```yaml
---
title: "Post Title"
description: "Brief summary for meta tags and RSS"
pubDate: "Mar 15 2026"
tags: ["ai", "tools"]
---
```

## Draft Format

Drafts live in `drafts/` with extra fields:

```yaml
---
title: "Working Title"
status: draft | developing | ready
tags: ["ai"]
description: "Summary"
sources: []
---
```

## Voice

- Direct and opinionated
- Technical but accessible
- Conversational — like talking to a smart friend
- No filler — just start
- Short paragraphs, web-native

## Related Vault Content

- Blog ideas: `~/git/vault/later/blog/`
- AI alignment research: `~/git/vault/active/ai-alignment/`
- Context/preferences: `~/git/vault/context/`

## Commands

```bash
npm run dev      # Preview at localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
```
