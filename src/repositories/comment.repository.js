const { Comments } = require("../models")

class CommentRepository {

    cerateComment = async (userId, memoryId, comment) => {
        const cerateCommentData = await Comments.create({
            userId,
            memoryId,
            comment
        });
        return cerateCommentData
    };
    commentCheck = async (commentId) => {
        const commentCheckData = await Comments.findByPk(commentId)
        return commentCheckData
    }
    updateComment = async (commentId, comment) => {
        const updateCommentData = await Comments.update(
            { comment },
            { where: { commentId } }
        )
        return updateCommentData
    }
    deleteComment = async (commentId) => {
        const deleteCommentData = await Comments.destroy(
            { where: { commentId } }
        )
        return deleteCommentData
    }
};

module.exports = CommentRepository