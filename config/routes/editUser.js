const { update, get } = require('../../services/database')
const User = require('../../models/User')

var rand = function () {
    return Math.random().toString(36).substr(2);
};

var token = function () {
    return rand() + rand();
};

async function editUser(req, res) {
    const userId = req.params.userId
    const key = req.params.key
    const value = req.params.value

    if (!userId && !key && !value)
        return res.status(404).send(JSON.stringify({
            result: 'error'
        })).end()

    //    console.log(`This userId ${userId} query edit to ** ${key} ** for  ** ${value} **.`);

    if (key.toString('utf8').includes('async_accounts') || key.toString('utf8').includes('permissions'))
        return res.status(404).send(JSON.stringify({
            result: 'access denied'
        })).end()

    get(userId).then(data => {
        if (!data)
            return res.status(404).send(JSON.stringify({
                result: 'error'
            })).end()

        const user = User.valueOf((userId.includes('@') ? data.userId : userId), data)
        user.key(key, value)
        update(user)

        return res.send(JSON.stringify({
            result: 'sucess'
        })).end()
    })
}

module.exports = {
    editUser
}