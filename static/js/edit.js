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


document.getElementById('confirm-filters').addEventListener('click', function () {
    console.log('click filtro funcionando')

    let flagSelected = document.getElementById('filter-by-flag').value.trim()
    let ownerSelected = document.getElementById('filter-owner').value.trim()

    const filters = {
        flagSelected,
        ownerSelected
    }

    console.log('filtros selecionados:', filters)
    document.getElementById('filter-form').reset();

    // let modal = document.getElementById('filterModal')
    // modal.style.display = 'none'

    let modal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
    modal.hide();
})