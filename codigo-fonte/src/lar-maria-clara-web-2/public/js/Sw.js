function swInstall(){
    if(navigator.serviceWorker){
        navigator.serviceWorker.register('/sw.cache.js')
    }
}