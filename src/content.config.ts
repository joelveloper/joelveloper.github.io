import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const httpsUrl = z.string().refine(
  (value) => {
    try {
      return new URL(value).protocol === 'https:';
    } catch {
      return false;
    }
  },
  { message: 'Debe ser una URL HTTPS válida.' },
);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(3).max(120),
    cardTitle: z.string().min(1).max(40),
    summary: z.string().min(80).max(280),
    category: z.enum(['saas', 'client']),
    status: z.enum(['production', 'development', 'prelaunch']),
    featuredOrder: z.number().int().positive(),
    technologies: z.array(z.string().min(1)).default([]),
    repositoryVisibility: z.literal('private'),
    caseStudyStage: z.enum(['outline', 'documented', 'verified']),
    cardApproved: z.boolean(),
    publicApproved: z.boolean(),
    externalUrl: httpsUrl.optional(),
    image: z
      .object({
        src: z.string().refine((value) => value.startsWith('/'), {
          message: 'La ruta de la imagen debe ser absoluta desde la raíz pública.',
        }),
        alt: z.string().min(10),
        usageApproved: z.boolean(),
      })
      .optional(),
    lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato esperado: YYYY-MM-DD'),
    facts: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          evidenceNote: z.string().min(1),
        }),
      )
      .optional(),
  }),
});

export const collections = { projects };
