const Joi = require('joi');

const signupSchema = Joi.object().keys({
    loginId: Joi.string().min(3).max(10).alphanum().required().messages({
        'string.base': 'loginId는 문자열이어야 합니다.',
        'string.alphanum': '알파벳 대소문자와 숫자만 입력 가능합니다.',
        'any.min': 'loginId는 3자이상입니다.',
        'any.max': 'loginId는 10자이하입니다.',
        'any.required': 'loginId를 입력해주세요.',
    }),

    nickname: Joi.string().max(10).required().messages({
        'string.base': '닉네임은 문자열이어야 합니다.',
        'any.max': '닉네임은 10자이하입니다.',
        'any.required': '닉네임을 입력해주세요.',
    }),

    password: Joi.string().required().messages({
        'string.base': '비밀번호는 문자열이어야 합니다.',
        'any.required': '요청한 데이터 형식이 올바르지 않습니다.',
        'string.empty': '비밀번호를 입력해주세요.',
    }),
    confirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.base': '비밀번호는 문자열이어야 합니다.',
        'any.only': '비밀번호가 일치하지 않습니다.',
        'any.required': '비밀번호 확인은 필수 항목입니다.',
    }),
});

const loginSchema = Joi.object().keys({
    loginId: Joi.string().required().messages({
        'any.required': 'loginId를 입력해주세요',
    }),

    password: Joi.string().required().messages({
        'string.base': '아이디 혹은 비밀번호가 틀렸습니다.',
        'any.required': '요청한 데이터 형식이 올바르지 않습니다.',
        'string.empty': '비밀번호를 입력해주세요.',
    }),
});



module.exports = {
    signupSchema,
    loginSchema,
};