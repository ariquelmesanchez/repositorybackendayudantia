const format = require('pg-format');
const { DB } = require('../config/db')
const { v4: uuidv4 } = require('uuid')

const saveVerificationToken = async (userId, email) => {
    try {
        const token = uuidv4()

        const SQLQuery = format(`
                INSERT INTO email_verifications
                (email, token, created_at, user_id)
                    VALUES(%L, %L, NOW(), %L)
                    ON CONFLICT (email)
                    DO UPDATE SET token = EXCLUDED.token, created_at = NOW(), user_id = EXCLUDED.user_id
                    RETURNING token
            `,
            email,
            token,
            userId
        )

        const { rows: [verificationToken] } = await DB.query(SQLQuery)

        return verificationToken
    } catch (error) {
        throw error
    }
}


const verifyToken = async (email, token) => {
    try {
        const SQLQuery = format(`
                SELECT * FROM email_verifications
                WHERE email = %L AND token = %L
                AND created_at > NOW() - INTERVAL '1 day'
            `,
            email,
            token
        )

        const { rowCount } = await DB.query(SQLQuery)

        return rowCount ? true : false
    } catch (error) {
        throw error
    }
}

module.exports = {
    saveVerificationToken,
    verifyToken
}
