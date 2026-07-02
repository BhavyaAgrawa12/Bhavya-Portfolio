import {Router} from "express";

import {login, me, logout} from "./auth.controller.js";

import validate from "../../middleware/validate.middleware.js";
import authenticate from "../../middleware/auth.middleware.js";
import {loginSchema} from "./auth.validation.js";

const router = Router();

router.post("/login", validate(loginSchema),login);
router.get("/me",authenticate, me);
router.post("/logout", authenticate, logout);

export default router;