import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth-route.js";
import { verifyToken } from "../middleware/jwt-middleware.js";

const router = express.Router();
router.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET, DELETE, PATCH, POST, PUT",
    allowedHeaders:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization,X-Api-Token",
  })
);

router.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

router.use("/api", authRoutes);
export { router };
