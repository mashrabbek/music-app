const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const http = require("http");

const app = require("./api/app");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("uncaughtException", (err, origin) => {
  console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
