const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require('passport');
require('./src/passport/localStrategy')
require('./src/passport/kakaoStrategy')();

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const indexRouter = require("./src/routes/index.route");


app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        credentials: true,
    })
);

app.use(morgan('dev'));

app.get("/", (_, res) => {
    return res.send("이게 왜 됨?");
});

app.use("/api", indexRouter);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});