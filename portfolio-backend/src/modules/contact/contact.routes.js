import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import { createContactSchema } from "./contact.validation.js";

import {
  create,
  getAll,
  getById,
  markAsRead,
  remove,
  unreadCount,
} from "./contact.controller.js";

const router = Router();

/* ---------- Public ---------- */

router.post(
  "/",
  validate(createContactSchema),
  create
);

/* ---------- Admin ---------- */

router.get(
  "/unread/count",
  authenticate,
  unreadCount
);

router.get(
  "/",
  authenticate,
  getAll
);

router.get(
  "/:id",
  authenticate,
  getById
);

router.patch(
  "/:id/read",
  authenticate,
  markAsRead
);

router.delete(
  "/:id",
  authenticate,
  remove
);

export default router;