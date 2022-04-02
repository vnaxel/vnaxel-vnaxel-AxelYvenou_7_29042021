const models = require ('../models');
const jwt = require('jsonwebtoken')


exports.createComment = (req, res) => {

    const regEx = /^[\s\S]{3,}/

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKENKEY)

    const comment = {
        userId: decodedToken.userId,
        publicationId: req.params.publicationId,
        content: req.body.content,
    }

    if ( regEx.test(req.body.content) == false | req.body.content.trim() == "") {
        return res.status(400).json({ message: 'input must be at least 3 characters and can\'t contain only whitespaces' })
    } else {

        models.Comment.create(comment)

        .then(() => {res.status(201).json({message: 'Comment created'})})

        .catch(error => {res.status(500).json({error})})
    }

}


exports.getOneComment = (req, res) => {

    const id = req.params.id
    const publicationId = req.params.id

    models.Comment.findOne({
        include:{
        where:{publicationId: publicationId, id : id},
        model:models.User
        }})

    .then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({message: "Comment not found!"})
        }
    })

    .catch(error => {res.status(500).json({error})})
}


exports.getAllComments = (req, res) => {

    models.Comment.findAll({
        where: {publicationId: req.params.publicationId},
        include:{
        model: models.User
        }
    })

    .then(result => {res.status(200).json(result)})

    .catch(error => {res.status(500).json({error})})
}


exports.updateComment = (req,res) =>{

    const regEx = /^[\s\S]{3,}/

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKENKEY)

    const id = req.params.id
    const updatedComment = { content: req.body.content }
    const publicationId = req.params.publicationId;
    const userId = decodedToken.userId

    if ( regEx.test(req.body.content) == false | req.body.content.trim() == "") {
        return res.status(400).json({ message: 'input must be at least 3 characters and can\'t contain only whitespaces' })
    } else {

        models.Comment.update(updatedComment, {where: {id : id, publicationId :publicationId, userId: userId}})

        .then(() => {res.status(200).json({message:"publication updated"})})

        .catch(error => {res.status(500).json({error})})

    }
}
    

exports.deleteComment = (req, res) => {

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKENKEY)

    const id = req.body.id
    const userId = req.body.userId
    const publicationId = req.body.publicationId
    const userDeletingId = decodedToken.userId
    
    if (!userId || !userDeletingId) {
        res.status(401).json({message: "request invalid"});
        return;
    }

    // Is authorized
    let allowed = decodedToken.isAdmin;
        if (userId == userDeletingId) allowed = true
        if (!allowed) {
            res.status(402).json({message: "not allowed"})
            return;
        }
    
    models.Comment.destroy({where: {id: id, publicationId: publicationId}})

    .then(() => {res.status(200).json({message:"Comment deleted"})})

    .catch(error => {res.status(500).json({error})})
}
