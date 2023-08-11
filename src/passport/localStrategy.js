const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const { Users } = require("../models");


passport.use(new LocalStrategy({
    usernameField: 'loginId', // req.body.loginId
    passwordField: 'password' // req.body.password
},
    async (loginId, password, done) => {
        try {
            const user = await Users.findOne({ where: { loginId } });
            if (!user || user.password !== password) {
                return done(null, false, { errorMessage: "잘못된 아이디 혹은 비밀번호입니다." });
            }
            // JWT 토큰 발급
            const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            return done(null, { user, accessToken });
        } catch (err) {
            return done(err);
        }
    }));
