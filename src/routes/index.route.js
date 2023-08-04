const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("이게 왜 안될까?");
});


module.exports = router;