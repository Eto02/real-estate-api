import express from "express";
import {
  create,
  deleteData,
  get,
  gets,
  put,
} from "../../controllers/message-controller.js";
import { verifyToken } from "../../middleware/jwt-middleware.js";

const messageRoutes = express.Router();

messageRoutes.get("/", gets);
messageRoutes.get("/:id", verifyToken, get);
messageRoutes.post("/", verifyToken, create);
messageRoutes.put("/:id", verifyToken, put);
messageRoutes.delete("/:id", verifyToken, deleteData);
export { messageRoutes };
