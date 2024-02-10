import express from "express";
import CartsManager from "../dao/manager_mongo/cartsMaganer.js";

const router = express.Router();
const cm = new CartsManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cm.getCarts();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cm.getCartById(cartId);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", (req, res) => {
  try {
    cm.addCart();
    res.status(200).send("Se agregó correctamente el carrito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cm.updateCart(cartId, productId);
    res.status(200).send("Producto añadido al carrito");
  } catch (error) {
    res.status(500).send(`Error al actualizar el carrito: ${error.message}`);
  }
});

export default router;
