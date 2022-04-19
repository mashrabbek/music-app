let musics = [
  {
    id: 1,
    title: "Modern talking",
    author: "Michael Jackson",
    file: "modern-talking.mp3",
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
