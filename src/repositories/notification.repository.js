const { Notifications } = require("../models");

class NotificationService {
    creatNotification = async (userId, groupId, thumbnailUrl, message, status) => {
        const creatNotificationData = await Notifications.create({
            userId,
            groupId,
            thumbnailUrl,
            message,
            status
        });
        return creatNotificationData;
    };
    getNotificationData = async (userId) => {
        const updateCommentData = await Notifications.findAll(
            { where: { userId } }
        );
        return updateCommentData;
    };
    updataNotification = async (userId, notificationId) => {
        const deleteCommentData = await Notifications.update(
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
