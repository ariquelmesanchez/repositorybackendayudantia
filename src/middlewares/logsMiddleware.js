const fs = require('fs')
const path = require('path')
const colors = require('colors')

const logsMiddleware = (req, res, next) => {
    const start = Date.now()
    const { method, originalUrl, query, body } = req

    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const userAgent = req.header['user-agent'] || 'Unknown'

    res.on('finish', () => {
        const duration = Date.now() - start
        const statusCode = res.statusCode

        const logMessage = `
            ${new Date().toISOString()} | IP: ${clientIp} | ${method} ${originalUrl}
            Status: ${statusCode} | Duration: ${duration}ms
            User Agent: ${userAgent}
            Query String: ${JSON.stringify(query)}
            Request Body: ${JSON.stringify(body)}\n
        `
        let color;

        if (statusCode >= 500) {
            color = colors.red
        } else if (statusCode >= 400) {
            color = colors.yellow
        } else if (statusCode >= 300) {
            color = colors.cyan
        } else {
            color = colors.green
        }

        console.log(color(`\n${logMessage}\n`))

        fs.appendFileSync(path.join(__dirname, 'logs.txt'), logMessage, 'utf8')
    })

    next()
}

module.exports = {
    logsMiddleware
}