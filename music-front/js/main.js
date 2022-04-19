//
// header functionility
let inputSearch = document.getElementById("inputSearch");
let btnSearch = document.getElementById("btnSearch");

btnSearch.onclick = async () => {
  let value = inputSearch.value;
  if (value !== "") {
    let msgSearch = document.getElementById("msgSearch");
    msgSearch.innerText = `Results of '${value}'`;
  } else msgSearch.innerText = "";
  await searchMusic(value);
};

let btnLogout = document.getElementById("btnLogout");
btnLogout.onclick = () => {
  console.log("Logout");
  localStorage.removeItem("token");
  document.location.replace("login.html");
};

async function searchMusic(title) {
  try {
    // console.log(cookie);
    allMusics = await (
      await fetch(`${BASE_URL}/search?title=${title}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
    ).json();
    generateAllSongsTable(allMusics);
  } catch (err) {
    console.error(err);
  }
}
/// heade end

let allMusics = [];
let myPlayList = [];
const BASE_URL = "http://127.0.0.1:3000/music";

loadAllMusics();
async function loadAllMusics() {
  try {
    // console.log(cookie);
    allMusics = await (
      await fetch("http://127.0.0.1:3000/music/all", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
    ).json();
    generateAllSongsTable(allMusics);
  } catch (err) {
    console.error(err);
  }
}

loadMyPlayList();
async function loadMyPlayList() {
  //
  try {
    // console.log(cookie);
    myPlayList = await (
      await fetch("http://127.0.0.1:3000/music/playlist", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
    ).json();
    generateMyPlayList(myPlayList);
  } catch (err) {
    console.error(err);
  }
}

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
    btnAdd.onclick = async () => {
      console.log("Add");
      try {
        let index = myPlayList.findIndex((val) => val.id === song.id);
        if (index > -1) {
          // TODO show fancy error message
          console.log("You already have this song in your playlist");
        } else {
          myPlayList = await addSongToPlayList(song.id);
          generateMyPlayList(myPlayList);
        }
      } catch (err) {
        console.error(err);
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
      let newSrc = `${BASE_URL}/files/${song.id}`;
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

async function addSongToPlayList(id) {
  return (
    await fetch(`${BASE_URL}/playlist/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
  ).json();
}
async function removeSongFromPlayList(id) {
  return (
    await fetch(`${BASE_URL}/playlist/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
  ).json();
}

function generateMyPlayList(myMusics) {
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
    btnRemove.onclick = async () => {
      console.log("Remove");
      //TODO
      try {
        myPlayList = await removeSongFromPlayList(song.id);
        generateMyPlayList(myPlayList);
      } catch (err) {
        console.error(err);
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
      let newSrc = `${BASE_URL}/files/${song.id}`;
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
