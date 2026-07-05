import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createTechnologySchema,
  updateTechnologySchema,
} from "./technology.validation.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./technology.controller.js";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post(
  "/",
  authenticate,
  validate(createTechnologySchema),
  create
);

router.patch(
  "/:id",
  authenticate,
  validate(updateTechnologySchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  remove
);

export default router;