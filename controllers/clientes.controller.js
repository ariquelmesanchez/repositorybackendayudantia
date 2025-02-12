const Cliente = require('../models/Cliente')


const handleGetClientes = async (req, res, next) => {
    try {
        const { limit, order_by } = req.query

        const response = await Cliente.obtenerTodos(limit, order_by)

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const handleSearchClientes = async (req, res, next) => {
    try {
        const { busqueda } = req.query // ?contraseña_anterior=Cami&contraseña_nueva=2023
        const response = await Cliente.buscarClientes(busqueda)

        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const handleCreateCliente = async (req, res, next) => {
    try {
        const { nombre, email } = req.body
        const response = await Cliente.agregar(nombre, email)

        res.status(201)
            .json({
                msg: 'Cliente creado con éxito 🤙',
                data: response
            })
    } catch (error) {
        next(error)
    }
}

const handleUpdateCliente = async (req, res, next) => {
    try {
        const { id } = req.params
        const { nombre, email } = req.body

        const exists = await Cliente.exists(id)

        if (!exists) {
            throw new Error('NOT_FOUND')
        }

        const response = await Cliente.actualizarCliente(id, nombre, email)

        res.status(200)
            .json({
                msg: 'Cliente actualizado con éxito 🤙',
                data: response
            })
    } catch (error) {
        next(error)
    }
}

const handleDeleteCliente = async (req, res, next) => {
    try {
        const { id } = req.params

        const response = await Cliente.eliminarCliente(id)

        res.status(200)
            .json({
                msg: 'Cliente eliminado con éxito 🤙',
                data: response
            })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleGetClientes,
    handleCreateCliente,
    handleUpdateCliente,
    handleDeleteCliente,
    handleSearchClientes
}