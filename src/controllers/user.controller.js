const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  // 닉네임 기반 검색
  findByNickname = async (req, res, next) => {
    try {
      const { nickname } = req.params;
      const userId = res.locals.user;

      const findByNicknameData = await this.userService.findByNickname(
        nickname,
        userId
      );

      res.status(201).json({ findByNicknameData });
    } catch (error) {
      next(error);
    }
  };

  userInfoByUserId = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const userInfoData = await this.userService.userInfoByUserId(userId);

      res.status(201).json({ userInfoData });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
