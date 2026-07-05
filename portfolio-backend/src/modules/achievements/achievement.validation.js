import { z } from "zod";

// Zod v4: z.string() now rejects empty strings by default.
// Use z.string().or(z.literal('')) for fields that can be blank,
// and z.coerce.date() instead of z.string().datetime() for dates.

export const createAchievementSchema = z.object({
  title: z.string().trim().min(1).max(150),
  description: z.string().or(z.literal('')).optional(),
  date: z.coerce.date().optional().nullable(),
  imageId: z.string().optional(),
  displayOrder: z.coerce.number().min(0).optional(),
});

export const updateAchievementSchema = createAchievementSchema.partial();
