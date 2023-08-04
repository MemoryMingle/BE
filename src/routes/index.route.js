const express = require('express');
const router = express.Router();
const signupRouter = require("./signup.route");
const loginRouter = require("./login.route");

router.get('/', (req, res) => {
    res.send("이게 왜 안됨?");
});

router.use("/signup", signupRouter);
router.use("/login", loginRouter);


module.exports = router;