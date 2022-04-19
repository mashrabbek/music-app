let musics = [
  {
    id: 1,
    title: "Modern talking",
    author: "Michael Jackson",
    file: "modern-talking.mp3",
    releaseDate: "22/09/2011",
    poster: "http://127.0.0.1/images/1",
  },
  {
    id: 2,
    title: "Modern talking2",
    author: "Michael Jackson",
    file: "modern-talking.mp3",
    releaseDate: "22/09/2012",
    poster: "http://127.0.0.1/images/1",
  },
  {
    id: 3,
    title: "Modern talking3",
    author: "Michael Jackson",
    file: "modern-talking.mp3",
    releaseDate: "22/09/2013",
    poster: "http://127.0.0.1/images/1",
  },
  {
    id: 4,
    title: "Modern talking4",
    author: "Michael Jackson",
    file: "modern-talking.mp3",
    releaseDate: "22/09/2014",
    poster: "http://127.0.0.1/images/1",
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
    console.log({ songIndex });
    if (songIndex > -1) {
      myplaylist[username].push(musics[songIndex]);
    }
    console.log(myplaylist[username]);
    return myplaylist[username];
  }
  static removeSongFromPlayList(username, id) {
    let myList = myplaylist[username];
    let songIndex = myList.findIndex((song) => song.id == id);
    console.log({ songIndex });
    if (songIndex > -1) {
      myList.splice(songIndex, 1);
    }
    return myList;
  }
  static searchByName(text) {
    let regex = new RegExp(text, "g");
    let res = musics.filter((val) => val.title.match(regex));
    return res;
  }
}

module.exports = Music;
