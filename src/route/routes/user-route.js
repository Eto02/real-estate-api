import express from "express";
import {
  deleteUser,
  getNotificationsNumber,
  getPosts,
  getSavedPosts,
  getUser,
  getUsers,
  profilePost,
  savePost,
  updateUser,
} from "../../controllers/user-controller.js";
import { verifyToken } from "../../middleware/jwt-middleware.js";
const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.get("/post/", verifyToken, profilePost);
userRoutes.get("/notifications", verifyToken, getNotificationsNumber);
userRoutes.get("/my-post", verifyToken, getPosts);
userRoutes.get("/saved", verifyToken, getSavedPosts);
userRoutes.get("/:id", verifyToken, getUser);
userRoutes.put("/:id", verifyToken, updateUser);
userRoutes.delete("/:id", verifyToken, deleteUser);
userRoutes.post("/save", verifyToken, savePost);

export { userRoutes };
