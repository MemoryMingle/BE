const { Users } = require("../models");

class SignupRepository {
  signup = async (loginId, hashPassword) => {
    const user = await Users.create({
      loginId,
      password: hashPassword,
    });
    const userId = user.userId;
    return userId;
  };
  checkDuplicate = async (loginId) => {
    const checkDuplicateData = await Users.findOne({
      where: { loginId },
      paranoid: false,
    });
    return checkDuplicateData;
  };
  updateProfile = async (loginId, nickname, profileUrl) => {
    const updateProfileData = await Users.update(
      { nickname, profileUrl },
      { where: { loginId } }
    );
    return updateProfileData;
  };
}

module.exports = SignupRepository;
