const express = require("express");
const asyncHandler = require('../../middlewares/asyncHandler')
const SiginupController = require("../../controllers/signup.controller");
const siginupController = new SiginupController();

const router = express.Router();

router.post("/", asyncHandler(siginupController.signup));
router.post("/check", asyncHandler(siginupController.checkDuplicate));
router.put("/update", asyncHandler(siginupController.updateProfile));


module.exports = router;