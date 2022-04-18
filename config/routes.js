require("dotenv").config();

const express = require('express')
const routes = express.Router()
const { reader, all, size } = require('../services/user_database')
reader(read)


const { addUser } = require('./user/addUser')
const { getUser } = require('./user/getUser')
const { checkPassword } = require('./user/checkPassword')
const { deleteAccount } = require('./user/deleteAccount')
const { deleteUser } = require('./user/deleteUser')
const { editUser } = require('./user/editUser')
const { secretAccount } = require('./secrect/secretAccount')
const { secretGetter } = require('./secrect/secretGetter')


function read() {
    routes.get('/', (req, res) => {
        return res.json({
            accountsSize: size(),
            version: 'v1.0.7',
            description: 'Investment Service of Automatic'
        }).end()
    })

    {/* User Actions */ }

    routes.get('/user/:userId', getUser)

    routes.get('/user/:userId/edit/:key/:value', editUser)

    routes.delete('/user/:userID/delete', deleteUser)

    routes.get('/user/:userId/check/:password', checkPassword)

    {/* User Actions */ }

    routes.post('/user/add/:email/:password', addUser)

    routes.delete('/user/:userID/deleteAccount', deleteAccount)

    routes.get('/api/accounts/:userId/:password/', secretAccount)

    routes.get('/api/service/:key/:amount', secretGetter)

    {/* LOGGER */ }
    console.log('[API] Rotas abertas.');
    {/* LOGGER */ }
}



module.exports = routes
