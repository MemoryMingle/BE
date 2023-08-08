const express = require("express");
const router = express.Router({ mergeParams: true })
const authMiddleware = require('../middlewares/authMiddleware')
const CommentController = require("../controllers/comment.controller")
const commentController = new CommentController()

router.post("/", authMiddleware, commentController.cerateComment)
router.put("/:commentId", authMiddleware, commentController.updateComment)
router.delete("/:commentId", authMiddleware, commentController.deleteComment)

module.exports = router