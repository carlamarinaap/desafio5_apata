import mongoose from "mongoose";

// const cartCollection = "carts";
const CartSchema = new mongoose.Schema({
  products: {
    type: Array,
  },
});

// export const cartModel = mongoose.model(cartCollection, cartSchema);
export default mongoose.model("Carts", CartSchema);
