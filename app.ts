import express, { Application, Response, Request, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./router/user.route";
import { AppError, HttpCode } from "./utils/AppError";

import { ErrorHandler } from "./middlewares/error/errorHandler";

export const appConfig = (app: Application) => {
  app
    .use(morgan("dev"))
    .use(express.json())
    .use(morgan("dev"))
    .use(cors())
    .use(express.urlencoded())

    //ROUTES
    .use("/api", route)

    // WRONG ROUTES

    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `This route ${req.originalUrl} does not exist`,
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    });

  // ErrorHandler should be at the bottom of your code

  app.use(ErrorHandler);
};
