const passport = require("passport");
const local = require("./localStrategy"); // 로컬서버로 로그인할때
const kakao = require("./kakaoStrategy"); // 카카오서버로 로그인할때
const { Users } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findOne({ where: { id } })
      .then((user) => {
        if (!user) {
          return done(null, false); // 사용자가 찾아지지 않은 경우
        }
        done(null, user); // 사용자를 찾은 경우
      })
      .catch((err) => done(err));
  });

  local();
  kakao();
};
