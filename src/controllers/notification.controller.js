const NotificationService = require("../services/notification.service");

class notificationController {
    notificationService = new NotificationService();

    creatNotification = async (req, res, next) => {
        const userId = res.locals.user;
        const { groupId, thumbnailUrl, message, status } = req.body;
        const creatNotificationData = await this.notificationService.creatNotification(
            userId,
            groupId,
            thumbnailUrl,
            message,
            status,
        );
        res.status(200).json({
            success,
            message: "notification를 생성하였습니다.",
        });
    };
    getNotification = async (req, res, next) => {
        const userId = res.locals.user;
        const notificationData = await this.notificationService.getNotification(
            userId,
        );
        let success = true
        if (notificationData === "알림이 없습니다.") success = false
        res.status(200).json({
            success,
            data: notificationData,
        });
    };
    updataNotification = async (req, res, next) => {
        const userId = res.locals.user;
        const { participants } = req.body;
        const participantid = JSON.parse(participants);
        const updataNotificationData = await this.notificationService.updataNotification(
            userId,
            participantid
        );

        res.status(200).json({
            success: true,
            message: "알림 읽음 처리 완료.",
        });
    };
}

module.exports = notificationController;
