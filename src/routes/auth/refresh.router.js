const express = require('express');
const jwt = require('jsonwebtoken');
const { saveRefreshToken, deleteRefreshToken } = require('../../utils/tokenManager.js');
const router = express.Router();
const redisCli = require('../../utils/redisClient.js');
const CustomError = require("../../utils/error");
const authMiddleware = require("../../utils/authMiddleware");

router.post('/', authMiddleware, async (req, res, next) => {
    const clientRefreshToken = req.body.refreshToken;

    // 리프레시 토큰 검증
    jwt.verify(clientRefreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
        try {
            if (err) {
                throw new CustomError("유효하지 않은 리프레시 토큰1", 403);
            }

            // 레디스에서 이전 리프레시 토큰을 가져온다.
            const storedRefreshToken = await redisCli.get(`refreshToken:${user.userId}`);

            // 이전 리프레시 토큰과 클라이언트의 리프레시 토큰이 다르면 에러
            if (storedRefreshToken !== clientRefreshToken) {
                throw new CustomError("유효하지 않은 리프레시 토큰2", 403);
            }
            // 새로운 액세스 토큰 발급
            const accessToken = jwt.sign(
                { userId: user.userId },
                process.env.JWT_SECRET,
                {
                    expiresIn: "15m",
                }
            );

            // 새로운 리프레시 토큰 발급
            const refreshToken = jwt.sign(
                { userId: user.userId },
                process.env.JWT_REFRESH_SECRET,
                {
                    expiresIn: "7d",
                }
            );

            // 레디스에서 이전 리프레시 토큰 삭제
            await deleteRefreshToken(user.userId);

            // 새로운 리프레시 토큰을 레디스에 저장
            await saveRefreshToken(user.userId, refreshToken);

            // 새 토큰을 클라이언트에게 전달
            res.status(200).json({ accessToken, refreshToken });
        } catch (err) {
            next(err);
        }
    });
});

module.exports = router;
