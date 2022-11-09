import {Router} from "express";
import {authorizedRole, isAuth} from "../middleware/authorization.middleware";
import {roles} from "../utils/constants";
import asyncErrorHandler from "../middleware/asyncErrorHandler.middleware";
import {createOrder} from "../controllers/order.controller";

const router = Router();


router.post("/", isAuth, authorizedRole([roles.ADMIN, roles.SELLER, roles.CUSTOMER]), asyncErrorHandler(createOrder));

export default router