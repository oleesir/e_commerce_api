import { Router } from "express";
import { seedProducts } from "../database/seedData";

const router = Router();

router.post("/products", seedProducts);

export default router;
