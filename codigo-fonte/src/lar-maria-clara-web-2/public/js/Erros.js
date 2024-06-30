

function error2Forms(){
    return {
        error: document.querySelectorAll('form').length > 1,
        message: 'Você tem dois formularios'
    }
}

function errorDuplicateForms(){
    var formElements = document.querySelectorAll('input, select, textarea');
    var fieldNames = new Map();
    var duplicates = [];

    formElements.forEach(element => {
        if (element.name) {
            var fieldName = element.name.toLowerCase();

            if (fieldNames.has(fieldName)) {
                duplicates.push(fieldName);
            } else {
                fieldNames.set(fieldName, true);
            }
        }
    });

    return {
        error: duplicates.length > 0,
        message: 'Você tem inputs com name duplicado: ' + duplicates.join(' e ')
    }
}

function DebugErrors(prefix) {
    Object.keys(window).filter(function(name){
        if(name.startsWith(prefix)){
            var probe = window[name];
            if (typeof probe === 'function') {
                var { error, message } = probe();
                error ? alert(message) : null
            }

        }

        // --
    })
}
