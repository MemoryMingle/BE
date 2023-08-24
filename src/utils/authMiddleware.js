const redisCli = require('./path-to-your-redis-client'); // Redis 클라이언트를 가져옵니다.

module.exports = asyncHandler(async (req, res, next) => {
    const { MM } = req.cookies;
    const [type, token] = (MM ?? "").split(" ");

    if (!type || !token || type !== "Bearer") {
        throw new CustomError("로그인이 필요한 기능입니다1.", 403)
    }

    // Redis에서 토큰이 블랙리스트에 있는지 확인합니다.
    const isBlacklisted = await redisCli.get(token);
    if (isBlacklisted) {
        throw new CustomError("로그아웃 처리된 토큰입니다.", 403);
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodeToken.userId;

    const findUser = await Users.findOne({ where: { userId } });
    if (!findUser) {
        throw new CustomError("로그인이 필요한 기능입니다2.", 403)
    }

    res.locals.user = findUser;
    next();
});
