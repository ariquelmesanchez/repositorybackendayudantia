const { v4: uuidv4 } = require('uuid');
const Todo = require('../src/models/Todo')


const handleCreateTodo = async (req, res) => {
    try {
        const { title } = req.body
        const id = uuidv4()

        const response = await Todo.agregar(id, title)

        res.status(201)
            .json({
                msg: 'Todo creado con éxito 🤙',
                data: response
            })
    } catch (error) {
        res.status(500)
            .json({
                msg: 'Server Error',
                error: error.message
            })
    }
}

const handleGetTodos = async (req, res) => {
    try {
        const response = await Todo.obtener()

        res.status(200)
            .json({
                msg: 'Todos 🤙',
                data: response
            })
    } catch (error) {
        res.status(500)
            .json({
                msg: 'Server Error',
                error: error.message
            })
    }
}

module.exports = {
    handleCreateTodo,
    handleGetTodos
}