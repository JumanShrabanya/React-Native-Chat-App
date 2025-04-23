const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/userController.js");

router.get("/hello", userContoller.sendHello);

module.exports = router;
