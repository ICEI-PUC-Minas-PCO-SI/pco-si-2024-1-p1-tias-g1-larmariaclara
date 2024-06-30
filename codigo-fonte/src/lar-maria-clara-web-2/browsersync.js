const browserSync = require('browser-sync').create();

require('dotenv').config();
const [ _, PORT ] = process.env.PROJECT_HOST.split(':')

const projectName = process.env.PROJECT_PATH

browserSync.init({
    proxy: '127.0.0.1:8000',
    files: [
        './modules/**/*.*',
        './public/**/*.*', 
        './server.js',
        './resources/*',
        `${projectName}/**/*.*`,
        `!${projectName}/node_modules/**` 
    ],
    ignore: ['node_modules'],    // Ignora a pasta node_modules
    injectChanges: true,         // Injeta mudanças de CSS e JS sem recarregar a página
    reloadDelay: 0,
    notify: false,
    port: 3001 
})