document.getElementById('add-new-pharmacy').addEventListener('click', function () {
    const cnpj = document.getElementById('add-cnpj-modal').value.trim();
    const razaoSocial = document.getElementById('add-razao-modal').value.trim();
    const bandeira = document.getElementById('add-flag-modal').value.trim();
    const responsavel = document.getElementById('add-owner-modal').value.trim();
    const telefone = document.getElementById('add-cellphone-number-modal').value.trim();
    const email = document.getElementById('add-email-modal').value.trim();

    if (!cnpj) {
        alert('CNPJ esta vazio');
        return;
    }

    if (!razaoSocial) {
        alert('Razão Social esta vazio');
        return;
    }

    if (!bandeira) {
        alert('Bandeira nao selecionada');
        return;
    }

    if (!responsavel) {
        alert('Responsável vazio');
        return;
    }

    if (!telefone) {
        alert('Telefone formato errado ou vazio');
        return;
    }

    if (!email) {
        alert('Email vazio ou formato errado');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('formato de email invalido.');
        return;
    }

    const newPharmacy = {
        cnpj,
        razaoSocial,
        bandeira,
        responsavel,
        telefone,
        email,
    };
    console.log('dados enviados:', newPharmacy);

    alert('Dados salvos com sucesso!');

    document.getElementById('add-form').reset();
});

function limitarCaracteres(input, maxLength, mensagemElement) {
    input.addEventListener('input', function () {
        const valor = input.value.trim();
        if (valor.length > maxLength) {
            input.value = valor.slice(0, maxLength);
        }
        const caracteresRestantes = maxLength - input.value.length;
        mensagemElement.textContent = `Caracteres restantes: ${caracteresRestantes}`;
    });
}

// msg para CNPJ
const cnpjInput = document.getElementById('add-cnpj-modal');
const cnpjMensagem = document.createElement('div');
cnpjMensagem.style.color = 'red';
cnpjMensagem.style.fontSize = '12px';
// cnpjMensagem.style.paddingRight = '50px' ver o pq n ta funcionando...
cnpjInput.insertAdjacentElement('afterend', cnpjMensagem);
limitarCaracteres(cnpjInput, 14, cnpjMensagem);

// msg para telefone
const telefoneInput = document.getElementById('add-cellphone-number-modal');
const telefoneMensagem = document.createElement('div');
telefoneMensagem.style.color = 'red';
telefoneMensagem.style.fontSize = '12px';
telefoneInput.insertAdjacentElement('afterend', telefoneMensagem);
limitarCaracteres(telefoneInput, 11, telefoneMensagem);