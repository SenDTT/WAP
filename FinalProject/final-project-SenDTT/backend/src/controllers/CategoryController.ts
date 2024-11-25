import { RequestHandler } from "express";
import { IErrorResponse, IGetListQueries } from "../types/common";
import { IListCategoriesReponse } from "../types/categoryTypes";
import { getCategories } from "../services/CategogyService";

export const get_all_categories: RequestHandler<
  unknown,
  IListCategoriesReponse | IErrorResponse,
  unknown,
  IGetListQueries
> = async (req, res, next) => {
  try {
    const results = await getCategories();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    }

    next(error);
  }
};
