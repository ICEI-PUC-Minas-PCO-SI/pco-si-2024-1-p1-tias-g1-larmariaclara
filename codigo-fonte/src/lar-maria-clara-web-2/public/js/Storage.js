

function Storage(){
    this.storage = localStorage
}

Storage.prototype.get = function(index){
    return this.storage.getItem(index)
}

Storage.prototype.set = function(index, value){
    this.storage.setItem(index, value)
}

Storage.prototype.getJson = function(index){
    return JSON.parse(this.storage.getItem(index))
}

Storage.prototype.setJson = function(index, value){
    this.storage.setItem(index, JSON.stringify(value))
}

window.storage = new Storage()
