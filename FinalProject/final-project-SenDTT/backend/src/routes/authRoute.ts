import { Router } from "express";
import { loginController, signupController } from "../controllers/AuthController";
import { login_validator, signup_validator } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/login", login_validator, loginController);
router.post("/signup", signup_validator, signupController);

export default router;
