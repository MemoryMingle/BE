const SignupService = require('../services/signup.service');
const { signupSchema } = require('../middlewares/validationMiddleware');
const CustomError = require('../middlewares/errorMiddleware');

class SignupController {
    signupService = new SignupService();

    signup = async (req, res, next) => {
        try {
            const { loginId, password, confirm, nickname } = req.body;

            const { error } = signupSchema.validate(req.body);

            // 일단 토큰 확인용으로 만들어서 테스트 유효성 검사 및 에러 처리 수정 필요함
            if (error) throw new CustomError(error.details[0].message, 400);
            if (password !== confirm)
                throw new CustomError('비밀번호가 일치하지 않습니다.', 400);

            await this.signupService.signup(loginId, password, nickname);

            res.status(201).json({ message: '회원가입이 완료되었습니다.' });
        } catch (error) {
            next(error);
        }
    };
    checkDuplicate = async (req, res, next) => {
        try {
            const { loginId } = req.body;
            const checkDuplicateData = await this.signupService.checkDuplicate(loginId)

            if (checkDuplicateData) {
                res.status(200).json({
                    idCheck: false,
                    message: "이미 존재하는 아이디입니다."
                })
            } else {
                res.status(200).json({
                    idCheck: true,
                    message: "사용할 수 있는 아이디입니다."
                })
            }

        } catch (error) {
            next(error);
        }
    }
    updateProfile = async (req, res, next) => {
        try {
            const { nickname, imageUrl, loginId } = req.body;
            if (!nickname) {
                nickname = "닉네임"
            }
            const updateProfileData = await this.signupService.updateProfile(loginId, nickname, imageUrl)

            res.status(201).json({ message: '프로필 변경이 완료되었습니다.' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SignupController;