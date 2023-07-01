import { z, defineCollection } from 'astro:content';

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    yearStart: z.number(),
    yearEnd: z.number().optional().default(new Date().getFullYear()),
    company: z.string(),
    position: z.string(),
    now: z.boolean().optional().default(false),
  }),
});

export const collections = {
  experience: experienceCollection,
};
