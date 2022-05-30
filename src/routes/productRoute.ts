import { Router } from "express";
import {
	createProduct,
	searchProducts,
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
	uploadFile.single("image"),
	validateCreateProduct,
	asyncHandler(createProduct),
);
router.get(
	"/:_id",
	isAuth,
	authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
	asyncHandler(getSingleProduct),
);
router.get("/", isAuth, authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]), asyncHandler(getAllProducts));
router.get(
	"/catalog",
	isAuth,
	authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
	asyncHandler(searchProducts),
);

router.put(
	"/:_id",
	isAuth,
	authorizedRole([roles.ADMIN, roles.SELLER]),
	validateUpdateProduct,
	asyncHandler(updateProduct),
);

router.delete("/:_id", isAuth, authorizedRole([roles.ADMIN, roles.SELLER]), asyncHandler(deleteProduct));

export default router;
