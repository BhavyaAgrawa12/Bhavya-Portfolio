import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";

import { create,getAll,getOne,update,remove } from "./skill.controller.js";

import validate from "../../middleware/validate.middleware.js";

import {
  createSkillSchema,
  updateSkillSchema,
} from "./skill.validation.js";

const router = Router();

router.get("/",getAll);
router.get("/:id",getOne);

router.post(
  "/",
  authenticate,
  validate(createSkillSchema),
  create
);
router.patch(
  "/:id",
  authenticate,
  validate(updateSkillSchema),
  update
);
router.delete("/:id",authenticate,remove);

export default router;