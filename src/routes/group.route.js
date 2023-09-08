const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const checkParticipants = require("../utils/checkParticipants");
const GroupController = require("../controllers/group.controller");
const groupController = new GroupController();

router.post(
  "/",
  authMiddleware,
  groupController.createGroup
);

router.get("/", authMiddleware, groupController.findMyGroup);
router.put(
  "/:groupId",
  authMiddleware,
  groupController.updateMyGroup
);
router.get(
  "/:groupId",
  authMiddleware,
  checkParticipants,
  groupController.detailedGroup
);
router.get(
  "/:groupId/groupData",
  authMiddleware,
  checkParticipants,
  groupController.groupData
);
router.delete("/:groupId/groupout", authMiddleware, groupController.groupOut);
router.get("/search/date/:date", authMiddleware, groupController.searchDate);
router.get(
  "/search/groupName/:groupName",
  authMiddleware,
  groupController.searchGroupName
);
router.get("/search/place/:place", authMiddleware, groupController.searchPlace);

// router.post("/:groupId", authMiddleware, groupController.socketGroup);

module.exports = router;
