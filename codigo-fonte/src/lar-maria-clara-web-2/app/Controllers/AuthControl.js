module.exports.Login = async function({ response, request, db }){
    const payload = await request.post('Login')
    const [ profile ] = await db.select('*').from('users').where(payload)

    if(!profile){
        return response.error(app.CONTA_ENEXISTENTE)
    }

    const token = app.CreateToken(profile)
    return response.maked({ token })
}

module.exports.Check = async function({ response, request }){
    const token = await app.VerifyToken(request);
    if(token.error){
        return response.error(app.ACESSO_NEGADO)
    }

    return response.maked()
}
