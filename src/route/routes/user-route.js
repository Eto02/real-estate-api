import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/user-controller.js";
import { verifyToken } from "../../middleware/jwt-middleware.js";
const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.get("/:id", verifyToken, getUser);
userRoutes.put("/:id", verifyToken, updateUser);
userRoutes.delete("/:id", verifyToken, deleteUser);

export { userRoutes };
