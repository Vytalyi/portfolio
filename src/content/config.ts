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

const skillsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    skills: z.array(z.string()),
  }),
});

const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      start: z.date(),
      end: z.date().optional().default(new Date()),
      size: z.string().optional(),
      type: z.string(),
      industry: z.string().optional(),
      location: z.string().optional(),
      project: z.string(),
      client: z.string().optional(),
      role: z.string(),
      responsibilities: z.string(),
      skills: z.array(z.string()),
      results: z.array(z.string()),
      images: z.array(image()).optional().default([]),
    }),
});

const socialLinksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export const collections = {
  experience: experienceCollection,
  skills: skillsCollection,
  case_studies: caseStudiesCollection,
  social_links: socialLinksCollection,
};
