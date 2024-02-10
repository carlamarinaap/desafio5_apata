import { messageModel } from "../models/message.model.js";

class MessageManager {
  getMessages = async () => {
    try {
      return await messageModel.find();
    } catch (error) {
      throw new Error(`Hubo un error obteniendo los mensajes`);
    }
  };

  addMessage = async (message) => {
    try {
      await messageModel.insertMany(message);
    } catch (error) {
      throw new Error(`Hubo un error cargando el mensaje`);
    }
  };
  clearChat = async () => {
    try {
      await messageModel.deleteMany();
    } catch (error) {
      throw new Error(`Hubo un error eliminando el chat`);
    }
  };
}

export default MessageManager;
