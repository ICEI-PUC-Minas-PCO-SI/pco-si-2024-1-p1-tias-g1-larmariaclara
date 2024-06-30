module.exports.compare = function(v1, v2){
    return v1 == v2
}

module.exports.concat = function(...array){
    var concated = ''
    for (let i = 0; i < array.length; i++) {
        concated += array[i]
    }

    return concated
}

module.exports.getMethod = function(objeto) {
    const props = Object.getOwnPropertyNames(objeto);

    for (const prop of props) {
        if (typeof objeto[prop] === 'function') {
            return prop;
        }
    }

    return null;
}

String.prototype.capitalize = function() {
    if (this.length === 0) {
        return this; 
    }

    return this.charAt(0).toUpperCase() + this.slice(1);
};