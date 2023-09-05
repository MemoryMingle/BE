const schedule = require('node-schedule');
const UserInfoCheckDelete = require('./userInfoCheckDelete');  // 실제 경로로 바꾸세요.
const CustomError = require("./error")

const scheduleDeleteAllUserInfo = () => {
    const job = schedule.scheduleJob('0 5 * * *', async function () {
        const userInfoCheckDelete = new UserInfoCheckDelete();
        try {
            const result = await userInfoCheckDelete.execute();
            console.log(result, "삭제 완료")
        } catch (error) {
            throw new CustomError("스케줄러 에러", 400)
        }
    });
};

module.exports = scheduleDeleteAllUserInfo;
