function define(rule, propiet, sufix = 'px'){
    var elements = document.querySelectorAll(`[class*="${rule}"]`);
    elements.forEach(element => {
        var classes = element.className.split(' ');
        var mtClass = classes.find(className => className.startsWith(rule));

        if (mtClass) {
            var number = mtClass.slice(2);
            !isNaN(number) ? element.style[propiet] = number + sufix : null
        }

        // --
    })
}