import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: false },
  genre: { type: String, required: false },
  avaiable: { type: Boolean, default: true }
})

const Product = mongoose.model<IProduct>("Product", ProductSchema)

export default Product