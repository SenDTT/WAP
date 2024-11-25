import { RequestHandler } from "express";
import { getAllUsers } from "../services/UserService";
import { IErrorResponse, IResponseData } from "../types/common";

export const get_users: RequestHandler<
  unknown,
  IErrorResponse | IResponseData
> = async (req, res, next) => {
  const results = await getAllUsers();
  res.status(200).json({ success: true, data: results });
};
