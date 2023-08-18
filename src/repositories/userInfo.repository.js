const { Users } = require("../models")

class UserInfoRepository {
    changeProfile = async (userId, profileUrl) => {
        await Users.update(
            { profileUrl },
            { where: { userId } }
        );
    }
    changeNickname = async (userId, nickname) => {
        await Users.update(
            { nickname },
            { where: { userId } }
        );
    }
    originalCheck = async (userId) => {
        const user = await Users.findByPk(userId)
        return user
    }
    changePassword = async (userId, hashPassword) => {
        await Users.update(
            { password: hashPassword },
            { where: { userId } }
        );
    }
}
module.exports = UserInfoRepository