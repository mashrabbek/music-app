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
let currentMusic = {};

let player = document.getElementById("player");
player.onended = playAutoNext;

// PLAYER

let playerBtnPrev = document.getElementById("btnPrev");
let playerBtnPlay = document.getElementById("btnPlay");
let playerIconPlay = document.getElementById("iconPlay");
let playerBtnNext = document.getElementById("btnNext");
let playerProgressBar = document.getElementById("progBar");
let spanTime = document.getElementById("spanTime");
let playerTitleSong = document.getElementById("playerTitleSong");
//
let playerbtnRepeat = document.getElementById("btnRepeat");
let playerbtnShuffle = document.getElementById("btnShuffle");
let playerbtnRepeatOne = document.getElementById("btnRepeatOne");

let REPEAT = "O"; // one=> O, repeat=>R, shuffle=> S
playerbtnRepeatOne.style.backgroundColor = "green";

playerBtnPlay.onclick = () => {
  //
  if (currentMusic.id) {
    player.paused ? resume() : pause();
  }
};
playerbtnRepeat.onclick = () => {
  //
  playerbtnShuffle.style.backgroundColor = null;
  playerbtnRepeatOne.style.backgroundColor = null;
  REPEAT = "R";
  playerbtnRepeat.style.backgroundColor = "green";
  console.log(REPEAT);
};
playerbtnShuffle.onclick = () => {
  //
  playerbtnRepeat.style.backgroundColor = null;
  playerbtnRepeatOne.style.backgroundColor = null;
  REPEAT = "S";
  playerbtnShuffle.style.backgroundColor = "green";
  console.log(REPEAT);
};
playerbtnRepeatOne.onclick = () => {
  //
  playerbtnRepeat.style.backgroundColor = null;
  playerbtnShuffle.style.backgroundColor = null;
  REPEAT = "O";
  playerbtnRepeatOne.style.backgroundColor = "green";
  console.log(REPEAT);
};

playerBtnNext.onclick = () => {
  if (currentMusic.id) {
    let nextTrack = findNext("O");
    stop();
    currentMusic = nextTrack;
    play();
  }
};

playerBtnPrev.onclick = () => {
  if (currentMusic.id) {
    let prevTrack = findPrev("O");
    stop();
    currentMusic = prevTrack;
    play();
  }
};

function playAutoNext() {
  let nextTrack = findNext(REPEAT);
  stop();
  currentMusic = nextTrack;
  play();
}

function findNext(REP) {
  let id = currentMusic.id;
  let index = myPlayList.findIndex((val) => val.id == id);
  switch (REP) {
    case "O":
      return index < myPlayList.length - 1
        ? myPlayList[index + 1]
        : myPlayList[0];
    case "R":
      return currentMusic;
    case "S":
      return myPlayList[Math.floor(Math.random() * myPlayList.length)];
    default:
      return index < myPlayList.length - 1
        ? myPlayList[index + 1]
        : myPlayList[0];
  }
}
function findPrev(REP) {
  let id = currentMusic.id;
  let index = myPlayList.findIndex((val) => val.id == id);
  switch (REP) {
    case "O":
      return index == 0
        ? myPlayList[myPlayList.length - 1]
        : myPlayList[index - 1];
    case "R":
      return currentMusic;
    case "S":
      return myPlayList[Math.floor(Math.random() * myPlayList.length)];
    default:
      return index == 0
        ? myPlayList[myPlayList.length - 1]
        : myPlayList[index - 1];
  }
}

//

loadAllMusics();
async function loadAllMusics() {
  try {
    // console.log(cookie);
    allMusics = await (
      await fetch(`${BASE_URL}/all`, {
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
      await fetch(`${BASE_URL}/playlist`, {
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
        console.log({ add: myPlayList });
        let index = myPlayList.findIndex((val) => val.id === song.id);
        if (index > -1) {
          // TODO show fancy error message
          console.log("You already have this song in your playlist");
        } else {
          myPlayList = await addSongToPlayList(song.id);
          //generateMyPlayList(myPlayList);
          loadMyPlayList();
        }
      } catch (err) {
        console.error(err);
      }
    };

    tdActions.append(btnAdd);
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
        if (currentMusic.id === song.id) {
          // playing
          stop();
          currentMusic = {};
        }
        myPlayList = await removeSongFromPlayList(song.id);
        loadMyPlayList();
        // console.log(myPlayList);
        // generateMyPlayList(myPlayList);
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
    iconPlay.setAttribute("id", "iconPlay" + song.id);
    btnPlay.appendChild(iconPlay);

    btnPlay.onclick = () => {
      let newSrc = `${BASE_URL}/files/${song.id}`;
      let srcMusic = player.getAttribute("src");
      if (newSrc == srcMusic) {
        // resume
        player.paused ? resume() : pause();
      } else {
        stop();
        currentMusic = song;
        play();
      }
    };

    tdActions.append(btnRemove, btnPlay);

    tr.append(tdId, tdTitle, tdReleaseDate, tdActions);

    myPlayList.appendChild(tr);
    //
  }
}

function play() {
  player.ontimeupdate = function () {
    spanTime.innerText =
      secToMin(player.currentTime) + "/" + secToMin(player.duration);
    let percentage = (player.currentTime / player.duration) * 100;
    playerProgressBar.setAttribute("value", percentage);
  };
  player.setAttribute("src", `${BASE_URL}/files/${currentMusic.id}`);
  let playIcon = document.getElementById("iconPlay" + currentMusic.id);
  playerTitleSong.innerHTML = currentMusic.title;
  playIcon.setAttribute("class", "fa-solid fa-pause");
  playerIconPlay.setAttribute("class", "fa-solid fa-pause");
  player.play();
}
function resume() {
  let playIcon = document.getElementById("iconPlay" + currentMusic.id);
  playIcon.setAttribute("class", "fa-solid fa-pause");
  playerIconPlay.setAttribute("class", "fa-solid fa-pause");
  player.play();
}
function pause() {
  let playIcon = document.getElementById("iconPlay" + currentMusic.id);
  playIcon.setAttribute("class", "fa-solid fa-play");
  playerIconPlay.setAttribute("class", "fa-solid fa-play");
  player.pause();
}

function stop() {
  console.log({ stop: currentMusic.id });
  if (currentMusic.id) {
    let playIcon = document.getElementById("iconPlay" + currentMusic.id);
    playIcon.setAttribute("class", "fa-solid fa-play");
    playerIconPlay.setAttribute("class", "fa-solid fa-play");
    playerProgressBar.setAttribute("value", 0);
    spanTime.innerText = "00:00/00:00";
    playerTitleSong.innerText = ".";
    player.pause();
  }
}

function secToMin(seconds) {
  seconds = Math.round(seconds);
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  min = min > 9 ? min : `0${min}`;
  sec = sec > 9 ? sec : `0${sec}`;
  return `${min}:${sec}`;
}
