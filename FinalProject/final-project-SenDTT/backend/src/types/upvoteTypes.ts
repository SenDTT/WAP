import { IResponseData } from "./common";

export interface IUpvoteResponse extends IResponseData {
  data: {
    id: number | null;
  } | null;
}

export interface IUpvoteForm {
  type: "policy" | "reply";
  associate_id: number;
  user_id: number;
}
