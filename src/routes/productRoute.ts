import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
  filterProducts,
} from '../controllers/product.controller';
import { authorizedRoles, checkAuthToken } from '../middleware/authorization.middleware';
import { validateCreateProduct, validateUpdateProduct } from '../middleware/validation.middleware';
import { uploadFile } from '../utils/multer';
import { roles } from '../utils/constants';
import asyncHandler from '../middleware/asyncErrorHandler.middleware';

const router: Router = Router();

router.post(
  '/',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER]),
  uploadFile.array('images', 10),
  validateCreateProduct,
  asyncHandler(createProduct),
);
router.get('/filter', asyncHandler(filterProducts));
router.get('/search', asyncHandler(searchProducts));
router.get('/:_id', asyncHandler(getSingleProduct));
router.get('/', asyncHandler(getAllProducts));

router.patch(
  '/:_id',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER]),
  validateUpdateProduct,
  asyncHandler(updateProduct),
);

router.delete(
  '/:_id',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER]),
  asyncHandler(deleteProduct),
);

export default router;
