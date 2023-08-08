const { Users } = require("../models")

class LoginRepository {
    login = async (loginId) => {
        const user = await Users.findOne({ where: { loginId } })
        return user
    }
}

module.exports = LoginRepository;