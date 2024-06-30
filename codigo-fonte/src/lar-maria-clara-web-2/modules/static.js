var fs = require('fs');
var path = require('path');
var url_mod = require('url');

function getURL(request){
    var url = url_mod.parse(request.url);
    return url.pathname;
}

function isPublic(url){
    const targets = [
        path.join(__dirname, '../', app.PROJECT_PATH, '/public', url),
        path.join(__dirname, '../public', url)
    ];

    const staticFile = targets.find(target => fs.existsSync(target));
    return staticFile || '';
}

module.exports.static = function(){
    var { response, request } = app

    var url = getURL(request);
    var static_file = isPublic(url)

    if(!static_file){
        response.writeHead(404, {'Content-Type': 'text/plain'});
        return response.end('404 Not Found');
    }

    const accept = request.headers['accept'] || 'application/octet-stream';
    response.writeHead(200, {'Content-Type': accept});

    fs.createReadStream(static_file).pipe(response);
}