window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    CarregarDataTablesSimples('datatablesSimple');
});

function CarregarDataTablesSimples(datatables) {
    const datatablesSimple = document.getElementById(datatables);
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
}

