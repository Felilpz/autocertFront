function carregarLojas() {
    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.side-right-content');
            const mainDiv = document.getElementById('mainDiv');

            const existingRows = container.querySelectorAll('.loja-exemplo');
            existingRows.forEach(row => row.remove());

            data.sort((a, b) => {
                const dateA = new Date(a.validade_certificado);
                const dateB = new Date(b.validade_certificado);

                return dateA - dateB;
            });

            data.forEach(loja => {
                const lojaRow = exibirNovaLoja(loja);
                container.appendChild(lojaRow);
            });
        })
        .catch(error => console.error("Erro ao carregar lojas:", error));
}

function exibirNovaLoja(loja) {
    const newPharmacyElement = document.createElement('div');
    newPharmacyElement.classList.add('loja-exemplo');

    newPharmacyElement.dataset.cnpj = loja.cnpj;
    newPharmacyElement.dataset.razaoSocial = loja.razaosocial;
    newPharmacyElement.dataset.bandeira = loja.bandeira;
    newPharmacyElement.dataset.responsavel = loja.responsavel;
    newPharmacyElement.dataset.telefone = loja.telefone;
    newPharmacyElement.dataset.email = loja.email;
    newPharmacyElement.dataset.validade_certificado = loja.validade_certificado;

    if (loja.notificacao) {
        newPharmacyElement.dataset.notificacao = 'true';
    } else {
        newPharmacyElement.dataset.notificacao = 'false';
    }

    const diffDays = differenceUntilToday(loja.validade_certificado);
    newPharmacyElement.dataset.diasParaVencer = diffDays;

    if (diffDays <= 2) {
        newPharmacyElement.classList.add('vencimento-critico');
    } else if (diffDays <= 15) {
        newPharmacyElement.classList.add('proximo-vencimento');
    }

    newPharmacyElement.innerHTML = `
        <div class="cnpj">
            <p>${loja.cnpj}</p>
        </div>
        <div class="razao-social">
            <p>${loja.razaosocial}</p>
        </div>
        <div class="dias-para-vencer">
            <p>${diffDays}</p>
        </div>
        <div class="buttons-to-act">
            <button type="button" class="button-editar">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button type="button" class="button-enviar" id="notify">
                <i class="bi bi-bell-fill"></i>
            </button>
        </div>
    `;

    if (diffDays <= 5) {
        const diasElement = newPharmacyElement.querySelector('.dias-para-vencer');
        if (diasElement) {
            diasElement.style.fontWeight = 'bold';
            diasElement.style.fontStyle = 'italic';
        }
    }

    if (loja.notificacao === true) {
        applyStyle(newPharmacyElement);
    }

    return newPharmacyElement;
}

function applyStyle(lojaDiv) {
    removeStyle(lojaDiv);
    
    if (!lojaDiv.querySelector('.notificado-badge')) {
        const badge = document.createElement('div');
        badge.classList.add('notificado-badge');
        badge.textContent = 'NOTIFICADO';
        
        lojaDiv.appendChild(badge);
    }
}


function removeStyle(lojaDiv) {
    const elementos = lojaDiv.querySelectorAll('p');
    elementos.forEach(elemento => {
        elemento.style.fontStyle = 'normal';
    });
    
    lojaDiv.style.border = 'none';
    
    const badge = lojaDiv.querySelector('.notificado-badge');
    if (badge) {
        badge.remove();
    }
}

document.addEventListener("DOMContentLoaded", carregarLojas);
