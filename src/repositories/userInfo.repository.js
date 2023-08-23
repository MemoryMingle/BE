const { Users } = require("../models")
const { Op } = require("sequelize")

class UserInfoRepository {
    changeProfile = async (userId, profileUrl) => {
        await Users.update(
            { profileUrl },
            { where: { userId } }
        );
    }
    defaultProfile = async (userId) => {
        await Users.update(
            { profileUrl: "https://t1.daumcdn.net/cfile/tistory/243FE450575F82662D" },
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
        const deleteCount = await Users.destroy(
            {
                where: {
                    deletedAt: {
                        [Op.ne]: null
                    }
                },
                limit: 3,
                force: true
            }
        );
        return deleteCount
    }
}
module.exports = UserInfoRepository