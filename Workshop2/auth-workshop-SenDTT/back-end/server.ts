import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import {
  checkAuthenticate,
  loginController,
  signupController,
  userController,
} from "./controller";

// init
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(json());

app.post("/login", loginController);
app.post("/signup", signupController);
app.get("/users", checkAuthenticate, userController);

app.listen(3000, () => console.log("Listening to 3000"));
