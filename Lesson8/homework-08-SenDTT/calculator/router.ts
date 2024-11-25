import { Router } from "express";
import { calculator_handler } from "./controller";
import { getOperands } from "./middleware";

const router = Router();

router.get("/:operation/:a/:b", getOperands, calculator_handler);
router.get("/:operation", getOperands, calculator_handler);
router.post("/:operation", getOperands, calculator_handler);

export default router;
