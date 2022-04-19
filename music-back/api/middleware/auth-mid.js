const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const decode = jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    let usr = User.findByUserName(user.username);
    if (!usr) return res.sendStatus(401);
    req.user = usr;
    next();
  });
};
