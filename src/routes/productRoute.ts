import { Router } from "express";
import {
	createProduct,
	searchProducts,
	getAllProducts,
	getSingleProduct,
	deleteProduct,
} from "../controllers/product.controller";
import { authorizedRole, isAuth } from "../middleware/authorization.middleware";
import { validateCreateProduct } from "../middleware/validation.middleware";
import { uploadFile } from "../utils/multer";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.post(
	"/",
	isAuth,
	authorizedRole(["admin"]),
	uploadFile.single("image"),
	validateCreateProduct,
	asyncHandler(createProduct),
);
router.get("/:_id", isAuth, authorizedRole(["admin", "client"]), asyncHandler(getSingleProduct));
router.get("/", isAuth, authorizedRole(["admin", "client"]), asyncHandler(getAllProducts));
router.get("/catalog", isAuth, authorizedRole(["admin", "client"]), asyncHandler(searchProducts));
router.delete("/:_id", isAuth, authorizedRole(["admin"]), asyncHandler(deleteProduct));

export default router;
