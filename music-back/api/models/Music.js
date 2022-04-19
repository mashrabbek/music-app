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
class Music {
  constructor() {}
  static getAllMusics() {
    return musics;
  }
}

module.exports = Music;
