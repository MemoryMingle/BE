const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  // 닉네임 기반 검색
  findByNickname = async (req, res, next) => {
    try {
      const { nickname } = req.params;

      const findByNicknameData = await this.userService.findByNickname(
        nickname
      );

      res
        .status(201)
        .json({ findByNicknameData });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
