let express = require("express");
let app = express();
let cors = require("cors");
let cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const musicRouter = require("./routes/music-route");
const authRouter = require("./routes/auth-route");

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

app.use("/auth", authRouter);
app.use("/music", musicRouter);

module.exports = app;
