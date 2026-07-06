import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";

import upload from "../../config/multer.js";

import { upload as uploadController, getAll, remove,getOne, createFromUrl } from "./media.controller.js";

const router = Router();

router.post("/upload", authenticate, upload.single("file"), uploadController);

router.post("/from-url", authenticate, createFromUrl);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getOne);

router.delete("/:id", authenticate, remove);

export default router;