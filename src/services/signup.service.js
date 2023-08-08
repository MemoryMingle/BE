const SignupRepository = require('../repositories/signup.repository');

// const bcrypt = require('bcrypt');

class SignupService {
    signupRepository = new SignupRepository();

    signup = async (loginId, password, nickname) => {

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        await this.signupRepository.signup(loginId, password, nickname);
    };
}

module.exports = SignupService;