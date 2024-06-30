

function Donwload(uri, name){
    var link = document.createElement("a");

    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

function compare(v1, v2){
    return v1 == v2
}
