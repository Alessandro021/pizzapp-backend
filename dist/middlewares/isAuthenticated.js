"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //RECEBER TOKEN
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        //VALIDAR TOKEN
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //RECUPERAR O ID DO TOKEN E COLOCAR DENTRO DE UMA VARIAVEL user_id DENTRO DO REQ.
        req.user_id = sub;
        return next();
    }
    catch (error) {
        return res.status(401).end();
    }
}
exports.isAuthenticated = isAuthenticated;
