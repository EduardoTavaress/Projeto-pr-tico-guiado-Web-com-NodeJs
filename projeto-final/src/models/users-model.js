const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

const users = [
    {id:'1', name: 'Isaac Pontes', email:'isaac@gmail.com', password:'123456'},
    {id:'2', name: 'Jhon Doe', email:'jhon@gmail.com', password:'123456'}

]

module.exports = {
    getAllUsers: () => users,

    getUserById: (id) => users.find(user => user.id === id),

    getUserByEmail: (email) => users.find(user => user.email === email),

    creatUser: (name, email, password) => {
        const newUser = {
            id: uuid(),
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        }
        users.push(newUser)
        return newUser
    },
}