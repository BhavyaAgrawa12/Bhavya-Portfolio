import {Router} from "express";

import authRoutes from "../modules/auth/auth.routes.js";

import mediaRoutes from "../modules/media/media.routes.js"

const router = Router();
router.use("/auth",authRoutes);

router.use("/media",mediaRoutes);

export default router;