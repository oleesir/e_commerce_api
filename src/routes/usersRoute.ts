import { Router } from "express";
import { getAllUsers, getUser, updateUser } from "../controllers/users.controller";
import { isAdmin, isAuth } from "../middleware/authorization.middleware";
import { validateUpdatedUser } from "../middleware/validation.middleware";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.get("/", isAuth, isAdmin, asyncHandler(getAllUsers));
router.get("/:_id", isAuth, isAdmin, asyncHandler(getUser));
router.put("/:_id", isAuth, isAdmin, validateUpdatedUser, asyncHandler(updateUser));

export default router;
