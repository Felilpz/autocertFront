document.getElementById('add-new-pharmacy').addEventListener('click', function () {
    console.log('funcionando click')
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

    console.log('dados enviados:', { cnpj, razaoSocial, bandeira, responsavel, telefone, email });
    alert('loja adicionada c sucesso!');
    document.getElementById('pharmacy-form').reset()
})