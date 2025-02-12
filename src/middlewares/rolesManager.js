const { getToken, decodeToken } = require("../helpers/jwt")

const handleAdmin = async (req, res, next) => {
    try {
        const token = getToken(req)
        const { role } = decodeToken(token)

        if (role === 'ADMIN') {
            next()
        } else {
            throw new Error('AUTH_ERROR')
        }
    } catch (error) {
        next(error)
    }
}

const handleUser = async (req, res, next) => {
    try {
        const token = getToken(req)
        const { role } = decodeToken(token)

        if (role === 'USER' || role === 'ADMIN') {
            next()
        } else {
            throw new Error('AUTH_ERROR')
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleAdmin,
    handleUser
}