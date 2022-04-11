const { get, dump } = require('../../services/database')
const User = require('../../models/User')

function deleteUser(req, res) {
    const userId = req.params.userID

    if (!userId)
        return res.status(404).end()

    get(userId).then((data) => {
        if (!data)
            return res.status(404).end()

        dump(userId).then(() => {
            return res.send(JSON.stringify({
                result: 'sucess'
            })).end()
        })
    })
}

module.exports = {
    deleteUser
}