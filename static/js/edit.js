document.addEventListener('DOMContentLoaded', function () {
    const editButtons = document.querySelectorAll('.button-editar');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            fetch('static/modals/edit.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('modalContainer').innerHTML = html;

                    const editModal = new bootstrap.Modal(document.getElementById('editModal'));

                    const lojaDiv = button.closest('.loja-exemplo');
                    const cnpj = lojaDiv.querySelector('.cnpj p').textContent;
                    const razaoSocial = lojaDiv.querySelector('.razao-social p').textContent;
                    const diasParaVencer = lojaDiv.querySelector('.dias-para-vencer p').textContent;

                    document.getElementById('cnpj').value = cnpj;
                    document.getElementById('razaoSocial').value = razaoSocial;
                    document.getElementById('diasParaVencer').value = parseInt(diasParaVencer);

                    editModal.show();

                    document.getElementById('saveChanges').addEventListener('click', function () {
                        console.log('Dados salvos:', {
                            cnpj: document.getElementById('cnpj').value,
                            razaoSocial: document.getElementById('razaoSocial').value,
                            diasParaVencer: document.getElementById('diasParaVencer').value,
                        });

                        editModal.hide();
                    });

                    document.getElementById('editModal').addEventListener('hidden.bs.modal', function () {
                        document.getElementById('modalContainer').innerHTML = '';
                    });
                })
                .catch(error => console.error('Erro ao carregar o modal:', error));
        });
    });
});



document.getElementById('saveChanges').addEventListener('click', function () {
    let cnpj = document.getElementById('cnpj').value.trim()
    let razaoSocial = document.getElementById('razaoSocial').value.trim()
    let bandeira = document.getElementById('bandeira').value.trim()
    let validadeCertificado = document.getElementById('validadeCertificado').value.trim()
    //notificacoes é = validadaCertificado - 30
    //proxima notificacao é validade - dia de hoje
    let responsavel = document.getElementById('nomeResponsavel').value.trim()
    let telefoneContato = document.getElementById('telefoneContato').value.trim()
    let emailContato = document.getElementById('emailContato').value.trim()

    const dadosEdited = {
        cnpj,
        razaoSocial,
        bandeira,
        validadeCertificado,
        responsavel,
        telefoneContato,
        emailContato
    }

    console.log('Dados editados: ', dadosEdited)

    if (!cnpj) {
        alert('CNPJ é obrigatório')
        return
    }

    if (!validadeCertificado) {
        alert('Validade do certificado é obrigatória')
        return
    }

    if (!bandeira) {
        alert('Bandeira é obrigatória')
        return
    }

    if (!validadeCertificado) {
        alert('Validade do certificado é obrigatória')
        return
    }

    if (!responsavel) {
        alert('Nome do responsável é obrigatório')
        return
    }

    if (!telefoneContato) {
        alert('Telefone de contato é obrigatório')
        return
    }

    if (!emailContato) {
        alert('Email de contato é obrigatório')
        return
    }
})
