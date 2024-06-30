async function Contasbancarias(items){
    if(!items){
        items = await mr('/res/read', 'moradores')
    }

    session.setJson('items', items)

    /* COM TABLEAS */
    var table = new Table()
    for (let i = 0; i < items.length; i++) {
        var m = items[i];
        table.addRow([
            `<input type="checkbox" data-id="${m.id}" json-id="${i}" json-hash="${m.updated_hash}" line-id="${i + 1}">`,
            m.conta, 
            m.agencia, 
            m.banco
        ])

        // -
    }
}

