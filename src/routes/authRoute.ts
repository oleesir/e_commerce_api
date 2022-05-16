import { Router } from "express";
import { registerUser, loginUser, loggedInUser } from "../controllers/auth.controller";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";
import { validateRegisteredUser, validateLoginUser } from "../middleware/validation.middleware";

const router: Router = Router();

router.post("/signup", validateRegisteredUser, asyncHandler(registerUser));
router.post("/login", validateLoginUser, asyncHandler(loginUser));
router.get("/loggedin", asyncHandler(loggedInUser));

export default router;
