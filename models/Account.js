var clazz = class Account {
    constructor(accountId) {
        this.accountId = accountId
        this.setup()
    }

    setup(number, password, was_investor) {
        this.props = {
            number: (number ? number : undefined),
            password: (password ? password : undefined),
            was_investor: (was_investor ? was_investor : 1000)
        }
    }


    static valueOf(accountId, json) {
        const account = new Account(accountId.accountId)
        if (json)
            account.setup(json['number'], json['password'], json['was_investor'])
        else
            account.setup()

        return account
    }
    getNumber() {
        return this.props.number
    }

    getWasInvestor() {
        return this.props.was_investor
    }

    getAccountID() {
        return this.accountId
    }
}

module.exports = clazz