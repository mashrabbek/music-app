let token = localStorage.getItem("token");

if (window.location.pathname == "/music-front/login.html") {
  if (token) {
    window.location.replace("index.html");
  }
} else {
  if (!token) {
    window.location.replace("login.html");
  }
}
