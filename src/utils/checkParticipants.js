const CustomError = require("./error");
const jwt = require("jsonwebtoken");
const { Participants } = require("../models");
const asyncHandler = require("./asyncHandler");

module.exports = asyncHandler(async (req, res, next) => {
  const { groupId } = req.params;
  const userId = res.locals.user;
  try {
    const checkAuth = await Participants.findOne({
      where: { groupId: groupId, userId: userId },
    });

    if (!checkAuth) {
      throw new CustomError("참여자만 불러올 수 있습니다.");
    }
    next();
  } catch (err) {
    next(err);
  }
});
