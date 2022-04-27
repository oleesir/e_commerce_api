import { Router } from "express";
import authRoute from "./authRoute";
import usersRoute from "./usersRoute";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", usersRoute);

export default router;
