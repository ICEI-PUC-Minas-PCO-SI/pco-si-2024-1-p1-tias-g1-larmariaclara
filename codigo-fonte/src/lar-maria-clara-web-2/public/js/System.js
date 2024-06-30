function unsubmit(){
    var buttons = document.querySelectorAll('button')
    buttons.forEach(function(button){
        button.type = "button"
    })
}

function onloads(){
    var loads = pit('[data-load]').all()
    loads.forEach(function(item){
        var dataLoad = item.attr('data-load')
        var [ prop ] = dataLoad.split('/')
        var url = dataLoad.replace(prop, '')
        var extention = url.split('.').pop();
        var path = url.replace('.' + extention, '')

        var uri = concat(path, '?type=.', extention)
        console.log(uri)
        item.attr(prop, uri)
    })
}