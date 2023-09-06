const jwt = require("jsonwebtoken");
const {
  saveRefreshToken,
  deleteRefreshToken,
} = require("./tokenManager.redis");
const redisCli = require("./redisClient.js");
const CustomError = require("./error");
const util = require("util");
const verifyAsync = util.promisify(jwt.verify);

const regenerateToken = async (req, res, next) => {
  const clientRefreshToken = req.cookies.refreshToken;

  try {
    const user = await verifyAsync(
      clientRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const storedRefreshToken = await redisCli.get(
      `refreshToken:${user.userId}`
    );

    if (storedRefreshToken !== clientRefreshToken) {
      throw new CustomError("유효하지 않은 리프레시 토큰", 400);
    }

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    await deleteRefreshToken(user.userId);
    await saveRefreshToken(user.userId, refreshToken);

    return { accessToken, refreshToken };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new CustomError("리프레시 토큰이 만료되었습니다.", 400);
    }
    next(err);
  }
};

module.exports = regenerateToken;
