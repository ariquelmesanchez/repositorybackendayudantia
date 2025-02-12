const Inmueble = require('../models/Inmueble')


const handleGetInmuebles = async (req, res, next) => {
    try {
        const { limit, page } = req.query

        const response = await Inmueble.getAll(limit, page)

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const handleGetInmueblesFiltered = async (req, res, next) => {
    try {
        const { tipo, baños_min, baños_max, habitaciones_min, habitaciones_max, page, limit } = req.query

        const response = await Inmueble.getAllFiltered(tipo, baños_min, baños_max, habitaciones_min, habitaciones_max, page, limit)

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const handleGetSingleInmueble = async (req, res, next) => {
    try {
        const { id } = req.params

        const response = await Inmueble.getSingle(id)

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    handleGetInmuebles,
    handleGetSingleInmueble,
    handleGetInmueblesFiltered
}