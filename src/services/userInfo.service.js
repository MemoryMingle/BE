const UserInfoRepository = require('../repositories/userInfo.repository');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/error');
const { passwordSchema } = require('../utils/validation');

class UserInfoService {
    userInfoRepository = new UserInfoRepository();
    changeMyInfo = async (userId, nickname, profileUrl) => {
        const changeMyInfoDate = await this.userInfoRepository.changeMyInfo(userId, nickname, profileUrl)
    }
    changePassword = async (userId, originalPassword, changedPassword) => {
        const user = await this.userInfoRepository.passwordCheck(userId)
        const checkPassword = bcrypt.compareSync(originalPassword, user.password);
        if (!user || !checkPassword) {
            throw new CustomError("기존 비밀번호를 확인해주세요.", 400)
        }
        const hashPassword = bcrypt.hashSync(changedPassword, 10)
        await this.userInfoRepository.changePassword(userId, hashPassword)
    }
    deleteUserInfo = async (userId, password) => {
        const user = await this.userInfoRepository.passwordCheck(userId)
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!user || !checkPassword) {
            throw new CustomError("비밀번호를 확인해주세요.", 400)
        }
        await this.userInfoRepository.deleteUserInfo(userId)
    }
    deleteAllUserInfo = async (userId, adminVerification) => {
        if (userId !== 1 || adminVerification !== "관리자 확인") {
            throw new CustomError("관리자가 아닙니다.", 404)
        }
        await this.userInfoRepository.deleteAllUserInfo(userId)
    }

}
module.exports = UserInfoService;


