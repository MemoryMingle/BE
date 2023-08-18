const UserInfoService = require('../services/userInfo.service');
const CustomError = require('../middlewares/errorMiddleware');
const { passwordSchema } = require('../middlewares/validationMiddleware');

class UserInfoController {
    userInfoService = new UserInfoService();

    changeProfile = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { profileUrl } = req.body;
        await this.userInfoService.changeProfile(userId, profileUrl)
        res.status(201).json({ message: '프로필 변경이 완료되었습니다.' });
    }
    changeNickname = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { nickname } = req.body;
        await this.userInfoService.changeNickname(userId, nickname)
        res.status(201).json({ message: '닉네임 변경이 완료되었습니다.' });
    }
    changePassword = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { originalPassword, changedPassword, changedConfirm } = req.body;
        const { error } = passwordSchema.validate(req.body);
        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }
        await this.userInfoService.changePassword(userId, originalPassword, changedPassword)
        res.status(201).json({ message: '비밀번호 변경이 완료되었습니다.' });
    }

}

module.exports = UserInfoController;