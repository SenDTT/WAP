import { RequestHandler } from "express";
import CustomerError from "../CustomerError";

export const calculator_handler: RequestHandler<
  { operation: string },
  { results: number; message?: string }
> = (req, res, next) => {
  const { operation } = req.params;
  try {
    const { num1, num2 } = req.body;

    let results = calculate(operation, num1, num2);
    res.json({ results });
  } catch (e) {
    if (e instanceof CustomerError) {
      res.status(e.statusCode).json({ message: e.message, results: Infinity });
    }
  }
};

export const getNumbers = (req): { num1: number; num2: number } => {
  let num1 = Number(req.params.a || req.query.a || req.body.a);
  let num2 = Number(req.params.b || req.query.b || req.body.b);

  if (isNaN(num1) && isNaN(num2)) {
    throw new CustomerError("Invalid input numbers", 400);
  }

  req.body.num1 = num1;
  req.body.num2 = num2;

  return { num1, num2 };
};

function calculate(operation: string, num1: number, num2: number): number {
  switch (operation) {
    case "addition":
      return num1 + num2;
    case "subtraction":
      return num1 - num2;
    case "multiplication":
      return num1 * num2;
    case "division":
      if (num2 == 0) throw new CustomerError("Cannot divide by zero", 400);
      return num1 / num2;
    case "modulus":
      return num1 % num2;
    default:
      throw new CustomerError("Invalid Operation", 400);
  }
}
