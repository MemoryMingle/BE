const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const SignupController = require("../../controllers/signup.controller");
const signupController = new SignupController();
const router = express.Router();

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: 회원가입
 *    description: 사용자를 시스템에 등록합니다.
 *    tags: [Authentication]
 *    requestBody:
 *      description: 로그인 ID, 패스워드, 패스워드 확인 필드를 가진 객체
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              loginId:
 *                type: string
 *                description: 로그인 ID
 *              password:
 *                type: string
 *                description: 패스워드
 *              confirm:
 *                type: string
 *                description: 패스워드 확인
 *    responses:
 *      '201':
 *        description: 회원가입이 완료되었습니다.
 *        headers:
 *          Set-Cookie:
 *            description: 쿠키에 저장되는 JWT 액세스 토큰과 리프레시 토큰
 *            schema:
 *              type: string
 *              example: 'MM=Bearer example_token; refreshToken=example_refresh_token'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: integer
 *                  description: 생성된 사용자의 고유 ID
 *                message:
 *                  type: string
 *                  description: 결과 메시지
 *      '400':
 *        description: 잘못된 요청입니다. 이 에러는 유효성 검사에 실패했을 때에 따라 다른 메시지로 응답할 수 있습니다.
 */
router.post("/", asyncHandler(signupController.signup));

router.post("/check", asyncHandler(signupController.checkDuplicate));

router.put(
  "/update",
  asyncHandler(signupController.updateProfile)
);

module.exports = router;
