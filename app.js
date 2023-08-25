const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require('passport');
const session = require('express-session');
const ConfirmRequest = require('./src/utils/confirmRequest');
const redis = require('redis');
require('./src/passport/localStrategy')
require('./src/passport/kakaoStrategy')();
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const indexRouter = require("./src/routes/index.route")
const confirmRequest = new ConfirmRequest();

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
});

redisClient.on('error', (err) => {
    console.log('Redis Error:', err);
});


app.use(async (req, res, next) => {
    req.confirmRequest = confirmRequest;

    await req.confirmRequest.increment();
    res.on('finish', async () => {
        await req.confirmRequest.decrement();
    });
    next();
});

app.use(
    session({
        secret: process.env.SESSION_SECRET, // 세션 ID 를 서명하는데 사용되는 키
        resave: false, // 세션을 강제로 다시 저장할지 여부를 결정
        saveUninitialized: false, // 초기회 되지 않은 세션을 저장소에 저장할지 여부를 설정
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

const allowedOrigins = ['http://localhost:3000', 'https://fe-psi-five.vercel.app', 'https://dbacsnb65qkyl.cloudfront.net/'];

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
    res.status(statusCode).send({
        success: false,
        message: message
    });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});