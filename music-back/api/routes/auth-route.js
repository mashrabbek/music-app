const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const authController = require("../controllers/auth-controller");

router.post("/login", authController.login);

module.exports = router;
