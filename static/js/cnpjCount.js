function cnpjCount() {
    const cnpjCount = document.getElementById('cnpjCount').innerHTML
    const cnpjCountNumber = parseInt(cnpjCount)
    // console.log(cnpjCount, typeof cnpjCount)
    // console.log(cnpjCountNumber)

    const apiurl = 'http://127.0.0.1:5000/lojas'
    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            const count = data.length;
            document.getElementById('cnpjCount').textContent = count;
        })
        .catch(error => console.error("Erro ao carregar lojas:", error));


}

addEventListener("DOMContentLoaded", cnpjCount());