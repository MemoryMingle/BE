const NotificationRepository = require("../repositories/notification.repository");
const CustomError = require("../utils/error");

class NotificationService {
    notificationRepository = new NotificationRepository();

    creatNotification = async (userId, groupId, thumbnailUrl, message, status) => {
        const creatNotificationData = await this.notificationRepository.creatNotification(
            userId,
            groupId,
            thumbnailUrl,
            message,
            status
        );
        return creatNotificationData;
    };
    getNotification = async (userId) => {
        const groupIds = await this.notificationRepository.getGroupIds(
            userId
        );
        const notificationData = await this.notificationRepository.getNotification(
            groupIds
        );
        return notificationData;
    };
    updataNotification = async (userId, notificationId) => {
        const updataNotificationData = await this.notificationRepository.updataNotification(
            userId, notificationId
        );
        return updataNotificationData;
    };
}

module.exports = NotificationService;
