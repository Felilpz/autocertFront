// date
let dayoftheweek = document.querySelector('.dayoftheweek');
let dayofthemonth = document.querySelector('.dayofthemonth');
let month = document.querySelector('.month');
let year = document.querySelector('.year');

// time
let hour = document.querySelector('.hour');
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');

function updateDateAndTime() {
    const now = new Date();
    const dayofweekS = now.getDay();
    const dayofmonthS = now.getDate();
    const monthS = now.getMonth();
    const yearS = now.getFullYear();

    const hourS = now.getHours();
    const minuteS = now.getMinutes();
    const secondS = now.getSeconds();

    // switch case for day of the wek
    switch (dayofweekS) {
        case 0:
            dayoftheweek.textContent = 'Domingo';
            break;
        case 1:
            dayoftheweek.textContent = 'Segunda-Feira';
            break;
        case 2:
            dayoftheweek.textContent = 'Terça-Feira';
            break;
        case 3:
            dayoftheweek.textContent = 'Quarta-Feira';
            break;
        case 4:
            dayoftheweek.textContent = 'Quinta-Feira';
            break;
        case 5:
            dayoftheweek.textContent = 'Sexta-Feira';
            break;
        case 6:
            dayoftheweek.textContent = 'Sábado';
            break;
    }

    //switch case for month
    switch (monthS) {
        case 0:
            month.textContent = 'Janeiro';
            break;
        case 1:
            month.textContent = 'Fevereiro';
            break;
        case 2:
            month.textContent = 'Março';
            break;
        case 3:
            month.textContent = 'Abril';
            break;
        case 4:
            month.textContent = 'Maio';
            break;
        case 5:
            month.textContent = 'Junho';
            break;
        case 6:
            month.textContent = 'Julho';
            break;
        case 7:
            month.textContent = 'Agosto';
            break;
        case 8:
            month.textContent = 'Setembro';
            break;
        case 9:
            month.textContent = 'Outubro';
            break;
        case 10:
            month.textContent = 'Novembro';
            break;
        case 11:
            month.textContent = 'Dezembro';
            break;
    }

    // update in html
    dayofthemonth.textContent = dayofmonthS;
    year.textContent = yearS;
    hour.textContent = hourS.toString().padStart(2, '0');
    minute.textContent = minuteS.toString().padStart(2, '0');
    second.textContent = secondS.toString().padStart(2, '0');
}

updateDateAndTime();
setInterval(updateDateAndTime, 1000);