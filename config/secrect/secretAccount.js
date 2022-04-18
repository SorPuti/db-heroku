const { update, hasUser, get } = require('../../services/user_database')
const User = require('../../models/User')
const Account = require('../../models/Account')

function secretAccount(req, res) {
    var userId = req.params.userId
    var password = req.params.password

    if (!userId || !password)
        return res.send(JSON.stringify({
            result: 'error'
        })).end()

    get(userId).then(data => {

        if (!data)
            return res.send(JSON.stringify({
                result: 'error'
            })).end()

        if (!(data.password === password))
            return res.send(JSON.stringify({
                result: 'error'
            })).end()

        var user = User.valueOf(data.userId, data)
        return res.send(user.user.async_accounts).end()
    })
}

module.exports = {
    secretAccount
}