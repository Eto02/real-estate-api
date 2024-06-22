import { server } from "./src/application/web.js";

const port = 8000;

server.listen(port, () => {
  console.log("Server is running!!", port);
});
