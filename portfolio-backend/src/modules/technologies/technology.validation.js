import { z } from "zod";

export const createTechnologySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(50),

  iconName: z
    .string()
    .trim()
    .optional(),
});

export const updateTechnologySchema =
  createTechnologySchema.partial();