const CommentRepositoy = require("../repositories/comment.repository")

class CommentService {
    commentRepositoy = new CommentRepositoy()

    cerateComment = async (userId, memoryId, comment) => {
        const cerateCommentData = await this.commentRepositoy.cerateComment(userId, memoryId, comment)
        return cerateCommentData
    }
    updateComment = async (userId, commentId, comment) => {
        const commentCheckData = await this.commentRepositoy.commentCheck(commentId)
        if (commentCheckData.userId !== userId) {
            const error = new Error("글쓴이가 아닙니다.");
            error.status = 404
            throw error;
        }
        const updateCommentData = await this.commentRepositoy.updateComment(commentId, comment)
        return updateCommentData
    }
    deleteComment = async (userId, commentId) => {
        const commentCheckData = await this.commentRepositoy.commentCheck(commentId)
        if (commentCheckData.userId !== userId) {
            const error = new Error("글쓴이가 아닙니다.");
            error.status = 404
            throw error;
        }
        const deleteCommentData = await this.commentRepositoy.deleteComment(commentId)
        return deleteCommentData
    }
}

module.exports = CommentService