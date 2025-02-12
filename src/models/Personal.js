const { DB } = require("../config/db")
const format = require('pg-format')

const optenerPersonal = async (salario_min = '', salario_max = '', role = '') => {

    try {
        const { query, values } = handleAddFilters({ salario_min, salario_max, role })
        throw new Error('SERVER_ERROR')
        const SQLQuery = format(`
                SELECT * FROM personal
                WHERE ${query}
            `,
            ...values, // 2000, 5000, 'adminsitrador'
        )

        const { rows } = await DB.query(SQLQuery)

        return rows
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
                case 'salario_max':
                    querys.push(`salario <= %s`)
                    values.push(value)
                    break;
                case 'salario_min':
                    querys.push(`salario >= %s`)
                    values.push(value)
                    break;
                case 'role':
                    querys.push(`rol ILIKE '%s'`)
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
    optenerPersonal
}