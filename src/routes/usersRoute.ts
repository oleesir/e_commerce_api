import { Router } from "express";
import { getAllUsers, getUser, updateUser, updateProfile, deleteUser } from "../controllers/users.controller";
import { isAdmin, isAuth } from "../middleware/authorization.middleware";
import { validateUpdatedUser, validateUserProfile } from "../middleware/validation.middleware";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.put("/:_id", isAuth, validateUserProfile, asyncHandler(updateProfile));
router.get("/", isAuth, isAdmin, asyncHandler(getAllUsers));
router.get("/:_id", isAuth, isAdmin, asyncHandler(getUser));
router.put("/:_id", isAuth, isAdmin, validateUpdatedUser, asyncHandler(updateUser));
router.delete("/:_id", isAuth, isAdmin, asyncHandler(deleteUser));

export default router;
