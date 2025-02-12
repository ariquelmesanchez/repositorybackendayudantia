const format = require('pg-format');
const { DB } = require('../config/db')

const verifyEmail = async (email) => {
    try {
        const SQLQuery = format(`
                UPDATE users
                    SET email_verified = true
                    WHERE email = %L
                    RETURNING *
            `,
            email
        )

        const { rowCount } = await DB.query(SQLQuery)

        return rowCount
            ? { msg: 'Email verified' }
            : { msg: 'Email not verified' }
    } catch (error) {
        throw error
    }
}

module.exports = {
    verifyEmail
}