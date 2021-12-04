require("dotenv").config;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send("No available token for authorization");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.account = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid token");
    }
    return next();
};

module.exports = verifyToken;