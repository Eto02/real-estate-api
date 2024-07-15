import express from "express";
import { create, download } from "../../controllers/file-controller.js";
import { verifyToken } from "../../middleware/jwt-middleware.js";
import { upload } from "../../middleware/file-middleware.js";

const fileRotes = express.Router();

fileRotes.post("/upload", verifyToken, upload.array("files", 3), create);
fileRotes.get("/download/:id", download);

export { fileRotes };
