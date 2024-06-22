import express from "express";
import http from "http";
export const web = express();

web.use(express.json());
export const server = http.createServer(web);
