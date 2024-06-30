
function Callback(){
    var callbaks = pit('[callback]').all();

    for (let i = 0; i < callbaks.length; i++) {
        var callback = callbaks[i]
        eval(callback.getAttribute('callback'))
    }
}

