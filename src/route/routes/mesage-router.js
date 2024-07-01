import express from "express";
import { create } from "../../controllers/message-controller.js";
import { verifyToken } from "../../middleware/jwt-middleware.js";

const messageRoutes = express.Router();

messageRoutes.post("/:chatId", verifyToken, create);

export { messageRoutes };
