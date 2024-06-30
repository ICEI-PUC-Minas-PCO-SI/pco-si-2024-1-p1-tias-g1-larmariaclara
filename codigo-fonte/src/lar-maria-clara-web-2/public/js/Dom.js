
Element.prototype.addClass = function(...array) {
    for (let i = 0; i < array.length; i++) {
        var item = array[i]
        this.classList.add(item);
    }
}

Element.prototype.removeClass = function(...array) {
   for (let i = 0; i < array.length; i++) {
       var item = array[i]
       this.classList.remove(item);
   }
}

Element.prototype.hasClass = function(className) {
   return this.classList.contains(className);
}

Element.prototype.attr = function(index, value = '') {
   if(value){
       return this.setAttribute(index, value)
   }

   return this.getAttribute(index);
}

Element.prototype.html = function(value = '') {
   if(value){
       return this.innerHTML
   }

   return this.innerHTML
}