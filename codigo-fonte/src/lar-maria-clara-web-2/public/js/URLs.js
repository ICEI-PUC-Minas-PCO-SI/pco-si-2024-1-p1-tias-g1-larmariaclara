

function reload(){
	location.reload()
}

function to(a){
	location.href = a
}

function getParams(url) {
    var params = url.split('?')[1]
    if (!params) {
        return {}
    }

    var paramsArray = params.split('&')
    var paramsJSON = {};

    for (const param of paramsArray) {
        const [chave, valor] = param.split('=')
        paramsJSON[chave] = valor
    }

    return paramsJSON
}


