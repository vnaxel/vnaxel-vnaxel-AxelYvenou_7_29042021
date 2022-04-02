const models = require('../models')
const fs = require('fs')
const jwt = require('jsonwebtoken')


exports.createPublication = (req, res) => {

    const regEx = /^[\s\S]{3,}/

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKENKEY)

    const publication = {
        userId: decodedToken.userId,
        content: req.body.content,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    }

    if ( regEx.test(req.body.content) == false | req.body.content.trim() == "") {
        return res.status(400).json({ message: 'input must be at least 3 characters and can\'t contain only whitespaces' })
    } else {
        models.Publication.create(publication)

        .then(() => {res.status(201).json({message: 'Publication created'})})

        .catch(error => {res.status(500).json({error})})
    }
}


exports.getOnePublication = (req, res) => {

    const id = req.params.id
    
    models.Publication.findOne({
        where: {id: id},
        include: [{model:models.Comment}, {model:models.User}]
    })

    .then(result => {res.status(200).json(result)})

    .catch(error => {res.status(500).json({error})})
}    


exports.getAllPublications = (req, res) => {

    models.Publication.findAll({
        order:[
            ['createdAt', 'DESC'],
            [{model: models.Comment}, 'createdAt', 'ASC']
        ],
        include: [{model:models.Comment, include: {model:models.User}}, {model:models.User}],
    })

    .then(result => {res.status(200).json(result)})

    .catch(error => {res.status(500).json({error})})
}


exports.updatePublication = (req, res) => {

    const regEx = /^[\s\S]{3,}/

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKENKEY)

    const id = req.params.id
    const userId = decodedToken.userId

    if ( regEx.test(req.body.content) == false | req.body.content.trim() == "") {
        return res.status(400).json({ message: 'input must be at least 3 characters and can\'t contain only whitespaces' })
    }else{

        models.Publication.findOne({
            where: { id: id, userId: userId}
        })
        .then(oldPost => {

            if ( oldPost.imageUrl !== null) {
                const filename = oldPost.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, e => {}) 
            }
            const updatedPublication = {
                content: req.body.content ? req.body.content : oldPost.content,
                imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
            }
            models.Publication.update(updatedPublication, { where: { id: id, userId: userId } })
        
            .then(() => {res.status(200).json({message: "publication updated"})})
            .catch(error => {res.status(500).json({error})})
        })
        .catch(error => {res.status(500).json({error})})

    }
}

exports.deletePublication = async function (req, res){

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKENKEY)

    try {
        const id = req.params.id
        const userId = req.body.userId
        const userDeletingId = decodedToken.userId
            if (!userId || !userDeletingId) {
                return res.status(401).json({message: "request invalid"});
            } 
        let allowed = req.body.isAdmin
            if (userId == userDeletingId) allowed = true
            if (!allowed) {
                return res.status(401).json({message: "not allowed"})
            }

        if ( req.body.imageUrl !== null) {
            const filename = req.body.imageUrl.split('/images/')[1]
            console.log(filename)
            fs.unlink(`images/${filename}`, e => {}) 
        }

        await models.Comment.destroy({ 
            where: { publicationId: id }
        })
        await models.Publication.destroy({ 
            where: { id: id }
        })
        return res.status(200).json({ message : "post deleted" })
    }
    catch (err) {
        return next(err)
    }

}
    
