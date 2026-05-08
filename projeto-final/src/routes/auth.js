const express = require('express')
const authController = require('../constrolles/auth-controller')
const { ensureAuth } = require('../middlewares/auth-middleware')
const authRouter = express.Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

authRouter.get('/test', ensureAuth, (req, res) =>  res.json({ message: 'OK'}))

module.exports = authRouter