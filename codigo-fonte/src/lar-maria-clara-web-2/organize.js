
var fs = require('fs')
var chokidar = require('chokidar');
const cheerio = require('cheerio');

var { db, excreateTable } = require('./modules/db.js');

require('dotenv').config();
const [ _, PORT ] = process.env.PROJECT_HOST.split(':')

const projectName = process.env.PROJECT_PATH
function Prepare() {

}

Prepare.prototype.init = function(viewsArray, savePath, codeClean = true) {
    for (let i = 0; i < viewsArray.length; i++) {
        const viewArray = viewsArray[i];
        fs.watch(viewArray, { encoding: 'utf-8' }, (eventType, filename) => {
            if (['change'].includes(eventType)) {
                this.run(filename, viewsArray, savePath, codeClean);
            }
        })
    }
}

Prepare.prototype.run = async function(filename, viewsArray, savePath, codeClean) {
    var content = '';
    for (let j = 0; j < viewsArray.length; j++) {
        var viewPath =  viewsArray[j]
        var files = fs.readdirSync(viewPath);
        for (let i = 0; i < files.length; i++) {
            content += '\n\n' + fs.readFileSync(viewPath + files[i]);
        }
    }

    if(codeClean && filename.includes('css')){
        content = content.replace(/\/\*[\s\S]*?\*\//g, '');
        content = content.replace(/\s*([{};:,])\s*/g, '$1').trim();
        content = content.replace(/;}/g, '}')
    }

    fs.writeFileSync(savePath, content);
    console.log('\x1b[36m%s\x1b[0m', '---[+] STATIC: ', '[+] Javascript :: Update building in build/app.js from ' + filename);
}

Prepare.prototype.migrations = function(){
    const pathname = `${projectName}/migrations`
    fs.watch(pathname, { encoding: 'utf-8' }, (eventType, filename) => {
        if (['change'].includes(eventType)) {
            const [ tableName ] = filename.split('.')
            const columnsName = fs.readFileSync(`${pathname}/${filename}`, 'utf-8')

            excreateTable(tableName, columnsName)
            console.log('\x1b[31m%s\x1b[0m', '---[+] MIGRATIONS: ', filename, 'Migrations updated')
        }

        // ...
    })
}

Prepare.prototype.views = function(){
    var watcher = chokidar.watch(projectName + '/views', {
        ignored: /[\/\\]\./,
        persistent: true,
        ignoreInitial: false,
        usePolling: true
    })

    watcher.on('change', function(pathname){
        const viewContent = fs.readFileSync(pathname, 'utf-8')
        if(!viewContent.includes('migrate')){
            return;
        }

        const $ = cheerio.load(viewContent);
        const inputNames = [];
    
        const prefix = $('input[name="prefix"]').val();
        const migrate = $('input[name="migrate"]').val();

        $('input, select, textarea').each(function(_, element) {
            var inputName = $(element).attr('name');
            if (inputName && inputName.startsWith(prefix)) {

                inputName = inputName.replace(prefix, '')
                inputName = inputName.toLowerCase()

                inputNames.push(inputName);
            }
        })
        
       
        var columns = inputNames.filter(item => !item.includes('hash'))
        fs.writeFileSync(`${projectName}/migrations/${migrate}.migration`, columns.join('\n'))
    })
}

var prepare = new Prepare();

prepare.init(
    [
        projectName + '/public/css/', 
        './public/css/'
    ], 
    projectName + '/public/build/app.min.css'
)

prepare.init(
    [ 
        projectName + '/public/js/', 
        './public/js/' 
    ], 
    projectName + '/public/build/app.min.js'
)


prepare.migrations()
prepare.views()
