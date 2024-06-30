function phoneRule(string){
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(string)
}

function emailRule(string){
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(string);
}
