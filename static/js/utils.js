function limitarCaracteres(input, maxLength, mensagemElement) {
    input.addEventListener('input', function () {
        const valor = input.value.trim();
        if (valor.length > maxLength) {
            input.value = valor.slice(0, maxLength);
        }
        const caracteresRestantes = maxLength - input.value.length;
        mensagemElement.textContent = `Caracteres restantes: ${caracteresRestantes}`;
    });

    input.addEventListener('blur', function () {
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
    });

    input.addEventListener('focus', function () {
        mensagemElement.textContent = '';
    });
}

// vliadar email com regex
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export { limitarCaracteres, validateEmail };
