import { RequestHandler } from "express";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("./storages");

export const add_handler: RequestHandler<
  { n: number },
  { results: number[] }
> = (req, res, next) => {
  const { n } = req.params;

  const arr: number[] = getLocalStorageData();

  arr.push(Number(n));

  storageData(arr);

  res.json({ results: arr });
};

export const get_all_handler: RequestHandler<unknown, { results: number[] }> = (
  req,
  res,
  next
) => {
  console.log(req.params);
  const arr = getLocalStorageData();
  res.json({ results: arr });
};

export const get_a_num_handler: RequestHandler<
  { index: number },
  { results: number }
> = (req, res, next) => {
  const arr: number[] = getLocalStorageData();

  res.json({ results: arr[req.params.index]! });
};

export const delete_handler: RequestHandler<
  { index: number },
  { results: number[] }
> = (req, res, next) => {
  let arr: number[] = getLocalStorageData();

  arr = arr.filter((value, index) => index !== Number(req.params.index));
  console.log(arr);
  storageData(arr);

  res.json({ results: arr });
};

export const update_handler: RequestHandler<
  { index: number; n: number },
  { results: number[] }
> = (req, res, next) => {
  let arr: number[] = getLocalStorageData();

  arr[Number(req.params.index)] = Number(req.params.n);
  storageData(arr);

  res.json({ results: arr });
};

function storageData(arr: number[]): void {
  localStorage.setItem("my-data", JSON.stringify(arr));
}

function getLocalStorageData(): number[] {
  return JSON.parse(localStorage.getItem("my-data")!) ?? [];
}
