import { Router } from "express";
import { getAllUsers, getUser, updateUser, updateProfile, deleteUser } from "../controllers/users.controller";
import { authorizedRole, isAuth } from "../middleware/authorization.middleware";
import { validateUpdatedUser, validateUserProfile } from "../middleware/validation.middleware";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";
import { roles } from "../utils/constants";

const router: Router = Router();

router.get("/", isAuth, authorizedRole([roles.ADMIN]), asyncHandler(getAllUsers));
router.get("/:_id", isAuth, authorizedRole([roles.ADMIN]), asyncHandler(getUser));
router.put("/:_id", isAuth, authorizedRole([roles.ADMIN]), validateUpdatedUser, asyncHandler(updateUser));
router.put(
	"/:_id",
	isAuth,
	authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
	validateUserProfile,
	asyncHandler(updateProfile),
);
router.delete("/:_id", isAuth, authorizedRole([roles.ADMIN]), asyncHandler(deleteUser));

export default router;
