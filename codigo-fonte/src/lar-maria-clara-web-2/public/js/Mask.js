
function MaskGeneral(...configs){
    // search, maxlength, placeholder, oninput
    var ps = document.querySelectorAll('p');

    configs.forEach(function(config) {
        var { search, maxlength, placeholder, oninput } = config;

        for (let i = 0; i < ps.length; i++) {
            var p = ps[i];
            var pContent = p.textContent.toLowerCase();
            if (!pContent.includes(search.toLowerCase())) {
                continue;
            }

            var input = p.nextElementSibling;
            if (!input || input.tagName != 'INPUT') {
                continue
            }

            input.maxLength = maxlength;
            input.placeholder = placeholder;
            input.oninput = function() { oninput(input) };
        }

        // -
    })
}

function MaskDate(e){
    var m = e.value
    if(m.length == 2){
        e.value += '/'
    }

    if(m.length == 5){
        e.value += '/'
    }
}

function CPFMask(e){
    var value = e.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value.length > 3) {
            value = value.substring(0, 3) + '.' + value.substring(3);
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + '.' + value.substring(7);
        }
        if (value.length > 11) {
            value = value.substring(0, 11) + '-' + value.substring(11, 13);
        }
    }

    e.value = value;
}

function PhoneMask(input) {
    var value = input.value
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    input.value = value
}

function CNPJMask(input){
    let valor = input.value.replace(/\D/g, '');
    let formatado = '';

    if (valor.length > 0) {
        formatado = `${valor.substring(0, 2)}`;
    }
    if (valor.length > 2) {
        formatado += `.${valor.substring(2, 5)}`;
    }
    if (valor.length > 5) {
        formatado += `.${valor.substring(5, 8)}`;
    }
    if (valor.length > 8) {
        formatado += `/${valor.substring(8, 12)}`;
    }
    if (valor.length > 12) {
        formatado += `-${valor.substring(12, 14)}`;
    }

    input.value = formatado;
}

function RGMask(e) {
    var value = e.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value.length > 2) {
            value = value.substring(0, 2) + '.' + value.substring(2);
        }
        if (value.length > 6) {
            value = value.substring(0, 6) + '.' + value.substring(6); 
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10, 11); 
        }
    }

    e.value = value;
}