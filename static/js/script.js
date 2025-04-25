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
    return newPharmacyElement;
}

document.addEventListener("DOMContentLoaded", carregarLojas);