let users = [
  {
    username: "John",
    password: "123",
  },
  {
    username: "admin",
    password: "123",
  },
];

const jwt = require("jsonwebtoken");

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  save() {
    let index = users.findIndex((val) => val.username == this.username);
    if (index > -1) {
      throw Error("username is already exists");
    }
    users.push(this);
    return this;
  }
  static login(username, password) {
    let index = users.findIndex((val) => val.username == username);
    if (index > -1) {
      let pass = users[index].password;
      if (pass == password) {
        const accessToken = jwt.sign(
          {
            username: username,
          },
          process.env.JWT_KEY
        );
        return accessToken;
      }
    }
    return null;
  }
  static findByUserName(username) {
    return users.find((val) => val.username == username);
  }
}

module.exports = User;
