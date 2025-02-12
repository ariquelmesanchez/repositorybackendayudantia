const { transporter } = require('../helpers/nodemailer');
const Email = require('../models/Email')
const User = require('../models/User')

const handleSendVerificationEmail = async (req, res, next) => {
    try {
        const { email, userId } = req.body;
        const { token } = await Email.saveVerificationToken(userId, email)

        const verificationLink = `http://localhost:3000/api/v2/verify-email?email=${email}&token=${token}`

        const mailOptions = {
            from: 'Nelsonluengas4@gmail.com',
            to: email,
            subject: '[📧 Email verification - Verify your Email 📧]',
            html: `
            <p>Haga clic en el siguiente enlace para verificar tu correo:</p>
            <a href="${verificationLink}">Verificar Correo</a>
            `
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({ msg: 'Correo de verificacion enviado' })
    } catch (error) {
        next(error)
    }
}

const handleVerifyEmail = async (req, res, next) => {
    try {
        const { email, token } = req.query;

        const isValidToken = await Email.verifyToken(email, token)

        await User.verifyEmail(email)

        if (isValidToken) {
            res.redirect('https://platzi.com')
        } else {
            res.status(400).send('Token inválido o expirado')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleSendVerificationEmail,
    handleVerifyEmail
}