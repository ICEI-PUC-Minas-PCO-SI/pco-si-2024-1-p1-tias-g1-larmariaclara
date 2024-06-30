const jwt = require('jsonwebtoken');
const JWT_SECRET = 'FUIMORAREMMARTEEM2026X'

const getToken = function(request){
    return {
        auth: request.headers['x-secsenv-auth'],
        token: request.headers['x-secsenv-token']
    }
}

module.exports.CreateToken = function(payload){
    const token = new Object()
    const props = Object.getOwnPropertyNames(payload);
    const forbiden = ['token', 'senha']

    for (const prop of props) {
        if (!forbiden.includes(prop)) {
            token[prop] = payload[prop]
        }
    }

    return jwt.sign(token, JWT_SECRET, { expiresIn: 5 * 60 * 60})
}

module.exports.VerifyToken = async function(request){
    const { token, auth } = getToken(request)
    if(app.compare(auth, 'UNSERVICE')){
        return { error: 'UNSERVICE' }
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET)
        return payload
    } catch (error) {
        return { error: 'Token invalido.' }
    }
}

module.exports.CheckToken = function(){
    return jwt.sign({ id: 5 }, JWT_SECRET, { expiresIn: 5 * 60 * 60})
}
