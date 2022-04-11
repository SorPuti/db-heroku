const { get } = require('../../services/database')
const User = require('../../models/User')

function deleteAccount(req, res) {
    const body = req.body

    if (!body)
        return res.send(JSON.stringify({
            result: 'body not found'
        })).end()
    const accountId = body.accountID
    const userId = req.params.userID

    get(userId).then((data) => {
        if (!data)
            return res.status(404).end()

        const user = User.valueOf(data)
        user.remove(accountId)

        return res.send('OK').end()
    })
}

module.exports = {
    deleteAccount
}