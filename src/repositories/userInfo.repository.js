const { Users } = require("../models")

class UserInfoRepository {
    changeMyInfo = async (userId, nickname, profileUrl) => {
        await Users.update(
            { nickname, profileUrl },
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