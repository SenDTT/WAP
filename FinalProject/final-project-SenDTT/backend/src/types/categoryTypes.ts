import { IResponseData } from "./common";

export interface IListCategoriesReponse extends IResponseData {
  data: ICategory[];
}

export interface ICategory {
  readonly id: number;
  name: string;
  description: string;
  color?: 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'gray',
  createdAt: string;
  updatedAt: string;
}
