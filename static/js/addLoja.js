document.querySelector('#add-cnpj-modal').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue += '.' + value.substr(0, 2);
    }

    if (value.length > 2) {
        formattedValue += '.' + value.substr(2, 3);
    }

    if (value.length > 5) {
        formattedValue += '.' + value.substr(5, 3);
    }

    if (value.length > 8) {
        formattedValue += '/' + value.substr(8, 4);
    }

    if (value.length > 12) {
        formattedValue += '-' + value.substr(12, 2);
    }

    e.target.value = formattedValue;
});