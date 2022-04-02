const express = require('express')
const router = express.Router()

const publicationsCtrl = require('../controllers/publications')
const commentsCtrl     = require('../controllers/comments')
const auth             = require('../middleware/auth')
const multer = require('../middleware/multer-config')


// Publications routes
router.post('/create', auth, multer, publicationsCtrl.createPublication)
router.put('/:id', auth, multer, publicationsCtrl.updatePublication)
router.get('/all', auth, publicationsCtrl.getAllPublications)
router.get('/:id', auth, publicationsCtrl.getOnePublication)
router.delete('/:id', auth, publicationsCtrl.deletePublication)

router.post('/:publicationId/comments', auth, commentsCtrl.createComment)
router.put('/:publicationId/comments/:id', auth, commentsCtrl.updateComment)
router.get('/:publicationId/comments', auth, commentsCtrl.getAllComments)
router.get('/:publicationId/comments/:id', auth, commentsCtrl.getOneComment)
router.delete('/:publicationId/comments/:id', auth, commentsCtrl.deleteComment)

module.exports = router