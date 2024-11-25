import { IResponseData } from "./common";
import { USER_OBJECT } from "./userTypes";

export interface ILoginReponse extends IResponseData {
  data: {
    user: Omit<USER_OBJECT, "password">;
    enc_data: string;
    hash_data: string;
  };
}

export interface ISignupReponse extends IResponseData {
  data: USER_OBJECT | null;
}

export interface ISignupBody {
  email: string;
  fullname: string;
  username?: string;
  password: string;
}
