const express = require("express");
const router = express.Router();
const userContoller = require("../controllers/userController.js");

router.get("/users", userContoller.getUsers);

module.exports = router;
