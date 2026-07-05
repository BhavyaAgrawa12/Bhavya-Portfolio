import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createInternshipSchema,
  updateInternshipSchema,
} from "./internship.validation.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./internship.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.post(
  "/",
  authenticate,
  validate(createInternshipSchema),
  create
);

router.patch(
  "/:id",
  authenticate,
  validate(updateInternshipSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  remove
);

export default router;