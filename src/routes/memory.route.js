const express = require("express");
const router = express.Router({ mergeParams: true })
const asyncHandler = require('../utils/asyncHandler')
const authMiddleware = require("../utils/authMiddleware");
const checkParticipants = require("../utils/checkParticipants")
const upload = require('../utils/multerConfig');
const MemoryController = require("../controllers/memory.controller")
const memoryController = new MemoryController()

router.post("/", authMiddleware, upload.single('imageUrl'), asyncHandler(memoryController.createMemory))
router.get("/:memoryId", authMiddleware, checkParticipants, asyncHandler(memoryController.findOneMemory))
router.get("/:memoryId/update", authMiddleware, checkParticipants, asyncHandler(memoryController.findUpdateMemory))
router.put("/:memoryId", authMiddleware, checkParticipants, upload.single('imageUrl'), asyncHandler(memoryController.updateMemory))
router.delete("/:memoryId", authMiddleware, asyncHandler(memoryController.deleteMemory))

module.exports = router