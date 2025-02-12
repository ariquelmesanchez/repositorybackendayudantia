const { DB } = require("../config/db")
const format = require('pg-format')
const { HATEOS } = require("../helpers/functions")


const getAll = async (limit = 10, page = 1) => {
    try {

        const offset = Math.abs(page - 1) * limit

        const SQLQuery = format(`
                SELECT id, titulo  FROM inmuebles
                LIMIT %s
                OFFSET %s
            `,
            limit,
            offset
        )

        const { rowCount: totalCount } = await DB.query('SELECT * FROM inmuebles')
        const pages = Math.ceil(totalCount / limit)

        const { rows, rowCount } = await DB.query(SQLQuery)

        return HATEOS({ totalCount, count: rowCount, pages, results: rows, page, limit })
    } catch (error) {
        throw error
    }
}

const getSingle = async (id) => {
    try {
        const SQLQuery = format(`
                SELECT * FROM inmuebles
                WHERE id = %s
            `,
            id
        )

        const { rows: [inmueble] } = await DB.query(SQLQuery)

        return inmueble
    } catch (error) {
        throw error
    }
}

const getAllFiltered = async (tipo = '', baños_min = '', baños_max = '', habitaciones_min = '', habitaciones_max = '', page = 1, limit = 8) => {

    try {
        const { query, values } = handleAddFilters({ tipo, baños_min, baños_max, habitaciones_min, habitaciones_max })
        const offset = Math.abs(page - 1) * limit

        const SQLQuery = format(`
                SELECT * FROM inmuebles
                ${query ? `WHERE ${query}` : ''}
                LIMIT %s
                OFFSET %s
            `,
            ...values,
            limit,
            offset
        )
        console.log(SQLQuery)

        const { rowCount: totalCount } = await DB.query('SELECT * FROM inmuebles')
        const { rows, rowCount } = await DB.query(SQLQuery)

        const total = rowCount ? rowCount : totalCount
        const pages = Math.ceil(total / limit)

        return HATEOS({ totalCount: total, count: rowCount, pages, results: rows, page, limit })
    } catch (error) {
        throw error
    }
}

const handleAddFilters = (filters) => {
    const querys = []
    const values = []

    Object.entries(filters).forEach((filter) => { /* 
        { salario_min: '', salario_max: 20000, role: 'administrador' } => [
            ['salario_min', ''], => const [salario_min, ''] = filter
            ['salario_max' 20000], 
            ['role', 'administrador']
        ]
    * */
        const [key, value] = filter

        if (value) {
            switch (key) {
                case 'tipo':
                    querys.push(`tipo ILIKE '%s'`)
                    values.push(value)
                    break;
                case 'baños_min':
                    querys.push(`banos >= %s`)
                    values.push(value)
                    break;
                case 'baños_max':
                    querys.push(`banos <= %s`)
                    values.push(value)
                    break;
                case 'habitaciones_min':
                    querys.push(`habitaciones >= %s`)
                    values.push(value)
                    break;
                case 'habitaciones_max':
                    querys.push(`habitaciones <= %s`)
                    values.push(value)
                    break;
                default:
                    break;
            }
        }
    })

    return {
        query: querys.join(" AND "),
        values
    }
}

module.exports = {
    getAllFiltered,
    getAll,
    getSingle
}