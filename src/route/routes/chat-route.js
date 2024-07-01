import express from "express";
import {
  create,
  deleteData,
  get,
  gets,
  put,
} from "../../controllers/chat-controller.js";
import { verifyToken } from "../../middleware/jwt-middleware.js";

const chatRoutes = express.Router();

chatRoutes.get("/", verifyToken, gets);
chatRoutes.get("/:id", verifyToken, get);
chatRoutes.post("/", verifyToken, create);
chatRoutes.put("/:id", verifyToken, put);
chatRoutes.delete("/:id", verifyToken, deleteData);
export { chatRoutes };
