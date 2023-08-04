const LoginRepository = require("../repositories/login.repository")

class LoginService {

    loginRepository = new LoginRepository()

    findUser = async (loginId) => {
        const user = await this.loginRepository.findUser(loginId)
        return user
    }
}

module.exports = LoginService;