const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const { MM } = req.cookies;
        const [type, token] = (MM ?? "").split(" ");

        if (!type || !token || type !== "Bearer") {
            return res
                .status(403)
                .json({ errorMessage: "로그인이 필요한 기능입니다1." });
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodeToken.userId;

        const findUser = await Users.findOne({ where: { userId } });
        if (!findUser) {
            return res
                .status(403)
                .json({ errorMessage: "로그인이 필요한 기능입니다2." });
        }

        res.locals.user = findUser;
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(403)
            .json({ errorMessage: "전달된 쿠키에서 오류가 발생했습니다. " });
    }
};