import { Router } from 'express';
import asyncErrorHandler from '../middleware/asyncErrorHandler.middleware';
import { getAllCategories } from '../controllers/category.controller';

const router = Router();

router.get('/', asyncErrorHandler(getAllCategories));

export default router;
