import { Router } from 'express';
import {
  registerUser,
  loginUser,
  loggedInUser,
  googleOAuth,
  logoutUser,
} from '../controllers/auth.controller';
import asyncHandler from '../middleware/asyncErrorHandler.middleware';
import { validate } from '../middleware/validate.middleware';
import { registerSchema } from '../schema/registerSchema';
import { loginSchema } from '../schema/loginSchema';

const router: Router = Router();

router.post('/signup', validate(registerSchema), asyncHandler(registerUser));
router.post('/login', validate(loginSchema), asyncHandler(loginUser));
router.get('/google', asyncHandler(googleOAuth));
router.post('/logout', asyncHandler(logoutUser));
router.get('/me', asyncHandler(loggedInUser));
export default router;
