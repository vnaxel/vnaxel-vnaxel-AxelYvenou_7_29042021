const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const auth     = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Users routes
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/all', auth, userCtrl.getAllUsers)
router.get('/:id', auth, userCtrl.getUserProfile)
router.put('/:id', auth, multer, userCtrl.updateProfile)
router.delete('/:id', auth, userCtrl.deleteAccount)

module.exports = router