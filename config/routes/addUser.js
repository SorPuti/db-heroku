const { update, hasUser } = require('../../services/database')
const User = require('../../models/User')

var rand = function () {
    return Math.random().toString(36).substr(2);
};

var token = function () {
    return rand() + rand();
};

function addUser(req, res) {
    const password = req.params.password
    const email = req.params.email

    if (!email || !password)
        return res.status(404).end()

    const user = new User(token())
    user.setup('Cliente', email, [], password)
    if (hasUser(user))
        return res.send(JSON.stringify({
            result: 'User already exists'
        })).end()

    if (!user)
        return res.status(404).end()

    update(user).then(() => {
        return res.status(200).send(JSON.stringify({
            result: 'sucess'
        })).end()
    })
}

module.exports = {
    addUser
}