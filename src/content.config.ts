import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).optional(),
			series: z.string().optional(),
			canonical: z.string().url().optional(),
			tweet: z.string().optional(),
		}),
});

// Molt: machine-written. Same shape as blog, plus provenance — which agent
// wrote it and what reviewed it. A separate collection rather than a flag on
// blog, so the authorship boundary is structural and can't be lost in a filter.
const molt = defineCollection({
	loader: glob({ base: './src/content/molt', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).optional(),
			series: z.string().optional(),
			canonical: z.string().url().optional(),
			agent: z.string(),
			reviewedBy: z.string().optional(),
		}),
});

export const collections = { blog, molt };
