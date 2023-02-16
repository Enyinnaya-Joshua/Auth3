import dotenv from "dotenv";
dotenv.config();

export const envVarable = {
  PORT: process.env.PORT as string,
  DB_STRING: process.env.MONGODB_STRING as string,
};
