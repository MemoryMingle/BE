const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/error");
const { Users } = require("../models");
const {
  saveRefreshToken,
  deleteRefreshToken,
} = require("../utils/tokenManager.redis");

passport.use(
  new LocalStrategy(
    {
      usernameField: "loginId",
      passwordField: "password",
    },
    async (loginId, password, done) => {
      try {
        const user = await Users.findOne({ where: { loginId } });
        if (!user) {
          throw new CustomError("아이디 혹은 비밀번호를 확인해주세요", 400);
        }
        if (user.deletedAt) {
          throw new CustomError("탈퇴한 회원입니다.", 400);
        }
        // 비동기로 비밀번호 검증
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
          throw new CustomError("아이디 혹은 비밀번호를 확인해주세요", 400);
        }

        // 이전 리프레시 토큰 무효화
        await deleteRefreshToken(user.userId);

        // 액세스 토큰 발급
        const accessToken = jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET,
          {
            expiresIn: "1m",
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

        // 리프레시 토큰을 레디스에 저장
        await saveRefreshToken(user.userId, refreshToken);

        return done(null, { user, accessToken, refreshToken });
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);
