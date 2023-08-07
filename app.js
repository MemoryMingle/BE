const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const indexRouter = require("./src/routes/index.route");


app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    })
);

app.get("/", (_, res) => {
    return res.send("이게 왜 됨?");
});

app.use("/api", indexRouter);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});