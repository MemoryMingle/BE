const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { Users } = require('../models');
require('dotenv').config();

module.exports = (app) => {
    app.use(passport.initialize());
    passport.use(
        new KakaoStrategy({
            clientID: process.env.KAKAO_ID,
            callbackURL: process.env.KAKAO_URL,
        },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await Users.findOne({
                        where: { kakaoId: profile.id, /*providerType: 'kakao'*/ },
                    });
                    // 이미 가입된 카카오 프로필이면 성공
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await Users.create({
                            loginId: profile._json && profile._json.kakao_account_email,
                            nickname: profile.displayName,
                            kakaoId: profile.id,
                            profileImgUrl:
                                profile._json &&
                                profile._json.kakao_account.profile.profile_image_url,
                            providerType: 'kakao',
                        });
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};