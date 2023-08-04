const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("이게 왜 안됨?");
});


module.exports = router;