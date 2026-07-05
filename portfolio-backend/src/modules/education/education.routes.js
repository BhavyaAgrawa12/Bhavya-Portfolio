import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createEducationSchema,
  updateEducationSchema,
} from "./education.validation.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./education.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.post(
  "/",
  authenticate,
  validate(createEducationSchema),
  create
);

router.patch(
  "/:id",
  authenticate,
  validate(updateEducationSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  remove
);

export default router;