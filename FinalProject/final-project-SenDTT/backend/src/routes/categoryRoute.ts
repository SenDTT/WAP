import { Router } from "express";
import { get_categories_middleware } from "../middlewares/CategoryMiddleware";
import { get_all_categories } from "../controllers/CategoryController";

const router = Router();

router.get("/", get_categories_middleware, get_all_categories);

export default router;
