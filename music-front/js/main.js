let musics = [];

loadAllMusics();
async function loadAllMusics() {
  try {
    // console.log(cookie);
    musics = await (
      await fetch("http://127.0.0.1:3000/music/all", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
    ).json();
    generateAllSongsTable(musics);
  } catch (err) {
    console.error(err);
  }
}

loadMyPlayList();
async function loadMyPlayList() {
  //
}

let myMusics = [];
const BASE_URL = "http://127.0.0.1:3000/music/files";
//
// header functionility
let inputSearch = document.getElementById("inputSearch");
let btnSearch = document.getElementById("btnSearch");

btnSearch.onclick = () => {
  let value = inputSearch.value;
  if (value !== "") {
    let msgSearch = document.getElementById("msgSearch");
    msgSearch.innerText = `Results of '${value}'`;
  } else msgSearch.innerText = "";
  let regex = new RegExp(value, "g");
  let res = musics.filter((val) => val.title.match(regex));
  generateAllSongsTable(res);
};

let btnLogout = document.getElementById("btnLogout");
btnLogout.onclick = () => {
  console.log("Logout");
  localStorage.removeItem("token");
  console.log(document.cookie);
  document.location.replace("login.html");
};
/// heade end

let player = document.getElementById("player");
let playBtn;
let playIcon;

function generateAllSongsTable(musics) {
  let allSongTable = document.getElementById("all-songs");
  allSongTable.innerHTML = "";

  if (musics.length == 0) {
    musics.innerHTML = "No songs in database";
  }

  for (let song of musics) {
    let tr = document.createElement("tr");

    let tdId = document.createElement("th");
    tdId.setAttribute("scope", "row");
    tdId.innerHTML = `${song.id}`;

    let tdTitle = document.createElement("td");
    tdTitle.innerText = `${song.title}`;

    let tdReleaseDate = document.createElement("td");
    tdReleaseDate.innerHTML = song.releaseDate;

    let tdActions = document.createElement("tr");

    let btnAdd = document.createElement("button");
    btnAdd.setAttribute("type", "button");
    btnAdd.setAttribute("class", "round-button m-2");
    btnAdd.setAttribute("data-bs-toggle", "tooltip");
    btnAdd.setAttribute("data-bs-placement", "top");
    btnAdd.setAttribute("title", "add");
    btnAdd.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    btnAdd.onclick = () => {
      console.log("Add");
      let index = myMusics.findIndex((val) => val.id === song.id);
      if (index > -1) {
        // TODO show fancy error message
        console.log("You already have this song in your playlist");
      } else {
        index = musics.findIndex((val) => val.id === song.id);
        // error check
        // TODO error check if index == -1
        myMusics.push(musics[index]);
        generateMyPlayList();
      }
    };

    let btnPlay = document.createElement("button");
    btnPlay.setAttribute("type", "button");
    btnPlay.setAttribute("class", "round-button mx-2");
    btnPlay.setAttribute("data-bs-toggle", "tooltip");
    btnPlay.setAttribute("data-bs-placement", "top");
    btnPlay.setAttribute("title", "play");

    // play pause button
    let iconPlay = document.createElement("i");
    iconPlay.setAttribute("class", "fa-solid fa-play");
    btnPlay.appendChild(iconPlay);

    btnPlay.onclick = () => {
      let newSrc = `${BASE_URL}/${song.id}`;
      let srcMusic = player.getAttribute("src");

      if (newSrc == srcMusic) {
        // play, pause
        player.paused ? play() : pause();
      } else {
        // new play
        pause();
        player.setAttribute("src", newSrc);
        playBtn = btnPlay;
        playIcon = iconPlay;
        play();
      }
      //
    };
    player.onended = stop;
    tdActions.append(btnAdd, btnPlay);
    tr.append(tdId, tdTitle, tdReleaseDate, tdActions);
    allSongTable.appendChild(tr);
    //
  }
}
generateMyPlayList();

function generateMyPlayList() {
  //TODO no data message

  console.log("My playlist generation");
  let myPlayList = document.getElementById("my-songs");
  myPlayList.innerHTML = "";

  if (myMusics.length == 0) {
    myPlayList.innerHTML = "No songs in your playlist";
  }

  for (let song of myMusics) {
    let tr = document.createElement("tr");

    let tdId = document.createElement("th");
    tdId.setAttribute("scope", "row");
    tdId.innerHTML = `${song.id}`;

    let tdTitle = document.createElement("td");
    tdTitle.innerText = `${song.title}`;

    let tdReleaseDate = document.createElement("td");
    tdReleaseDate.innerHTML = song.releaseDate;

    let tdActions = document.createElement("tr");

    let btnRemove = document.createElement("button");
    btnRemove.setAttribute("type", "button");
    btnRemove.setAttribute("class", "round-button m-2");
    btnRemove.setAttribute("data-bs-toggle", "tooltip");
    btnRemove.setAttribute("data-bs-placement", "top");
    btnRemove.setAttribute("title", "remove");
    btnRemove.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    btnRemove.onclick = () => {
      console.log("Remove");
      //
      let index = myMusics.findIndex((val) => val.id == song.id);
      myMusics.splice(index, 1);
      console.log(myMusics);
      generateMyPlayList();
    };

    let btnPlay = document.createElement("button");
    btnPlay.setAttribute("type", "button");
    btnPlay.setAttribute("class", "round-button mx-2");
    btnPlay.setAttribute("data-bs-toggle", "tooltip");
    btnPlay.setAttribute("data-bs-placement", "top");
    btnPlay.setAttribute("title", "play");

    // play pause button
    let iconPlay = document.createElement("i");
    iconPlay.setAttribute("class", "fa-solid fa-play");
    btnPlay.appendChild(iconPlay);

    btnPlay.onclick = () => {
      let newSrc = `${BASE_URL}/${song.id}`;
      let srcMusic = player.getAttribute("src");

      if (newSrc == srcMusic) {
        // play, pause
        player.paused ? play() : pause();
      } else {
        // new play
        pause();
        player.setAttribute("src", newSrc);
        playBtn = btnPlay;
        playIcon = iconPlay;
        play();
      }
      //
    };
    player.onended = stop;

    tdActions.append(btnRemove, btnPlay);

    tr.append(tdId, tdTitle, tdReleaseDate, tdActions);

    myPlayList.appendChild(tr);
    //
  }
}

function play() {
  playIcon.setAttribute("class", "fa-solid fa-pause");
  playBtn.setAttribute("title", "pause");
  player.play();
}

function pause() {
  if (playIcon && playBtn) {
    playIcon.setAttribute("class", "fa-solid fa-play");
    playBtn.setAttribute("title", "play");
    player.pause();
  }
}

function stop() {
  playIcon.setAttribute("class", "fa-solid fa-play");
  playBtn.setAttribute("title", "play");
}
