const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/', passport.authenticate('local', { session: false }), (req, res) => {
    // 위에서 done이 req.user로 반환된다.
    res.cookie("MM", `Bearer ${req.user.accessToken}`, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });
    res.status(200).json({ message: "로그인 완료" });
});

// 카카오 로그인
router.get("/kakao", passport.authenticate("kakao", { session: false }));
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", { failureRedirect: "/", session: false }),
    // 로그인 인증 실패 시 이동할 주소
    (req, res) => {
        const user = req.user;
        try {
            // JWT 생성
            const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            // JWT를 쿠키에 담아 클라이언트에게 전달
            res.cookie("MM", `Bearer ${accessToken}`, {
                secure: true,
                httpOnly: true,
                sameSite: "none",
            });
            res.status(200).json({ message: "로그인 완료" });
        } catch (error) {
            res.status(500).json({ message: "요청을 처리하는 동안 오류가 발생했습니다." });
        }
    }
);


module.exports = router;