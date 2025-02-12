const { DB } = require("../config/db");
const format = require('pg-format')

const remove = async (id) => {
    try {
        const SQLQuery = format(`
                DELETE FROM books
                WHERE id = %s
                RETURNING *
            `,
            id
        )

        const { rows: [book], rowCount } = await DB.query(SQLQuery)

        if (!rowCount) {
            throw new Error('NOT_FOUND')
        } else {
            return book
        }

    } catch (error) {
        throw error
    }
}

module.exports = {
    remove
}