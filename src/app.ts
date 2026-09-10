import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

export function createApp(): Application {
  const app = express();

  // Security & parsing middleware
  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  // Routes
  app.use("/api", routes);

  app.get("/", (_req, res) => {
    res.json({ message: "Express + TypeScript API is running" });
  });

  // 404 + error handling (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
