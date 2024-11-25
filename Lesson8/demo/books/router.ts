import { Router } from "express";
import { get_handler } from "./controller";

const router = Router();

router.get("/:book_id", get_handler);

export default router;
