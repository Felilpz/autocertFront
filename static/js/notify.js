document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.side-right-content').addEventListener('click', function(event) {
        if (event.target.closest('.button-enviar')) {
            const button = event.target.closest('.button-enviar');
            const lojaDiv = button.closest('.loja-exemplo');
            const cnpj = lojaDiv.dataset.cnpj;
            
            const estaNotificada = lojaDiv.dataset.notificacao === 'true';
            const acao = estaNotificada ? 'desnotificar' : 'notificar';
            const novoStatus = !estaNotificada;
            
            const mensagem = estaNotificada 
                ? "Você realmente deseja DESNOTIFICAR esta loja?" 
                : "Você realmente deseja marcar esta loja como NOTIFICADA?";
            
            if (confirm(mensagem)) {
                fetch(`${apiurl}/${cnpj}/notificar`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notificacao: novoStatus })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na notificação da loja');
                    }
                    return response.json();
                })
                .then(data => {
                    lojaDiv.dataset.notificacao = novoStatus.toString();
                    
                    if (novoStatus) {
                        applyStyle(lojaDiv);
                    } else {
                        removeStyle(lojaDiv);
                    }
                    
                    location.reload();
                })
                .catch(error => {
                    console.error("Erro ao enviar notificação:", error);
                    alert('Erro ao enviar notificação');
                });
            }
        }
    });
});