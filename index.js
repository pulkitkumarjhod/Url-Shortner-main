import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Logger from "./middleware/Logger.js";
import ParseUrl from "./controller/ParseUrl.js";
import CreateShortUrl from "./controller/CreateShortUrl.js";
import RedirectShortUrl from "./controller/RedirectShortUrl.js";

dotenv.config();

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        throw error;
    }
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

// Logging all requests
app.use(Logger);

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", ParseUrl, CreateShortUrl);

app.get("/api/shorturl/:short_url", RedirectShortUrl);

app.listen(port, function () {
    connectToMongoDB();
    console.log(`Listening on port ${port}`);
});
