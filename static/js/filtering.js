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