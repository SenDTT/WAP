import { RequestHandler } from "express";
import { IErrorResponse, IGetListQueries } from "../types/common";
import { trim } from "validator";

export const get_categories_middleware: RequestHandler<
  unknown,
  IErrorResponse,
  unknown,
  IGetListQueries
> = (req, res, next) => {
  req.query.limit = req.query.limit ?? 10;
  req.query.offset = req.query.offset ?? 0;
  req.query.search = req.query.search ? trim(req.query.search) : "";
  next();
};
