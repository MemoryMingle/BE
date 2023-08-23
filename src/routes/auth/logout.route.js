router.post('/', (req, res) => {
    const accessToken = req.cookies.MM;  // 엑세스 토큰을 쿠키에서 가져옵니다. (이름이 MM인 쿠키가 토큰을 저장하는 것으로 가정)

    if (accessToken) {
        // 블랙리스트에 토큰을 추가하며, 토큰의 만료 시간을 설정합니다 (예: 1시간 = 3600초).
        redisClient.set(accessToken, "blacklisted", 'EX', 3600, (err) => {
            if (err) {
                return res.status(500).json({ message: "로그아웃 중 오류 발생" });
            }

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
