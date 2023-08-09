const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const GroupController = require("../controllers/group.controller");
const groupController = new GroupController();

router.post("/", authMiddleware, groupController.createGroup);
router.get("/", authMiddleware, groupController.findMyGroup);
router.put("/:groupId", authMiddleware, groupController.updateMyGroup);

router.get("/:groupId", authMiddleware, groupController.detailedGroup);

module.exports = router;
