const { createTransport } = require('nodemailer')

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'nelsonluengas4@gmail.com',
        pass: 'dnlo jkfa pmqk smkk'
    }
})

module.exports = {
    transporter
}