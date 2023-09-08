const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const SignupController = require("../../controllers/signup.controller");
const signupController = new SignupController();
const router = express.Router();

router.post("/", asyncHandler(signupController.signup));

router.post("/check", asyncHandler(signupController.checkDuplicate));

router.put(
  "/update",
  asyncHandler(signupController.updateProfile)
);

module.exports = router;
