import express, { Application, Request, Response } from "express";
import { envVarable } from "./config/enviromentVarables";
import { appConfig } from "./app";

const port = envVarable.PORT || 7070;

const app: Application = express();

appConfig(app);

app.listen(port, () => {
  console.log(`server listening to: ${port}`);
});
