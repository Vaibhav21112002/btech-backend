import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import DBConnect from "./db/index.js";

import AuthRouter from "./routes/AuthRouter.js";
import IOTDataRouter from "./routes/IOTDataRouter.js";
import UserRouter from "./routes/UserRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

DBConnect();
dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", AuthRouter);
app.use("/iot", IOTDataRouter);
app.use("/user", UserRouter);

app.listen(port, () => {
    console.log(
        `Server is running on port: ${port}. Visit http://localhost:${port}/`
    );
});
