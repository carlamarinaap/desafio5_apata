/* --------------CAPA DE NEGOCIO---------------- */

import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

class CartsManager {
  getCarts = async () => {
    try {
      let colectionJSON = await cartModel.find();
      return colectionJSON;
    } catch (error) {
      throw new Error(`Hubo un error obteniendo los carritos: ${error.message}`);
    }
  };

  addCart = async () => {
    try {
      await productModel.insertMany({ products: [] });
    } catch (error) {
      throw new Error(`Error al agregar producto: ${error.message}`);
    }
  };

  getCartById = async (cartId) => {
    try {
      return await cartModel.findById(cartId);
    } catch (error) {
      throw new Error(`Error al encontrar el carrito`);
    }
  };

  updateCart = async (cartId, productId) => {
    try {
      await cartModel.findById(cartId);
    } catch (error) {
      throw new Error(`No se encontró el carrito a actualizar`);
    }
    try {
      await productModel.findById(productId);
    } catch (error) {
      throw new Error(`No se encontró el producto a agregar`);
    }
    try {
      let cartSelected = await cartModel.findById(cartId);
      let productIndex = cartSelected.products.findIndex(
        (prod) => prod.product === productId
      );

      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, incrementa su cantidad
        await cartModel.updateOne(
          { _id: cartId, "products.product": productId },
          { $inc: { "products.$.quantity": 1 } }
        );
      } else {
        // Si el producto no está en el carrito, lo agrega
        await cartModel.updateOne(
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
