export interface IResponseData {
  success: boolean;
  data: object | object[] | null;
}

export interface IErrorResponse {
  success: boolean;
  message: string;
}

export interface IGetListQueries {
  limit: number;
  offset: number;
  search?: string;
  year?: number;
  category?: number;
}
