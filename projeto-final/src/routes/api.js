const express = require('express')
const booksController = require('../constrolles/books-controller')
const apiRouter = express.Router()

apiRouter.get('/books', booksController.index)
apiRouter.get('/books/:id', booksController.show)

apiRouter.post('/books', booksController.save)


module.exports = apiRouter