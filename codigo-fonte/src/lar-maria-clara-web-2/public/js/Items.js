
function Next(open, close, managerClass){
	pit(open).show()
	pit(close).close()

    if(managerClass){
        pit('.manager-item').close() 
        pit(managerClass).show() 
    }
}

function getID(elemento) {
    var parent = elemento.parentElement;

    while (parent) {
        if (parent.id) return '#' + parent.id
        parent = parent.parentElement;
    }

    return null
}

async function ViewItems(url, prefix, payload){
    var items = Array.isArray(url) ? url : await mr(url)
    if(items.error){
        return
    }

    var html = [];
    for (let i = 0; i < items.length; i++) {
        var item = items[i];
        var ITEM_CREATE = cap('#ITEM_CREATE').html();

        for (let j = 0; j < payload.length; j++) {
            var { regex, key } = payload[j];
            ITEM_CREATE = ITEM_CREATE.replace(regex, item[key]);
        }

        if(compare('active', item.status)){
            ITEM_CREATE = ITEM_CREATE.replace(/ITEM_STATUS/g, 'ATIVO');
            ITEM_CREATE = ITEM_CREATE.replace(/ITEM_CLASS_STATUS/g, 'active');
        }else if(compare('unnative', item.status)){
            ITEM_CREATE = ITEM_CREATE.replace(/ITEM_STATUS/g, 'INATIVO');
            ITEM_CREATE = ITEM_CREATE.replace(/ITEM_CLASS_STATUS/g, 'unactive');
        }else{
            ITEM_CREATE = ITEM_CREATE.replace(/ITEM_STATUS/g, 'PENDENTE');
            ITEM_CREATE = ITEM_CREATE.replace(/ITEM_CLASS_STATUS/g, 'pedding');
        }

        ITEM_CREATE = ITEM_CREATE.replace(/BS64/g, b64_encode(item));
        ITEM_CREATE = ITEM_CREATE.replace(/PREFIX/g, prefix);

        html.push(ITEM_CREATE);
    }

    cap('#ITEM_GAIN').html(html.join(''));
}

function PrepareItems(items, prefix){
    inputsFromObject(items, prefix);

    Next('#ITEM_NEW', '#ITEM_APP', '.update-item')
}

