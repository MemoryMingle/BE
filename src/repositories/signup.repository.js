const { Users } = require('../models');


class SignupRepositroy {
    signup = async (loginId, password, nickname) => {
        const user = await Users.create({
            loginId,
            password,
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

module.exports = SignupRepositroy;