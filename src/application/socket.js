import { Server } from "socket.io";

export const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});
