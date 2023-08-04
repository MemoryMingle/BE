const express = require("express");

const SiginupController = require("../controllers/signup.controllers");
const siginupController = new SiginupController();

const router = express.Router();

router.post("/", siginupController.signup);

module.exports = router;