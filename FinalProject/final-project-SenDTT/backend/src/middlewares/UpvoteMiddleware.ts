import { RequestHandler } from "express";
import { IErrorResponse } from "../types/common";
import { IUpvoteForm, IUpvoteResponse } from "../types/upvoteTypes";
import validator from "validator";
import { getUserById } from "../services/UserService";
import { getPolicyById } from "../services/PolicyService";
import { getUpvoteById, getUpvoteByUserId } from "../services/UpvoteService";

export const validate_add_upvote: RequestHandler<
  unknown,
  IUpvoteResponse | IErrorResponse,
  IUpvoteForm
> = async (req, res, next) => {
  const { type, associate_id, user_id } = req.body;

  if (type != "policy" && type != "reply") {
    res
      .status(400)
      .json({ success: false, message: "Type must be 'policy' or 'reply'" });
    return;
  }

  if (!validator.isNumeric(String(user_id))) {
    res.status(400).json({ success: false, message: "User must be numeric!" });
    return;
  }

  const user = await getUserById(user_id);
  if (!user) {
    res.status(400).json({ success: false, message: "User does not exist!" });
    return;
  }

  if (!validator.isNumeric(String(associate_id))) {
    res
      .status(400)
      .json({ success: false, message: "Associate must be numeric!" });
    return;
  }

  const policy = await getPolicyById(associate_id);
  if (!policy) {
    res.status(400).json({ success: false, message: "Policy does not exist!" });
    return;
  }

  const upvote = await getUpvoteByUserId(type, user_id, associate_id);
  if (upvote) {
    res.status(400).json({
      success: false,
      message: "This user already votes for this policy",
    });
    return;
  }

  // @TODO should validate associate_id if type = reply

  next();
};

export const validate_delete_upvote: RequestHandler<
  { type: "policy" | "reply"; user_id: number; associate_id: number },
  IErrorResponse | IUpvoteResponse
> = async (req, res, next) => {
  const upvote = await getUpvoteByUserId(
    req.params.type,
    req.params.user_id,
    req.params.associate_id
  );
  if (!upvote) {
    res.status(400).json({ success: false, message: "Upvote does not exist!" });
    return;
  }
  next();
};
