const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  // 닉네임 기반 검색
  findByNickname = async (req, res, next) => {
    try {
      const { nickname } = req.body;

      const findByNicknameData = await this.userService.findByNickname(
        nickname
      );

      res
        .status(201)
        .json({ success: true, msg: "닉네임 검색에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
