import { RequestHandler } from "express";
import { IErrorResponse } from "../types/common";
import { IUpvoteForm, IUpvoteResponse } from "../types/upvoteTypes";
import { addUpvote, removeUpvote } from "../services/UpvoteService";

export const add_upvote_handler: RequestHandler<
  unknown,
  IErrorResponse | IUpvoteResponse,
  IUpvoteForm
> = async (req, res, next) => {
  const { type, associate_id, user_id } = req.body;
  const result: any = await addUpvote({ type, associate_id, user_id });

  res.status(200).json({ success: true, data: { id: result } });
};

export const delete_upvote_handler: RequestHandler<
  { type: "policy" | "reply"; user_id: number; associate_id: number },
  IErrorResponse | IUpvoteResponse
> = async (req, res, next) => {
  const result: any = await removeUpvote(
    req.params.type,
    req.params.user_id,
    req.params.associate_id
  );
  res.status(200).json({ success: result.affectedRows > 0, data: null });
};
