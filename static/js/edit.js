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
                    const validade_certificado = lojaDiv.dataset.validade_certificado;
                    console.log(validade_certificado + " Valor que foi pego do dataset");
                    const cnpjOriginal = cnpj;

                    document.getElementById('cnpj').value = cnpj;
                    document.getElementById('razaoSocial').value = razaoSocial;
                    document.getElementById('nomeResponsavel').value = responsavel;
                    document.getElementById('telefoneContato').value = telefone;
                    document.getElementById('emailContato').value = email;
                    document.getElementById('diasParaVencer').value = parseInt(diasParaVencer);
                    document.getElementById('bandeira').value = bandeira;

                    document.getElementById('validade_certificado').value = moment.utc(validade_certificado).format('YYYY-MM-DD');

                    const data = moment.utc(validade_certificado).subtract(15, 'days');
                    const dataFormatada = data.format('YYYY-MM-DD');
                    console.log(dataFormatada);
                    document.getElementById('dataProximaNotificacao').value = dataFormatada;

                    document.getElementById('diasParaVencer').value = differenceUntilToday(validade_certificado);

                    editModal.show();

                    const editCnpjInput = document.getElementById('cnpj');
                    const editCnpjMensagem = document.createElement('div');
                    editCnpjMensagem.style.color = 'red';
                    editCnpjMensagem.style.fontSize = '12px';
                    editCnpjInput.insertAdjacentElement('afterend', editCnpjMensagem);
                    limitarCaracteres(editCnpjInput, 14, editCnpjMensagem);

                    const editTelefoneInput = document.getElementById('telefoneContato');
                    const editTelefoneMensagem = document.createElement('div');
                    editTelefoneMensagem.style.color = 'red';
                    editTelefoneMensagem.style.fontSize = '12px';
                    editTelefoneInput.insertAdjacentElement('afterend', editTelefoneMensagem);
                    limitarCaracteres(editTelefoneInput, 11, editTelefoneMensagem);

                    document.getElementById('saveChanges').addEventListener('click', function () {
                        let cnpj = document.getElementById('cnpj').value.trim();
                        let razaoSocial = document.getElementById('razaoSocial').value.trim();
                        let bandeira = document.getElementById('bandeira').value.trim();
                        let validadeCertificado = document.getElementById('validade_certificado').value.trim();
                        let responsavel = document.getElementById('nomeResponsavel').value.trim();
                        let telefoneContato = document.getElementById('telefoneContato').value.trim();
                        let emailContato = document.getElementById('emailContato').value.trim();
                        
                        const lojaDiv = document.querySelector(`.loja-exemplo[data-cnpj="${cnpjOriginal}"]`);
                        const dataAntiga = new Date(lojaDiv.dataset.validade_certificado);
                        const dataNova = new Date(validadeCertificado);
                    
                        const dadosEdited = {
                            cnpj,
                            razaosocial: razaoSocial,
                            bandeira,
                            validade_certificado: validadeCertificado,
                            responsavel,
                            telefone: telefoneContato,
                            email: emailContato,
                            notificacao: dataNova > dataAntiga ? false : lojaDiv.dataset.notificacao === 'true'
                        };
                    
                        console.log(dadosEdited.validade_certificado + " validade_certificado editada");
                    
                        if (!cnpj || !razaoSocial || !bandeira || !validadeCertificado || !responsavel || !telefoneContato || !emailContato) {
                            alert('Preencha todos os campos obrigatórios');
                            return;
                        }
                        if (cnpj.length !== 14) {
                            alert('O CNPJ deve conter 14 dígitos.');
                            return;
                        }
                        if (telefoneContato.length !== 11) {
                            alert('O telefone deve conter 11 dígitos.');
                            return;
                        }
                        if (!validateEmail(emailContato)) {
                            alert('Formato de email inválido.');
                            return;
                        }
                    
                        fetch(`http://127.0.0.1:5000/lojas/${cnpjOriginal}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dadosEdited)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Erro ao atualizar loja: ${response.statusText}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            alert("Loja atualizada com sucesso!");
                            editModal.hide();
                            location.reload();
                        })
                        .catch(error => {
                            console.log(error);
                            alert(`Erro ao atualizar loja: ${error.message}`);
                        });
                    });
                })
                .catch (error => console.error('Erro ao carregar o modal:', error));
        }
    });
});
