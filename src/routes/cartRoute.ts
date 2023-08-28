import { Router } from 'express';
import {
  addItemToCart,
  deleteCart,
  getUserCartItems,
  reduceItemsInCart,
  removeItemsInCart,
} from '../controllers/cart.controller';
import asyncErrorHandler from '../middleware/asyncErrorHandler.middleware';
import { roles } from '../utils/constants';
import { authorizedRoles, checkAuthToken } from '../middleware/authorization.middleware';

const router: Router = Router();

router.post(
  '/',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncErrorHandler(addItemToCart),
);

router.post(
  '/decrease',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncErrorHandler(reduceItemsInCart),
);

router.get(
  `/user_cart/:_id`,
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncErrorHandler(getUserCartItems),
);

router.delete(
  '/remove',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncErrorHandler(removeItemsInCart),
);

router.delete(
  '/delete_cart/:cartId',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncErrorHandler(deleteCart),
);

export default router;
