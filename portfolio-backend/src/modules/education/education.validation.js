import { z } from "zod";

const optionalStr = z.string().or(z.literal('')).optional();

export const createEducationSchema = z.object({
  institution: z.string().trim().min(1).max(150),
  degree: z.string().trim().min(1).max(150),
  field: optionalStr,
  location: optionalStr,
  cgpa: optionalStr,
  description: z.string().or(z.literal('')).optional(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  displayOrder: z.coerce.number().min(0).optional(),
});

export const updateEducationSchema = createEducationSchema.partial();
