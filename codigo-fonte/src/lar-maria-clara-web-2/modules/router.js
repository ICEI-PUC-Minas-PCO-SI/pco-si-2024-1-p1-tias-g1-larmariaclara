const fs = require('fs');
const path = require('path');

function getController(controllerPaths, controller){
    var controllerName = ''
    for (let i = 0; i < controllerPaths.length; i++) {
        var controllerPath = app.concat(controllerPaths[i], controller);
        if(fs.existsSync(controllerPath)){
            controllerName = controllerPath
            break
        }
    }

    return controllerName
}

module.exports.router = function(){
    var url = app.request.url
  
    var [ _, controller, method, params ] = url.split('/')
    var response = new Object()

    if(!controller){
        return { name: 'Home' }
    }

    controller = controller.capitalize()
    var viewPath = app.searchView(controller) 

    if(viewPath && app.compare(app.request.method, 'GET')){
        return { viewPath }
    }
    
    var controllerName = getController([
        path.join(__dirname, '../', app.PROJECT_PATH, `app/Controllers/`),
        path.join(__dirname, '../app/Controllers/'),
    ], app.concat(controller.capitalize(), 'Control.js'))
    
    if(fs.existsSync(controllerName)){
        response.controller = controllerName
    }
    
    response.method = method ? method.capitalize() : '' 
    response.params = params ? params : []
  
    app.viewName = `${response.method}${controller}`
    return response
}