import { RequestHandler } from "express";
import { getNumbers } from "./controller";

export const getOperands: RequestHandler = (req, res, next) => {
  getNumbers(req);
  next();
};
