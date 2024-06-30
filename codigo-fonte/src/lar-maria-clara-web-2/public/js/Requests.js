
function newForm(){
    var form = pit('#form').get()
    var formData = new FormData(form)

    return formData;
}

function Request(){

}

Request.prototype.success = function(response, inputs){
    OpenSm(response.success, 'success')
    for (let i = 0; i < inputs.length; i++) {
        var input = inputs[i]
        if(!['hidden', 'date'].includes(input.type) && !input.attr('no-update')){
            inputs[i].value = ''
        }
    }    
}

Request.prototype.error = function(response, inputs){
    OpenSm(response.error, 'error')
    for (let i = 0; i < inputs.length; i++) {
        var input = inputs[i]
        if(!input.value) {
            input.classList.add('input-error')
            input.addEventListener('click', function(){
                this.classList.remove('input-error')
            })
        }
    }    
}

Request.prototype.post = async function(url, headers){
    var formData = newForm()
    var inputs = pit('input').all();

    console.log(Object.assign(
        {}, getHead(), 
        headers
    ))
    var request = await fetch(url, {
        method: 'POST',
        headers: Object.assign(
            {}, getHead(), 
            headers
        ),
        body: formData
    })

    var response = await request.json()

    response.success ? this.success(response, inputs) : null
    response.error ? this.error(response, inputs) : null
    response.token ? storage.set('token', response.token) : null

    return response
}

async function mr(url, tableName){
    var request = new Request()

    var response = await request.post(url, {
        'x-table': tableName
    })

    return response
}

async function mr_delete(url, tableName, removeArray){
    var request = new Request()

    var response = await request.post(url, {
        'x-table': tableName,
        'x-array': fromJson(removeArray)
    })

    return response
}

async function mr_search(url, tableName, search, callback){
    var request = new Request()

    var response = await request.post(url, {
        'x-table': tableName,
        'x-search': search
    })

    callback(response)
}