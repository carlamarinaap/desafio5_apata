import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  products: {
    type: Array,
  },
});

export default mongoose.model("Carts", CartSchema);
