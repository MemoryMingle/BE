const { Users } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  // 닉네임으로 Users 정보 불러오기
  findByNickname = async (nickname) => {
    const findByNicknameData = await Users.findAll({
      where: {
        nickname: nickname,
      },
      attributes :["userId","loginId","nickname","profileUrl"]
    });    
    return findByNicknameData;
  };
}

module.exports = UserRepository;
