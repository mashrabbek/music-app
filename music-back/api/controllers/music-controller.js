const Music = require("../models/Music");

exports.getAllMusics = (req, res) => {
  let musics = Music.getAllMusics();
  res.send(musics);
};

exports.getPlayListByUsername = (req, res) => {
  let username = req.user.username;
  res.send(Music.getPlayListByUsername(username));
};

exports.addSongToPlayList = (req, res) => {
  let username = req.user.username;
  let songId = req.params.songId;
  res.send(Music.addSongToPlayList(username, songId));
};
exports.removeSongFromPlayList = (req, res) => {
  let username = req.user.username;
  let songId = req.params.songId;
  res.send(Music.removeSongFromPlayList(username, songId));
};

exports.searchByName = (req, res) => {
  let searchText = req.query.title;
  if (!searchText) searchText = "";
  res.send(Music.searchByName(searchText));
};

exports.getMusicFileById = (req, res) => {
  let id = req.params.id;
  let path = Music.getMusicFileById(id);
  if (!path) return res.sendStatus(404);
  return res.sendFile(path);
};
