const GroupService = require("../services/group.service");
const uploadImageToCloudinary = require("../utils/uploadToCloudinary");

class GroupController {
  groupService = new GroupService();

  // 그룹 추가
  createGroup = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const thumbnailUrl = await uploadImageToCloudinary(req.file.path);      
      const { groupName, place, participant, startDate, endDate } = req.body;      
      const participantPlusUserId = participant.concat(JSON.stringify(userId));
      const createGroupData = await this.groupService.createGroup(
        userId,
        groupName,
        thumbnailUrl,
        place,
        participantPlusUserId,
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
      res.status(201).json({
        success: true,
        msg: "Group 조회에 성공하였습니다.",
        findMyGroupData,
      });
    } catch (error) {
      next(error);
    }
  };

  // 날짜별 겸색
  searchDate = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { searchDate } = req.params;
      const searchDateRange = searchDate.split("~");
      const searchStartDate = searchDateRange[0];
      const searchEndDate = searchDateRange[1];
      const searchDateData = await this.groupService.searchDate(
        userId,
        searchStartDate,
        searchEndDate
      );
      res.status(201).json({
        success: true,
        msg: "Group 검색에 성공하였습니다.",
        searchDateData,
      });
    } catch (error) {
      next(error);
    }
  };

  // 내가 만든 그룹 수정
  updateMyGroup = async (req, res, next) => {
    try {
      const thumbnailUrl = await uploadImageToCloudinary(req.file.path);
      const { groupName, place, participant, startDate, endDate } = req.body;
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      const updateMyGroupData = await this.groupService.updateMyGroup(
        userId,
        groupId,
        groupName,
        thumbnailUrl,
        place,
        participant,
        startDate,
        endDate
      );
      res
        .status(201)
        .json({ success: true, msg: "Group 수정에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  // 그룹 상세보기
  detailedGroup = async (req, res, next) => {
    const { groupId } = req.params;
    try {
      const detailedGroupData = await this.groupService.detailedGroup(groupId);
      return res.status(201).json(detailedGroupData);
    } catch (error) {
      next(error);
    }
  };

  // 그룹 나가기(userId가 group의 userId가 아닐경우)
  groupOut = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      const groupOutData = await this.groupService.groupOut(userId, groupId);

      res.status(200).json(groupOutData);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = GroupController;
