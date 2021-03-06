import {Router} from "express";
import {addItemToCart, getUserCartItems, reduceItemsInCart, removeItemsInCart} from "../controllers/cart.controller";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {roles} from "../utils/constants";
import {authorizedRole, isAuth} from "../middleware/authorization.middleware";

const router: Router = Router();

router.post("/", isAuth, authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]), asyncErrorHandler(addItemToCart));

router.post(
    "/decrease",
    isAuth,
    authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
    asyncErrorHandler(reduceItemsInCart),
);


router.get("/user_cart", isAuth, authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]), asyncErrorHandler(getUserCartItems));

router.delete(
    "/remove/:productId",
    isAuth,
    authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]),
    asyncErrorHandler(removeItemsInCart),
);

export default router;
