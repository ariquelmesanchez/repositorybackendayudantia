const Personal = require('../models/Personal')


const handleGetPersonal = async (req, res, next) => {
    try {
        const { salario_min, salario_max, role } = req.query

        const response = await Personal.optenerPersonal(salario_min, salario_max, role)

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    handleGetPersonal
}