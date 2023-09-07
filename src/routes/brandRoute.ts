import { Router } from 'express';
import asyncErrorHandler from '../middleware/asyncErrorHandler.middleware';
import { getAllBrands } from '../controllers/brand.controller';

const router = Router();

router.get('/', asyncErrorHandler(getAllBrands));

export default router;
