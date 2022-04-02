const history = require('connect-history-api-fallback');
const express = require('express')
const path = require('path')
const app = express()
const helmet = require('helmet');
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 300 // limit each IP to 300 requests per windowMs
})

require('dotenv').config()

const publicationRoutes = require('./routes/publication');
const userRoutes = require('./routes/user')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Origin', 'https://vnaxel.github.io');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next()
  })


app.use(xss())
app.use(helmet())
app.use(limiter)
app.use(history())
app.use(express.json())




app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/publications', publicationRoutes)
app.use('/users', userRoutes)

module.exports = app;