import { Router } from "express";
import {
	createProduct,
	getAllProducts,
	getSingleProduct,
	deleteProduct,
	updateProduct,
} from "../controllers/product.controller";
import { authorizedRole, isAuth } from "../middleware/authorization.middleware";
import { validateCreateProduct, validateUpdateProduct } from "../middleware/validation.middleware";
import { uploadFile } from "../utils/multer";
import { roles } from "../utils/constants";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.post(
	"/",
	isAuth,
	authorizedRole([roles.ADMIN, roles.SELLER]),
	uploadFile.array("images", 10),
	validateCreateProduct,
	asyncHandler(createProduct),
);
router.get("/:_id", asyncHandler(getSingleProduct));
router.get("/", asyncHandler(getAllProducts));

router.put(
	"/:_id",
	isAuth,
	authorizedRole([roles.ADMIN, roles.SELLER]),
	validateUpdateProduct,
	asyncHandler(updateProduct),
);

router.delete("/:_id", isAuth, authorizedRole([roles.ADMIN, roles.SELLER]), asyncHandler(deleteProduct));

export default router;
