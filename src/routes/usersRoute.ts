import { Router } from "express";
import { getAllUsers } from "../controllers/users.controller";
import { isAdmin, isAuth } from "../middleware/authorization.middleware";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.get("/", isAuth, isAdmin, asyncHandler(getAllUsers));

export default router;
