const express = require("express");
const router = express.Router();
const redisCli = require("../../utils/redisClient.js");
const authMiddleware = require("../../utils/authMiddleware");
const asyncHandler = require("../../utils/asyncHandler.js");

router.post(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // 레디스에서 리프레시 토큰을 제거합니다.
    const userId = res.locals.user; // 엑세스 토큰 또는 다른 출처에서 사용자 ID를 가져옵니다.
    await redisCli.del(`refreshToken:${userId}`);
    // 엑세스 토큰 쿠키를 제거합니다.
    res.clearCookie("MM", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "로그아웃 완료" });
  })
);

module.exports = router;
