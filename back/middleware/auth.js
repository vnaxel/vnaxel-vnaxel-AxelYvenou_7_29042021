const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) =>{

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKENKEY)
        const userId = decodedToken.userId
    if (req.body.userId | req.body.id && decodedToken.userId !== userId) { 
        throw 'Invalid user ID'
    } else {
        next()
    }
    } catch (error) {
        res.status(401).json({error: error | 'Request unauthentificated'})
    }
}