import express from "express";
import ProductManager from "../dao/manager_mongo/productMaganer.js";
import MessageManager from "../dao/manager_mongo/messageManager.js";

const router = express.Router();
const pm = new ProductManager();
const mm = new MessageManager();

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  console.log(products);
  res.render("home", { products });
});

router.get("/socket", (req, res) => {
  res.render("socket");
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await pm.getProducts();
  res.render("realTimeProducts", { products });
});

router.get("/chat", async (req, res) => {
  const messages = await mm.getMessages();
  res.render("chat", { messages });
});

export default router;
