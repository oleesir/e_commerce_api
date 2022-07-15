import { Router } from "express";
import { addItemToCart, reduceItemsInCart } from "../controllers/cart.controller";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import { roles } from "../utils/constants";
import { authorizedRole, isAuth } from "../middleware/authorization.middleware";

const router: Router = Router();

router.post("/", isAuth, authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]), asyncErrorHandler(addItemToCart));
router.post(
	"/decrease",
	isAuth,
	authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
	asyncErrorHandler(reduceItemsInCart),
);

export default router;
