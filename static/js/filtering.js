document.getElementById('confirm-filters').addEventListener('click', function () {
    console.log('click filtro funcionando');
    let flagSelected = document.getElementById('filter-by-flag').value.trim();
    let ownerSelected = document.getElementById('filter-owner').value.trim();
    
    const filters = {
        flagSelected,
        ownerSelected
    };
    
    console.log('filtros selecionados:', filters);
    applyFilters(filters);
    
    document.getElementById('filter-form').reset();
    let modal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
    modal.hide();
});

function applyFilters(filters) {
    const lojas = document.querySelectorAll('.loja-exemplo');
    
    lojas.forEach(loja => {
        const bandeira = loja.dataset.bandeira;
        const responsavel = loja.dataset.responsavel;
        
        let shouldShow = true;
        
        if (filters.flagSelected && bandeira !== filters.flagSelected) {
            shouldShow = false;
        }
        
        if (filters.ownerSelected && responsavel !== filters.ownerSelected) {
            shouldShow = false;
        }
        
        loja.style.display = shouldShow ? 'flex' : 'none';
    });
}

async function loadOwners() {
    try {
        const response = await fetch('http://127.0.0.1:5000/responsaveis');
        if (!response.ok) {
            throw new Error('Erro ao carregar responsáveis');
        }
        const responsaveis = await response.json();
        
        const ownerSelect = document.getElementById('filter-owner');
        ownerSelect.innerHTML = '<option value="">Selecionar associado</option>';
        
        responsaveis.forEach(responsavel => {
            const option = document.createElement('option');
            option.value = responsavel;
            option.textContent = responsavel;
            ownerSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar responsáveis:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadOwners();
    
    const clearFiltersBtn = document.createElement('button');
    clearFiltersBtn.textContent = 'Limpar Filtros';
    clearFiltersBtn.className = 'btn-clear-filters';
    clearFiltersBtn.addEventListener('click', clearFilters);
    
    const modalFooter = document.querySelector('#filterModal .modal-footer');
    modalFooter.insertBefore(clearFiltersBtn, modalFooter.lastElementChild);
});

function clearFilters() {
    document.getElementById('filter-form').reset();
    
    const lojas = document.querySelectorAll('.loja-exemplo');
    lojas.forEach(loja => {
        loja.style.display = 'flex';
    });
    
    console.log('Filtros limpos');
}