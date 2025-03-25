document.getElementById('remove-cnpj').addEventListener('click', async function () {
    console.log('click funcionando');

    const cnpjInput = document.getElementById('remove-cnpj-modal').value.trim();
    console.log(`CNPJ para remover: ${cnpjInput}`);

    if (!cnpjInput) {
        alert('Por favor, insira um CNPJ válido.');
        return;
    }

    const confirmarRemocao = confirm('Tem certeza que deseja remover esta loja?');

    if (confirmarRemocao) {
        try {
            const response = await fetch('/lojas/desativar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cnpj: cnpjInput }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Loja removida com sucesso!');
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error('Erro ao remover loja:', error);
            alert('Erro ao tentar remover a loja.');
        }
    } else {
        console.log('Operação cancelada');
    }

    document.getElementById('remove-form').reset();
});
