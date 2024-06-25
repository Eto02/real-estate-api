import express from "express";
import { login, logout, register } from "../../controllers/auth-controller.js";
const authRoutes = express.Router();
authRoutes.use("/auth", authRoutes);

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export { authRoutes };
