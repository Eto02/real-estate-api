import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth-route.js";
import { verifyToken } from "../middleware/jwt-middleware.js";
import { userRoutes } from "./routes/user-route.js";
import { postRoutes } from "./routes/post-route.js";

const router = express.Router();
router.use(
  cors({
    origin: process.env.CLIENT_ADDRESS,
    credentials: true,
  })
);

router.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

router.use("/api", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/post", postRoutes);
export { router };
