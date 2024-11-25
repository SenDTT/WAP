import { RequestHandler } from "express";
import { createHmac } from "node:crypto";
import { ILoginReponse, ISignupBody } from "../types/authTypes";
import { IErrorResponse } from "../types/common";
import { addNewUser, getUserByEmail } from "../services/UserService";
import { USER_OBJECT } from "../types/userTypes";

export const loginController: RequestHandler<
  unknown,
  ILoginReponse,
  { email: string; password: string }
> = async (req, res, next) => {
  const { email, password } = req.body;

  const enc_data = Buffer.from(JSON.stringify({ email })).toString("base64");
  const hash_data = createHmac("sha256", "sen").update(enc_data).digest("hex");
  const curUser: USER_OBJECT = await getUserByEmail(email);

  res.json({
    success: true,
    data: {
      user: {
        id: curUser.id,
        username: curUser.username,
        email: curUser.email,
        fullname: curUser.fullname,
        createdAt: curUser.createdAt,
        updatedAt: curUser.updatedAt,
      },
      enc_data,
      hash_data,
    },
  });
};

export const signupController: RequestHandler<
  unknown,
  ILoginReponse | IErrorResponse,
  ISignupBody
> = async (req, res, next) => {
  const { email, fullname, password, username } = req.body;

  try {
    const person: USER_OBJECT = await addNewUser({
      email,
      fullname,
      username,
      password,
    });

    const enc_data = Buffer.from(
      JSON.stringify({ email: person.email })
    ).toString("base64");
    const hash_data = createHmac("sha256", "sen")
      .update(enc_data)
      .digest("hex");

    res.json({
      success: true,
      data: {
        user: {
          id: person.id,
          username: person.username,
          email: person.email,
          fullname: person.fullname,
          createdAt: person.createdAt,
          updatedAt: person.updatedAt,
        },
        enc_data,
        hash_data,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      res.json({ success: false, message: err.message });
    }

    throw err;
  }
};
