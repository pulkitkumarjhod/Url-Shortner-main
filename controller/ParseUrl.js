import dns from "dns";
import url from "url";

function ParseUrl(req, res, next) {
    const lookupUrl = String(req.body.url);

    const parsedLookupUrl = url.parse(lookupUrl);

    if (parsedLookupUrl === "") {
        res.json({ error: "invalid url" });
        return;
    }

    dns.lookup(
        parsedLookupUrl.protocol ? parsedLookupUrl.host : parsedLookupUrl.path,
        (error, address, family) => {
            if (error || address === null) {
                console.error("parsedLookupUrl ERROR", error);
                res.json({ error: "invalid url" });
                return;
            } else {
                req.parsedUrl = parsedLookupUrl.href;
                next();
                return;
            }
        }
    );
}

export default ParseUrl;
