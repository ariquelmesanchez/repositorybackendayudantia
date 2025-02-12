const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes')
const cors = require('cors')
const { errorMiddleware } = require('./middlewares/errorMiddleware')
const { logsMiddleware } = require('./middlewares/logsMiddleware')

const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(logsMiddleware)

// routes
app.use('/api/v2', routes)

app.use(errorMiddleware)

module.exports = app


