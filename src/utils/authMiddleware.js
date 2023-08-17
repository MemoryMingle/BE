const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require("dotenv").config();
const asyncHandler = require('./asyncHandler')
const CustomError = require('./error');

module.exports = asyncHandler(async (req, res, next) => {
    const { MM } = req.cookies;
    const [type, token] = (MM ?? "").split(" ");

    if (!type || !token || type !== "Bearer") {
        throw new CustomError("로그인이 필요한 기능입니다1.", 403)
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodeToken.userId;

    const findUser = await Users.findOne({ where: { userId } });
    if (!findUser) {
        throw new CustomError("로그인이 필요한 기능입니다2.", 403)
    }

    res.locals.user = findUser;
    next();
});