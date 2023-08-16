const express = require("express");
const asyncHandler = require('../../middlewares/asyncHandler')
const authMiddleware = require("../../middlewares/authMiddleware");
const UserInfoController = require("../../controllers/userInfo.controller");
const userInfoController = new UserInfoController();

const router = express.Router();

router.put("/profile", authMiddleware, asyncHandler(userInfoController.changeUserInfo));
router.put("/password", authMiddleware, asyncHandler(userInfoController.changePassword));



module.exports = router;