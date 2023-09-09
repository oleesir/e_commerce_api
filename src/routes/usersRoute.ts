import { Router } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/users.controller';
import { authorizedRoles, checkAuthToken } from '../middleware/authorization.middleware';
import asyncHandler from '../middleware/asyncErrorHandler.middleware';
import { roles } from '../utils/constants';
import { validate } from '../middleware/validate.middleware';
import { updateUserSchema } from '../schema/updateUserSchema';

const router: Router = Router();

router.get('/', checkAuthToken, authorizedRoles([roles.ADMIN]), asyncHandler(getAllUsers));
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

router.delete('/:_id', checkAuthToken, authorizedRoles([roles.ADMIN]), asyncHandler(deleteUser));

export default router;
