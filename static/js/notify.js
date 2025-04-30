document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.side-right-content').addEventListener('click', function(event) {
        if (event.target.closest('.button-enviar')) {
            const button = event.target.closest('.button-enviar');
            const lojaDiv = button.closest('.loja-exemplo');
            const cnpj = lojaDiv.dataset.cnpj;

            if (confirm("Você realmente deseja marcar esta loja como notificada?")) {
                fetch(`${apiurl}/${cnpj}/notificar`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notificacao: true })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na notificação da loja');
                    }
                    return response.json();
                })
                .then(data => {
                    applyStyle(lojaDiv);
                    location.reload()
                })
                .catch(error => {
                    console.error("Erro ao enviar notificação:", error);
                    alert('Erro ao enviar notificação');
                });
            }
        }
    });
});
