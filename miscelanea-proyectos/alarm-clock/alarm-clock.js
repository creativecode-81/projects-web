const currentTime = document.querySelector("h1"),
    content = document.querySelector(".content"),
    selectMenu = document.querySelectorAll("select"),
    setAlarmBtn = document.querySelector("button"),
    alarmImage = document.querySelector("img");

let alarmTime, isAlarmSet = false, isAlarmRinging = false;
const ringtone = new Audio("sounds/ringtone.mp3");
let alarmTimeout, repeatTimeout;

// Función para generar opciones del select
function generateOptions(selectElement, start, end, formatCallback) {
    for (let i = start; i <= end; i++) {
        let value = formatCallback ? formatCallback(i) : i.toString().padStart(2, '0');
        selectElement.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`);
    }
}

// Generar opciones para hora, minuto y AM/PM
generateOptions(selectMenu[0], 1, 12);           // Horas 12 a 01
generateOptions(selectMenu[1], 0, 59);           // Minutos 59 a 00
generateOptions(selectMenu[2], 0, 1, i => i === 0 ? "AM" : "PM"); // AM/PM

// Actualizar continuamente la hora y verificar la alarma
setInterval(() => {
    let now = new Date(), hours = now.getHours(), minutes = now.getMinutes(), seconds = now.getSeconds(), ampm = "AM";
    
    if (hours >= 12) {
        hours -= 12;
        ampm = "PM";
    }

    hours = hours === 0 ? 12 : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    currentTime.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

    if (isAlarmSet && alarmTime === `${hours}:${minutes} ${ampm}` && !isAlarmRinging) {
        startAlarm();
    }
});

// Función para iniciar la alarma
function startAlarm() {
    isAlarmRinging = true;
    ringtone.play();
    ringtone.loop = true;
    alarmImage.classList.add("animate-image");

    // Detener la alarma y animación después de 1 minuto
    alarmTimeout = setTimeout(() => {
        stopAlarm();

        if (isAlarmSet) {
            swal({
                title: "¡Alarma!",
                text: "La alarma volverá a sonar en 5 minutos",
                icon: "warning",
                button: "Aceptar",
                closeOnClickOutside: false
            });

            // Repetir la alarma después de 5 minutos
            repeatTimeout = setTimeout(() => {
                if (isAlarmSet) {
                    startAlarm();
                }
            }, 5 * 60 * 1000);
        }
    }, 60 * 1000); // Sonar por 1 minuto
}

// Función para detener la alarma y la animación
function stopAlarm() {
    isAlarmRinging = false;
    ringtone.pause();
    ringtone.loop = false;
    alarmImage.classList.remove("animate-image");

    // Limpiar los temporizadores para evitar que la alarma se repita o continúe después de detenerla
    clearTimeout(alarmTimeout);
    clearTimeout(repeatTimeout);
}

// Función para restablecer la alarma
function resetAlarm() {
    isAlarmSet = false;
    stopAlarm();  // Siempre detiene la alarma y la animación cuando se restablece
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Ajustar Alarma";
}

// Evento del botón para establecer o borrar la alarma
setAlarmBtn.addEventListener('click', () => {
    if (isAlarmSet) {
        // Restablecer la alarma
        resetAlarm();

        // Restablecer valores seleccionados a los valores predeterminados
        selectMenu.forEach(select => select.value = select.firstElementChild.value);

        return;
    }

    const currentDate = new Date();
    let selectedHour = parseInt(selectMenu[0].value);
    let selectedMinute = parseInt(selectMenu[1].value);
    let selectedAMPM = selectMenu[2].value;

    // Convertir la hora seleccionada a formato de 24 horas para comparar con la hora actual
    if (selectedAMPM === "PM" && selectedHour !== 12) selectedHour += 12;
    if (selectedAMPM === "AM" && selectedHour === 12) selectedHour = 0;

    // Comprobar si la hora seleccionada ya ha pasado
    if (currentDate.getHours() > selectedHour || 
        (currentDate.getHours() === selectedHour && currentDate.getMinutes() >= selectedMinute)) {
        return swal({
            title: "¡Configurar Alarma!",
            text: "No se puede configurar una alarma para una hora que ya ha pasado.",
            icon: "warning",
            button: "Aceptar",
            closeOnClickOutside: false
        });
    }

    const time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return swal({
            title: "¡Hora inválida!",
            text: "Por favor, seleccione una hora válida para configurar la alarma!",
            icon: "warning",
            button: "Aceptar",
            closeOnClickOutside: false
        });
    }

    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Borrar alarma";
});
