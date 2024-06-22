import express from "express";
import http from "http";
import { router } from "../route/index.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
export const web = express();

web.use(express.json());
web.use(router);
web.use(errorMiddleware);
export const server = http.createServer(web);
