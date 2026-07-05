import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required").max(50),

  category: z.enum([
    "FRONTEND",
    "BACKEND",
    "DATABASE",
    "DEVOPS",
    "LANGUAGE",
    "TOOL",
  ]),

  iconName: z.string().optional(),

  proficiency: z.coerce.number().min(0).max(100).optional(),

  displayOrder: z.coerce.number().min(0).optional(),
});

export const updateSkillSchema = createSkillSchema.partial();