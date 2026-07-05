import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().trim().min(3).max(150),

  category: z.enum([
    "FULL_STACK",
    "FRONTEND",
    "BACKEND",
    "ACADEMIC",
    "PERSONAL",
  ]),

  status: z.enum([
    "LIVE",
    "IN_DEVELOPMENT",
    "ARCHIVED",
  ]),

  featured: z.boolean().optional(),

  shortDescription: z.string().min(10),

  description: z.string().min(20),

  githubUrl: z.string().url().optional(),

  liveUrl: z.string().url().optional(),

  thumbnailId: z.string().optional(),

  features: z.array(z.string()).optional(),

  challenges: z.array(z.string()).optional(),

  learnings: z.array(z.string()).optional(),

  displayOrder: z.coerce.number().min(0).optional(),

  technologies: z.array(z.string()).optional(),
});

export const updateProjectSchema =
  createProjectSchema.partial();

export const setProjectThumbnailSchema = z.object({
  thumbnailId: z.string().trim().min(1),
});