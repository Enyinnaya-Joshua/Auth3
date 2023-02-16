import mongoose from "mongoose";
import { envVarable } from "./enviromentVarables";

const DB = envVarable.DB_STRING;
export const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`Database is connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`an error occured`, error);
  }
};
