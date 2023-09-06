const schedule = require('node-schedule');
const ServerCheckDelete = require('./serverCheckDelete');  // 실제 경로로 바꾸세요.
const CustomError = require("./error")

const scheduleDeleteAllUserInfo = () => {
    const job = schedule.scheduleJob('0 5 * * *', async function () {
        const serverCheckDelete = new ServerCheckDelete();
        try {
            const result = await serverCheckDelete.execute();
            console.log(result, "삭제 완료")
        } catch (error) {
            throw new CustomError("스케줄러 에러", 400)
        }
    });
};

module.exports = scheduleDeleteAllUserInfo;
