const nginx = require('http');
const formidable = require('formidable');

function formCheck(form){
    var payload = new Object();
    var prefix = form.prefix
    
    if(prefix){
        var prefixLength = prefix[0].length;
        delete form['prefix']
    
        for (const key in form) {
            if (key.startsWith(prefix)) {
                var newKey = key.slice(prefixLength).toLowerCase();
                payload[newKey] = form[key][0] ? 
                    form[key][0].trim() 
                        : null;
            }
        }

        return payload;
    }

    for (const key in form) {
        payload[key] = form[key][0] ? 
        form[key][0].trim() 
            : null;
    }
    

    console.log(payload)

    return payload;
}

nginx.IncomingMessage.prototype.post = function() {
    const promise = new Promise((resolv, reject) => {
        const form = new formidable.IncomingForm({
            allowEmptyFiles: true,
            minFileSize: 0
        });
        
        form.parse(this, (error, fields, files) => {
            if(error){
                return reject({ });
            }

            fields = formCheck(fields)
            resolv({ fields, files });
        })

        // --
    })

    return promise
};

nginx.IncomingMessage.prototype.getItem = function(key) {
    const promise = new Promise((resolv, reject) => {
        const form = new formidable.IncomingForm({
            allowEmptyFiles: true,
            minFileSize: 0
        });
        
        form.parse(this, (error, fields, _) => {
            if(error){
                return reject({ });
            }

            page = fields[key]
            if(!page){
                return resolv('');
            }

            resolv(page[0]);
        })

        // --
    })

    return promise
};

nginx.ServerResponse.prototype.status = function(statusCode) {
    this.statusCode = statusCode;
    return this;
};

nginx.ServerResponse.prototype.json = function(data) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data));
};

nginx.ServerResponse.prototype.error = function (json) {
    return this.status(500).json(json)
};

nginx.ServerResponse.prototype.maked = function (json = new Object()) {
    json.success = 'Feito'
    return this.status(200).json(json);
};

module.exports.nginx = nginx.createServer

