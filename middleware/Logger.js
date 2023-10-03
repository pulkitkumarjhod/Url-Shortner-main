function Logger(req, res, next) {
    console.log(req.method, req.path, req.ip);
    next();
}

export default Logger;
