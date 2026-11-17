import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        isSuccess: false,
        statusCode: 400,
        errorMessage: result.error.issues.map((issue) => issue.message),
      });
    }

    req.body = result.data;
    next();
  };
};
