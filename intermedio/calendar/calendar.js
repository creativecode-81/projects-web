// Obtener elementos del DOM
const dateElement = document.querySelector('.date');
const daysList = document.querySelector('.days');
const nextIcons = document.querySelectorAll('.icons i');

let date = new Date(),
year = date.getFullYear(),
month = date.getMonth();

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


const calendar = () => {
    let firstDateOfMonth = new Date(year, month, 1).getDay(); // Obtener el primer día de la semana
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // Obtener la última fecha del mes
    let lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay(); // Obtener la última fecha del mes
    let lastDateOfLastMonth = new Date(year, month, 0).getDate(); // Obtener la última fecha del mes anterior
    let html = '';

    for (let i = firstDateOfMonth; i > 0; i--) { // Creando la etiqueta li del mes anterior => últimos días
        html += `<li class='inactive'>${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) { // Creando la etiqueta li de todos los días del mes actual
        let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'active' : '';
        html += `<li class='${isToday}'>${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) { // Creando la etiqueta li del próximo mes => primeros días
        html += `<li class='inactive'>${i - lastDayOfMonth + 1}</li>`;
    }

    dateElement.innerText = `${months[month]} ${year}`;
    daysList.innerHTML = html;
}

calendar();

nextIcons.forEach(icon => { // Agregar evento de clic en ambos íconos
    icon.addEventListener('click', () => {
        // si el icono en el que se hizo clic es el icono anterior, el mes actual se reduce en 1;
        // de lo contrario, se incrementa en 1
        month = icon.id === 'icon_left' ? month - 1 : month + 1;

        // si el mes actual es menor que 0 o mayor que 11
        if (month < 0 || month > 11) {
            // Creando una nueva fecha del año y mes actual y pasándola como valor de fecha
            date = new Date(year, month);
            year = date.getFullYear(); // Actualización del año actual con nueva fecha año
            month = date.getMonth(); // Actualización del mes actual con el nuevo mes de fecha
        } else { // De lo contrario, pase la nueva fecha como valor de fecha
            date = new Date();
        }
        calendar();
    });
});