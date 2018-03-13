"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || '9u8nnjksfdt98*(&*%T$#hsfjk';
const ttl = 3600 * 4;
exports.sign = (data) => jwt.sign({ data }, secret, { expiresIn: ttl });
exports.verify = (token) => jwt.verify(token, secret);
//# sourceMappingURL=jwt.js.map