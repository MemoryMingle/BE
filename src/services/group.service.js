const GroupRepository = require("../repositories/group.repository");

class GroupService {
  groupRepository = new GroupRepository();
  // 그룹 추가
  createGroup = async (
    userId,
    groupName,
    thumbnailUrl,
    place,
    participant,
    startDate,
    endDate
  ) => {
    const createGroupData = await this.groupRepository.createGroup(
      userId,
      groupName,
      thumbnailUrl,
      place,
      participant,
      startDate,
      endDate
    );
    return { success: true };
  };

  // 내가 참여한 그룹 전체 조회
  findMyGroup = async (userId) => {
    const findMyGroupData = await this.groupRepository.findMyGroup(userId);

    return { success: true };
  };
}

module.exports = GroupService;
