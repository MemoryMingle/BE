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

            // DB에서 정보 찾아오기
            const user = await this.loginService.login(loginId);

            // DB에서 ID를 찾지 못한 경우 처리
            if (!user)
                throw new CustomError('이메일 또는 비밀번호가 일치하지 않습니다.', 403);

            if (!password === user.password)
                throw new CustomError('이메일 또는 비밀번호가 일치하지 않습니다.', 403);

            // accessToken 생성
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

            // res.cookie("MM", `Bearer ${accessToken}`);
            res.status(200).json({
                accessToken,
                Authorization: `Bearer ${accessToken}`
            });
        } catch (err) {
            next(err);
        }
    };

}

module.exports = LoginController;