import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500;

  console.error(err);

  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage: statusCode === 500 ? "خطای داخلی سرور" : err.message,
  });
};
