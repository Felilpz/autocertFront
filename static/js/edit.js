document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.side-right-content').addEventListener('click', function (event) {
        if (event.target.closest('.button-editar')) {
            const button = event.target.closest('.button-editar');
            fetch('static/modals/edit.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('modalContainer').innerHTML = html;

                    const editModal = new bootstrap.Modal(document.getElementById('editModal'));

                    const lojaDiv = button.closest('.loja-exemplo');
                    const cnpj = lojaDiv.dataset.cnpj;
                    const razaoSocial = lojaDiv.dataset.razaoSocial;
                    const bandeira = lojaDiv.dataset.bandeira;
                    const responsavel = lojaDiv.dataset.responsavel;
                    const telefone = lojaDiv.dataset.telefone;
                    const email = lojaDiv.dataset.email;
                    const diasParaVencer = lojaDiv.dataset.diasParaVencer;

                    document.getElementById('cnpj').value = cnpj;
                    document.getElementById('razaoSocial').value = razaoSocial;
                    document.getElementById('nomeResponsavel').value = responsavel;
                    document.getElementById('telefoneContato').value = telefone;
                    document.getElementById('emailContato').value = email;
                    document.getElementById('diasParaVencer').value = parseInt(diasParaVencer);
                    // Set the selected option directly
                    document.getElementById('bandeira').value = bandeira;

                    editModal.show();

                    document.getElementById('saveChanges').addEventListener('click', function () {
                        let cnpj = document.getElementById('cnpj').value.trim();
                        let razaoSocial = document.getElementById('razaoSocial').value.trim();
                        let bandeira = document.getElementById('bandeira').value.trim();
                        let validadeCertificado = document.getElementById('validadeCertificado').value.trim();
                        let responsavel = document.getElementById('nomeResponsavel').value.trim();
                        let telefoneContato = document.getElementById('telefoneContato').value.trim();
                        let emailContato = document.getElementById('emailContato').value.trim();

                        const dadosEdited = {
                            cnpj,
                            razaoSocial,
                            bandeira,
                            validadeCertificado,
                            responsavel,
                            telefoneContato,
                            emailContato
                        };

                        console.log('Dados editados: ', dadosEdited);

                        if (!cnpj || !razaoSocial || !bandeira || !validadeCertificado || !responsavel || !telefoneContato || !emailContato) {
                            alert('Preencha todos os campos obrigatórios');
                            return;
                        }

                        editModal.hide();
                    });

                    document.getElementById('editModal').addEventListener('hidden.bs.modal', function () {
                        document.getElementById('modalContainer').innerHTML = '';
                    });
                })
                .catch(error => console.error('Erro ao carregar o modal:', error));
        }
    });
});
