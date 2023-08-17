const UserInfoService = require('../services/userInfo.service');
const CustomError = require('../utils/error');
const { passwordSchema } = require('../utils/validation');

class UserInfoController {
    userInfoService = new UserInfoService();

    changeUserInfo = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { nickname, profileUrl } = req.body;
        await this.userInfoService.changeMyInfo(userId, nickname, profileUrl)
        res.status(200).json({ message: '프로필 변경이 완료되었습니다.' });
    }
    changePassword = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { originalPassword, changedPassword, changedConfirm } = req.body;
        const { error } = passwordSchema.validate(req.body);
        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }
        await this.userInfoService.changePassword(userId, originalPassword, changedPassword)
        res.status(200).json({ message: '비밀번호 변경이 완료되었습니다.' });
    }
    deleteUserInfo = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { password } = req.body;
        await this.userInfoService.deleteUserInfo(userId, password)
        res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' });
    }
    deleteAllUserInfo = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { adminVerification } = req.body;
        const confirmRequest = req.confirmRequest;
        let totalDeletedCount = 0;
        const processDelete = async () => {
            if (confirmRequest.getCurrentRequests() !== 0) {
                const listener = () => {
                    confirmRequest.off('requestCompleted', listener); // 이벤트 리스너 제거
                    processDelete();
                };
                confirmRequest.once('requestCompleted', listener);
                return;
            }
            // 5개의 데이터를 삭제
            const deletedCount = await this.userInfoService.deleteAllUserInfo(userId, adminVerification);
            // 삭제된 데이터 수를 누적
            totalDeletedCount += deletedCount;
            // 삭제된 데이터 수가 5개 미만이면 종료
            if (deletedCount < 5) {
                return res.status(200).json({ message: `총 ${totalDeletedCount}개의 회원 정보 삭제 작업이 완료되었습니다.` });
            }
            // 계속 삭제 처리
            processDelete();
        };

        processDelete();
    }
}


module.exports = UserInfoController;