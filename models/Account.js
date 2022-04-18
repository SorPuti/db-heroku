var clazz = class Account {
    constructor(number, password, productId, amount, date) {
        this.setup(number, password, productId, amount, date)
    }

    setup(number, password, productId, amount, date) {
        this.number = (number ? number : undefined)
        this.password = (password ? password : undefined)
        this.productId = (productId ? productId : -1)
        this.amount = (amount ? amount : -1)
        this.date = (date ? date : new Date().toLocaleDateString())
    }


    static valueOf(json) {
        const account = new Account()
        if (json)
            account.setup(json['number'], json['password'], json['productId'], json['amount'])
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