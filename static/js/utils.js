const apiurl = 'http://127.0.0.1:5000/lojas';

function limitarCaracteres(input, maxLength, mensagemElement) {
    input.addEventListener('input', () => {
        // rgex q remove tudo q n for numero
        input.value = input.value.replace(/\D/g, '');

        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength);
        }

        const restantes = maxLength - input.value.length;
        mensagemElement.textContent = `Caracteres restantes: ${restantes}`;
    });

    // qnd desclica
    input.addEventListener('blur', () => {
        if (input.value.length < maxLength) {
            if (maxLength === 14) {
                mensagemElement.textContent = 'O CNPJ deve ter 14 dígitos.';
            } else if (maxLength === 11) {
                mensagemElement.textContent = 'O Telefone deve ter 11 dígitos.';
            }
        }
    });

    //qnd clica dnv
    input.addEventListener('focus', () => {
        const restantes = maxLength - input.value.length;
        mensagemElement.textContent = `Caracteres restantes: ${restantes}`;
    });
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

