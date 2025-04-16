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
                    const cnpjOriginal = cnpj;

                    document.getElementById('cnpj').value = cnpj;
                    document.getElementById('razaoSocial').value = razaoSocial;
                    document.getElementById('nomeResponsavel').value = responsavel;
                    document.getElementById('telefoneContato').value = telefone;
                    document.getElementById('emailContato').value = email;
                    document.getElementById('diasParaVencer').value = parseInt(diasParaVencer);
                    document.getElementById('bandeira').value = bandeira;
                    document.getElementById('cnpj').value = cnpj;

                    //validade do certificado
                    document.getElementById('validade_certificado').value = moment(validade_certificado).format('YYYY-MM-DD');

                    //data da proxima notificacao (data do vencimento - 15)
                    const data = new Date(validade_certificado);
                    data.setDate(data.getDate() - 15);
                    const dataFormatada = data.toISOString().split('T')[0];
                    document.getElementById('dataProximaNotificacao').value = dataFormatada;

                    //dias pra vencer (validade - dia de hoje)
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


                        const dadosEdited = {
                            cnpj,
                            razaosocial: razaoSocial,
                            bandeira,
                            validade_certificado: validadeCertificado,
                            responsavel,
                            telefone: telefoneContato,
                            email: emailContato
                        };
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
                                    throw new Error(`Erro ao atualizar loja: ${response.statusText}`)
                                    console.log(cnpjOriginal)

                                }

                                return response.json()
                            })
                            .then(data => {
                                alert("Loja atualizada com sucesso!")
                                editModal.hide();
                                carregarLojas()
                            })
                            .catch(error => {
                                console.log(error)
                                console.log(cnpjOriginal)

                                alert(`Erro ao atualizar loja: ${error.message}`)
                            })
                    });
                    document.getElementById('editModal').addEventListener('hidden.bs.modal', function () {
                        document.getElementById('modalContainer').innerHTML = '';
                    });
                })
                .catch(error => console.error('Erro ao carregar o modal:', error));
        }
    });
});