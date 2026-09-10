import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      permalink: z.string().optional(),
      categories: z.array(z.string()).optional(),
    }),
});

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      name: z.string(),
      tagline: z.string().default(""),
      company: z.string().default(""),
      years: z.string().default(""),
      type: z.string(),
      role: z.string().default(""),
      roleGroup: z.string().default(""),
      industries: z.array(z.string()).default([]),
      technologies: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      themes: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      metrics: z.string().default(""),
      links: z.array(z.string()).default([]),
    }),
});

const testimonials = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({
    base: "./src/content/testimonials",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      position: z.string(),
      image: image(),
    }),
});

const experience = defineCollection({
  loader: glob({
    base: "./src/content/experience",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: () =>
    z.object({
      company: z.string(),
      title: z.string(),
      type: z.string().default("employment"),
      period: z.string().default(""),
      start: z.string().default(""),
      environment: z.array(z.string()).default([]),
      links: z.array(z.string()).default([]),
      umbrella: z.boolean().default(false),
    }),
});

export const collections = { blog, projects, testimonials, experience };
