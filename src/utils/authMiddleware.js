const asyncHandler = require("./asyncHandler");
const CustomError = require("./error");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const regenerateToken = require("../utils/regenerateToken"); // 새로운 토큰을 발급하는 로직

module.exports = asyncHandler(async (req, res, next) => {
  const { MM } = req.cookies;
  const [type, token] = (MM ?? "").split(" ");

  if (!type || !token || type !== "Bearer") {
    throw new CustomError("로그인이 필요한 기능입니다.", 400);
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodeToken.userId;
    res.locals.user = userId;
    next();
  } catch (err) {
    // 만약 토큰 검증이 실패했다면, 새로운 토큰을 발급
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      try {
        const newTokens = await regenerateToken(req, res, next);
        // 새 토큰을 클라이언트에게 전달하는 로직. 예를 들면 쿠키에 저장.
        res.cookie("MM", `Bearer ${newTokens.accessToken}`, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
        res.cookie("refreshToken", newTokens.refreshToken, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });
        res.locals.user = jwt.verify(
          newTokens.accessToken,
          process.env.JWT_SECRET
        );
        next();
      } catch (newTokenErr) {
        next(newTokenErr);
      }
    } else {
      next(err);
    }
  }
});
