/* --------------CAPA DE NEGOCIO---------------- */

import { productModel } from "../models/product.model.js";

class ProductManager {
  getProducts = async () => {
    try {
      return await productModel.find();
    } catch (error) {
      throw new Error(`Hubo un error obteniendo los productos: ${error.message}`);
    }
  };

  addProduct = async ({
    title,
    description,
    price,
    thumbnails = [],
    code,
    stock,
    category,
    status = true,
  }) => {
    if (!title || !description || !price || !code || !stock || !category) {
      throw new Error(`Debe tener todos los campos completos`);
    }
    try {
      let exists = await productModel.findOne({ code: code });
      if (exists) {
        throw new Error(`Ya existe un producto con el código ${code}`);
      }
      let product = {
        title: title,
        description: description,
        price: price,
        thumbnails: thumbnails,
        code: code,
        stock: stock,
        category: category,
        status: status,
      };
      await productModel.insertMany(product);
      return product;
    } catch (error) {
      throw new Error(`Error al agregar producto: ${error.message}`);
    }
  };

  getProductById = async (productId) => {
    try {
      return await productModel.findById(productId);
    } catch (error) {
      throw new Error(`Error al encontrar el producto`);
    }
  };

  updateProduct = async (productId, updates) => {
    try {
      await productModel.updateOne({ _id: productId }, updates);
      return productModel.findById(productId);
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

  deleteProduct = async (productId) => {
    try {
      const product = await productModel.findById(productId);
      await productModel.deleteOne({ _id: productId });
      return product;
    } catch (error) {
      throw new Error(`Error al eliminar producto `);
    }
  };
}

export default ProductManager;