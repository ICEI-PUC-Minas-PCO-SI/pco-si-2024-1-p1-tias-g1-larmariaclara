
const prefix = 'mo'

module.exports.Novo = async function({ response, request, db }){
    // const token = await app.VerifyToken(request);
    // if(token.error){
    //     return response.error(app.ACESSO_NEGADO)
    // }else if(!app.compare(token.type, 'admin')){

    // }

    const { fields, files } = await request.post(prefix)
    if(fields.error){
        return response.error(app.PREENCHA_TUDO)
    }

    const photo = await app.upload(files, 'moFoto')
    if(photo.error){
        return response.error(app.ARQUIVO_VAZIO)
    }

    fields.foto = photo
    await db.table('moradores').insert(fields)

    return response.maked()
}

module.exports.Todos = async function({ response, request, db }){
    console.log(app.configJson)
    // const token = await app.VerifyToken(request);
    // if(token.error){
    //     return response.error(app.ACESSO_NEGADO)
    // }

    const [ moradores ] = await db.raw('SELECT * FROM moradores ORDER BY id DESC LIMIT 10 OFFSET 0')
    return response.json(moradores)
}