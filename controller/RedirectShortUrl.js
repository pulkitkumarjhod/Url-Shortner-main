import Url from "../models/UrlSchema.js";

export default async function RedirectShortUrl(req, res, next) {
    const url = await Url.findOne({ shortUrl: req.params.short_url });
    if (url) {
        res.redirect(url.longUrl);
        next();
    } else {
        res.json({ error: "invalid url" });
    }
    return;
}
