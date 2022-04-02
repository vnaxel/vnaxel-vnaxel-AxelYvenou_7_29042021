const models = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require("crypto-js")
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()



exports.signup = (req, res) => {

	const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.EMAILCRYPTINGKEY).toString()

	const username = req.body.username.split(' ').map(part => {return part = part.slice(0,1).toUpperCase()+part.substr(1).toLowerCase()}).join(' ')

	models.User.findOne({ where: { email: emailCryptoJs } })

	.then(exist => {
		if (exist) {
			res.status(409).json({ message : 'email already exists in DB'})
		}else{
			bcrypt.hash(req.body.password, 10)

			.then(hash => {
				const user = {
					email: emailCryptoJs,
					username: username,
					imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
					password: hash,
					isAdmin: 0
				}
				models.User.create(user)

					.then(() => res.status(201).json({ message: 'user created'}))

					.catch(error => res.status(400).json({ error }))
			})

			.catch(error => res.status(500).json({ error }))
		}
	})
}
 

exports.login = (req, res) => {

	const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.EMAILCRYPTINGKEY).toString()

	models.User.findOne({ where: { email: emailCryptoJs } })

	.then(user => {
		if (!user) {
			return res.status(401).json({ message: 'wrong email' });
	    }
		bcrypt.compare(req.body.password, user.password)
			.then(valid => {
				if (!valid) {
					return res.status(401).json({ error: 'wrong password'})
				}
				return res.status(200).json({
					userId: user.id,
					token: jwt.sign(
						{ 
							userId: user.id,
							isAdmin: user.isAdmin
						},
						process.env.TOKENKEY,
						{ expiresIn: '24h'}                           
					)
				})
			})
			.catch(error => res.status(500).json({ error }))
	})
	.catch(error => res.status(500).json({ error }))
}


exports.getAllUsers = (req, res) => {

	models.User.findAll()
	.then(users => {res.status(200).json(users)})
	.catch(error => {res.status(500).json({ error })})
}


exports.getUserProfile = (req, res) => {

	models.User.findByPk(req.params.id, {
		
		order: [
			[ models.Publication, 'createdAt', 'DESC'],
			[{model: models.Publication}, {model: models.Comment}, 'createdAt', 'ASC']
		],
		include: [{model: models.Publication, include: [{model: models.User},{model: models.Comment, include: models.User}]}]
	
	})
	.then(user => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({error})}})
	.catch(error => {res.status(500).json({error})})
}

  
exports.updateProfile = (req, res) => {

	const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKENKEY)
    const userId = decodedToken.userId

	models.User.findOne({
		where: { id: userId }
	})
	.then( oldUser => {
		
		if (oldUser.imageUrl !== null) {
			const filename = oldUser.imageUrl.split('/images')[1]
			fs.unlink(`images/${filename}`, err => {
				if (err) throw (err)
			})
		}
		const updatedProfile = {
			imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
		}
		models.User.update(updatedProfile, { where: { id: userId } })
		.then(() => {res.status(200).json({ message: "Profil updated" })})
		.catch(error => {res.status(500).json({ error })})
	})
	.catch(error => {res.status(500).json({error})})
}


exports.deleteAccount = async function deleteAccount(req, res, next) {

	try{

		const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKENKEY)
        const userId = decodedToken.userId

		const idToDelete = req.params.id
			if (!userId || !idToDelete) {
				res.status(401).json({message: "request invalid"})
				return
			}
		let allowed = decodedToken.isAdmin
			if (userId == idToDelete) allowed = true
			if (!allowed) {
				res.status(401).json({message: "not allowed"})
				return
			}

		 const postsToDelete = await models.Publication.findAll({
			where: { userId: idToDelete }
		})

		postsToDelete.forEach(post => {
			if (post.imageUrl !== null) {
				const filename = post.imageUrl.split('/images')[1]
				fs.unlink(`images/${filename}`, err => {
					if (err) throw (err)
				})
			}
			models.Comment.destroy({where: { publicationId : post.id }})

		})

		models.Publication.destroy({where: { userId : idToDelete }})

		models.Comment.destroy({where: { userId : idToDelete }})

		models.User.findOne({where: { id: idToDelete }})
		
		.then(user => {
			if (user.imageUrl !== null) {
				const filename = user.imageUrl.split('/images')[1]
				fs.unlink(`images/${filename}`, err => {
					if (err) throw (err)
				})
			}
			models.User.destroy({where: {id: idToDelete}})
		})
		
		return res.status(200).json({message: "user deleted"})

	}catch (err){
		return next(err)
	}
  }

