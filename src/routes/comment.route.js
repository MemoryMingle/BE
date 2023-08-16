const express = require("express");
const router = express.Router({ mergeParams: true })
const asyncHandler = require('../middlewares/asyncHandler')
const authMiddleware = require('../middlewares/authMiddleware')
const CommentController = require("../controllers/comment.controller")
const commentController = new CommentController()

router.post("/", authMiddleware, asyncHandler(commentController.cerateComment))
router.put("/:commentId", authMiddleware, asyncHandler(commentController.updateComment))
router.delete("/:commentId", authMiddleware, asyncHandler(commentController.deleteComment))

module.exports = router