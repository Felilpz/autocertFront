document.querySelector('.side-right-content').addEventListener('click', function (event) {
    // Verifica se o botão clicado é o "notify"
    if (event.target.closest('.button-enviar')) {
        console.log('Notificacao clicada');

        let name = window.prompt('Digite seu nome: ');
        let days = document.querySelector('.dias-para-vencer p').textContent;

        if (days >= 15) {
            const notificacaoConfirm = confirm(`${name}, deseja notificar a validade do certificado a certificaminas?`);
            if (notificacaoConfirm) {
                console.log('Notificacao enviada no grupo do whatsapp!');
                alert('Notificacao enviada no whatsapp do associado responsavel!');
            } else {
                console.log('Operacao cancelada');
            }
        }

        if (days <= 14) {
            const notificacaoConfirm = confirm(`${name}, deseja notificar o associado responsavel atraves do whatsapp e email?`);
            if (notificacaoConfirm) {
                console.log('Notificacao enviada no grupo do whatsapp!');
                console.log('Notificacao enviada para o email!');
                alert('Notificacao enviada no grupo do whatsapp!');
                alert('Notificacao enviada para o email!');
            } else {
                console.log('Operacao cancelada');
            }
        }
    }
});