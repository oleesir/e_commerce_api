import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  searchCities,
  getAllProvinces,
  getProvince,
  getAllCities,
} from '../controllers/users.controller';
import { authorizedRoles, checkAuthToken } from '../middleware/authorization.middleware';
import asyncHandler from '../middleware/asyncErrorHandler.middleware';
import { roles } from '../utils/constants';
import { validate } from '../middleware/validate.middleware';
import { updateUserSchema } from '../schema/updateUserSchema';

const router: Router = Router();

router.get('/', checkAuthToken, authorizedRoles([roles.ADMIN]), asyncHandler(getAllUsers));
router.get(
  '/province/:_id',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncHandler(getProvince),
);
router.get(
  '/cities',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncHandler(getAllCities),
);
router.get(
  '/provinces',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncHandler(getAllProvinces),
);
router.get(
  '/search/cities',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncHandler(searchCities),
);
router.get(
  '/:_id',
  checkAuthToken,
  authorizedRoles([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
  asyncHandler(getUser),
);
router.put(
  '/:_id',
  checkAuthToken,
  authorizedRoles([roles.ADMIN]),
  validate(updateUserSchema),
  asyncHandler(updateUser),
);

// getAllCities

router.delete('/:_id', checkAuthToken, authorizedRoles([roles.ADMIN]), asyncHandler(deleteUser));

export default router;
