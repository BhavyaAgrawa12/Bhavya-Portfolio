import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";

import validate from "../../middleware/validate.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema,
  setProjectThumbnailSchema,
} from "./project.validation.js";

import {
  create,
  getAll,
  getBySlug,
  getById,
  update,
  remove,
  setProjectThumbnail,
  removeProjectThumbnail,
  addProjectImage,
  getProjectImages,
  deleteProjectImage,
} from "./project.controller.js";

const router = Router();


router.get("/", getAll);
router.get("/id/:id", getById);
router.get("/:slug", getBySlug);


router.post(
  "/",
  authenticate,
  validate(createProjectSchema),
  create
);

router.patch(
  "/:id",
  authenticate,
  validate(updateProjectSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  remove
);


router.post(
  "/:id/thumbnail",
  authenticate,
  validate(setProjectThumbnailSchema),
  setProjectThumbnail
);

router.delete(
  "/:id/thumbnail",
  authenticate,
  removeProjectThumbnail
);

router.post(
  "/:id/images",
  authenticate,
  addProjectImage
);

router.get(
  "/:id/images",
  getProjectImages
);

router.delete(
  "/:projectId/images/:imageId",
  authenticate,
  deleteProjectImage
);

export default router;