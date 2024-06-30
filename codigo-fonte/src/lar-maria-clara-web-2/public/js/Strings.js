
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function genKey(){
    var reg = Math.floor(10 * Math.random()).toString()

    reg += Math.floor(10 * Math.random())
    reg += Math.floor(10 * Math.random())
    reg += Math.floor(10 * Math.random())
    reg += Math.floor(10 * Math.random())
    reg += Math.floor(10 * Math.random())
    reg += Math.floor(10 * Math.random())

    return reg
}

function isArray(item){
    return Array.isArray(item)
}

function concat(...array){
    var string = '';

    for (let i = 0; i < array.length; i++) {
        string += array[i]
    }

    return string
}

function CopyText(text){
    var dummy = document.createElement('input');
    dummy.type = 'text'
    dummy.value = text
    dummy.style = "position: absolute; left: -1000px; top: -1000px";

    document.body.appendChild(dummy);


    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        dummy.contentEditable = true;
        dummy.readOnly = true;

        var range = document.createRange();
        range.selectNodeContents(dummy);

        var selection = window.getSelection();

        selection.removeAllRanges();

        selection.addRange(range);

        el.setSelectionRange(0, 999999);

    }else {
        dummy.select();
    }

    document.execCommand("copy");

    document.body.removeChild(dummy);
    OpenSm('Copiado com sucesso!', 'success');
}