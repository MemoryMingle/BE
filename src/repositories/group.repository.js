const { Groups } = require("../models");
const { Op } = require("sequelize");

// 그룹 추가(POST), 그룹모아보기(GET)
class GroupRepository {
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
    const createGroupData = await Groups.create({
      userId,
      groupName,
      thumbnailUrl,
      place,
      participant:[userId],
      startDate,
      endDate,
    });
    return createGroupData;
  };

  // 내가 참여한 그룹 모아보기
  findMyGroup = async (userId) => {
    const findMyGroupData = await Groups.findAll({
      where: { participant: { [Op.contains]: [userId] } },
    });
    return findMyGroupData;
  };
}

module.exports = GroupRepository;
