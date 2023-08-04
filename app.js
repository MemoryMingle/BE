const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const indexRouter = require("./src/routes/index.route");


app.use(express.json());
app.use(cookieParser());



app.get("/", (_, res) => {
    return res.send("CICD?");
});

app.use("/api", indexRouter);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});