const { Users } = require('../models');


class SignupRepositroy {
    signup = async (loginId, nickname, password) => {
        const user = await Users.create({
            loginId,
            nickname,
            password,
        });
        return user;
    };
}

module.exports = SignupRepositroy;