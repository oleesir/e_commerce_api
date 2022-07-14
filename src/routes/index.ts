import { Router } from "express";
import authRoute from "./authRoute";
import cartRoute from "./cartRoute";
import usersRoute from "./usersRoute";
import productRoute from "./productRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/carts", cartRoute);
router.use("/products", productRoute);

export default router;
