import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { isAdmin, isAuth } from "../middleware/authorization.middleware";
import { validateCreateProduct } from "../middleware/validation.middleware";
import { uploadFile } from "../utils/multer";
import asyncHandler from "../middleware/asyncErrorHandler.middleware";

const router: Router = Router();

router.post("/", isAuth, isAdmin, uploadFile.single("image"), validateCreateProduct, asyncHandler(createProduct));

export default router;
