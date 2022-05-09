import { Router } from "express";
import { getAllUsers, getUser, updateUser, updateProfile, deleteUser } from "../controllers/users.controller";
import { authorizedRole, isAuth } from "../middleware/authorization.middleware";
import { validateUpdatedUser, validateUserProfile } from "../middleware/validation.middleware";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.put("/:_id", isAuth, validateUserProfile, asyncHandler(updateProfile));
router.get("/", isAuth, authorizedRole(["admin"]), asyncHandler(getAllUsers));
router.get("/:_id", isAuth, authorizedRole(["admin"]), asyncHandler(getUser));
router.put("/:_id", isAuth, authorizedRole(["admin"]), validateUpdatedUser, asyncHandler(updateUser));
router.delete("/:_id", isAuth, authorizedRole(["admin"]), asyncHandler(deleteUser));

export default router;
