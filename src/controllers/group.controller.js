const GroupService = require("../services/group.service");
const { Groups, Participants } = require("../models");

class GroupController {
  groupService = new GroupService();

  // 그룹 추가
  createGroup = async (req, res, next) => {
    try {
      const io = req.io;
      const userId = res.locals.user;
      const { groupName, thumbnailUrl, place, participant, startDate, endDate } = req.body;
      const participants = JSON.parse(participant);
      const participantPlusUserId = participants.concat(JSON.stringify(userId));
      const createGroupData = await this.groupService.createGroup(
        userId,
        groupName,
        thumbnailUrl,
        place,
        participantPlusUserId,
        startDate,
        endDate,
        io
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
      const userId = res.locals.user;
      const findMyGroupData = await this.groupService.findMyGroup(userId);
      res.status(201).json({
        success: true,
        userId,
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
      const userId = res.locals.user;
      const { date } = req.params;
      const searchDateRange = date.split("~");
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

  // 그룹명별 검색
  searchGroupName = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { groupName } = req.params;
      const searchGroupNameData = await this.groupService.searchGroupName(
        userId,
        groupName
      );
      res.status(201).json({
        success: true,
        msg: "Group 검색에 성공하였습니다.",
        searchGroupNameData,
      });
    } catch (error) {
      next(error);
    }
  };

  // 장소별 검색
  searchPlace = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { place } = req.params;
      const searchPlaceData = await this.groupService.searchPlace(
        userId,
        place
      );
      res.status(201).json({
        success: true,
        msg: "Group 검색에 성공하였습니다.",
        searchPlaceData,
      });
    } catch (error) {
      next(error);
    }
  };

  // 내가 만든 그룹 수정
  updateMyGroup = async (req, res, next) => {
    try {
      const { groupName, place, participant, startDate, endDate, thumbnailUrl } = req.body;
      const { groupId } = req.params;
      const userId = res.locals.user;
      const participants = JSON.parse(participant);

      const updateMyGroupData = await this.groupService.updateMyGroup(
        userId,
        groupId,
        groupName,
        thumbnailUrl,
        place,
        participants,
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
    const userId = res.locals.user
    try {
      const detailedGroupData = await this.groupService.detailedGroup(groupId, userId);
      return res.status(201).json(detailedGroupData);
    } catch (error) {
      next(error);
    }
  };

  groupData = async (req, res, next) => {
    const { groupId } = req.params;
    try {
      const groupDataCollection = await this.groupService.groupData(groupId);
      return res.status(201).json(groupDataCollection);
    } catch (error) {
      next(error);
    }
  };

  // 그룹 나가기(userId가 group의 userId가 아닐경우)
  groupOut = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const userId = res.locals.user;
      const groupOutData = await this.groupService.groupOut(userId, groupId);

      res.status(200).json(groupOutData);
    } catch (error) {
      next(error);
    }
  };

  // 소켓IO 연결 테스트 
  socketGroup = async (req, res, next) => {
    const io = req.io;
    const { groupId } = req.params;
    const userId = res.locals.user;
    try {
      const newUser = await Participants.create({ groupId, userId });
      const data = await Groups.findByPk(groupId)
      io.emitToUser(userId, "newUserAdded", { userId, thumbnailUrl: data.thumbnailUrl, groupName: data.groupName });

      res.status(201).json({ newUser });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  };
}

module.exports = GroupController;
