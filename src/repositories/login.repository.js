const { Users } = require("../models")

class LoginReposiory {
    login = async (loginId) => {
        const user = await Users.findOne({ where: { loginId } })
        return user
    }
}

module.exports = LoginReposiory;