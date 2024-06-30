function DropMenu(id, e){ 
    var dropContent = e.closest('.drop-content') // pega o dorp menu que eta

    document.addEventListener('click', function(event) {
        if (!dropContent.contains(event.target)) {
            return pit(id).close()
        }

        pit(id).show()
    })
}