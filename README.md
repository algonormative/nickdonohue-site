# nickdonohue.net

Personal site. Astro 5, deployed to GitHub Pages.

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

## Search indexing (owner checklist)

The build ships `public/robots.txt` and an auto-generated
`/sitemap-index.xml` (via `@astrojs/sitemap`), plus canonical URLs on
every page. The remaining steps need the site owner's Google/Bing
accounts and cannot be automated:

- [ ] Add `nickdonohue.net` as a property in [Google Search Console](https://search.google.com/search-console)
      (Domain property via DNS TXT record on Cloudflare, or URL-prefix
      property via HTML-tag verification).
- [ ] Submit `https://nickdonohue.net/sitemap-index.xml` under
      Indexing → Sitemaps.
- [ ] Optionally repeat for [Bing Webmaster Tools](https://www.bing.com/webmasters)
      (can import the verified Search Console property).
- [ ] Do the same for `lemon-agent.dev` (its repo ships the same
      robots.txt + sitemap setup).
- [ ] After a week, check Search Console → Pages for coverage;
      `site:nickdonohue.net` should stop coming back empty.

## Writing workflow

Drafts and published posts share `src/content/blog/`, gated by the `draft: true|false` frontmatter flag. The vault at `~/git/vault/writing/` drives capture, ideation, and shaping; this repo holds the polished output.

See `CLAUDE.md` for the full schema, voice notes, and deploy details.
