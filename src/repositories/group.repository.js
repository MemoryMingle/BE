const {
  Groups,
  Participants,
  Users,
  Memories,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

class GroupRepository {
  async createGroup(
    userId,
    groupName,
    thumbnailUrl,
    place,
    startDate,
    endDate,
    options
  ) {
    return Groups.create(
      {
        userId,
        groupName,
        thumbnailUrl,
        place,
        startDate,
        endDate,
      },
      options
    );
  }

  async updateMyGroup(
    userId,
    groupId,
    groupName,
    thumbnailUrl,
    place,
    startDate,
    endDate
  ) {
    const updateMyGroupData = await Groups.update(
      {
        groupName,
        thumbnailUrl,
        place,
        startDate,
        endDate,
      },
      { where: { userId: userId, groupId: groupId } }
    );
  }

  async deleteParticipants(groupId) {
    return Participants.destroy({ where: { groupId: groupId } });
  }

  async bulkCreateParticipants(participantRecords, options) {
    return Participants.bulkCreate(participantRecords, options);
  }

  async findGroupIds(userId) {
    const participantData = await Participants.findAll({
      where: {
        userId: userId,
      },
      attributes: ["groupId"],
    });

    const groupIds = participantData.map((participant) => participant.groupId);
    return groupIds;
  }

  async findGroupByGroupIds(groupIds) {
    const groupData = await Groups.findAll({
      where: {
        groupId: {
          [Op.in]: groupIds,
        },
      },
      order: [[sequelize.literal("createdAt"), "DESC"]],
    });

    return groupData;
  }

  async findMyGroup(userId) {
    const groupIds = await this.findGroupIds(userId);
    const groups = await this.findGroupByGroupIds(groupIds);

    return groups;
  }

  // 여기서부터 그룹 상세보기 필요한 데이터
  // Groups - 해당 groupId의 groupId,groupName,place,startDate,endDate
  async detailedGroup(groupId) {
    const detailedGroupData = await Groups.findOne({
      where: {
        groupId: groupId,
      },
      attributes: [
        "userId",
        "groupId",
        "thumbnailUrl",
        "groupName",
        "place",
        "startDate",
        "endDate",
      ],
    });
    return detailedGroupData;
  }
  // Participant - 해당 groupId의 userIds
  async findUserIds(groupId) {
    const participantData = await Participants.findAll({
      where: {
        groupId: groupId,
      },
      attributes: ["userId"],
    });

    const userIds = participantData.map((participant) => participant.userId);
    return userIds;
  }

  // Users - 해당 userIds의 nickname,profileUrl
  async findUsersByUserIds(userIds) {
    const userData = await Users.findAll({
      where: {
        userId: { [Op.in]: userIds },
      },
      attributes: ["userId", "nickname", "profileUrl"],
    });
    return userData;
  }
  // findUserIds + findUsersByUserIds
  async findUsers(groupId) {
    const userIds = await this.findUserIds(groupId);
    const users = await this.findUsersByUserIds(userIds);

    return users;
  }
  // Memories - 해당 groupId를 가지는 모든 레코드의 memoryId,imageUrl,title
  async findMemoriesByGroupId(groupId) {
    const memoryData = await Memories.findAll({
      where: {
        groupId: groupId,
      },
      attributes: ["memoryId", "imageUrl", "title"],
      order: [[sequelize.literal("createdAt"), "DESC"]],
    });
    return memoryData;
  }

  // 그룹 나가기
  async groupOut(userId, groupId) {
    const groupOutData = await Participants.destroy({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });
    return groupOutData;
  }

  // 작성자인지 확인
  async checkCreator(userId, groupId) {
    const checkCreatorData = await Groups.findOne({
      where: { groupId: groupId, userId: userId },
    });
    return checkCreatorData !== null;
  }

  // 참여자가 몇명 남았는지 확인  = params가 현재 약간 이상해서 21은 안되고 "21"은 작동함 이거 왜이럼?
  async participantsCount(groupId) {
    try {
      const count = await Participants.count({ where: { groupId: groupId } });

      return count;
    } catch (error) {
      console.error(error);
    }
  }

  // 날짜 검색
  async searchDate(userId, searchStartDate, searchEndDate) {
    const groupIds = await this.findGroupIds(userId);
    const searchDateData = await Groups.findAll({
      where: {
        groupId: {
          [Op.in]: groupIds,
        },
        startDate: {
          [Op.lte]: searchEndDate,
        },
        endDate: {
          [Op.gte]: searchStartDate,
        },
      },
    });

    return searchDateData;
  }

  async searchGroupName(userId, groupName) {
    const groupIds = await this.findGroupIds(userId);
    const searchGroupNameData = await Groups.findAll({
      where: {
        groupId: {
          [Op.in]: groupIds,
        },
        groupName: {
          [Op.like]: `%${groupName}%`,
        },
      },
    });

    return searchGroupNameData;
  }

  async searchPlace(userId, place) {
    const groupIds = await this.findGroupIds(userId);
    const searchPlaceData = await Groups.findAll({
      where: {
        groupId: {
          [Op.in]: groupIds,
        },
        place: {
          [Op.like]: `%${place}%`,
        },
      },
    });

    return searchPlaceData;
  }
}

module.exports = GroupRepository;
