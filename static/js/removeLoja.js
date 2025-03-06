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

const removeCNPJLabel = document.getElementById('remove-cnpj-modal');
const removeCNPJMensagem = document.createElement('div');
removeCNPJMensagem.style.color = 'red';
removeCNPJMensagem.style.fontSize = '12px';
// removeCNPJMensagem.style.paddingRight = '50px' ver o pq n ta funcionando...
removeCNPJLabel.insertAdjacentElement('afterend', removeCNPJMensagem);
limitarCaracteres(removeCNPJLabel, 14, removeCNPJMensagem);