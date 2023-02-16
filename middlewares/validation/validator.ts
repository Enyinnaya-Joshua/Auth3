import { NextFunction } from "express";
import { AppError, HttpCode } from "../../utils/AppError";
import Joi from "joi";

export const validator = (
  schemaName: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const value = schemaName.validate(body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });
  try {
    value.error
      ? next(
          new AppError({
            httpCode: HttpCode.UNPROCESSABLE_IDENTITU,
            message: value.error?.details[0].message,
          })
        )
      : next();
  } catch (error) {
    console.log(error);
  }
};
