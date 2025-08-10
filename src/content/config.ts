import { defineCollection, z } from 'astro:content';

const testimonials = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    author: z.string(),
    position: z.string(),
    image: z.union([z.string(), image()]),
  }),
});

export const collections = {
  testimonials,
};