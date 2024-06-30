const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

function searchView(name) {
    var view = null;
    var name = app.concat(name, '.ejs')
    var base = path.join(__dirname, '../', app.PROJECT_PATH, 'views')

    function search(pathname) {
        if (view) return;
        fs.readdirSync(pathname).forEach(file => {
            const completed = path.join(pathname, file);
            if (fs.statSync(completed).isDirectory()) {
                search(completed);
            } else if (file === name) {
                view = completed;
            }
        })

        // --
    }

    search(base);
    return view;
}

function callbackView(input){
    var name = input.split(/[/\\]/).pop().split('.')[0];
    var templateFunction = fs.readFileSync('./resources/newFunction.js', 'utf-8')
    var templatePathname = path.join(__dirname, '../', app.PROJECT_PATH, `public/js/${name}.js`)

    templateFunction = templateFunction.replace(/FUNNAME/g, name)

    if(!fs.existsSync(templatePathname)){
        fs.writeFileSync(templatePathname, templateFunction)
    }

    return app.concat(name, '()')
}

function viewLoad({ name, viewPath }){
    var response = app.response
    var view = ''

    if(!viewPath){
        var view = searchView(name)
        if(!view){
            return console.log('[!] View não encontrada: ', name, view)
        }
    }else{
        view = viewPath
    }

    var content = fs.readFileSync('./resources/Server.ejs', 'utf-8')
    var appTemplate = path.join(__dirname, '../', app.PROJECT_PATH, `views/Template.ejs`)

    var rendered = ejs.render(content, {
        appTemplate, callback: callbackView(name || viewPath), view
    })

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(rendered);
}

module.exports.viewLoad = viewLoad
module.exports.searchView = searchView