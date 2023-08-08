const GroupService = require("../services/group.service");

class GroupController {
  groupService = new GroupService();

  // 그룹 추가
  createGroup = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const {
        groupName,
        thumbnailUrl,
        place,
        participant,
        startDate,
        endDate,
      } = req.body;

      const createGroupData = await this.groupService.createGroup(
        userId,
        groupName,
        thumbnailUrl,
        place,
        participant,
        startDate,
        endDate
      );

      res
        .status(201)
        .json({ success: true, msg: "Group 생성에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  // 내가 참여한 그룹 전체 조회
  findMyGroup = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const findMyGroupData = await this.groupService.findMyGroup(userId);
      res
        .status(201)
        .json({ success: true, msg: "Group 조회에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = GroupController;
