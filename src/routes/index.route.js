const express = require("express");
const router = express.Router();
const authRouter = require("./auth/auth.route")
const groupRouter = require("./group.route");
const memoryRouter = require("./memory.route")
const userRouter = require("./user.route")
const commentRouter = require("./comment.route")

router.get("/", (req, res) => {
  res.send("이게 왜 안됨?");
});

router.use("/auth", authRouter);
router.use("/group", groupRouter);
groupRouter.use("/:groupId/memory", memoryRouter);
memoryRouter.use("/:memoryId/comment", commentRouter);

// 닉네임 기반 검색
router.use("/", userRouter);


module.exports = router;
