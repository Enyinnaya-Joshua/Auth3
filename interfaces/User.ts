import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  //   cart: {
  //     items: {
  //       products: Schema.Types.ObjectId;
  //       quantity: number;
  //     };

  //     amount: number;
  //   }[];
}

export interface ProductData extends Document {
  name: String;
  price: number;
  category: string;
  rating: string;
  productImage: string;
}
