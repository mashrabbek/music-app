let username = document.getElementById("inputUsername");
let password = document.getElementById("inputPassword");
let btnLogin = document.getElementById("btnLogin");
const BASE_URL = "http://127.0.0.1:3000/auth/login";

function login(e) {
  e.preventDefault();

  let credentials = { username, password };
  fetch(`${BASE_URL}`, {
    method: "POST",
    body: credentials,
  })
    .then((val) => val.json())
    .then((val) => {
      console.log(val);
    });
}
