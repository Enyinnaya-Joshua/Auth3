import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { IUser } from "../interfaces/User";
import bcrypt from "bcrypt";
import userModel from "../model/user.model";
import { AppError, HttpCode } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { generateToken } from "../middlewares/authorization/authorization";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, IUser>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password } = req.body;
    const salt: string = await bcrypt.genSalt(12);
    const hashed: string = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashed,
    });
    if (!user) {
      next(
        new AppError({
          message: "Account not Created",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    return res.status(200).json({
      user,
    });
  }
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      next(
        new AppError({
          message: "please provide email and password",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    const user = await userModel.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user!.password);

    if (!checkPassword) {
      next(
        new AppError({
          message: "credential incorrect",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    const token = generateToken({
      _id: user?._id,
      email: user!.email,
    });

    return res.status(200).json({
      message: `Welcome ${user?.name}`,
      data: token,
      httpCode: HttpCode.OK,
    });
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.find();
    return res.status(HttpCode.OK).json({
      message: "user gottrn successfully",
      data: user,
    });
  }
);
