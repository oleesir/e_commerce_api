import { Router } from "express";
import seedUsersRoute from "./seedUsersRoute";
import seedProductsRoute from "./seedProductsRoute";

const router = Router();

router.use("/seed", seedUsersRoute);
router.use("/seed", seedProductsRoute);

export default router;
