import mongoose from "mongoose";
import { nanoid } from "nanoid";

let Url;

function createShortUrl() {
    return nanoid(5);
}

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        default: createShortUrl,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default Url = mongoose.model("UrlSchema", urlSchema);
