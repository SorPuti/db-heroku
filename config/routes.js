const express = require('express')
const routes = express.Router()
const { reader, all } = require('../services/database')
reader(read)


const { addUser } = require('./routes/addUser')
const { getUser } = require('./routes/getUser')
const { checkPassword } = require('./routes/checkPassword')
const { deleteAccount } = require('./routes/deleteAccount')
const { deleteUser } = require('./routes/deleteUser')
const { editUser } = require('./routes/editUser')


function read() {
    routes.get('/', (req, res) => {
        all().then(data => {
            return res.json(data).end()
        })
    })

    {/* User Actions */ }

    routes.get('/user/:userId', getUser)

    routes.get('/user/:userId/edit/', editUser)

    routes.delete('/users/:userID/delete', deleteUser)

    routes.get('/user/:userId/check', checkPassword)

    {/* User Actions */ }

    routes.post('/user/add', addUser)

    routes.delete('/users/:userID/deleteAccount', deleteAccount)


    {/* LOGGER */ }
    console.log('[API] Rotas abertas.');
    {/* LOGGER */ }
}



module.exports = routes
