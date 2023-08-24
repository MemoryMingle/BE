const redisCli = require('../../utils/redisClient.js');
const authMiddleware = require("../../utils/authMiddleware");


router.post('/', authMiddleware, async (req, res) => {
    const accessToken = req.cookies.MM; // MM이라고 가정한 엑세스 토큰을 가져옵니다.

    if (accessToken) {
        // 블랙리스트에 토큰을 추가하고 만료 시간을 설정합니다 (예: 15분 = 900초).
        redisCli.set(accessToken, "블랙리스트", 'EX', 15 * 60, async (err) => {
            if (err) {
                return res.status(500).json({ message: "로그아웃 중 오류 발생" });
            }

            // 레디스에서 리프레시 토큰을 제거합니다.
            const { userId } = res.locals.user // 엑세스 토큰 또는 다른 출처에서 사용자 ID를 가져옵니다.
            await redisCli.del(`refreshToken:${userId}`);

            // 엑세스 토큰 쿠키를 제거합니다.
            res.clearCookie('MM', {
                secure: true,
                httpOnly: true,
                sameSite: 'none',
            });

            res.status(200).json({ message: "로그아웃 완료" });
        });
    } else {
        res.status(400).json({ message: "토큰이 없습니다." });
    }
});
