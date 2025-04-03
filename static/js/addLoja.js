let validade_certificado;

async function addNewPharmacy() {
    const cnpj = document.getElementById('add-cnpj-modal').value.trim();
    const razaoSocial = document.getElementById('add-razao-modal').value.trim();
    const bandeira = document.getElementById('add-flag-modal').value;
    const responsavel = document.getElementById('add-owner-modal').value.trim();
    const telefone = document.getElementById('add-cellphone-number-modal').value.trim();
    const email = document.getElementById('add-email-modal').value.trim();
    const validade_certificado = todayFormatted;


    if (!cnpj || !razaoSocial || !bandeira || !responsavel || !telefone || !email) {
        alert('Todos os campos devem ser preenchidos.');
        return;
    }

    if (cnpj.length !== 14) {
        alert('O CNPJ deve conter 14 dígitos.');
        return;
    }

    if (!validateEmail(email)) {
        alert('formato de email invalido.');
        return;
    }

    if (telefone.length !== 11) {
        alert('O telefone deve conter 11 dígitos.');
        return;
    }

    const newPharmacy = {
        cnpj,
        razaoSocial,
        bandeira,
        responsavel,
        telefone,
        email,
        validade_certificado
    };
    console.log(newPharmacy)

    try {
        const response = await fetch(apiurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPharmacy),
        });
        console.log(response)

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro ao enviar dados para a API:', errorData);
            alert(`Erro ao salvar dados: ${response.statusText}`);
            return;
        }



        const data = await response.json();
        console.log('Dados enviados com sucesso:', data);
        console.log(responsavel + 'paipy')
        alert('Dados salvos com sucesso!');
        location.reload();
        carregarLojas();
        document.getElementById('add-form').reset();
    } catch (error) {
        console.log(newPharmacy)
        console.error('Erro ao enviar dados para a API:', error);
        alert('Erro ao salvar dados. Verifique o console para mais detalhes.');
    }
}

document.getElementById('add-new-pharmacy').addEventListener('click', addNewPharmacy);

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
