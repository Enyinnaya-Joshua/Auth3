import { Document, model, Schema } from "mongoose";
import { IProduct } from "../interfaces/Product";

interface ProductSchema extends Document, IProduct {}

const productSchema: Schema<ProductSchema> = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  productImage: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
});
