const Joi = require('joi');

const signupSchema = Joi.object().keys({
    loginId: Joi.string().min(5).max(20).alphanum().required().messages({
        'string.base': 'loginId는 문자열이어야 합니다.',
        'string.alphanum': '알파벳 대소문자와 숫자만 입력 가능합니다.',
        'string.min': 'loginId는 5자이상입니다.',
        'string.max': 'loginId는 20자이하입니다.',
        'string.required': 'loginId를 입력해주세요.',
    }),

    nickname: Joi.string().max(10).messages({
        'string.base': '닉네임은 문자열이어야 합니다.',
        'string.max': '닉네임은 10자이하입니다.',
    }),

    password: Joi.string().pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).max(16).required().messages({
        'string.pattern.base': 'password는 최소 8자리 이상이며, 영문, 숫자, 특수문자(!@#$%^&*)가 모두 포함되어야 합니다.',
        'string.max': 'password는 16자 이하입니다.',
        'string.required': '요청한 데이터 형식이 올바르지 않습니다.',
        'string.empty': '변경할 비밀번호를 입력해주세요.',
    }),
    confirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.base': '비밀번호는 문자열이어야 합니다.',
        'any.only': '비밀번호가 일치하지 않습니다.',
        'string.required': '비밀번호 확인은 필수 항목입니다.',
    }),
});

const loginSchema = Joi.object().keys({
    loginId: Joi.string().required().messages({
        'string.required': 'loginId를 입력해주세요',
    }),
    password: Joi.string().required().messages({
        'string.base': '아이디 혹은 비밀번호가 틀렸습니다.',
        'string.required': '요청한 데이터 형식이 올바르지 않습니다.',
        'string.empty': '비밀번호를 입력해주세요.',
    }),
});

const passwordSchema = Joi.object().keys({
    originalPassword: Joi.string().required().max(16).messages({
        'string.base': '기존 비밀번호를 입력해주세요.',
        'string.max': 'password는 16자 이하입니다.',
        'string.required': '요청한 데이터 형식이 올바르지 않습니다.',
    }),
    changedPassword: Joi.string().pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).max(16).required().messages({
        'string.pattern.base': 'password는 최소 8자리 이상이며, 영문, 숫자, 특수문자(!@#$%^&*)가 모두 포함되어야 합니다.',
        'string.max': 'password는 16자 이하입니다.',
        'string.required': '요청한 데이터 형식이 올바르지 않습니다.',
        'string.empty': '비밀번호를 입력해주세요.',
    }),
    changedConfirm: Joi.string().valid(Joi.ref('changedPassword')).required().messages({
        'string.base': '비밀번호는 문자열이어야 합니다.',
        'any.only': '비밀번호가 일치하지 않습니다.',
        'string.required': '비밀번호 확인은 필수 항목입니다.',
    }),

});



module.exports = {
    signupSchema,
    loginSchema,
    passwordSchema,
};