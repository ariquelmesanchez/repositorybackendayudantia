const { DB } = require('../config/db')

const agregar = async (id, title) => {
    try {
        const SQLQuery = "INSERT INTO todos VALUES($1, $2, DEFAULT) RETURNING *"
        const SQLValues = [id, title]

        const { rows } = await DB.query(SQLQuery, SQLValues)

        return rows
    } catch (error) {
        throw error
    }
}

const obtener = async () => {
    try {
        const SQLQuery = "SELECT * FROM todos"
        const { rows } = await DB.query(SQLQuery)

        return rows
    } catch (error) {
        throw error
    }
}


module.exports = {
    agregar,
    obtener
}