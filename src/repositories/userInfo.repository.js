const { Users, Participants } = require("../models")
const { Op } = require("sequelize")
const applyBeforeDestroyHook = require('../utils/hooks')

class UserInfoRepository {
    changeProfile = async (userId, profileUrl) => {
        await Users.update(
            { profileUrl },
            { where: { userId } }
        );
    }
    defaultProfile = async (userId) => {
        await Users.update(
            { profileUrl: "https://res.cloudinary.com/dxl01ypgw/image/upload/v1693664401/TEST/KakaoTalk_20230902_231524661_lm2zxh.png" },
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
        const user = await Users.findByPk(userId);
        await applyBeforeDestroyHook(user);
        await user.destroy();
    }
    deleteAllUserInfo = async () => {
        const deleteCount = await Users.destroy(
            {
                where: {
                    deletedAt: {
                        [Op.ne]: null
                    }
                },
                limit: 10,
                force: true,
            },
        );
        return deleteCount;
    }
}
module.exports = UserInfoRepository