import { limitarCaracteres, validateEmail } from './utils.js';
// import { formatDate } from './date.js';

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

                    document.getElementById('cnpj').value = cnpj;
                    document.getElementById('razaoSocial').value = razaoSocial;
                    document.getElementById('nomeResponsavel').value = responsavel;
                    document.getElementById('telefoneContato').value = telefone;
                    document.getElementById('emailContato').value = email;
                    document.getElementById('diasParaVencer').value = parseInt(diasParaVencer);
                    document.getElementById('bandeira').value = bandeira;

                    //validade do certificado
                    document.getElementById('validade_certificado').value = new Date(validade_certificado).toISOString().split("T")[0];

                    //data da proxima notificacao (data do vencimento - 15)
                    const data = new Date(validade_certificado);
                    data.setDate(data.getDate() - 15);
                    const dataFormatada = data.toISOString().split('T')[0];
                    console.log(dataFormatada);
                    document.getElementById('dataProximaNotificacao').value = dataFormatada;

                    //dias pra vencer (validade - dia de hoje)
                    const validadeCertificado = new Date(validade_certificado)
                    const hoje = new Date()
                    const milisec = validadeCertificado - hoje
                    const diasCalc = Math.ceil(milisec / (1000 * 60 * 60 * 24))
                    console.log(diasCalc)
                    document.getElementById('diasParaVencer').value = diasCalc





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
                        let validadeCertificado = document.getElementById('validadeCertificado').value.trim();
                        let responsavel = document.getElementById('nomeResponsavel').value.trim();
                        let telefoneContato = document.getElementById('telefoneContato').value.trim();
                        let emailContato = document.getElementById('emailContato').value.trim();

                        const dadosEdited = {
                            cnpj,
                            razaosocial,
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
                        if (cnpj.length !== 14) {
                            alert('O CNPJ deve conter 14 dígitos.');
                            return;
                        }
                        if (telefoneContato.length !== 11) {
                            alert('O telefone deve conter 11 dígitos.');
                            return;
                        }
                        if (!validateEmail(emailContato)) {
                            alert('formato de email invalido.');
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
