const { Users } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  // 닉네임으로 Users 정보 불러오기
  findByNickname = async (nickname, userId) => {
    const findByNicknameData = await Users.findAll({
      where: {
        nickname: nickname,
        userId: { [Op.ne]: userId },
      },
      attributes: ["userId", "loginId", "nickname", "profileUrl"],
    });
    return findByNicknameData;
  };

  // 접속한 유저 정보 확인
  userInfoByUserId = async (userId) => {
    const userInfoData = await Users.findOne({
      where: { userId: userId },
      attributes: ["userId", "loginId", "nickname", "profileUrl"],
    });
    return userInfoData;
  };
}

module.exports = UserRepository;
