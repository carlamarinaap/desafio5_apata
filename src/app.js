/* --------CAPA DE INTERACCION---------- */
import express from "express";
import expressHandlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { Server } from "socket.io";
import mongoose from "mongoose";
import ProductManager from "./dao/manager_mongo/productMaganer.js";
import MessageManager from "./dao/manager_mongo/messageManager.js";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

const app = express();
const httpServer = app.listen(8080, () => console.log("Server running in port 8080"));
const socketServer = new Server(httpServer);

// mongoose.connect(
//   "mongodb+srv://carlaapata:Facundo1990@cluster0.ppztezy.mongodb.net/?retryWrites=true&w=majority"
// );

mongoose.connect(
  "mongodb+srv://carlaapata:Facundo1990@cluster0.ppztezy.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Esto devuelve un middleware
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

// app.engine("handlebars", handlebars.engine());
app.engine(
  "handlebars",
  expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/* --------Test de vida del servidor---------- */
app.get("/ping", (req, res) => res.status(200).send("Pong!"));
/* ------------------------------------------- */

const pm = new ProductManager();
const mm = new MessageManager();
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("newProduct", async (data) => {
    await pm.addProduct(data);
    const products = await pm.getProducts();
    socketServer.emit("card", products);
  });
  socket.on("deleteProduct", async (data) => {
    await pm.deleteProduct(data);
    const products = await pm.getProducts();
    socketServer.emit("card", products);
  });

  socket.on("login", async (data) => {
    const messages = await mm.getMessages();
    socketServer.emit("chat", messages);
  });
  socket.on("newMessage", async (data) => {
    await mm.addMessage(data);
    const messages = await mm.getMessages();
    socketServer.emit("chat", messages);
  });
  socket.on("clearChat", async () => {
    await mm.clearChat();
    const messages = await mm.getMessages();
    socketServer.emit("chat", messages);
  });
});
