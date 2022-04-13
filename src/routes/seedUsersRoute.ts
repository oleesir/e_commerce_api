import { Router } from "express";
import { seedUsers } from "../database/seedData";

const router = Router();

router.post("/users", seedUsers);

export default router;
