const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const upload = require("../../utils/multerConfig");
const SignupController = require("../../controllers/signup.controller");
const signupController = new SignupController();

const router = express.Router();

router.post("/", asyncHandler(signupController.signup));
router.post("/check", asyncHandler(signupController.checkDuplicate));
router.put(
  "/update",
  upload.single("profileUrl"),
  asyncHandler(signupController.updateProfile)
);

module.exports = router;
