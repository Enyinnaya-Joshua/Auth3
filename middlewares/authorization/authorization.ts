import { NextFunction } from "express";
import jwt, { JwtHeader, JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";
import { nextTick } from "process";
import { IUser } from "../../interfaces/User";
import UserModel from "../../model/user.model";
import { AppError, HttpCode } from "../../utils/AppError";

interface Payload extends JwtPayload {
  _id: string;
  email: string;
}

const secret = "Jjkakkag;klajhafkjhafkjahljkfhlkkafljkajkhajfuhlaj56778";

export const generateToken = (user: Payload) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1h" });
};

// Verify and authorize the user

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  // make request for token from our headers

  const headers = req.headers["authorization"];

  if (!headers || !headers.startsWith("Bearer ")) {
    next(
      new AppError({
        message: "You are not Authorized",
        httpCode: HttpCode.UNAUTHORIZED,
      })
    );
  }
  const token: string = headers!.split(" ")[1];

  // verify the token payload

  jwt.verify(
    token,
    secret as Secret,
    async (err: VerifyErrors | null, decodeUser: any) => {
      if (err) {
        const errorMsg =
          err.name === "JsonWebTokenError"
            ? "Invalid to , You Are Unauthorized"
            : err.message;
        next(
          new AppError({
            message: errorMsg,
            httpCode: HttpCode.UNAUTHORIZED,
          })
        );
      }

      try {
        const verifiedUser = await UserModel.findOne({ _id: decodeUser!._id });
        if (!verifiedUser) {
          next(
            new AppError({
              httpCode: HttpCode.UNAUTHORIZED,
              message: "unauthorized user",
            })
          );
        }

        req!.user = verifiedUser as IUser;
        next();
      } catch (error: any) {
        next(
          new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            message: error,
          })
        );
      }
    }
  );
};
