/* --------------CAPA DE NEGOCIO---------------- */

import CartSchema from "../models/cart.schema.js";
import ProductSchema from "../models/product.schema.js";

class CartsManager {
  getCarts = async () => {
    try {
      let colectionJSON = await CartSchema.find();
      return colectionJSON;
    } catch (error) {
      throw new Error(`Hubo un error obteniendo los carritos: ${error.message}`);
    }
  };

  addCart = async () => {
    try {
      await CartSchema.insertMany({ products: [] });
    } catch (error) {
      throw new Error(`Error al agregar un carrito: ${error.message}`);
    }
  };

  getCartById = async (cartId) => {
    try {
      return await CartSchema.findById(cartId);
    } catch (error) {
      throw new Error(`Error al encontrar el carrito`);
    }
  };

  updateCart = async (cartId, productId) => {
    try {
      await CartSchema.findById(cartId);
    } catch (error) {
      throw new Error(`No se encontró el carrito a actualizar`);
    }
    try {
      await ProductSchema.findById(productId);
    } catch (error) {
      throw new Error(`No se encontró el producto a agregar`);
    }
    try {
      let cartSelected = await CartSchema.findById(cartId);
      let productIndex = cartSelected.products.findIndex(
        (prod) => prod.product === productId
      );

      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, incrementa su cantidad
        await CartSchema.updateOne(
          { _id: cartId, "products.product": productId },
          { $inc: { "products.$.quantity": 1 } }
        );
      } else {
        // Si el producto no está en el carrito, lo agrega
        await CartSchema.updateOne(
          { _id: cartId },
          { $push: { products: { product: productId, quantity: 1 } } }
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default CartsManager;
