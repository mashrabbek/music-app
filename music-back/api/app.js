let express = require("express");
let app = express();
app.use(express.json());

const musicRouter = require("./routes/music-route");
const authRouter = require("./routes/auth-route");

app.use("/auth", authRouter);
app.use("/music", musicRouter);

module.exports = app;
