const { Groups, Memories, Comments, Participants, sequelize, Sequelize } = require("../models");
const CustomError = require('../utils/error');

const applyBeforeDestroyHook = async (user) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED // 격리 수준 설정
    });
    try {
        // 그룹, 메모리, 코멘트의 userId를 1로 바꾼다.
        await Groups.update({ userId: 1 }, { where: { userId: user.userId }, transaction });
        await Memories.update({ userId: 1 }, { where: { userId: user.userId }, transaction });
        await Comments.update({ userId: 1 }, { where: { userId: user.userId }, transaction });
        await Participants.update({ userId: 1 }, { where: { userId: user.userId }, transaction });
        await transaction.commit();
    } catch (error) {
        console.error("트랜잭션 도중 오류 발생:", error);
        await transaction.rollback();
        throw error; // 에러를 다시 던져서 상위 코드에서 처리하도록 함
    }
};

module.exports = applyBeforeDestroyHook;
