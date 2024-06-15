/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => { 

    

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    

});
 
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

// Exemplo de uso:
const gerenciadorURL = gerenciarURL();

// Exemplo 1: Obter parâmetros da URL atual
const parametrosAtuais = gerenciadorURL.obterParametros();
console.log(parametrosAtuais);

// Exemplo 2: Redirecionar para outra página
gerenciadorURL.redirecionarPara('/outra-pagina');

// Exemplo 3: Atualizar a página atual
gerenciadorURL.atualizarPagina();
