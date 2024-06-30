function parseDate(numero) {
    return numero < 10 ? '0' + numero : numero;
}

function brData(dataISO) {
    var data = new Date(dataISO); 

    var dia = parseDate(data.getDate()); 
    var mes = parseDate(data.getMonth() + 1); 
    var ano = data.getFullYear(); 

    var dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
}
