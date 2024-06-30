

class Pity{
    constructor(query){
        this.els = document.querySelectorAll(query)
    }

    all(){
        return this.els
    }

    text(t){
        var els = this.els
        els.forEach(function(el){
            el.textContent = t
        })
    }

    value(value){
        if(value){
            this.els[0].value = value
        }else{
            return this.els[0].value 
        }
    }

    attr(index, value){
        if(value){
            this.els[0].setAttribute(index, value)
        }else{
            return this.els[0].getAttribute(index)
        }
    }

    get(){
        return this.els[0]
    }

    css(index, value){
        var els = this.els
        for (let i = 0; i < els.length; i++) {
            var el = els[i];
            el.style[index] = value
        }
    }

    on(event, callback){
        var els = this.els
        for (let i = 0; i < els.length; i++) {
            var el = els[i];
            el.addEventListener(event, callback)
        }
    }

    show(){
        var els = this.els
        for (let i = 0; i < els.length; i++) {
            var el = els[i];
            el.removeClass('h')
        }
    }

    close(){
        var els = this.els
        for (let i = 0; i < els.length; i++) {
            var el = els[i];
            el.addClass('h')
        }
    }

    addClass(className){
        var els = this.els
        for (let i = 0; i < els.length; i++) {
            var el = els[i];
            el.addClass(className)
        }
    }

    removeClass(className){
        var els = this.els
        for (let i = 0; i < els.length; i++) {
            var el = els[i];
            el.removeClass(className)
        }
    }

    html(content){
        var els = this.els
        for (let i = 0; i < els.length; i++) {
            var el = els[i];
            el.innerHTML = content
        }
    }
}

function setByName(name, value){
    pit(`input[name="${name}"]`).value(value)
}

function pit(query){
    var p = new Pity(query)
    return p
}