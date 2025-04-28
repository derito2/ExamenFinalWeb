import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// HELPER FUNCTIONS
import { StartServer } from "./utils/utils";

// ROUTES
import routes from "./routes/routes";

import HttpException from "./models/http-exception";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(express.static("public"));
app.use(routes);

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    res.status(err.errorCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      status: "error",
      message: "missing authorization credentials",
    });
    return;
  }

  // Handle any other errors
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
  return;
};

app.use(errorMiddleware);

// INITIALIZE SERVER
StartServer(app, 3000);
