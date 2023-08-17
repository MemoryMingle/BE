const express = require("express");
const router = express.Router({ mergeParams: true })
const asyncHandler = require('../utils/asyncHandler')
const authMiddleware = require("../utils/authMiddleware");
const MemoryController = require("../controllers/memory.controller")
const memoryController = new MemoryController()

router.post("/", authMiddleware, asyncHandler(memoryController.createMemory))
router.get("/:memoryId", authMiddleware, asyncHandler(memoryController.findOneMemory))
router.get("/:memoryId/update", authMiddleware, asyncHandler(memoryController.findUpdateMemory))
router.put("/:memoryId", authMiddleware, asyncHandler(memoryController.updateMemory))
router.delete("/:memoryId", authMiddleware, asyncHandler(memoryController.deleteMemory))

module.exports = router