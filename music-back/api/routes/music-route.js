const express = require("express");
const router = express.Router();

const musicController = require("../controllers/music-controller");
const authMid = require("../middleware/auth-mid");

router.get("/all", authMid, musicController.getAllMusics);
router.get("/playlist", authMid, musicController.getPlayListByUsername);
router.get("/playlist/:songId", authMid, musicController.addSongToPlayList);
router.delete(
  "/playlist/:songId",
  authMid,
  musicController.removeSongFromPlayList
);
router.get("/search", authMid, musicController.searchByName);

//
router.get("/files/:id", musicController.getMusicFileById);

module.exports = router;
