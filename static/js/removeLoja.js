import { limitarCaracteres } from './utils.js';

const removeCNPJ = document.getElementById('remove-cnpj').addEventListener('click', function () {
    console.log('click funcionando')

    const cnpjInput = document.getElementById('remove-cnpj-modal').value.trim();
    console.log(`cnpj para remover: ${cnpjInput}`);

    const confirmarRemocao = confirm('Tem certeza que deseja remover esta loja?');

    if (confirmarRemocao) {
        console.log('loja removida com sucesso!');
    } else {
        console.log('operacao cancelada');
    }

    document.getElementById('remove-form').reset();
})

const removeCNPJLabel = document.getElementById('remove-cnpj-modal');
const removeCNPJMensagem = document.createElement('div');
removeCNPJMensagem.style.color = 'red';
removeCNPJMensagem.style.fontSize = '12px';
removeCNPJLabel.insertAdjacentElement('afterend', removeCNPJMensagem);
limitarCaracteres(removeCNPJLabel, 14, removeCNPJMensagem);