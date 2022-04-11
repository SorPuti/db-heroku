const { get } = require('../../services/database')
const User = require('../../models/User')

function checkPassword(req, res) {
    const userId = req.params.userId
    const password = req.params.password
    if (!userId)
        return res.status(404).send(JSON.stringify({
            result: 'error'
        })).end()

    get(userId).then((data) => {
        if (!data)
            return res.status(404).send(JSON.stringify({
                result: 'error'
            })).end()

        const user = User.valueOf(userId, data)

        if (password == user.password)
            return res.send(JSON.stringify({
                result: 'sucess'
            })).end()
        return res.status(404).send(JSON.stringify({
            result: 'error'
        })).end()
    })
}

module.exports = {
    checkPassword
}