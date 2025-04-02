import { todayFormatted } from './date.js';
import { validade_certificado } from './addLoja.js';


// /home/felilpz/Desktop/projetos/autocertFront/static/js/script.js
let apiurl = 'http://127.0.0.1:5000/lojas';




function carregarLojas() {
    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.side-right-content');
            // container.innerHTML = '';
            const mainDiv = document.getElementById('mainDiv');

            // Limpa apenas as linhas de lojas existentes (se houver)
            const existingRows = container.querySelectorAll('.loja-exemplo');
            existingRows.forEach(row => row.remove());

            data.forEach(loja => {
                const lojaRow = exibirNovaLoja(loja);
                container.insertBefore(lojaRow, mainDiv.nextSibling);
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
    newPharmacyElement.dataset.validade_certificado = loja.validade_certificado;
    // newPharmacyElement.dataset.diasParaVencer = 14;
    const validadeCertificado = new Date(loja.validade_certificado)
    const hoje = new Date()
    const milisec = new Date(validadeCertificado - hoje)
    const diasCalc = Math.ceil(milisec / (1000 * 60 * 60 * 24))


    newPharmacyElement.innerHTML = `
            <div class="cnpj">
                <p>${loja.cnpj}</p>
            </div>
            <div class="razao-social">
                <p>${loja.razaosocial}</p>
            </div>
            <div class="dias-para-vencer">
                <p>${diasCalc}</p>
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
