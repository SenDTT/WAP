import { Router } from "express";
import {
  validate_add_upvote,
  validate_delete_upvote,
} from "../middlewares/UpvoteMiddleware";
import {
  add_upvote_handler,
  delete_upvote_handler,
} from "../controllers/UpvoteController";
import { checkAuthenticate } from "../middlewares/AuthMiddleware";

const router = Router();
router.use(checkAuthenticate);

router.post("/", validate_add_upvote, add_upvote_handler);
router.delete(
  "/:type/:associate_id/:user_id",
  validate_delete_upvote,
  delete_upvote_handler
);

export default router;
