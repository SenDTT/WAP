import { Router } from "express";
import {
  add_handler,
  delete_handler,
  get_a_num_handler,
  get_all_handler,
  update_handler,
} from "./controller";

const router = Router();

router.post("/:n", add_handler);
router.get("", get_all_handler);
router.get("/:index", get_a_num_handler);
router.delete("/:index", delete_handler);
router.put("/:index/:n", update_handler);

export default router;
