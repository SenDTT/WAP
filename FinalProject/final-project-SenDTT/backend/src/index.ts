import express, { ErrorRequestHandler, json } from "express";
import morgan from "morgan";
import cors from "cors";
import users_routes from "./routes/userRoute";
import auth_routes from "./routes/authRoute";
import categories_routes from "./routes/categoryRoute";
import policies_routes from "./routes/policyRoute";
import votes_routes from "./routes/upvoteRoute";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(json());
app.use(cors());

app.use("/auth", auth_routes);
app.use("/users", users_routes);
app.use("/categories", categories_routes);
app.use("/policies", policies_routes);
app.use("/votes", votes_routes);

const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
app.use(error_handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
