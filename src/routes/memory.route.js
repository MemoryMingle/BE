const express = require("express");
const router = express.Router({ mergeParams: true })
const authMiddleware = require('../middlewares/authMiddleware')
const MemoryController = require("../controllers/memory.controller")
const memoryController = new MemoryController()

router.post("/", authMiddleware, memoryController.createMemory)
router.get("/:memoryId", authMiddleware, memoryController.findOneMemory)
router.get("/:memoryId/update", authMiddleware, memoryController.findUpdateMemory)
router.put("/:memoryId", authMiddleware, memoryController.updateMemory)
router.delete("/:memoryId", authMiddleware, memoryController.deleteMemory)

module.exports = router