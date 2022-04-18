const { get, update } = require('../../services/user_database')
const User = require('../../models/User')

function getUser(req, res) {
    const userId = req.params.userId
    if (!userId)
        return res.send(JSON.stringify({
            result: 'error'
        })).end()

    get(userId).then((data) => {
        if (!data)
            return res.send(JSON.stringify({
            result: 'error'
        })).end()

        return res.send({
            firstName: data.user.firstName,
            email: data.user.email,
            account_level: data.user.account_level
        }).end()
    })
}

module.exports = {
    getUser
}
