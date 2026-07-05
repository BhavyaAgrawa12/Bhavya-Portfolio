import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createAchievementSchema,
  updateAchievementSchema,
} from "./achievement.validation.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./achievement.controller.js";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post(
  "/",
  authenticate,
  validate(createAchievementSchema),
  create
);

router.patch(
  "/:id",
  authenticate,
  validate(updateAchievementSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  remove
);

export default router;