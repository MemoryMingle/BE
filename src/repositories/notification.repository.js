const { Groups, Participants, } = require("../models");
const { Op } = require('sequelize');

class NotificationService {
  creatNotification = async (userId, groupId, thumbnailUrl, message, status) => {
    const creatNotificationData = await Groups.create({
      userId,
      groupId,
      thumbnailUrl,
      message,
      status
    });
    return creatNotificationData;
  };
  getGroupIds = async (userId) => {
    const getGroupIdData = await Participants.findAll({
      where: { userId },
      attributes: ["groupId"]
    });
    const groupIds = getGroupIdData.map((id) => {
      const Id = id.groupId;
      return Id;
    })
    console.log("??",groupIds)
    return groupIds;
  };


  getNotification = async (groupIds) => {
    const getGroupData = await Groups.findAll({
      where: {
        groupId: {
          [Op.or]: groupIds,
        },
      },
      attributes: ['groupId', 'thumbnailUrl', 'groupName'],
      group: ['groupId'],
      raw: true,
      include: [
        {
          model: Participants,
          attributes: ["participantid", "status", 'createdAt'],
        },
      ],
    })
    return getGroupData;
  }
  updataNotification = async (userId, notificationId) => {
    const deleteCommentData = await Participants.update(
      { status: 'checked' },
      {
        where: {
          userId,
          notificationId
        }
      });
    return deleteCommentData;
  };
}

module.exports = NotificationService;
