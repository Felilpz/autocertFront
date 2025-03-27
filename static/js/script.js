// /home/felilpz/Desktop/projetos/autocertFront/static/js/script.js
let apiurl = 'http://127.0.0.1:5000/lojas';

function carregarLojas() {
    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.side-right-content');
            // container.innerHTML = ''; // REMOVA ESTA LINHA
            const mainDiv = document.getElementById('mainDiv'); // PEGA O mainDiv

            // Limpa apenas as linhas de lojas existentes (se houver)
            const existingRows = container.querySelectorAll('.loja-exemplo');
            existingRows.forEach(row => row.remove());

            data.forEach(loja => {
                const lojaRow = exibirNovaLoja(loja); // CRIA A LINHA DA LOJA
                container.insertBefore(lojaRow, mainDiv.nextSibling); // INSERE APÓS O mainDiv
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
    // console.log(loja.responsavel)
    newPharmacyElement.dataset.telefone = loja.telefone;
    newPharmacyElement.dataset.email = loja.email;
    newPharmacyElement.dataset.diasParaVencer = 14;

    newPharmacyElement.innerHTML = `
            <div class="cnpj">
                <p>${loja.cnpj}</p>
            </div>
            <div class="razao-social">
                <p>${loja.razaosocial}</p>
            </div>
            <div class="dias-para-vencer">
                <p>14</p>
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

export { carregarLojas };
