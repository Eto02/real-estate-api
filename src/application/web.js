import express from "express";
import http from "http";
import { router } from "../route/index.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import cookieParser from "cookie-parser";
import { serveStaticOnlyImagesAndVideos } from "../middleware/file-middleware.js";
import helmet from "helmet";
export const web = express();
const uploadPath = process.env.UPLOAD_PATH;
web.use(express.json());
web.use(cookieParser());
web.use(router);
web.use(errorMiddleware);
web.use(
  "/api/static",
  serveStaticOnlyImagesAndVideos,
  express.static(uploadPath)
);
web.use(helmet());
web.disable("x-powered-by");
export const server = http.createServer(web);
