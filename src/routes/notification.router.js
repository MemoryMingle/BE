const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../utils/authMiddleware");
const NotificationController = require("../controllers/notification.controller");
const notificationController = new NotificationController();

// 알림 저장
// 알림 보내주기
// 알림 상태 변경 
router.post("/",
    authMiddleware,
    asyncHandler(notificationController.creatNotification));
router.get(
    "/",
    authMiddleware,
    asyncHandler(notificationController.getNotification));
router.put(
    "/",
    authMiddleware,
    asyncHandler(notificationController.updataNotification)
);



module.exports = router;