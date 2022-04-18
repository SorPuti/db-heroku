const { update, hasUser, get, indexOf } = require('../../services/user_database')
var currentIndex = 0;

function secretGetter(req, res) {
    var API_KEY = req.params.key
    var amount = req.params.amount

    if (!API_KEY || !amount)
        return res.send(JSON.stringify({
            result: 'error'
        })).end()

    if (!(API_KEY === process.env.API_KEY))
        return res.send(JSON.stringify({
            result: 'acess deny'
        })).end()

    indexOf(currentIndex, (currentIndex + (amount - 1))).then(list => {
        return res.send(list).end()
    })

}

module.exports = {
    secretGetter
}