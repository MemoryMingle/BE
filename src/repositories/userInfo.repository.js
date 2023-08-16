const { Users } = require("../models")

class UserInfoRepository {
    changeMyInfo = async (userId, nickname, profileUrl) => {
        await Users.update(
            { nickname, profileUrl },
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