import { limitarCaracteres } from './utils.js';
import { carregarLojas } from './script.js';

const removeCNPJ = document.getElementById('remove-cnpj').addEventListener('click', async function () {
    // console.log('click funcionando');

    const cnpjInput = document.getElementById('remove-cnpj-modal').value.trim();
    console.log(`CNPJ para remover: ${cnpjInput}`);

    if (!cnpjInput) {
        alert('Por favor, insira um CNPJ válido.');
        return;
    }

    try {
        // necessario verificar se a loja existe
        const checkResponse = await fetch(`http://127.0.0.1:5000/lojas/cnpj/${cnpjInput}`);
        if (!checkResponse.ok) {
            if (checkResponse.status === 404) {
                alert('Loja não encontrada.');
            } else {
                alert('Erro ao verificar a loja.');
            }
            return;
        }

        const lojaData = await checkResponse.json();
        console.log('Dados da loja encontrada:', lojaData);

        const confirmarRemocao = confirm('Tem certeza que deseja remover esta loja?');
        if (!confirmarRemocao) {
            console.log('Operação cancelada');
            document.getElementById('remove-form').reset();
            return;
        }

        const desativarResponse = await fetch('http://127.0.0.1:5000/lojas/desativar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cnpj: cnpjInput }),
        });

        if (desativarResponse.ok) {
            console.log('Loja desativada com sucesso!');
            alert('Loja desativada com sucesso!');
            carregarLojas();
        } else {
            alert('Erro ao desativar a loja.');
            console.error('Erro ao desativar a loja:', await desativarResponse.json());
        }
    } catch (error) {
        console.error('Erro ao processar a remoção:', error);
        alert('Erro ao processar a remoção. Verifique o console para mais detalhes.');
    } finally {
        document.getElementById('remove-form').reset();
    }
});

const removeCNPJLabel = document.getElementById('remove-cnpj-modal');
const removeCNPJMensagem = document.createElement('div');
removeCNPJMensagem.style.color = 'red';
removeCNPJMensagem.style.fontSize = '12px';
removeCNPJLabel.insertAdjacentElement('afterend', removeCNPJMensagem);
limitarCaracteres(removeCNPJLabel, 14, removeCNPJMensagem);
