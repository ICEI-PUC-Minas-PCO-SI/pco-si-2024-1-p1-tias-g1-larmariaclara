
window.addEventListener('DOMContentLoaded', event => { 

    // Verificar se há um token ou outra indicação de login no localStorage
    if (localStorage.getItem('loggedIn') === 'false') {
        // O usuário não está logado, exibir a tela de login
        showLoginPage();
    }

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        //Uncomment Below to persist sidebar toggle between refreshes
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            document.body.classList.toggle('sb-sidenav-toggled');
        }

        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    carregarConteudo('paginas/cabecalho.html', 'idCabecalho');
    carregarConteudo('paginas/menu-lateral.html', 'idMenuLateral');
    //carregarConteudo('paginas/dashboard.html', 'idMain');
    carregarConteudo('paginas/footer.html', 'idFooter');

});

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('loggedIn');
    showLoginPage(); // Voltar para a tela de login
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Verificar as credenciais (simulação de sucesso)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação simples de autenticação (substitua com lógica real)
    if (username === 'usuario' && password === 'senha') {
        // Se as credenciais estiverem corretas, marcar o usuário como logado
        localStorage.setItem('loggedIn', 'true');
        showMainPage(); // Mostrar a página principal
    } else {
        alert('Credenciais inválidas. Tente novamente.');
    }
});

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
}

function showMainPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
}

async function carregarMenuTables() {
    await carregarConteudo('tables.html', 'idMain');
    CarregarDataTablesSimples('datatablesSimple');
};


async function carregarConteudo(url, elemento) {
    await fetch(url)
    .then(response => response.text())
    .then(text => {
        document.getElementById(elemento).innerHTML = "";
        document.getElementById(elemento).innerHTML = text;
    });
};
    
// Função para gerenciar a URL atual do site
function gerenciarURL() {
    // Função para obter parâmetros da URL atual
    function obterParametros() {
        const params = new URLSearchParams(window.location.search);
        let parametros = {};
        for (let [key, value] of params) {
            parametros[key] = value;
        }
        return parametros;
    }

    // Função para redirecionar para outra página
    function redirecionarPara(url) {
        window.location.href = url;
    }

    // Função para atualizar a página atual
    function atualizarPagina() {
        window.location.reload();
    }

    return {
        obterParametros,
        redirecionarPara,
        atualizarPagina
    };
}

// // Exemplo de uso:
// const gerenciadorURL = gerenciarURL();

// // Exemplo 1: Obter parâmetros da URL atual
// const parametrosAtuais = gerenciadorURL.obterParametros();
// console.log(parametrosAtuais);

// // Exemplo 2: Redirecionar para outra página
// gerenciadorURL.redirecionarPara('/outra-pagina');

// // Exemplo 3: Atualizar a página atual
// gerenciadorURL.atualizarPagina();
