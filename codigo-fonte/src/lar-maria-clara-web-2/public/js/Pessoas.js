function minhaIdade(dataNascimento) {
    var partes = dataNascimento.split('/');
    var dia = parseInt(partes[0], 10);
    var mes = parseInt(partes[1], 10) - 1; 
    var ano = parseInt(partes[2], 10);

    var dataNasc = new Date(ano, mes, dia);

    var hoje = new Date();
    var idade = hoje.getFullYear() - dataNasc.getFullYear();

    var mesAtual = hoje.getMonth();
    var diaAtual = hoje.getDate();

    if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
        idade--;
    }

    return idade;
}