window.sw = null
window.production = location.protocol.includes('https') ? true : false;
window.addEventListener('load', function(){    
    define('mt', 'marginTop')
    define('hd', 'height')
    define('ml', 'marginLeft')
    define('mr', 'marginRight')
    define('mb', 'marginBottom')
    define('wd', 'width', '%')
    define('wp', 'width', 'px')
    define('he', 'width', 'px')
    define('hp', 'width', '%')
    define('br', 'borderRadius', 'px')
    define('bp', 'borderRadius', '%')
    define('pd', 'padding')
    define('pl', 'paddingLeft')
    define('pt', 'paddingTop')
    define('pb', 'paddingBottom')
    define('pr', 'paddingRight')
    define('fs', 'fontSize', 'em')
    define('tr', 'transition', 's')
    define('ls', 'letterSpacing', 'px')

    Callback()
    processInputs()

    MaskGeneral(
        { search: 'cpf', maxlength: 14, placeholder: '000.000.000-00', oninput: CPFMask },
        { search: 'data', maxlength: 10, placeholder: '00/00/0000', oninput: MaskDate },
        { search: 'telefone', maxlength: 15, placeholder: '(00) 00000-0000', oninput: PhoneMask },
        { search: 'rg', maxlength: 12, placeholder: '00.000.000-0', oninput: RGMask },
        { search: 'cnpj', maxlength: 18, placeholder: '00.000.000/0000-00', oninput: CNPJMask },
    )

    if(!production){
        DebugErrors('error')
    }
})
