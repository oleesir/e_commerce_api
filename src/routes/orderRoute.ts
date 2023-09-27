import express, { Router } from 'express';
import { authorizedRoles, checkAuthToken } from '../middleware/authorization.middleware';
import { roles } from '../utils/constants';
import asyncErrorHandler from '../middleware/asyncErrorHandler.middleware';
import {
  getUserOrder,
  stripeWebhook,
  placeOrder,
  getUserOrders,
} from '../controllers/order.controller';

const router = Router();

router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

router.post(
  '/create_order',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncErrorHandler(placeOrder),
);

router.get(
  '/:_id',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.CUSTOMER]),
  asyncErrorHandler(getUserOrder),
);

router.get(
  '/',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.CUSTOMER]),
  asyncErrorHandler(getUserOrders),
);

export default router;
