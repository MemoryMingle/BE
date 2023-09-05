const CustomError = require('./error');  // CustomError를 불러옵니다.
const confirmRequest = require('./confirmRequest');
const { Users } = require("../models")
const { Op } = require('sequelize')

class userInfoCheckDelete {
    async execute() {
        try {
            const maxListeners = 5;
            const timeoutDuration = 15 * 1000;
            let totalDeletedCount = 0;
            const timeoutFunc = (listener) => {
                return setTimeout(() => {
                    confirmRequest.off('requestCompleted', listener);
                    throw new CustomError("요청이 너무 오래 걸립니다.", 408);
                }, timeoutDuration);
            };
            const processDelete = async () => {
                if (confirmRequest.getCurrentRequests() > 5) {
                    if (confirmRequest.listenerCount('requestCompleted') >= maxListeners) {
                        throw new CustomError("동시 삭제 시도 횟수가 너무 많습니다.", 404);
                    }
                    const listener = () => {
                        clearTimeout(timeout);
                        confirmRequest.off('requestCompleted', listener);
                        processDelete();
                    };
                    const timeout = timeoutFunc(listener);
                    confirmRequest.once('requestCompleted', listener);
                    return;
                }
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const deletedCount = await Users.destroy({
                    where: {
                        deletedAt: {
                            [Op.ne]: null,
                            [Op.lt]: sevenDaysAgo  // Less than 7 days ago
                        }
                    },
                    limit: 10,
                    force: true,
                });
                totalDeletedCount += deletedCount;
                if (deletedCount < 5) {
                    return `총 ${totalDeletedCount}개의 회원 정보 삭제 작업이 완료되었습니다.`;
                } else {
                    return await processDelete();
                }
            };
            return await processDelete();
        } catch (error) {
            console.error("스케줄러 삭제 처리 중 에러", error);
        }
    }
}

module.exports = userInfoCheckDelete;
