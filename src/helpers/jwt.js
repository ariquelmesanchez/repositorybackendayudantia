require('dotenv').config()
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const signToken = (data) => {
    return jwt.sign(
        data,
        String(JWT_SECRET),
        {
            expiresIn: '90d'
        }
    );
}

const verifyToken = (token) => {
    jwt.verify(token, String(JWT_SECRET));
}

const getToken = (req) => {
    const Authorization = req.header("Authorization");
    return Authorization?.split("Bearer ")[1]
}

const decodeToken = (token) => {
    return jwt.decode(token);
}

module.exports = {
    signToken,
    getToken,
    verifyToken,
    decodeToken
}