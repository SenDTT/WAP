import { RequestHandler } from "express";
import { createHmac } from "node:crypto";
import { LocalStorage } from "node-localstorage";

interface DataType {
  email: string;
  fullname: string;
}

const localStorage = new LocalStorage("./storages");

function storageData(arr: DataType[]): void {
  localStorage.setItem("my-data", JSON.stringify(arr));
}

function getLocalStorageData(): DataType[] {
  return JSON.parse(localStorage.getItem("my-data")!) ?? [];
}

export const loginController: RequestHandler<
  unknown,
  { success: boolean; message?: string; enc_data?: string; hash_data?: string },
  { email: string }
> = (req, res, next) => {
  const { email } = req.body;

  const myData = getLocalStorageData();
  const person = myData.find((p) => p.email == email);

  if (!person) {
    res.json({ success: false, message: "Email does not exist." });
    return;
  }

  const enc_data = Buffer.from(JSON.stringify({ email })).toString("base64");
  const hash_data = createHmac("sha256", "sen").update(enc_data).digest("hex");
  res.json({ success: true, enc_data, hash_data });
};

export const signupController: RequestHandler<
  unknown,
  { success: boolean },
  { email: string; fullname: string }
> = (req, res, next) => {
  const { email, fullname } = req.body;

  const myData = getLocalStorageData();
  myData.push({
    email,
    fullname,
  });
  storageData(myData);

  res.json({ success: true });
};

export const checkAuthenticate: RequestHandler = (req, res, next) => {
  if (!req.headers["authentication"])
    throw new Error("No authentication header");

  const authentication = (req.headers["authentication"] as string).split(".");
  const enc_data = authentication[0];
  const hash_data = authentication[1];

  const hash_data_again = createHmac("sha256", "sen")
    .update(enc_data)
    .digest("hex");
  if (hash_data_again == hash_data) {
    next();
  } else {
    throw new Error("Hash does not match");
  }
};

export const userController: RequestHandler<
  unknown,
  { success: boolean; secret: string }
> = (req, res, next) => {
  res.json({ success: true, secret: "You are wonderful!" });
};
