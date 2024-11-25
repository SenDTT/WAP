import { Router } from "express";
import {
  get_policies_middleware,
  get_policy_middleware,
  validate_add_policy,
  validate_delete_policy,
} from "../middlewares/PolicyMiddleware";
import {
  add_policy_handler,
  delete_policy_handler,
  get_policies_handler,
  get_policy_handler,
  update_policy_handler,
} from "../controllers/PolicyController";
import { checkAuthenticate } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/", get_policies_middleware, get_policies_handler);
router.post("/", checkAuthenticate, validate_add_policy, add_policy_handler);
router.delete(
  "/:id",
  checkAuthenticate,
  validate_delete_policy,
  delete_policy_handler
);
router.put(
  "/:id",
  checkAuthenticate,
  validate_add_policy,
  update_policy_handler
);
router.get("/:id", get_policy_middleware, get_policy_handler);

export default router;
