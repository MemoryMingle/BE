const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const upload = require("../utils/multerConfig");
const GroupController = require("../controllers/group.controller");
const groupController = new GroupController();

router.post(
  "/",
  authMiddleware,
  upload.single("thumbnailUrl"),
  groupController.createGroup
);
router.get("/", authMiddleware, groupController.findMyGroup);
router.put(
  "/:groupId",
  authMiddleware,
  upload.single("thumbnailUrl"),
  groupController.updateMyGroup
);
router.get("/:groupId", authMiddleware, groupController.detailedGroup);
router.get("/:groupId/groupData", authMiddleware, groupController.groupData);
router.delete("/:groupId/groupout", authMiddleware, groupController.groupOut);
router.get("/search/:searchDate", authMiddleware, groupController.searchDate);

module.exports = router;
