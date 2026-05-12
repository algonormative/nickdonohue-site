# nickdonohue.net

Personal site. Astro 5, deployed to Cloudflare Pages.

- Live: <https://nickdonohue.net>
- Old domain: chronick.net (301-redirects via the Worker under `.cloudflare/redirect/`)
- Hosts: landing, /projects, /blog/, /rss.xml, 404

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build (drafts filtered out)
npm run preview   # preview the production build
```

## Writing workflow

Drafts and published posts share `src/content/blog/`, gated by the `draft: true|false` frontmatter flag. The vault at `~/git/vault/writing/` drives capture, ideation, and shaping; this repo holds the polished output.

See `CLAUDE.md` for the full schema, voice notes, and deploy details.
