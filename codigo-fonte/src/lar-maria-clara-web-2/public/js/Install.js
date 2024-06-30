function beforeInstall(event){
    var install = pit('#INSTALLAPP');
    install.removeClass('h')
    if(install){
        install.on('click', function() {
            event.prompt();
        })
    }
}