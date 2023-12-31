const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const CustomError = require("../utils/error");

const { Users } = require("../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: process.env.KAKAO_URL, // 카카오 로그인 Redirect URI 경로
      },
      /*
       * clientID에 카카오 앱 아이디 추가
       * callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
       * accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
       * profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
       */
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await Users.findOne({
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            where: {
              kakaoId: profile.id,
              providerType: "kakao",
            },
            paranoid: false,
          });
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            if (exUser.dataValues.deletedAt) {
              done(null, false, { message: "탈퇴한 회원입니다." });
            }
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await Users.create({
              loginId: profile._json && profile._json.kakao_account_email,
              nickname: profile.displayName,
              kakaoId: profile.id,
              profileUrl:
                profile._json &&
                profile._json.kakao_account.profile.profile_image_url,
              providerType: "kakao",
            });
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
