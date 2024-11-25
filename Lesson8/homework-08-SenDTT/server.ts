import express, { ErrorRequestHandler, json, urlencoded } from "express";
import morgan from "morgan";
import calculator_router from "./calculator/router";
import localstorage_router from "./localstorage/router";
import CustomerError from "./CustomerError";
import cors from "cors";
import user_router from "./user/router";

// init
const application = express();
application.use(cors());

// configuration
application.disable("x-powered-by");

// middleware
application.use(morgan("dev"));
application.use(json());

// routing

application.use("/numbers", localstorage_router);
application.use("/users", user_router);
application.use(urlencoded({ extended: true }));
application.use("/", calculator_router);

// error handler
const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomerError) {
    res.status(err.statusCode).json({ error: err.message });
  }
};
application.use(error_handler);

// listen
application.listen(3000, () => console.log("Listening port 3000"));
