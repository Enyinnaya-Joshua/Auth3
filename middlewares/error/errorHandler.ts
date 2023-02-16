import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../../utils/AppError";

const DevErrorHandler = (err: AppError, res: Response) => {
  return res.status(err.httpCode).json({
    httpCode: err.httpCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const ErrorHandler = (err: AppError, req: Request, res: Response) => {
  DevErrorHandler(err, res);
};
