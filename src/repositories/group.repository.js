const { Groups, Participant, Users, Memories } = require("../models");
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

  async bulkCreateParticipants(participantRecords, options) {
    return Participant.bulkCreate(participantRecords, options);
  }

  async findGroupIds(userId) {
    const participantData = await Participant.findAll({
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
    });

    return groupData;
  }

  async findMyGroup(userId) {
    const groupIds = await this.findGroupIds(userId);
    const groups = await this.findGroupByGroupIds(groupIds);

    return groups;
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

  // 여기서부터 그룹 상세보기 필요한 데이터
  // Groups - 해당 groupId의 groupId,groupName,place,startDate,endDate
  async detailedGroup (groupId){
    const detailedGroupData = await Groups.findOne({
      where: {
        groupId : groupId
      },
      attributes:["groupId","groupName","place","startDate","endDate"]
    })
    return detailedGroupData
  }
  // Participant - 해당 groupId의 userIds
  async findUserIds(groupId){
    const participantData = await Participant.findAll({
      where:{
        groupId:groupId
      },
      attributes:["userId"]
    })

    const userIds = participantData.map((participant)=> participant.userId)
    return userIds
  }
  
  // Users - 해당 userIds의 nickname,profileUrl
  async findUsersByUserIds(userIds){
    const userData = await Users.findAll({
      where:{
        userId:{[Op.in]:userIds}
      },
      attributes:["nickname","profileUrl"]
    })
    return userData
  }
  // findUserIds + findUsersByUserIds
  async findUsers (groupId){
    const userIds = await this.findUserIds(groupId)
    const users = await this.findUsersByUserIds(userIds)

    return users
  }  
  // Memories - 해당 groupId를 가지는 모든 레코드의 memoryId,imageUrl,title
  async findMemoriesByGroupId(groupId){
    const memoryData = await Memories.findAll({
      where:{
        groupId:groupId
      },
      attributes :["memoryId","imageUrl","title"]
    })
    return memoryData
  }
}

module.exports = GroupRepository;
