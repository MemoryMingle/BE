const SignupService = require('../services/signup.service');
const { signupSchema } = require('../utils/validation');
const CustomError = require('../utils/error');



class SignupController {
    signupService = new SignupService();

    signup = async (req, res, next) => {
        const { loginId, password, confirm } = req.body;
        const { error } = signupSchema.validate(req.body);
        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }
        await this.signupService.signup(loginId, password);
        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    };
    checkDuplicate = async (req, res, next) => {
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
    }
    updateProfile = async (req, res, next) => {
        const { nickname, profileUrl, loginId } = req.body;
        if (!nickname) {
            nickname = "닉네임"
        }
        const updateProfileData = await this.signupService.updateProfile(loginId, nickname, profileUrl)
        res.status(201).json({ message: '프로필 변경이 완료되었습니다.' });
    }
}

module.exports = SignupController;