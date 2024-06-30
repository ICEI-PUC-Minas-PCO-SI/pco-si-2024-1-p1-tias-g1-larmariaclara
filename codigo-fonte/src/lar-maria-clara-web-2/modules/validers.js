module.exports.isEmail = function(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports.bigger = function(text, size){
    return text.lenth > size
}

module.exports.smaller = function(text, size){
    return text.lenth < size
}

