const SignupService = require('../services/signup.service');
const { signupSchema } = require('../utils/validation');
const CustomError = require('../utils/error');
const jwt = require("jsonwebtoken");
const uploadToProfile = require('../utils/uploadToProfile');
const { saveRefreshToken, deleteRefreshToken } = require('../utils/tokenManager.redis');



class SignupController {
    signupService = new SignupService();

    signup = async (req, res, next) => {
        const { loginId, password, confirm } = req.body;
        const { error } = signupSchema.validate(req.body);
        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }
        const userId = await this.signupService.signup(loginId, password);
        const accessToken = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );
        const refreshToken = jwt.sign(
            { userId: userId },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );
        await deleteRefreshToken(userId);
        await saveRefreshToken(userId, refreshToken);

        res.cookie("MM", `Bearer ${accessToken}`, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.status(201).json({
            userId: userId,
            message: '회원가입이 완료되었습니다.'
        });
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
        let { nickname = "닉네임", loginId } = req.body;
        let profileUrl;  // 이미지 URL 초기화
        if (req.file) {
            // 이미지 업로드 및 URL 받아오기
            profileUrl = await uploadToProfile(req.file.path);
        } else {
            throw new CustomError("프로필 이미지 없음", 400);
        }
        const updateProfileData = await this.signupService.updateProfile(loginId, nickname, profileUrl)
        res.status(201).json({
            profileUrl,
            message: '프로필 변경이 완료되었습니다.'
        });
    }
}

module.exports = SignupController;