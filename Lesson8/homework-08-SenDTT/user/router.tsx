import { Router } from "express";
import { add_user_handler } from "./controller";

const router = Router();

router.post('/', (req, res, next) => {
    console.log(req.params, req.body, req.query);
    next();
}, add_user_handler);

export default router;