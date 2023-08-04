const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const LoginController = require("../controllers/login.controller");
const loginController = new LoginController();

const router = express.Router();

router.post("/", loginController.login);



module.exports = router;