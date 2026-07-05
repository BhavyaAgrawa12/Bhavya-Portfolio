import { z } from "zod";

const optionalStr = z.string().or(z.literal('')).optional();

export const createCertificationSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(150),
  issuer: z.string().trim().min(1, "Issuer is required").max(150),
  credentialId: optionalStr,
  credentialUrl: z.string().url("Invalid credential URL").optional(),
  verificationUrl: z.string().url("Invalid verification URL").optional(),
  issueDate: z.coerce.date().optional().nullable(),
  certificateImageId: optionalStr,
  displayOrder: z.coerce.number().min(0).optional(),
});

export const updateCertificationSchema = createCertificationSchema.partial();
