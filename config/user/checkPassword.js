const { get } = require('../../services/user_database')
const User = require('../../models/User')

function checkPassword(req, res) {
    const userId = req.params.userId
    const password = req.params.password
    
    if (!userId || !password)
        return res.send(JSON.stringify({
            result: 'userId or password incorrect!'
        })).end()

    get(userId).then((data) => {
        if (!data)
            return res.send(JSON.stringify({
                result: 'error'
            })).end()

        const user = User.valueOf(userId, data)

        if (password === user.password)
            return res.send(JSON.stringify({
                result: 'sucess'
            })).end()
        return res.send(JSON.stringify({
            result: 'error'
        })).end()
    })
}

module.exports = {
    checkPassword
}
