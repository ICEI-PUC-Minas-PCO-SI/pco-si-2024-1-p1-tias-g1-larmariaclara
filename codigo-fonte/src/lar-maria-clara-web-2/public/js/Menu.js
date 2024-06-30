function MenuApp(){
    var viewmenu = location.pathname.replace(/\//g, '');
    viewmenu = concat('#', viewmenu)
    if(compare(viewmenu, '#')) {
        viewmenu = "#home"
    }

    pit(viewmenu).addClass('active')
}

