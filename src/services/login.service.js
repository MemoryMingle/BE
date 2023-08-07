const LoginRepository = require("../repositories/login.repository")

class LoginService {

    loginRepository = new LoginRepository()

    login = async (loginId) => {
        const user = await this.loginRepository.login(loginId)
        return user
    }
}

module.exports = LoginService;