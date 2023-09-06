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
            status
        );

        res.status(200).json({
            success: true,
            message: "notification를 생성하였습니다.",
        });
    };
    getNotification = async (req, res, next) => {
        const userId = res.locals.user;

        const getNotificationData = await this.notificationService.getNotificationData(
            userId,
        );

        res.status(200).json({
            success: true,
            data: getNotificationData,
        });
    };
    updataNotification = async (req, res, next) => {
        const userId = res.locals.user;
        const { notificationId } = req.body;

        const updataNotificationData = await this.notificationService.updataNotification( 
            userId,
            notificationId
        );

        res.status(200).json({
            success: true,
            message: "알림 읽음 처리 완료.",
        });
    };
}

module.exports = notificationController;
