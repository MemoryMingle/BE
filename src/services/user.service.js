const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  // 닉네임 기반 유저정보
  findByNickname = async (nickname) => {
    const findByNicknameData = await this.userRepository.findByNickname(
      nickname
    );

    return findByNicknameData;
  };

  userInfoByUserId = async (userId) => {
    const userInfoData = await this.userRepository.userInfoByUserId(userId);

    return userInfoData;
  };
}

module.exports = UserService;
