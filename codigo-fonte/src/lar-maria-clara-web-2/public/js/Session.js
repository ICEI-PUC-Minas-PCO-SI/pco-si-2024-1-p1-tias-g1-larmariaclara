function Session(){
    this.session = sessionStorage
}

Session.prototype.get = function(index){
    return this.session.getItem(index)
}

Session.prototype.set = function(index, value){
    return this.session.setItem(index, value)
}

Session.prototype.getJson = function(index){
    return toJson(this.session.getItem(index))
}

Session.prototype.setJson = function(index, value){
    return this.session.setItem(index, fromJson(value))
}

window.session = new Session()