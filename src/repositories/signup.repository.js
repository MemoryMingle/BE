const { Users } = require('../models');


class SignupRepositroy {
    signup = async (loginId, password, nickname) => {
        const user = await Users.create({
            loginId,
            password,
            nickname,
        });
        return user;
    };
}

module.exports = SignupRepositroy;