const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const authMiddleware = require("../../utils/authMiddleware");
const upload = require("../../utils/multerConfig");
const UserInfoController = require("../../controllers/userInfo.controller");
const userInfoController = new UserInfoController();

const router = express.Router();

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileUrl"),
  asyncHandler(userInfoController.changeProfile)
);
router.put(
  "/default",
  authMiddleware,
  asyncHandler(userInfoController.defaultProfile)
);
router.put(
  "/nickname",
  authMiddleware,
  asyncHandler(userInfoController.changeNickname)
);
router.put(
  "/password",
  authMiddleware,
  asyncHandler(userInfoController.changePassword)
);
router.delete(
  "/delete",
  authMiddleware,
  asyncHandler(userInfoController.deleteUserInfo)
);
router.delete(
  "/allDelete",
  authMiddleware,
  asyncHandler(userInfoController.deleteAllUserInfo)
);

module.exports = router;
