import express from "express";

import { verifyToken } from "../../middleware/jwt-middleware.js";
import {
  create,
  deleteData,
  get,
  gets,
} from "../../controllers/post-controller.js";
const postRoutes = express.Router();

postRoutes.get("/", gets);
postRoutes.get("/:id", verifyToken, get);
postRoutes.post("/", verifyToken, create);
postRoutes.delete("/:id", verifyToken, deleteData);
export { postRoutes };
