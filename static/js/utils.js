const apiurl = 'http://127.0.0.1:5000/lojas';

function limitarCaracteres(input, maxLength, mensagemElement) {
    const apenasNumeros = input.id === 'cnpj' || input.id === 'telefoneContato' || 
                          input.getAttribute('type') === 'number' ||
                          input.classList.contains('apenas-numeros');
    
    input.removeEventListener('input', inputHandler);
    input.removeEventListener('blur', blurHandler);
    input.removeEventListener('focus', focusHandler);
    
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
        const valor = input.value.trim();
        if (valor.length < maxLength) {
            if (maxLength === 14) {
                mensagemElement.textContent = 'O CNPJ deve ter 14 dígitos.';
            } else if (maxLength === 11) {
                mensagemElement.textContent = 'O Telefone deve ter 11 dígitos.';
            } else if (maxLength === 1) {
                mensagemElement.textContent = 'O CNPJ não pode ser vazio';
            } else if (maxLength === 2) {
                mensagemElement.textContent = 'O Telefone não pode ser vazio';
            }
        }
    }
    
    function focusHandler() {
        mensagemElement.textContent = '';
    }
    
    input.addEventListener('input', inputHandler);
    input.addEventListener('blur', blurHandler);
    input.addEventListener('focus', focusHandler);
    
    inputHandler();
}

// vliadar email com regex
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function differenceUntilToday(dateReference) {
    const dataReferencia = moment.utc(dateReference).startOf('day');
    const hoje = moment().utc().startOf('day');
    return dataReferencia.diff(hoje, 'days');
}

