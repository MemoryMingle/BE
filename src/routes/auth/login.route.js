const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler')
const { saveRefreshToken, deleteRefreshToken } = require('../../utils/tokenManager.redis');
const axios = require("axios");
const { Users } = require("../../models")
const authMiddleware = require("../../utils/authMiddleware")

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "로그인 됨"
    });
}))
router.post('/', passport.authenticate('local', { session: false }), async (req, res) => {
    // 위에서 done이 req.user로 반환된다.
    res.cookie("MM", `Bearer ${req.user.accessToken}`, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });
    res.cookie("refreshToken", req.user.refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });
    res.status(200).json({
        userId: req.user.user.userId,
        message: "로그인 완료"
    });
});

router.get("/kakao", passport.authenticate("kakao", { session: false }));
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", { failureRedirect: "/", session: false }),
    asyncHandler(async (req, res) => {
        const user = req.user;

        // 액세스 토큰 생성
        const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        // 리프레시 토큰 생성
        const refreshToken = jwt.sign({ userId: user.userId }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d",
        });

        // 리프레시 토큰을 레디스에 삭제 저장
        await deleteRefreshToken(user.userId);
        await saveRefreshToken(user.userId, refreshToken);

        res.cookie("MM", `Bearer ${accessToken}`, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.redirect("https://memorymingle.shop/groupmain")
    })
);


module.exports = router;