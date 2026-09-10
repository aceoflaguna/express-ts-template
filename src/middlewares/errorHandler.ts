import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/errors";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}
