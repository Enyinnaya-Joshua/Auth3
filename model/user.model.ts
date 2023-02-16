import { Document, model, Schema } from "mongoose";
import { IUser } from "../interfaces/User";
import isEmail from "validator/lib/isEmail";

interface UserSchema extends Document, IUser {}

const userSchema: Schema<UserSchema> = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide your name"],
    },

    email: {
      type: String,
      required: [true, "please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide your password"],
      minlength: 6,
    },

    confirmPassword: {
      ype: String,
      required: [true, "please provide your password"],
      minlength: 6,
    },

    // cart: [
    //   {
    //     items: {
    //       products: Schema.Types.ObjectId,
    //       ref: "product",
    //     },
    //     quantity: Number,
    //   },
    // ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model<UserSchema>("User", userSchema);

export default UserModel;
