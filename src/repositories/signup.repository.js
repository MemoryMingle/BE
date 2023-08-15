const { Users } = require('../models');


class SignupRepository {
    signup = async (loginId, hashPassword, nickname) => {
        const user = await Users.create({
            loginId,
            password: hashPassword,
            nickname,
        });
        return user;
    };
    checkDuplicate = async (loginId) => {
        const checkDuplicateData = await Users.findOne({ where: { loginId } })
        return checkDuplicateData
    }
    updateProfile = async (loginId, nickname, profileUrl) => {
        const updateProfileData = await Users.update(
            { nickname, profileUrl },
            { where: { loginId } }
        );
        return updateProfileData
    }
}

module.exports = SignupRepository;