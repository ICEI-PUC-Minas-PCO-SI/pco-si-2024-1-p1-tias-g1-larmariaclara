const { v4: uuidv4 } = require('uuid');

const sensiveColumns = [
    'password',  'senha', 
    'credit_card_info'
]

function sensiveFields(items, fieldsToRemove) {
    return items.map(item => {
        fieldsToRemove.forEach(field => {
            delete item[field];
        });

        return item;
    });
}

async function passCrud(db, request){
    var token = await app.VerifyToken(request);
    console.log(1)
    if(app.compare(token.error, 'SERVICE') && token.error){
        console.log(2)
        return app.ACESSO_NEGADO
    }
    
    var tableName = request.headers['x-table'];
    console.log(3)
    var permType = app.configApp[token.type] 
    
    if(!app.compare(token.error, 'UNSERVICE')){
        console.log(4)
        if(!permType){
            console.log(5)
            return app.ACESSO_NEGADO
        }

        console.log(6)
        var permRead = permType['READ']
        if(!permRead.includes(tableName)){
            console.log(7)
            return app.ACESSO_NEGADO
        }
    }

    var [ checker ] = await db.raw(`
    SELECT 1 AS check_table
    WHERE EXISTS (
        SELECT *
        FROM information_schema.tables
        WHERE table_schema = DATABASE()
        AND table_name = ?
    )`, [ tableName ]);

    if (!checker.length){
        console.log(10)
        return app.ACESSO_NEGADO
    }

    return app.NOERROR
}

module.exports.Create = async function({ db, request, response }){
    var passcrud = await passCrud(db, request)
    if(passcrud.error){
        return response.error(passcrud)
    }
    
    var tableName = request.headers['x-table'];
    const { fields, files } = await request.post()

    if(fields.error){
        return response.error(app.PREENCHA_TUDO)
    }

    // const photo = await app.upload(files, 'moFoto')
    // if(photo.error){
    //     return response.error(app.ARQUIVO_VAZIO)
    // }

    // fields.foto = photo

    fields.delete_row = 0
    fields.updated_hash = uuidv4()

    var token = await app.VerifyToken(request);
    if(!app.compare(token.error, 'UNSERVICE')){
        fields.ownid = token.id
    }
    
    await db.table(tableName).insert(fields)
    return response.maked()
}

module.exports.Update = async function({ db, request, response }){
    console.log(2)
    var passcrud = await passCrud(db, request)
    if(passcrud.error){
        return response.error(passcrud)
    }
    console.log(1)
    var tableName = request.headers['x-table'];
    const { fields, files } = await request.post()

    if(fields.error){
        return response.error(app.PREENCHA_TUDO)
    }

    console.log(3)
    // const photo = await app.upload(files, 'moFoto')
    // if(photo.error){
    //     return response.error(app.ARQUIVO_VAZIO)
    // }

    console.log(6)
    // fields.foto = photo
    console.log(tableName)
    console.log(fields)
    await db.table(tableName).update(fields).where({ updated_hash: fields.updated_hash })
    return response.maked()
}

module.exports.Read = async function({ db, request, response }){
    var passcrud = await passCrud(db, request)
    if(passcrud.error){
        return response.error(passcrud)
    }
    
    var tableName = request.headers['x-table'];

    var page = await request.getItem('page')
    page = !page ? 1 : parseInt(page)

    var offset = (page - 1) * page;

    let query = db.select('*')
        .from(tableName)
        .where({ delete_row: 0 })
        .orderBy('id', 'desc').limit(20)
        .offset(offset);

    var search = request.headers['x-search'];
    if(search){
        const columns = await db(tableName).columnInfo();
        const searchColumns = Object.keys(columns).filter(column => !sensiveColumns.includes(column));
        
        query.where(function() {
            searchColumns.forEach(column => {
                this.orWhereRaw(`${column} LIKE ?`, [`%${search}%`]);
            })
        })
        
        // --
    }

    
    results = await query;

    results = sensiveFields(results, sensiveColumns)
    return response.json(results)
}

module.exports.Delete = async function({ db, request, response }){
    var passcrud = await passCrud(db, request)
    if(passcrud.error){
        return response.error(passcrud)
    }

    var tableName = request.headers['x-table'];
    var removeArray = request.headers['x-array'];

    removeArray = !removeArray ? [] : app.toJson(removeArray)

    console.log(tableName)
    await db.table(tableName)
        .update('delete_row', 1)
        .whereIn('updated_hash', removeArray)

    return response.maked()
}