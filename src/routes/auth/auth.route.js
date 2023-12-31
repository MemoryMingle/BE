const express = require("express");
const router = express.Router();
const signupRouter = require("./signup.route");
const loginRouter = require("./login.route");
const userInfoRouter = require("./userInfo.route");
const logoutRouter = require("./logout.route");
router.get("/", (req, res) => {
  res.send("여긴 어디?");
});

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/me", userInfoRouter);

module.exports = router;
