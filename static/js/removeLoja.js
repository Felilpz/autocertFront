document.addEventListener('DOMContentLoaded', function() {
    const removeCNPJButton = document.getElementById('remove-cnpj');
    
    if (removeCNPJButton) {
        removeCNPJButton.addEventListener('click', async function () {
            const cnpjInput = document.getElementById('remove-cnpj-modal').value.trim();
            console.log(`CNPJ para remover: ${cnpjInput}`);
            
            if (!cnpjInput) {
                alert('Por favor, insira um CNPJ válido.');
                return;
            }
            
            try {
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
                    location.reload();
                } else {
                    alert('Erro ao remover a loja.');
                    console.error('erro ao desativar loja:', await desativarResponse.json());
                }
            } catch (error) {
                console.error('erro ao desativar loja:', error);
            } finally {
                document.getElementById('remove-form').reset();
            }
        });
    } else {
        console.error('Elemento com ID "remove-cnpj" não encontrado!');
    }
    
    const removeCNPJLabel = document.getElementById('remove-cnpj-modal');
    
    if (removeCNPJLabel) {
        const removeCNPJMensagem = document.createElement('div');
        removeCNPJMensagem.style.color = 'red';
        removeCNPJMensagem.style.fontSize = '12px';
        removeCNPJLabel.insertAdjacentElement('afterend', removeCNPJMensagem);
        
        limitarCaracteres(removeCNPJLabel, 14, removeCNPJMensagem);
    } else {
        console.error('Elemento com ID "remove-cnpj-modal" não encontrado!');
    }
 });
 
 function limitarCaracteres(input, maxLength, mensagemElement) {
    const apenasNumeros = input.id === 'cnpj' || input.id === 'telefoneContato' || 
                          input.id === 'remove-cnpj-modal';
    
    function inputHandler(e) {
        if (apenasNumeros) {
            const posicaoCursor = input.selectionStart;
            const valorAntigo = input.value;
            const valorLimpo = input.value.replace(/\D/g, '');
            
            if (valorAntigo !== valorLimpo) {
                input.value = valorLimpo;
                if (posicaoCursor && posicaoCursor <= valorLimpo.length) {
                    input.setSelectionRange(posicaoCursor, posicaoCursor);
                }
            }
        }
        
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength);
        }
        
        const caracteresRestantes = maxLength - input.value.length;
        mensagemElement.textContent = `Caracteres restantes: ${caracteresRestantes}`;
    }
    
    function blurHandler() {
        mensagemElement.textContent = '';
        
        const valor = input.value.trim();
        if (valor.length < maxLength) {
            if (maxLength === 14) {
                mensagemElement.textContent = 'O CNPJ deve ter 14 dígitos.';
            } else if (maxLength === 11) {
                mensagemElement.textContent = 'O Telefone deve ter 11 dígitos.';
            } else if (maxLength === 1) {
                mensagemElement.textContent = 'O campo não pode ser vazio';
            }
        }
    }
    
    function focusHandler() {
        const caracteresRestantes = maxLength - input.value.length;
        mensagemElement.textContent = `Caracteres restantes: ${caracteresRestantes}`;
    }
    
    input.removeEventListener('input', inputHandler);
    input.removeEventListener('blur', blurHandler);
    input.removeEventListener('focus', focusHandler);
    
    input.addEventListener('input', inputHandler);
    input.addEventListener('blur', blurHandler);
    input.addEventListener('focus', focusHandler);
    
    mensagemElement.textContent = '';
}