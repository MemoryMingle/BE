const express = require("express");
const router = express.Router();
const signupRouter = require("./signup.route");
const loginRouter = require("./login.route");
const groupRouter = require("./group.route");
const memoryRouter = require("./memory.route")

router.get("/", (req, res) => {
  res.send("이게 왜 안됨?");
});

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use("/group", groupRouter);
groupRouter.use("/:groupId/memory", memoryRouter);


module.exports = router;
