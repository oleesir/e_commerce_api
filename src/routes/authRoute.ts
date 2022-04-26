import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";
import { validateRegisteredUser } from "../middleware/validation.middleware";

const router: Router = Router();

router.post("/", validateRegisteredUser, asyncHandler(registerUser));

export default router;
