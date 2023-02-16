import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  productImage: string;
  rating: number;
}
