async function removeIt(){
    var inputs = pit('input[type="checkbox"]').all()
    var removeLines = []
    var removeArray = []
  
    for (let i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if(input.attr('data-id')){
            removeArray.push('data-id')
            removeLines.push('line-id')
        }
    }

    var table = Table()
    table.removeRows(removeLines)

    // mr
}   