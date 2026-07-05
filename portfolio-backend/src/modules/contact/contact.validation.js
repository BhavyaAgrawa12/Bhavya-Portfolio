import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(100),

  email: z
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .optional(),

  subject: z
    .string()
    .trim()
    .max(200)
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});