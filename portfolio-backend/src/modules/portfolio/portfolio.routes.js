import { Router } from "express";
import authenticate from "../../middleware/auth.middleware.js";

import { getPortfolio, updatePortfolio } from "./portfolio.controller.js";

const router = Router();

router.get("/",getPortfolio);
router.patch("/",authenticate,updatePortfolio);

export default router;