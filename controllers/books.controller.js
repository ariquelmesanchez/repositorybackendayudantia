const { getToken, verifyToken, decodeToken } = require('../helpers/jwt');
const Book = require('../models/Book')

const handleRemove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const token = getToken(req)

        verifyToken(token)

        const { email } = decodeToken(token)
        const book = await Book.remove(id);

        res.status(200).json({ msg: `El usuario ${email} ha eliminado el libro con id ${id}`, book });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleRemove
}