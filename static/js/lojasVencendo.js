const apiurl = 'http://127.0.0.1:5000/lojas';
fetch(apiurl)
    .then(response => response.json())
    .then(data => {
        const lojasVencendo = data.reduce((acc, loja) => {
            // a logica nao pode ser baseada no resltado do array, preciso primeiro pegar a a validade_certificado e e fazer todos os calculos até que me retorne o o valor <= 15 dias. nao posso tambem esquecer de 
            if (loja.diasParaVencer <= 15) {
                return acc + 1;
            }
            return acc;
        }, 0);
        document.getElementById('lojasVencendo').textContent = lojasVencendo;
    })
    .catch(error => console.error("erro no carregar das lojas:", error));

document.addEventListener('DOMContentLoaded', function () {
    const apiurl = 'http://127.0.0.1:5000/lojas';
    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            const lojasVencendo = data.reduce((acc, loja) => {
                if (loja.diasParaVencer <= 15) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            document.getElementById('lojasVencendo').textContent = lojasVencendo;
        })
        .catch(error => console.error("erro no carregar das lojas", error));
});