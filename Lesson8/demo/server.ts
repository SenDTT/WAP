// dependencies
import express, { ErrorRequestHandler, json } from "express";
import { demoMiddleware } from "./middleware";
import bookRouter from "./books/router";

// init
const application = express();

// configuration
application.disable("x-powered-by");

// middleware
// application.use(morgan("dev"));
application.use(json());
application.use(demoMiddleware);

// routing
application.use("/books", bookRouter);

// error handler
const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  }
};
application.use(error_handler);

// bootrapt
application.listen(3000, () => console.log("listening to 3000"));