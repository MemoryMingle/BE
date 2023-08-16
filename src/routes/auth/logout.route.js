const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('MM', {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
    });

    res.status(200).json({ message: "로그아웃 완료" });
});

module.exports = router;
