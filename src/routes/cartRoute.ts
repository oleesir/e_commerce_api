import { Router } from "express";
import { addItemToCart } from "../controllers/cart.controller";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import { roles } from "../utils/constants";
import { authorizedRole, isAuth } from "../middleware/authorization.middleware";

const router: Router = Router();

router.post("/", isAuth, authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]), asyncErrorHandler(addItemToCart));

export default router;
