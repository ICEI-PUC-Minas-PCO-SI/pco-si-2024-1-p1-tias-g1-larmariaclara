const fs = require('fs');
require('dotenv').config();

global.app = new Object()
Object.assign(global.app, process.env)

function autoLoad(){
    const modules = fs.readdirSync('./modules')

    for (let i = 0; i < modules.length; i++) {
        const module = modules[i]
        if(!module.includes('.js')){
            continue
        }

        const mLoad = require(`./modules/${module}`)
        Object.assign(global.app, mLoad)
    }
}

autoLoad()
const server = app.nginx(function(request, response) {
    app.request = request
    app.response = response

    var route = app.router()
    
    if(route.name || route.viewPath){
        return app.viewLoad(route)
    }else if(route.controller && route.method){
        const method = route.method
        const controller = require(route.controller)
        if(controller[method]){
            return controller[method](app)
        }
    }else if(request.url.includes('.')){
        return app.static()
    }

    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 Not Found');
});


const [ IP, PORT ] = app.PROJECT_HOST.split(':')

server.listen(PORT, IP, () => {
    console.log(`Run: ${app.PROJECT_HOST}`);
});