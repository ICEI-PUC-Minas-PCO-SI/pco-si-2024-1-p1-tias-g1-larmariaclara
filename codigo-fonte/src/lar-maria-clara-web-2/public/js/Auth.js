async function Auth(){
	var token = getToken()
	return
    var pathname = location.pathname
	if(!token){
		return !pathname.includes('/login') ? to('/login') : null
	}

	var { error } = await mr('/auth/check')
	if(error){
		return !pathname.includes('/login') ? to('/login') : null
	}

	pit('#app').show()

	var token = UserObtain()
	UserView(token)
}

async function AuthLogin(){
	var { error } = await mr('/auth/login')
	if(error) return

	to('/')
}

function AuthQuit(){
	storage.set('token', '')
	to('/login')
}