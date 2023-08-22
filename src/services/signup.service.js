const SignupRepository = require('../repositories/signup.repository');
const bcrypt = require('bcrypt');

class SignupService {
    signupRepository = new SignupRepository();

    signup = async (loginId, password) => {
        const hashPassword = bcrypt.hashSync(password, 10)
        const userId = await this.signupRepository.signup(loginId, hashPassword);
        return userId
    };
    checkDuplicate = async (loginId) => {
        const checkDuplicateData = await this.signupRepository.checkDuplicate(loginId);
        return checkDuplicateData
    }
    updateProfile = async (loginId, nickname, profileUrl) => {
        const updateProfileData = await this.signupRepository.updateProfile(loginId, nickname, profileUrl);
        return updateProfileData
    }
}
module.exports = SignupService;