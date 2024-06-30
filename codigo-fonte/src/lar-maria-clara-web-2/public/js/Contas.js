async function Contas(items){
    if(!items){
        items = await mr('/res/read', 'users')
    }

    var table = new Table()
    session.setJson('items', items)

    for (let i = 0; i < items.length; i++) {
        var m = items[i];
        table.addRow([
            `<input type="checkbox" data-id="${m.id}" json-id="${i}" json-hash="${m.updated_hash}" line-id="${i + 1}">`,
            m.nome, 
            brData(m.created_at),
            m.tipo,
        ])

        // -
    }
}