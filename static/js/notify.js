document.getElementById('notify').addEventListener('click', function () {
    console.log('Notificacao clicada')

    const confirmation = window.confirm('Voce deseja fazer o envio manual da notificação para *** ?')
    if (confirmation) {
        console.log('Notificacao enviada com sucesso')
    } else {
        console.log('Operacao cancelada')
    }
})