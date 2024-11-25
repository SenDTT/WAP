import { Router } from "express";
import { get_users } from "../controllers/UserController";
import { checkAuthenticate } from "../middlewares/AuthMiddleware";

const router = Router();
router.use(checkAuthenticate);
// Get all users
router.get("/", get_users);

export default router;
