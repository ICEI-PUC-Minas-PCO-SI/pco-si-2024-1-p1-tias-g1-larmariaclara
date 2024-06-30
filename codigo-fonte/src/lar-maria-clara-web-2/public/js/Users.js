
function UserObtain(){
    var token = getToken()
    if(!token){
        return {}
    }

    return parseJwt(token)
}
