import mongoose from "mongoose";

const productCollection = "products";
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnails: Array,
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
  category: String,
  status: Boolean,
});

export const productModel = mongoose.model(productCollection, productSchema);
