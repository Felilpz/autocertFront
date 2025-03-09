document.getElementById('add-new-pharmacy').addEventListener('click', function () {
    const cnpj = document.getElementById('add-cnpj-modal').value.trim();
    const razaoSocial = document.getElementById('add-razao-modal').value.trim();
    const bandeira = document.getElementById('add-flag-modal').value;
    const responsavel = document.getElementById('add-owner-modal').value.trim();
    const telefone = document.getElementById('add-cellphone-number-modal').value.trim();
    const email = document.getElementById('add-email-modal').value.trim();
    const diasParaVencer = 13;

    if (!cnpj || !razaoSocial || !bandeira || !responsavel || !telefone || !email) {
        alert('Todos os campos devem ser preenchidos.');
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
        diasParaVencer,
    };
    console.log('dados enviados:', newPharmacy);

    alert('Dados salvos com sucesso!');

    const newPharmacyElement = document.createElement('div');
    newPharmacyElement.classList.add('loja-exemplo');

    newPharmacyElement.dataset.cnpj = cnpj;
    newPharmacyElement.dataset.razaoSocial = razaoSocial;
    newPharmacyElement.dataset.bandeira = bandeira;
    newPharmacyElement.dataset.responsavel = responsavel;
    newPharmacyElement.dataset.telefone = telefone;
    newPharmacyElement.dataset.email = email;
    newPharmacyElement.dataset.diasParaVencer = diasParaVencer;

    newPharmacyElement.innerHTML = `
        <div class="cnpj">
            <p>${cnpj}</p>
        </div>
        <div class="razao-social">
            <p>${razaoSocial}</p>
        </div>
        <div class="dias-para-vencer">
            <p>${diasParaVencer}</p>
        </div>
        <div class="buttons-to-act">
            <button type="button" class="button-editar">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button type="button" class="button-enviar" id="notify">
                <i class="bi bi-bell-fill"></i>
            </button>
        </div>
    `;

    document.querySelector('.side-right-content').appendChild(newPharmacyElement);

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

const cnpjInput = document.getElementById('add-cnpj-modal');
const cnpjMensagem = document.createElement('div');
cnpjMensagem.style.color = 'red';
cnpjMensagem.style.fontSize = '12px';
cnpjInput.insertAdjacentElement('afterend', cnpjMensagem);
limitarCaracteres(cnpjInput, 14, cnpjMensagem);

const telefoneInput = document.getElementById('add-cellphone-number-modal');
const telefoneMensagem = document.createElement('div');
telefoneMensagem.style.color = 'red';
telefoneMensagem.style.fontSize = '12px';
telefoneInput.insertAdjacentElement('afterend', telefoneMensagem);
limitarCaracteres(telefoneInput, 11, telefoneMensagem);
