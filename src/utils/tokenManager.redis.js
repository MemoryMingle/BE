const redisCli = require('./redisClient');

async function saveRefreshToken(userId, refreshToken) {
    try {
        const result = await redisCli.set(`refreshToken:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
        if (result !== 'OK') {
            throw new Error('리프레시 토큰 저장에 실패했습니다.');
        }
        return true;
    } catch (err) {
        console.error('리프레시 토큰 저장 오류:', err);
        throw err;
    }
}

async function deleteRefreshToken(userId) {
    try {
        const result = await redisCli.del(`refreshToken:${userId}`);
        if (result === 0) {
            console.warn(`${userId} 사용자 아이디에 대한 리프레시 토큰이 없습니다. 삭제할 것이 없습니다.`);
            return false;
        }
        return true;
    } catch (err) {
        console.error('리프레시 토큰 삭제 오류:', err);
        throw err;
    }
}

module.exports = {
    saveRefreshToken,
    deleteRefreshToken,
};
