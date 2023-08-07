const express = require("express");
const router = express.Router();
const signupRouter = require("./signup.route");
const loginRouter = require("./login.route");
const groupRouter = require("./group.route");

router.get("/", (req, res) => {
  res.send("이게 왜 안됨?");
});

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use("/group", groupRouter);

module.exports = router;
