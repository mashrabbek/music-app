const User = require("../models/User");

exports.login = (req, res) => {
  let { username, password } = req.body;
  console.log({ username, password });
  let result = User.login(username, password);
  if (result) res.status(200).json(result);
  else res.status(401).send("Unauthorized");
};
