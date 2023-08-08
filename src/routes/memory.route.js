const express = require("express");
const router = express.Router({ mergeParams: true })
const authMiddleware = require('../middlewares/authMiddleware')
const MemoryController = require("../controllers/memory.controller")
const memoryController = new MemoryController()

router.post("/", authMiddleware, memoryController.createMemory)
// router.get("/:memoryId", authMiddleware, memoryController)
// router.put("/:memoryId", authMiddleware, memoryController)
// router.delete("/:memoryId", authMiddleware, memoryController)

module.exports = router