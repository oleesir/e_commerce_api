import { Router } from "express";
import { registerUser, loginUser, loggedInUser, googleOAuth, logoutUser } from "../controllers/auth.controller";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";
import { validateRegisteredUser, validateLoginUser } from "../middleware/validation.middleware";

const router: Router = Router();

router.get("/sessions/oauth/google", asyncHandler(googleOAuth));
router.post("/signup", validateRegisteredUser, asyncHandler(registerUser));
router.post("/login", validateLoginUser, asyncHandler(loginUser));
router.get("/logout", asyncHandler(logoutUser));
router.get("/loggedin", asyncHandler(loggedInUser));

export default router;
