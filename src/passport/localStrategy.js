const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/error");
const { Users } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "loginId", // req.body.loginId
      passwordField: "password", // req.body.password
    },
    async (loginId, password, done) => {
      try {
        const user = await Users.findOne({ where: { loginId } });
        if (!user) {
          throw new CustomError("아이디 혹은 비밀번호를 확인해주세요", 400);
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
          throw new CustomError("아이디 혹은 비밀번호를 확인해주세요", 400);
        }
        //JWT 토큰 발급
        const accessToken = jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return done(null, { user, accessToken });
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

