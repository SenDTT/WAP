import { RequestHandler } from "express";
import { IErrorResponse, IGetListQueries } from "../types/common";
import { trim } from "validator";
import { IPolicyForm, IPolicyReponse } from "../types/policyTypes";
import validator from "validator";
import { getCategoryById } from "../services/CategogyService";
import { getUserById } from "../services/UserService";
import { getPolicyById } from "../services/PolicyService";

export const get_policies_middleware: RequestHandler<
  unknown,
  IErrorResponse,
  unknown,
  IGetListQueries
> = (req, res, next) => {
  req.query.limit = req.query.limit ?? 10;
  req.query.offset = req.query.offset ?? 0;
  req.query.year = req.query.year ?? new Date().getFullYear();
  req.query.search = req.query.search ? trim(req.query.search) : "";
  next();
};

export const validate_delete_policy: RequestHandler<{ id: number }> = async (
  req,
  res,
  next
) => {
  const policy = await getPolicyById(req.params.id);
  if (!policy) {
    res.status(404).json({ success: false, message: "Policy not found!" });
    return;
  }
  next();
};

export const get_policy_middleware: RequestHandler<
  { id: number },
  IErrorResponse | IPolicyReponse
> = async (req, res, next) => {
  const data = await getPolicyById(req.params.id);
  if (!data) {
    res.status(404).json({ success: false, message: "Policy not found" });
  }
  next();
};

export const validate_add_policy: RequestHandler<
  unknown,
  IPolicyReponse | IErrorResponse,
  IPolicyForm,
  unknown
> = async (req, res, next) => {
  const { title, body, category_id, owner_id } = req.body;

  if (validator.isEmpty(title)) {
    res
      .status(400)
      .json({ success: false, message: "Title must be required!" });
    return;
  }

  if (validator.isEmpty(body)) {
    res.status(400).json({ success: false, message: "Body must be required!" });
    return;
  }

  if (!validator.isNumeric(String(category_id))) {
    res
      .status(400)
      .json({ success: false, message: "Category must be numeric!" });
    return;
  }

  const category = await getCategoryById(category_id);
  if (!category) {
    res
      .status(400)
      .json({ success: false, message: "Category does not exist!" });
    return;
  }

  if (!validator.isNumeric(String(owner_id))) {
    res.status(400).json({ success: false, message: "Owner must be numeric!" });
    return;
  }

  const user = await getUserById(owner_id);
  if (!user) {
    res.status(400).json({ success: false, message: "Owner does not exist!" });
    return;
  }

  next();
};
