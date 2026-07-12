import {Router} from "express";

import authRoutes from "../modules/auth/auth.routes.js";

import mediaRoutes from "../modules/media/media.routes.js"

import portfolioRoutes from "../modules/portfolio/portfolio.routes.js"

import skillRoutes from "../modules/skills/skill.routes.js"

import educationRoutes from "../modules/education/education.routes.js"

import internshipRoutes from "../modules/internships/internship.routes.js"

import certificationRoutes from "../modules/certifications/certification.routes.js"

import achievementRoutes from "../modules/achievements/achievement.routes.js"

import technologyRoutes from "../modules/technologies/technology.routes.js"

import projectRoutes from "../modules/projects/project.routes.js"

import contactRoutes from "../modules/contact/contact.routes.js"

import dashboardRoutes from "../modules/dashboard/dashboard.routes.js"

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    status: "Server Running",
  });
});

router.use("/auth",authRoutes);

router.use("/media",mediaRoutes);

router.use("/portfolio",portfolioRoutes);

router.use("/skills",skillRoutes);

router.use("/education",educationRoutes);

router.use("/internships",internshipRoutes);

router.use("/certifications",certificationRoutes);

router.use("/achievements",achievementRoutes);

router.use("/technologies",technologyRoutes);

router.use("/projects",projectRoutes);

router.use("/contacts",contactRoutes);

router.use("/dashboard",dashboardRoutes);

export default router;