const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const indexRouter = require("./src/routes/index.route");
const passport = require("passport");
const confirmRequest = require("./src/utils/confirmRequest");
const rateLimit = require("express-rate-limit");
const scheduleDelete = require("./src/utils/scheduler");
// const http = require("http");
// const socketIO = require("socket.io");
// const socketManager = require("./src/socket/socketManager");
require("./src/passport/localStrategy");
require("./src/passport/kakaoStrategy")();
require("dotenv").config();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];
const app = express();
const PORT = process.env.PORT || 3000;
// 소켓 부분 실패 주석처리 
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // origin이 제공되지 않은 경우 요청을 허용한다
//       // origin이 허용된 origin 중 하나인지 확인한다
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const errorMsg =
//           "이 사이트의 CORS 정책은 지정된 Origin에서의 접근을 허용하지 않습니다.";
//         return callback(new Error(errorMsg), false);
//       }
//       return callback(null, true);
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     credentials: true,
//   },
// });
// socketManager(io);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const errorMsg =
          "이 사이트의 CORS 정책은 지정된 Origin에서의 접근을 허용하지 않습니다.";
        return callback(new Error(errorMsg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

// 요청 수 관리 미들웨어
app.use(async (req, res, next) => {
  await confirmRequest.increment();
  res.on("finish", async () => {
    await confirmRequest.decrement();
  });
  next();
});

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// 레이트 제한 미들웨어
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 600,
//     handler: function (req, res) {
//         confirmRequest.decrement();
//         res.status(429).send("너무 많은 요청을 하셨습니다. 잠시 후 다시 시도해 주세요.");
//     }
// });
// app.use(limiter);

scheduleDelete();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


app.use(morgan("dev"));

app.get("/", (_, res) => {
  return res.send("이게 왜 됨?");
});

app.use("/api", indexRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "잘못된 요청입니다.";

  confirmRequest.decrement();

  res.status(statusCode).send({
    success: false,
    message: message,
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
