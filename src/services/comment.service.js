const CommentRepository = require("../repositories/comment.repository")
const CustomError = require('../utils/error');
class CommentService {
    commentRepository = new CommentRepository()

    cerateComment = async (userId, memoryId, comment) => {
        const cerateCommentData = await this.commentRepository.cerateComment(userId, memoryId, comment)
        return cerateCommentData
    }
    updateComment = async (userId, commentId, comment) => {
        const commentCheckData = await this.commentRepository.commentCheck(commentId)
        if (!commentCheckData) {
            throw new CustomError("댓글이 존재하지 않습니다.", 400);
        }
        if (commentCheckData.userId !== userId) {
            throw new CustomError("글쓴이가 아닙니다.", 400);
        }
        const updateCommentData = await this.commentRepository.updateComment(commentId, comment)
        return updateCommentData
    }
    deleteComment = async (userId, commentId) => {
        const commentCheckData = await this.commentRepository.commentCheck(commentId)
        if (!commentCheckData) {
            throw new CustomError("댓글이 존재하지 않습니다.", 400);
        }
        if (commentCheckData.userId !== userId) {
            throw new CustomError("글쓴이가 아닙니다.", 400);
        }
        const deleteCommentData = await this.commentRepository.deleteComment(commentId)
        return deleteCommentData
    }
}

module.exports = CommentService