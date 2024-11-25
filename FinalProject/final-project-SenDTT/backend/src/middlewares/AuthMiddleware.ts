import { RequestHandler } from "express";
import validator from "validator";
import { getUserByEmail } from "../services/UserService";
import bcrypt from "bcryptjs";
import { USER_OBJECT } from "../types/userTypes";
import { createHmac } from "node:crypto";
import { IErrorResponse, IResponseData } from "../types/common";
import { ISignupBody } from "../types/authTypes";

export const login_validator: RequestHandler<
  unknown,
  IErrorResponse | IResponseData,
  { email: string; password: string }
> = async (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmpty(email)) {
    res
      .status(400)
      .json({ success: false, message: "Email must be required!" });
    return;
  }
  if (validator.isEmpty(password)) {
    res
      .status(400)
      .json({ success: false, message: "Password must be required!" });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: "Email is invalid!" });
    return;
  }

  const person: USER_OBJECT | null = await getUserByEmail(email);
  if (!person) {
    res.status(400).json({ success: false, message: "Email does not exist." });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be greater than or equal 6 characters.",
    });
    return;
  }

  const match = await bcrypt.compare(password, person.password);

  if (!match) {
    res.status(400).json({ success: false, message: "Password is incorrect." });
    return;
  }
  next();
};

export const signup_validator: RequestHandler<
  unknown,
  IErrorResponse | IResponseData,
  ISignupBody
> = async (req, res, next) => {
  const { email, password, fullname } = req.body;
  if (validator.isEmpty(email)) {
    res
      .status(400)
      .json({ success: false, message: "Email must be required!" });
    return;
  }
  if (validator.isEmpty(password)) {
    res
      .status(400)
      .json({ success: false, message: "Password must be required!" });
    return;
  }
  if (validator.isEmpty(fullname)) {
    res
      .status(400)
      .json({ success: false, message: "Fullname must be required!" });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: "Email is invalid!" });
    return;
  }

  const person: USER_OBJECT | null = await getUserByEmail(email);
  if (person) {
    res.status(400).json({ success: false, message: "Email is existed." });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be greater than or equal 6 characters.",
    });
    return;
  }
  next();
};

export const checkAuthenticate: RequestHandler<
  unknown,
  IErrorResponse,
  unknown,
  unknown
> = (req, res, next) => {
  if (!req.headers["authentication"]) {
    res
      .status(401)
      .json({ success: false, message: "No authentication header" });
    return;
  }

  const authentication = (req.headers["authentication"] as string).split(".");
  const enc_data = authentication[0];
  const hash_data = authentication[1];

  const hash_data_again = createHmac("sha256", "sen")
    .update(enc_data)
    .digest("hex");
  if (hash_data_again == hash_data) {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
