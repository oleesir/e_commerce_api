import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";
import { validateRegisteredUser, validateLoginUser } from "../middleware/validation.middleware";

const router: Router = Router();

router.post("/signup", validateRegisteredUser, asyncHandler(registerUser));
router.post("/login", validateLoginUser, asyncHandler(loginUser));

export default router;
