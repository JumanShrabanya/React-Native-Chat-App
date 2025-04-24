const express = require("express");
const router = express.Router();
const authContoller = require("../controllers/authController.js");

router.post("/register", authContoller.registerUser);
router.post("/login", authContoller.userLogin);

module.exports = router;
