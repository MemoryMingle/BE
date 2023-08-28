const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler')
const { saveRefreshToken, deleteRefreshToken } = require('../../utils/tokenManager.redis');
const axios = require("axios");
const { Users } = require("../../models")



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

router.post("/kakao", async (req, res) => {
    const { authorizationCode } = req.body;

    try {
        // 카카오로부터 액세스 토큰을 받아옵니다.
        const { data } = await axios.post("https://kauth.kakao.com/oauth/token", {
            grant_type: "authorization_code",
            client_id: process.env.KAKAO_ID,
            redirect_uri: process.env.KAKAO_URL,
            code: authorizationCode,
        });
        const kakaoAccessToken = data.access_token;
        const { data: userInfo } = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
            },
        });
        const kakaoUserId = userInfo.id;

        const user = await Users.findOne({ where: { kakaoId: kakaoUserId } })

        await deleteRefreshToken(user.userId);

        const accessToken = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );
        // 리프레시 토큰 발급
        const refreshToken = jwt.sign(
            { userId: user.userId },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );
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
        res.status(200).json({
            userId: user.userId,
            message: "로그인 완료"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// router.get("/kakao", passport.authenticate("kakao", { session: false }));
// router.get(
//     "/kakao/callback",
//     passport.authenticate("kakao", { failureRedirect: "/", session: false }),
//     asyncHandler(async (req, res) => {
//         const user = req.user;

//         // 액세스 토큰 생성
//         const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
//             expiresIn: "15m",
//         });

//         // 리프레시 토큰 생성
//         const refreshToken = jwt.sign({ userId: user.userId }, process.env.JWT_REFRESH_SECRET, {
//             expiresIn: "7d",
//         });

//         // 리프레시 토큰을 레디스에 삭제 저장
//         await deleteRefreshToken(user.userId);
//         await saveRefreshToken(user.userId, refreshToken);

//         res.cookie("MM", `Bearer ${accessToken}`, {
//             secure: true,
//             httpOnly: true,
//             sameSite: "none",
//         });
//         res.cookie("refreshToken", refreshToken, {
//             secure: true,
//             httpOnly: true,
//             sameSite: "none",
//         });
//         res.status(200).json({
//             userId: user.userId,
//             message: "카카오 로그인 완료"
//         })
//     })
// );


module.exports = router;