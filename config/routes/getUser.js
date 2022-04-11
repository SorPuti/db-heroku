const { get } = require('../../services/database')
const User = require('../../models/User')

function getUser(req, res) {
    const userId = req.params.userId
    if (!userId)
        return res.status(404).end()

    get(userId).then((data) => {
        if (!data)
            return res.status(404).end()
        return res.status(200).send(data['user']).end()
    })
}

module.exports = {
    getUser
}