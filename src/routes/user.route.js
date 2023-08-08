const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const UserController = require("../controllers/user.controller");
const userController = new UserController();

// 닉네임 기반 검색
router.get("/nickname/:nickname", authMiddleware, userController.findByNickname);

module.exports = router;
