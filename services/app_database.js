const MySQL = require('mysql-database');
const database = new MySQL();
const config = require('../db.config.json')

var connection

async function reader(read = () => { }) {
    connection = await database.connect({
        host: config.props.host,
        port: config.props.port,
        product: config.props.product,
        password: config.props.password,
        database: config.props.database
    });

    connection.on('connected', function (con) {
        console.log('[API] Biblioteca de dados aberta');
        console.log('[API] Agrupando dados...');
        connection.create(config.app_table)
        loadCache().then(() => {
            read()
        })
    })
}

async function update(product) {
    try {
        if (!product && !('productId' in product))
            return;

        await connection.base_set(config.app_table, product['productId'], JSON.stringify(product));
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return undefined
    }
}

function hasProduct(product) {
    try {
        if (!product && !('productId' in product))
            return false
        const response = await get(product.productId)
        return !!response
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return true
    }
}

async function get(productId) {
    try {
        if (!productId)
            return;

        if (productId.toString('uft8').includes('@gmail.com'))
            productId = await searchId(productId)
        if (productId.toString('uft8').includes('@gmail.com') || !productId)
            return undefined


        const response = await connection.base_get(config.app_table, `${productId.toString('utf8')}`);
        return JSON.parse(response)
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return undefined
    }
}

async function dump(productId) {
    try {
        if (!productId)
            return;

        await connection.delete(config.app_table, `${productId}`);
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
    }
}


async function products() {
    try {
        const response = await connection.all(config.app_table);
        const db = []

        for (const data of response)
            db.push(data)

        return db
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return undefined
    }
}


module.exports = {
    update,
    get,
    reader,
    dump,
    hasProduct,
    products
}