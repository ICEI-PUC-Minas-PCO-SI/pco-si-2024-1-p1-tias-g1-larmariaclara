function Table() {
    this.table = document.querySelector('table tbody');
}

Table.prototype.addRow = function(rowData) {
    if (!this.table) {
        return;
    }

    var newRow = this.table.insertRow();
    rowData.forEach(function(data) {
        var newCell = newRow.insertCell();
        newCell.innerHTML = data;
    });
};

Table.prototype.removeRows = function(indices) {
    if (!this.table) {
        return;
    }

    var rowCount = this.table.rows.length;
    indices = indices.map(function(index) {
        return parseInt(index);
    });

    indices.sort(function(a, b) {
        return b - a;
    });

    indices.forEach(function(index) {
        if (index >= 0 && index < rowCount) {
            this.table.deleteRow(index);
        } 
    }, this);
};

Table.prototype.toExcel = function(...excludeColumns) {
    var wb = XLSX.utils.book_new();
    var ws_data = [];
    var rows = this.table.rows;

    // Adiciona cabeçalhos
    var headers = [];
    var headerCells = document.querySelectorAll('table thead tr th');
    headerCells.forEach(function(cell, index) {
        if (!excludeColumns.includes(index)) {
            headers.push(cell.innerText);
        }
    });
    ws_data.push(headers);

    // Adiciona linhas
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.cells;
        var rowData = [];
        for (var j = 0; j < cells.length; j++) {
            if (!excludeColumns.includes(j)) {
                // Para pegar o texto ou o valor de entrada, dependendo da célula
                var cellValue = cells[j].querySelector('input') ? cells[j].querySelector('input').checked : cells[j].innerText;
                rowData.push(cellValue);
            }
        }
        ws_data.push(rowData);
    }

    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, 'Tabela.xlsx');    
};

function toExcel() {
    var table = new Table();
    table.toExcel(0);
}