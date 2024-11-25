import { RequestHandler } from "express";

export const get_handler: RequestHandler<
  { book_id: string },
  unknown,
  unknown,
  { lunch: string }
> = (req, res, next) => {
  try {
    // throw new Error("You made a big mistake!!!");
    res.json({
      welcome: req.params.book_id,
      lunch: req.query.lunch,
      header: req.headers["x-class"],
    });
  } catch (e) {
    next(e);
  }
};
