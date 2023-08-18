const UserInfoRepository = require('../repositories/userInfo.repository');
const bcrypt = require('bcrypt');
const CustomError = require('../middlewares/errorMiddleware');

class UserInfoService {
    userInfoRepository = new UserInfoRepository();

    changeProfile = async (userId, profileUrl) => {
        await this.userInfoRepository.changeProfile(userId, profileUrl)
    }
    changeNickname = async (userId, nickname) => {
        await this.userInfoRepository.changeNickname(userId, nickname)
    }
    changePassword = async (userId, originalPassword, changedPassword) => {
        const user = await this.userInfoRepository.originalCheck(userId)
        const checkPassword = bcrypt.compareSync(originalPassword, user.password);
        if (!user || !checkPassword) {
            throw new CustomError("기존 비밀번호를 확인해주세요.", 400)
        }
        const hashPassword = bcrypt.hashSync(changedPassword, 10)
        await this.userInfoRepository.changePassword(userId, hashPassword)
    }

}
module.exports = UserInfoService;


