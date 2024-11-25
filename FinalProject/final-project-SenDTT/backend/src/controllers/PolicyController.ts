import { RequestHandler } from "express";
import {
  IErrorResponse,
  IGetListQueries,
  IResponseData,
} from "../types/common";
import {
  IListPoliciesReponse,
  IPolicyForm,
  IPolicyReponse,
} from "../types/policyTypes";
import {
  addPolicy,
  deletePolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
} from "../services/PolicyService";
import { getUserByEmail } from "../services/UserService";

export const get_policies_handler: RequestHandler<
  unknown,
  IListPoliciesReponse | IErrorResponse,
  unknown,
  IGetListQueries
> = async (req, res, next) => {
  const { limit, offset, search, year, category } = req.query;

  let currentUser = null;
  if (req.headers["authentication"]) {
    const authentication = (req.headers["authentication"] as string).split(".");
    const enc_data = authentication[0];
    if (enc_data) {
      const decoded_data = JSON.parse(
        Buffer.from(enc_data, "base64").toString("utf-8")
      );
      currentUser = await getUserByEmail(decoded_data.email);
    }
  }

  try {
    const { data, totalCount } = await getPolicies({
      limit,
      offset,
      search,
      category,
      year,
      userId: currentUser ? currentUser.id : null,
    });
    res
      .status(200)
      .json({ success: true, data: { rows: data, count: totalCount } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }

    throw error;
  }
};

export const get_policy_handler: RequestHandler<
  { id: number },
  IErrorResponse | IPolicyReponse
> = async (req, res, next) => {
  let currentUser = null;
  if (req.headers["authentication"]) {
    console.log(req.headers["authentication"]);
    const authentication = (req.headers["authentication"] as string).split(".");
    const enc_data = authentication[0];
    const decoded_data = JSON.parse(
      Buffer.from(enc_data, "base64").toString("utf-8")
    );
    currentUser = await getUserByEmail(decoded_data.email);
  }

  try {
    const result: any = await getPolicyById(
      req.params.id,
      currentUser ? currentUser.id : null
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }

    throw error;
  }
};

export const delete_policy_handler: RequestHandler<
  { id: number },
  IErrorResponse | IResponseData
> = async (req, res, next) => {
  try {
    const result: any = await deletePolicy(req.params.id);

    res.status(200).json({ success: result.affectedRows > 0, data: null });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }

    throw error;
  }
};

export const add_policy_handler: RequestHandler<
  unknown,
  IPolicyReponse | IErrorResponse,
  IPolicyForm,
  unknown
> = async (req, res, next) => {
  const { title, body, category_id, owner_id } = req.body;
  try {
    const result: any = await addPolicy({
      title,
      body,
      category_id,
      owner_id,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }

    throw error;
  }
};

export const update_policy_handler: RequestHandler<
  { id: number },
  IPolicyReponse | IErrorResponse,
  IPolicyForm,
  unknown
> = async (req, res, next) => {
  const { title, body, category_id, owner_id } = req.body;
  try {
    const result: any = await updatePolicy({
      title,
      body,
      category_id,
      owner_id,
      id: req.params.id,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }

    throw error;
  }
};
