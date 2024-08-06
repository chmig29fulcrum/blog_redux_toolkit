import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path"; // to join backend with frontend

import testRoutes from "./routes/test.route";
import authRoutes from "./routes/auth.route";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
// Load environment variables
const isDevelopment = process.env.NODE_ENV === "development";

const frontendUrl = isDevelopment
  ? process.env.FRONTEND_URL_DEVELOPMENT
  : process.env.FRONTEND_URL_PRODUCTION;

if (!frontendUrl) {
  throw new Error("Frontend URL is not defined");
}

console.log(`CORS configured for frontend URL: ${frontendUrl}`);

const apiVersion = process.env.API_VERSION;

const app = express(); // express
app.use(cookieParser()); // cookie parser
app.use(express.json()); // convert body of api req to json

app.use(express.urlencoded({ extended: true })); // parse url to get query params
//app.use(cors()); // cors

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/dist"))); // to join backend with frontend

app.use(`/api/${apiVersion}/test`, testRoutes);
app.use(`/api/${apiVersion}/auth`, authRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

/*
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
*/
const port = process.env.PORT || 5188; // Default to 5000 if PORT is not set

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} mode, on localhost:${port}`
  );
  //console.log(process.env.DOTENV_CONFIG_PATH);
});
