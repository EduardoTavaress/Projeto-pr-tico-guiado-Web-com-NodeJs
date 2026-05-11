const HttpError = require('../erros/HttpError')

const uuid = require('uuid').v4

let books = [
    { id:'1', title:'Book One', author:'Author ONe', quantityAvaliable: '4'},
    { id:'2', title:'Book Two', author:'Author Two', quantityAvaliable: '3'},

]

module.exports = {
    getAllBokks: () => books,

    getBookById: (id) => books.find(book => book.id === id),

    creatUser: (title, author, quantityAvaliable) => {
        const newBook = {
            id: uuid(),
            title,
            author,
            quantityAvaliable
        }
        books.push(newBook)
        return newBook
    },

    updateBook: (id, updatedBook) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')
        books[bookIndex] = { ...books[bookIndex], ...updatedBook }
        return books[bookIndex]
    },

    deleteBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(401, 'Livro não encontrado')
        const deletedBook = books[bookIndex]
        books = books.filter(book => book.id !== id)
        return deletedBook
    },

    takeBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(401, 'Livro não encontrado')

        books[bookIndex].quantityAvaliable -= 1
    },

    returnBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if (bookIndex === -1) throw new HttpError(401, 'Livro não encontrado')

        books[bookIndex].quantityAvaliable += 1
    }
}