async function Moradores(moradores){
    if(!moradores){
        moradores = await mr('/res/read', 'moradores')
    }
 
    var table = new Table()
    session.setJson('moradores', moradores)
    for (let i = 0; i < moradores.length; i++) {
        var m = moradores[i];
        table.addRow([
            `<input type="checkbox" data-id="${m.id}" json-id="${i}" json-hash="${m.updated_hash}" line-id="${i + 1}">`,
            m.nome, 
            brData(m.created_at),
            m.nomecurador,
            '47'
        ])

        // -
    }
}

