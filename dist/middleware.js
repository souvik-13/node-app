"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleWare = middleWare;
const allowedRoutes = ['/', '/index.html',];
function middleWare(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    if (allowedRoutes.includes(req.originalUrl)) {
        console.log('Request is allowed');
        next();
    }
    else {
        console.log('Request is not allowed');
        res.status(403).send('Forbidden');
    }
}
