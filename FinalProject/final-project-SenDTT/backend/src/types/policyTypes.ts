import { ICategory } from "./categoryTypes";
import { IResponseData } from "./common";
import { USER_OBJECT } from "./userTypes";

export interface IListPoliciesReponse extends IResponseData {
  data: {
    rows: IPolicy[];
    count: number;
  };
}

export interface IPolicyReponse extends IResponseData {
  data: IPolicy | null;
}

export interface IPolicy {
  readonly id: number;
  title: string;
  category: ICategory;
  body: string;
  owner: Omit<USER_OBJECT, "password">;
  votes: number;
  isVoted: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPolicyForm {
  title: string;
  body: string;
  category_id: number;
  owner_id: number;
}
