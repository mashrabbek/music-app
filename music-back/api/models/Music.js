const path = require("path");

let musics = [
  {
    id: 1,
    title: "Moya Mama",
    author: "Cute baby girl",
    file: "mama.mp3",
    releaseDate: "22/09/2011",
  },
  {
    id: 2,
    title: "Dard",
    author: "Benom group",
    file: "benom.mp3",
    releaseDate: "22/09/2012",
  },
  {
    id: 3,
    title: "Yalole",
    author: "Bojalar",
    file: "Bojalar.mp3",
    releaseDate: "22/09/2013",
  },
  {
    id: 4,
    title: "Bemorman",
    author: "Shaxzoda",
    file: "shax.mp3",
    releaseDate: "22/09/2014",
  },
  {
    id: 5,
    title: "Yoz ifori",
    author: "Korean movie soundtrack",
    file: "yozifori.mp3",
    releaseDate: "22/09/2014",
  },
];
let myplaylist = {};

class Music {
  constructor() {}
  static getAllMusics() {
    return musics;
  }
  static getPlayListByUsername(username) {
    if (!myplaylist[username]) myplaylist[username] = [];
    return myplaylist[username];
  }

  static addSongToPlayList(username, id) {
    let songIndex = musics.findIndex((song) => song.id == id);
    if (songIndex > -1) {
      myplaylist[username].push(musics[songIndex]);
    }
    return myplaylist[username];
  }
  static removeSongFromPlayList(username, id) {
    let myList = myplaylist[username];
    let songIndex = myList.findIndex((song) => song.id == id);
    if (songIndex > -1) {
      myList.splice(songIndex, 1);
    }
    return myList;
  }
  static searchByName(textSearch) {
    let regex = new RegExp(textSearch, "g");
    let res = musics.filter((val) => val.title.toLowerCase().match(regex));
    return res;
  }
  static getMusicFileById(id) {
    let song = musics.find((val) => val.id == id);
    if (!song) return null;
    return path.join(__dirname, "..", "..", "assets", "music", `${song.file}`);
  }
}

module.exports = Music;
