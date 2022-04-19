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
      if (pass == password) return Date.now().toString() + "_" + username;
    }
    return null;
  }
}

module.exports = User;
