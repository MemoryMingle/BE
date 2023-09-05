const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const indexRouter = require("./src/routes/index.route")
const passport = require('passport');
const session = require('express-session');
const confirmRequest = require('./src/utils/confirmRequest');
const rateLimit = require("express-rate-limit");
const scheduleDelete = require('./src/utils/scheduler');  // 경로는 실제 파일 위치에 맞게 변경해 주세요.
require('./src/passport/localStrategy')
require('./src/passport/kakaoStrategy')();
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


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
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 50,
//     handler: function (req, res) {
//         req.confirmRequest.decrement();
//         res.status(429).send("너무 많은 요청을 하셨습니다. 잠시 후 다시 시도해 주세요.");
//     }
// });
// app.use(limiter);

scheduleDelete();

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

