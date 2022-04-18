const Account = require('./Account')
const { isPermissions } = require('./Permissions')

var clazz = class User {
    constructor(userId) {
        this.userId = userId
        this.setup()
    }

    static valueOf(userId, json) {
        if (!userId)
            return null
        const user = new User(userId)
        if (json) {
            user.setup(json.user['firstName'], json.user['email'], [], json['password'])
            for (const account of json.user.async_accounts)
                user.add(Account.valueOf(account))
        } else
            user.setup()
        return user
    }

    key(key, value) {
        if (this.user[key])
            this.user[key] = value
    }


    setAccountLevel(account_level) {
        this.user.account_level = account_level
    }
    
    setup(firstName, email, async_accounts, password) {
        this.password = (password ? password : '123456')
        this.user = {
            account_level: 'VIP1',
            firstName: (firstName ? firstName : undefined),
            email: (email ? email : undefined),
            async_accounts: (async_accounts ? async_accounts : []),
            permissions: [
                'home_view:routes.home',
                'login_view:routes.login',
                'edit_account:user.editaccount'
            ]
        }
    }

    hasPermissions(permission) {

        if (permission && isPermissions(permission))
            return this.user.permissions.includes(permission)
        else
            return undefined
    }

    editPermissions(permission) {
        if (this.hasPermissions(permission))
            return;

        this.user.permissions.push(permission)
    }

    removePermissions(permission) {
        if (this.hasPermissions(permission))
            return;

        this.user.permissions.splice(permission, 1)
    }

    add(account) {
        this.user.async_accounts.push(account)
    }

    async remove(accountId) {
        const account = await this.search(accountId)
        if (account)
            this.user.async_accounts.splice(account, 1)
    }

    async search(accountId) {
        return new Promise(resolve => {
            for (const account of this.user.async_accounts)
                if (account.accountId == accountId)
                    resolve(account)
        })
    }
}

module.exports = clazz