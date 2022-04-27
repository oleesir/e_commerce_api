import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/users.controller";
import { isAdmin, isAuth } from "../middleware/authorization.middleware";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.get("/", isAuth, isAdmin, asyncHandler(getAllUsers));
router.get("/:_id", isAuth, isAdmin, asyncHandler(getUser));

export default router;
