const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const musicController = require("../controllers/music-controller");

router.get("/all", musicController.getAllMusics);

router.get("/files/:id", (req, res) => {
  let files = [
    { id: 1, file: "mama.mp3" },
    { id: 2, file: "benom.mp3" },
    { id: 3, file: "Bojalar.mp3" },
    { id: 4, file: "shax.mp3" },
    { id: 5, file: "yozifori.mp3" },
  ];
  let song = files.find((song) => song.id == req.params.id);
  if (!song) song = { file: "yozifori.mp3" }; // default music

  let filePath = path.join(
    __dirname,
    "..",
    "..",
    "assets",
    "music",
    `${song.file}`
  );
  let readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

module.exports = router;