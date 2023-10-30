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
        if(groupIds.length<1){
            return "알림이 없습니다."
        }
        const notificationData = await this.notificationRepository.getNotification(
            userId, groupIds
        );
        return notificationData;
    };
    updataNotification = async (userId, participantid) => {
        const updataNotificationData = await this.notificationRepository.updataNotification(
            userId, participantid
        );
        return updataNotificationData;
    };
}

module.exports = NotificationService;
