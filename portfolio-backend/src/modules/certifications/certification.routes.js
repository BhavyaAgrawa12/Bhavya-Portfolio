import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createCertificationSchema,
  updateCertificationSchema,
} from "./certification.validation.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./certification.controller.js";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post(
  "/",
  authenticate,
  validate(createCertificationSchema),
  create
);

router.patch(
  "/:id",
  authenticate,
  validate(updateCertificationSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  remove
);

export default router;