const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require('passport');
const session = require('express-session');
const ConfirmRequest = require('./src/utils/confirmRequest');
const rateLimit = require("express-rate-limit");
require('./src/passport/localStrategy')
require('./src/passport/kakaoStrategy')();
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const indexRouter = require("./src/routes/index.route")
const confirmRequest = new ConfirmRequest();

// 요청 수 관리 미들웨어
app.use(async (req, res, next) => {
    req.confirmRequest = confirmRequest;

    await req.confirmRequest.increment();
    res.on('finish', async () => {
        await req.confirmRequest.decrement();
    });
    next();
});

// 레이트 제한 미들웨어
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    handler: function (req, res) {
        req.confirmRequest.decrement();
        res.status(429).send("너무 많은 요청을 하셨습니다. 잠시 후 다시 시도해 주세요.");
    }
});
app.use(limiter);

// 세션은 사용하지 않지만 패스포트에 세션 설정이 되어있어야 했다.
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);  // origin이 제공되지 않은 경우 요청을 허용한다
            // origin이 허용된 origin 중 하나인지 확인한다
            if (allowedOrigins.indexOf(origin) === -1) {
                const errorMsg = '이 사이트의 CORS 정책은 지정된 Origin에서의 접근을 허용하지 않습니다.';
                return callback(new Error(errorMsg), false);
            }

            return callback(null, true);
        },
        exposedHeaders: ['MM', 'RefreshToken'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        credentials: true,
    })
);

app.use(morgan('dev'));

app.get("/", (_, res) => {
    return res.send("이게 왜 됨?");
});

app.use("/api", indexRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || '잘못된 요청입니다.';

    req.confirmRequest.decrement();

    res.status(statusCode).send({
        success: false,
        message: message
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});



deleteAllUserInfo = async (req, res, next) => {
    const userId = res.locals.user;
    const { adminVerification } = req.body;
    const confirmRequest = req.confirmRequest;

    const maxListeners = 5;  // 임계값 설정
    const timeoutDuration = 15 * 1000; // 15초
    let totalDeletedCount = 0;

    const timeoutFunc = (listener) => {
        return setTimeout(() => {
            confirmRequest.off('requestCompleted', listener);
            // 이벤트 리스너 제거
            throw new CustomError("요청이 너무 오래 걸립니다.", 408)
        }, timeoutDuration);
    };

    const processDelete = async () => {
        console.log("현재 처리 중 요청 갯수 : ", confirmRequest.getCurrentRequests());

        if (confirmRequest.getCurrentRequests() > 5) {
            if (confirmRequest.listenerCount('requestCompleted') >= maxListeners) {
                throw new CustomError("동시 삭제 시도 횟수가 너무 많습니다.", 404);
            }

            const listener = () => {
                clearTimeout(timeout); // 타임아웃 제거
                confirmRequest.off('requestCompleted', listener);
                // 이벤트 리스너 제거
                processDelete();
            };

            const timeout = timeoutFunc(listener);

            confirmRequest.once('requestCompleted', listener);
            return;
        }

        // 5개의 데이터를 삭제
        const deletedCount = await this.userInfoService.deleteAllUserInfo(userId, adminVerification);
        // 삭제된 데이터 수를 누적
        totalDeletedCount += deletedCount;
        // 삭제된 데이터 수가 5개 미만이면 종료
        if (deletedCount < 5) {
            return res.status(200).json({ message: `총 ${totalDeletedCount}개의 회원 정보 삭제 작업이 완료되었습니다.` });
        }
        // 계속 삭제 처리
        processDelete();
    };

    await processDelete();
}