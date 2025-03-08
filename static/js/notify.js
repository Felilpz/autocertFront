document.getElementById('notify').addEventListener('click', function () {
    console.log('Notificacao clicada')

    // let responsavelPharmacy = 'Maicon Santana';
    let name = window.prompt('Digite seu nome: ')
    // const confirmation = window.confirm(`${name}, voce deseja fazer o envio manual da notificação para ${responsavelPharmacy} ?`)
    // if (confirmation) {
    //     console.log('Notificacao enviada com sucesso')
    // } else {
    //     console.log('Operacao cancelada')
    // }

    let days = document.querySelector('.dias-para-vencer p').textContent;
    // console.log(`${days}`)
    if (days >= 15) {
        const notificacaoConfirm = confirm(`${name}, deseja notificar a validade do certificado a certificaminas?`)
        if (notificacaoConfirm) {
            console.log('Notificacao enviada no grupo do whatsapp!')
        } else {
            console.log('Operacao cancelada')
        }
    }

    if (days <= 14) {
        const notificacaoConfirm = confirm(`${name}, deseja notificar o associado responsavel atraves do whatsapp e email?`)

        if (notificacaoConfirm) {
            console.log('Notificacao enviada no grupo do whatsapp!')
            console.log('Notificacao enviada para o email!')
        } else {
            console.log('Operacao cancelada')
        }
    }
})