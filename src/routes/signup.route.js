const express = require("express");

const SiginupController = require("../controllers/signup.controllers");
const siginupController = new SiginupController();

const router = express.Router();

router.post("/", siginupController.signup);
router.get("/check", siginupController.checkDuplicate);
router.put("/update", siginupController.updateProfile);


module.exports = router;