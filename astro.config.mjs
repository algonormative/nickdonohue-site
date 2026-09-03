// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
	site: 'https://algonormative.net',
	integrations: [mdx(), sitemap()],
	markdown: {
		remarkPlugins: [remarkMath, [remarkToc, { heading: 'contents', maxDepth: 3 }]],
		rehypePlugins: [rehypeKatex],
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark-dimmed',
			},
			wrap: true,
		},
	},
});
