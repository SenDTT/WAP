import { RequestHandler } from "express";

export const demoMiddleware: RequestHandler<unknown, unknown, {email: string}> = (req, res, next) => {
  res.set({ "x-pet": "Theo", "x-food": "purina" });

  next();
};
