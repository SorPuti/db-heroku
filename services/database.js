const MySQL = require('mysql-database');
const database = new MySQL();
const config = require('../db.config.json')

let emailsCache = null
var connection

async function loadCache() {
    emailsCache = new Map()
    const listUsers = await users()
    if (!listUsers)
        return;
    for (const user of listUsers)
        emailsCache.set(user.user['email'], user.userId)

    console.log(`[API] Armazenamento de curto prazo carregada(${emailsCache.size}/contas)`);
}

async function searchId(email) {
    if (!email)
        return undefined

    try {
        return emailsCache.get(email.toString('utf8'))
    } catch (error) {
        return undefined
    }
}

async function reader(read = () => { }) {
    connection = await database.connect({
        host: config.props.host,
        port: config.props.port,
        user: config.props.user,
        password: config.props.password,
        database: config.props.database
    });

    connection.on('connected', function (con) {
        console.log('[API] Biblioteca de dados aberta');
        console.log('[API] Agrupando dados...');
        connection.create(config.table)
        loadCache().then(() => {
            read()
        })
    })
}

async function update(user) {
    try {
        if (!user && !user.userId)
            return;
        const response = Boolean(emailsCache.has(user['user'].email));
        if (!response)
            emailsCache.set(user.user['email'], user['userId'])

        await connection.base_set(config.table, user['userId'], JSON.stringify(user));
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return undefined
    }
}

function hasUser(user) {
    try {
        const response = Boolean(emailsCache.has(user['user'].email))
        return response
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return true
    }
}

async function get(userId) {
    try {
        if (!userId)
            return;

        if (userId.toString('uft8').includes('@gmail.com'))
            userId = await searchId(userId)
        if (userId.toString('uft8').includes('@gmail.com') || !userId)
            return undefined


        const response = await connection.base_get(config.table, `${userId.toString('utf8')}`);
        return JSON.parse(response)
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return undefined
    }
}

async function dump(userId) {
    try {
        if (!userId)
            return;

        if (userId.toString('uft8').includes('@gmail.com'))
            userId = await searchId(userId)
        if (userId.toString('uft8').includes('@gmail.com') || !userId)
            return undefined

        const data = await get(userId)
        const response = Boolean(emailsCache.has(data['user'].email));
        if (response)
            emailsCache.delete(data['user'].email)

        await connection.delete(config.table, `${userId}`);
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
    }
}

async function users() {
    try {
        const response = await all();
        const users = []
        for (const userId of response) {
            console.log(userId)
            const user = await get(userId)
            if (user)
                users.push(user)
        }
        return users
    } catch (error) {
        console.log('Falha ao recebe requisição, mensagem: ' + error);
        return undefined
    }
}

async function all() {
    try {
        const response = await connection.all(config.table);
        const db = []

        for (const data of response)
            db.push(data.ID)

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
    all,
    users,
    dump,
    hasUser
}