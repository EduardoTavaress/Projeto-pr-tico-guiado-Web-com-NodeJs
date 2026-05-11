const bcrypt = require('bcrypt')
const HttpError = require('../erros/HttpError')
const booksModel = require('./books-model')


const loans = [
    {id: '1', 
     userId: '1',
     bookId: '1',
     loanDate: new Date('2024-01-01'),
     returnDate: null,
     inReturnetd: false,
     isLate: true
    },
]

module.exports = {
    getAllLoans: () => loans,

    getLoansById: (id) => loans.find(loan => loan.id === id),

    createLoan: (user, book) => {
        if (book.quantityAvaliable < 1) throw new HttpError(400, 'Não há quantidade disponível')

            const today = new Date ()
            const returnDate = new Date()
            returnDate.setDate(today.getDate() + 14)

            const newLoan = {
                id: uuid(),
                userID: user.id,
                bookId: book.id,
                loanDate: today,
                returnDate: returnDate,
                isReturned: false,
                isLate: false
            }

            loans.push(newLoan)
            booksModel.takeBook(book.id)

            return newLoan

    },

    returnLoan: (id) => {
        const loanIndex = loans.findIndex(loan => loan.id === id)
        if (loanIndex === -1) throw new HttpError(404, 'Empréstimo não encontrado')

        const loan = loans[loanIndex]
        if(loan.isReturned) return null

        loan.isReturned = true

        const today = new Date()
        const limitDate = new Date (loan.returnDate)

        loan.isLate = today > limitDate
        loan.returnDate = today

        const book = booksModel.returnBook(loan.bookId)
        return loan
    }
}