const { update, get } = require('../../services/database')
const User = require('../../models/User')

var rand = function () {
    return Math.random().toString(36).substr(2);
};

var token = function () {
    return rand() + rand();
};

async function userPermissions(req, res) {
    const userId = req.params.userId
    const permission = req.params.permission

    if (!userId && !permission)
        return res.send(JSON.stringify({
            result: 'error'
        })).end()

    //    console.log(`This userId ${userId} query edit to ** ${key} ** for  ** ${value} **.`);

    get(userId).then(data => {
        if (!data)
            return res.send(JSON.stringify({
                result: 'error'
            })).end()
            
        const user = User.valueOf(userId, data)
        if (user.hasPermissions(permission))
            return res.send(JSON.stringify({
                result: 'ok'
            })).end()
        else
            return res.send(JSON.stringify({
                result: 'error'
            })).end()
    })
}

module.exports = {
    userPermissions
}
