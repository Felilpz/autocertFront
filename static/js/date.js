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
    const diasDaSemana = {
        0: 'Domingo',
        1: 'Segunda-Feira',
        2: 'Terça-Feira',
        3: 'Quarta-Feira',
        4: 'Quinta-Feira',
        5: 'Sexta-Feira',
        6: 'Sábado'
    }

    dayoftheweek.textContent = diasDaSemana[dayofweekS];


    //switch case for month
    const monthNames = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro'
    };

    month.textContent = monthNames[monthS];
    console.log()


    // update in html
    dayofthemonth.textContent = dayofmonthS;
    year.textContent = yearS;
    hour.textContent = hourS.toString().padStart(2, '0');
    minute.textContent = minuteS.toString().padStart(2, '0');
    second.textContent = secondS.toString().padStart(2, '0');
}


//storing date
const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const monthNumber = (today.getMonth() + 1).toString().padStart(2, '0');
const yearNumber = today.getFullYear().toString();

const todayFormatted = `${yearNumber}-${monthNumber}-${day}`;
console.log(todayFormatted)


updateDateAndTime();
setInterval(updateDateAndTime, 1000);

export { todayFormatted }