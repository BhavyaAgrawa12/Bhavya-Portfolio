import { z } from "zod";

const optionalStr = z.string().or(z.literal('')).optional();

export const createInternshipSchema = z.object({
  company: z.string().trim().min(1).max(100),
  position: z.string().trim().min(1).max(100),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "FREELANCE"]),
  location: optionalStr,
  description: z.string().or(z.literal('')).optional(),
  companyWebsite: z.string().url().optional(),
  logoId: optionalStr,
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  displayOrder: z.coerce.number().min(0).optional(),
});

export const updateInternshipSchema = createInternshipSchema.partial();
