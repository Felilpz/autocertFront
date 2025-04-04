fetch(apiurl)
    .then(response => response.json())
    .then(data => {

        const lojasVencendo = data.reduce((acc, loja) => {
            // a logica nao pode ser baseada no resltado do array, preciso primeiro pegar a a validade_certificado e e fazer todos os calculos até que me retorne o o valor <= 15 dias. nao posso tambem esquecer de 
            if (differenceUntilToday(loja.validade_certificado) <= 15) {
                return acc + 1;
            }
            return acc;
        }, 0);
        document.getElementById('lojasVencendo').textContent = lojasVencendo;
    })
    .catch(error => console.error("erro no carregar das lojas:", error));

document.addEventListener('DOMContentLoaded', function () {
    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            const lojasVencendo = data.reduce((acc, loja) => {
                if (differenceUntilToday(loja.validade_certificado) <= 15) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            document.getElementById('lojasVencendo').textContent = lojasVencendo;
        })
        .catch(error => console.error("erro no carregar das lojas", error));

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {

            const lojasVencendo = data.filter(loja => {
                return differenceUntilToday(loja.validade_certificado) <= 15;
            });


            const modalBody = document.getElementById('corpoLojasVencendo')
            modalBody.innerHTML = '';

            lojasVencendo.forEach(loja => {
                const lojaElement = document.createElement('div');
                lojaElement.innerHTML = `
                <div>
                    <p class="cnpj">CNPJ: ${loja.cnpj}</p>
                </div>
                <div>
                    <p class="razao-social">Razao Social: ${loja.razaosocial}</p>
                </div>
                `;
                modalBody.appendChild(lojaElement);
            });
        })
});
