import { z } from 'zod';

export const HeroStatementSchema = z.object({
  id: z.string().optional(), // Firestore document ID
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  ctaText: z.string().min(1, "CTA text is required."),
  ctaLink: z.string().min(1, "CTA link is required."),
  ctaIconName: z.string().optional(),
  ctaVariant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'accent']).optional(),
  order: z.number().int().default(0), // To control the order of statements
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type HeroStatement = z.infer<typeof HeroStatementSchema>;

// Schema for Core Values
export const CoreValueSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required."),
  explanation: z.string().min(1, "Explanation is required."),
  iconName: z.string().min(1, "Icon name is required."),
  order: z.number().int().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CoreValue = z.infer<typeof CoreValueSchema>;

// Schema for Pillars
export const PillarSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  link: z.string().url("Must be a valid URL."),
  iconName: z.string().min(1, "Icon name is required."),
  order: z.number().int().default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Pillar = z.infer<typeof PillarSchema>;
