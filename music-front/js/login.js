let username = document.getElementById("inputUsername");
let password = document.getElementById("inputPassword");
let btnLogin = document.getElementById("btnLogin");
let msgLogin = document.getElementById("msgLogin");

const BASE_URL = "http://127.0.0.1:3000/auth/login";

async function login(e) {
  e.preventDefault();
  let credentials = { username: username.value, password: password.value };

  fetch(`http://127.0.0.1:3000/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else return Promise.reject(response.status);
    })
    .then((token) => {
      msgLogin.innerText = "";
      /// SUCCESS
      localStorage.setItem("token", token);
      document.location.replace("index.html");
      // console.log(localStorage.getItem("token"));
    })
    .catch((e) => {
      if (e == 401) {
        msgLogin.innerText = "username or password is incorrect";
        // console.error("Unauthorized");
      } else msgLogin.innerText = e;
    });
}
