
function getToken(){
    return storage.get('token') ? storage.get('token') : ''
}

function parseJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getHead(){
    return {
        'x-secsenv-auth': window.AUTH,
        'x-secsenv-token': getToken()
    }
}

function TokenDestory(){
    storage.set('token', '')
    session.set('auth', '')

    location.reload()
}
