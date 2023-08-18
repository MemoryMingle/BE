const CommentService = require('../services/comment.service');

class CommentController {

    commentService = new CommentService();


    cerateComment = async (req, res, next) => {

        const { userId } = res.locals.user;
        const { memoryId } = req.params;
        const { comment } = req.body;
        const ceratCommentData = await this.commentService.cerateComment(userId, memoryId, comment);

        res
            .status(200)
            .json({
                success: true,
                message: "Comment를 생성하였습니다."
            });

    }
    updateComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { commentId } = req.params;
        const { comment } = req.body;

        const updateCommentData = await this.commentService.updateComment(userId, commentId, comment);

        res
            .status(200)
            .json({
                success: true,
                message: "Comment를 수정하였습니다."
            });
    }
    deleteComment = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { commentId } = req.params;

        const deleteCommentData = await this.commentService.deleteComment(userId, commentId);

        res
            .status(200)
            .json({
                success: true,
                message: "Comment를 삭제하였습니다."
            });
    }

    // deleteComment = async (req, res, next) => {
    //     const { userId } = res.locals.user;
    //     const { commentId } = req.params;
    //     const confirmRequest = req.confirmRequest;

    //     if (confirmRequest.getCurrentRequests() === 0) {
    //         let deleteCount = 0;
    //         if (!this.isPaused) {
    //             const deletedRowCount = await this.commentService.batchDelete(userId, 2); // 2개씩 삭제하는 메서드
    //             if (deletedRowCount < 2) {
    //                 res.status(200).json({
    //                     success: true,
    //                     message: `${deleteCount}개의 Comment를 삭제하였습니다.`
    //                 });
    //             }
    //             deleteCount += deletedRowCount;
    //         }
    //     } else {
    //         const deleteCommentData = await this.commentService.deleteComment(userId, commentId);
    //     }

    //     res.status(200).json({
    //         success: true,
    //         message: "Comment를 삭제하였습니다."
    //     });
    // }


}

module.exports = CommentController