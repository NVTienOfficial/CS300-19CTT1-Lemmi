const jwt = require("jsonwebtoken");

function generateToken(data) {
    return jwt.sign(data, process.env.TOKEN_KEY, {
        expiresIn: '5m'
    });
}

module.exports = generateToken;