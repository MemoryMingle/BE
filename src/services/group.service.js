const { sequelize, Groups } = require("../models");
const GroupRepository = require("../repositories/group.repository");

class GroupService {
  groupRepository = new GroupRepository();

  // 그룹 추가
  createGroup = async (
    userId,
    groupName,
    thumbnailUrl,
    place,
    participants,
    startDate,
    endDate
  ) => {
    const transaction = await sequelize.transaction(); // sequelize.transaction() 사용
    const placeString = JSON.stringify(place);
    try {
      // 그룹 생성
      const group = await this.groupRepository.createGroup(
        userId,
        groupName,
        thumbnailUrl,
        placeString,
        startDate,
        endDate,
        { transaction }
      );

      // 참여자 레코드 생성
      const participantRecords = participants.map((participantId) => ({
        userId: participantId,
        groupId: group.groupId,
      }));
      await this.groupRepository.bulkCreateParticipants(participantRecords, {
        transaction,
      });

      await transaction.commit();

      return group;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  // userId가 포함된 participant를 가지는 Groups 조회
  findMyGroup = async (userId) => {
    const groups = await this.groupRepository.findMyGroup(userId);

    return groups;
  };

  updateMyGroup = async (
    userId,
    groupId,
    groupName,
    thumbnailUrl,
    place,
    startDate,
    endDate
  ) => {
    const placeString = JSON.stringify(place)
    const updateMyGroupData = await this.groupRepository.updateMyGroup(
      userId,
      groupId,
      groupName,
      thumbnailUrl,
      placeString,
      startDate,
      endDate
    );

    return { success: true };
  };

  // 그룹 상세보기
  detailedGroup = async (groupId) => {
    // 그룹정보
    const groupData = await this.groupRepository.detailedGroup(groupId);
    // 참여자 정보
    const participantData = await this.groupRepository.findUsers(groupId);
    // 메모리 정보
    const memoryData = await this.groupRepository.findMemoriesByGroupId(
      groupId
    );

    const detailedGroupData = {
      groupId: groupData.groupId,
      groupName: groupData.groupName,
      place: groupData.place,
      thumbnailUrl: groupData.thumbnailUrl,
      startDate: groupData.startDate,
      endDate: groupData.endDate,
      participants: participantData,
      memories: memoryData,
    };

    return detailedGroupData;
  };

  // 그룹 나가기(작성자인지 체크하고, 맞으면 참여자 더 있는지 확인하고 더 있으면 막기/ 나머지 다 나가기)
  groupOut = async (userId, groupId) => {
    const checkCreator = await this.groupRepository.checkCreator(
      userId,
      groupId
    );

    if (!checkCreator) {
      await this.groupRepository.groupOut(userId, groupId);
      return { success: true, message: "그룹에서 나갔습니다." };
    } else {
      const participantsCount = await this.groupRepository.participantsCount(
        groupId
      );

      if (participantsCount === 1) {
        await this.groupRepository.groupOut(userId, groupId);
        return { success: true, message: "그룹에서 나갔습니다." };
      } else {
        return {
          success: false,
          message: "다른 참여자들이 나갈 때까지 나갈 수 없습니다.",
        };
      }
    }
  };

  searchDate = async (userId, searchStartDate, searchEndDate) => {
    const searchDateData = await this.groupRepository.searchDate(
      userId,
      searchStartDate,
      searchEndDate
    );

    return searchDateData;
  };
}

module.exports = GroupService;
