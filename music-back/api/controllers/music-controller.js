const Music = require("../models/Music");

exports.getAllMusics = (req, res) => {
  let musics = Music.getAllMusics();
  res.send(musics);
};
