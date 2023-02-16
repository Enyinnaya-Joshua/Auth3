import { NextFunction, RequestHandler } from "express";
import { Request, Response } from "express";
import { validator } from "../validator";
import { userSchemaValidor } from "./userSchema";

export const registerValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => validator(userSchemaValidor.register, req.body, next);

export const loginValidation: RequestHandler = (req, res, next) =>
  validator(userSchemaValidor.login, req.body, next);
