import { Router } from 'express';
import authRoute from './authRoute';
import cartRoute from './cartRoute';
import usersRoute from './usersRoute';
import orderRoute from './orderRoute';
import productRoute from './productRoute';
import categoryRoute from './categoryRoute';
import brandRoute from './brandRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/carts', cartRoute);
router.use('/categories', categoryRoute);
router.use('/brands', brandRoute);
router.use('/orders', orderRoute);
router.use('/products', productRoute);

export default router;
