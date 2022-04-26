import { Router } from "express";
import authRoute from "./authRoute";

const router = Router();

router.use("/users", authRoute);

export default router;
