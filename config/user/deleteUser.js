const { get, dump } = require('../../services/user_database')
const User = require('../../models/User')

function deleteUser(req, res) {
    const userId = req.params.userID

    if (!userId)
        return res.end()

    get(userId).then((data) => {
        if (!data)
            return res.send(JSON.stringify({
                result: 'error'
            })).end()

        dump(data.userId).then(() => {
            return res.send(JSON.stringify({
                result: 'sucess'
            })).end()
        })
    })
}

module.exports = {
    deleteUser
}
