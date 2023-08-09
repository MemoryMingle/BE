const LoginService = require('../services/login.service');
const { loginSchema } = require('../middlewares/validationMiddleware');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const CustomError = require('../middlewares/errorMiddleware');
require('dotenv').config();

class LoginController {
    loginService = new LoginService();

    login = async (req, res, next) => {
        const { loginId, password } = req.body;

        try {
            // case. Joi validation
            const { error } = await loginSchema.validateAsync(req.body);
            if (error) throw new CustomError(error.details[0].message, 400);

            const user = await this.loginService.login(loginId);

            if (!user)
                throw new CustomError('이메일 또는 비밀번호가 일치하지 않습니다.', 403);

            if (!password === user.password)
                throw new CustomError('이메일 또는 비밀번호가 일치하지 않습니다.', 403);

            const accessToken = jwt.sign(
                {
                    userId: user.userId,
                    nickname: user.nickname,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '3h',
                }
            );

            res.cookie("MM", `Bearer ${accessToken}`, {
                secure: true,
                httpOnly: false,
                sameSite: 'none',
            });

            res.status(200).json({
                message: "로그인 완료",
                // Authorization: `Bearer ${accessToken}`
            });
        } catch (err) {
            next(err);
        }
    };

}

module.exports = LoginController;
