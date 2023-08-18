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
    passwordCheck = async (userId) => {
        const user = await Users.findByPk(userId)
        return user
    }
    changePassword = async (userId, hashPassword) => {
        await Users.update(
            { password: hashPassword },
            { where: { userId } }
        );
    }
    deleteUserInfo = async (userId) => {
        await Users.destroy(
            { where: { userId } }
        );
    }
    deleteAllUserInfo = async () => {
        await Users.destroy(
            {
                where: {
                    deletedAt: {
                        [Sequelize.Op.ne]: null
                    }
                },
                limit: 5
            }
        );
    }
}
module.exports = UserInfoRepository