const currentTime = document.querySelector("h1"),
    content = document.querySelector(".content"),
    selectMenu = document.querySelectorAll("select"),
    setAlarmBtn = document.querySelector("button"),
    alarmImage = document.querySelector("img");

let rotation = 0;
let alarmTime, isAlarmSet, isAlarmRinging = false, ringtone = new Audio("tones/Sonido-Despertador.mp3");

// Construir opciones para una lista desplegable que contiene números del 12 al 01
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Construir opciones para un segundo elemento de lista desplegable, 
// Conteniendo números desde 59 hasta 00
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i; // Si es menor que 10, se formatea los números a un solo dígito
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Construir opciones para un tercer elemento de lista desplegable, 
// Permitiendo seleccionar entre "AM" y "PM"
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Ahora vamos a actualizar continuamente la hora actual según el elemento HTML (currentTime) 
// Y verifica si la hora actual coincide con el tiempo establecido para la alarma (alarmTime). 
// Si la hora coincide y la alarma no está sonando, reproduce el tono de la alarma, realiza una animación visual
// Y muestra un mensaje de alerta. Luego, espera 5 minutos para volver a sonar 
// Antes de permitir que se configure una nueva alarma.
setInterval(() => {
    let now = new Date(), hours = now.getHours(), minutes = now.getMinutes(), seconds = now.getSeconds(), ampm = "AM";
    
    if (hours >= 12) {
        hours = hours - 12;
        ampm = "PM";
    }
    hours = hours == 0 ? (h = 12) : hours;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    currentTime.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;

    if (alarmTime === `${hours}:${minutes} ${ampm}`) {
        if (!isAlarmRinging) {
            ringtone.play();
            ringtone.loop = true;
            isAlarmRinging = true;

            // Rotar la imagen
            alarmImage.classList.add("animate-image");

            setTimeout(() => {
                ringtone.pause();
                isAlarmRinging = false;

                // Remover la clase "animate-image"
                alarmImage.classList.remove("animate-image");

                swal({
                    title: "¡Alarma!",
                    text: "La alarma volverá a sonar en 5 minutos",
                    icon: "warning",
                    button: "Aceptar",
                    closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
                });

                // Después de que la alarma haya sonado y pasado el periodo de 5 minutos, 
                // la configuración de la alarma se restablecerá, permitiendo que se establezca una nueva alarma 
                // Sin tener que recargar la página.
                setTimeout(() => {
                    if (isAlarmSet) {
                        ringtone.play();
                        ringtone.loop = true;
                        isAlarmRinging = true;

                        setTimeout(() => {
                            ringtone.pause();
                            isAlarmRinging = false;
                            // Habilitar nuevamente la configuración para establecer una nueva alarma
                            isAlarmSet = false;
                            content.classList.remove("disable");
                            setAlarmBtn.innerText = "Ajustar Alarma";
                        }, 60 * 1000); // Detener la alarma después de 1 minuto
                    }
                }, 5 * 60 * 1000); // Esperar 5 minutos para que la alarma vuelva a sonar
            }, 60 * 1000); // Esperar 1 minuto para detener la alarma
        }
    }
});

function setAlarm() {
    let currentDate = new Date();
    let selectedHour = parseInt(selectMenu[0].value);
    let selectedMinute = parseInt(selectMenu[1].value);
    let selectedAMPM = selectMenu[2].value;

    // Convertir la hora seleccionada a formato de 24 horas para comparar con la hora actual
    if (selectedAMPM === "PM" && selectedHour !== 12) {
        selectedHour += 12;
    } else if (selectedAMPM === "AM" && selectedHour === 12) {
        selectedHour = 0;
    }

    // Comprobar si la hora seleccionada ya ha pasado
    if (currentDate.getHours() > selectedHour ||
        (currentDate.getHours() === selectedHour &&
            currentDate.getMinutes() >= selectedMinute)) {
        return swal({
            title: "¡Configurar Alarma!",
            text: "No se puede configurar una alarma para una hora que ya ha pasado.",
            icon: "warning",
            button: "Aceptar",
            closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
        });
    }

    if (isAlarmSet) {
        // Restablecer la alarma a los valores predeterminados
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Ajustar Alarma";
        isAlarmRinging = false;

        // Restablecer valores seleccionados a los valores predeterminados
        for (let select of selectMenu) {
            select.value = select.firstElementChild.value;
        }

        //return (isAlarmSet = false);
        isAlarmSet = false;  // <-- Añadido para indicar que la alarma no está configurada
        return;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) 
    {
        return swal({
            title: "¡Hora inválida!",
            text: "Por favor, seleccione una hora válida para configurar la alarma!",
            icon: "warning",
            button: "Aceptar",
            closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
        });
        
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Borrar alarma";
}

setAlarmBtn.addEventListener("click", setAlarm);
















// function setAlarm() {
//     const currentDate = new Date();
//     const selectedHour = parseInt(selectMenu[0].value);
//     const selectedMinute = parseInt(selectMenu[1].value);
//     const selectedAMPM = selectMenu[2].value;

//     Convertir la hora seleccionada a formato de 24 horas para comparar con la hora actual
//     function convertTo24Hour(selectedHour, selectedAMPM) {
//         if (selectedAMPM === "PM" && selectedHour !== 12) {
//             selectedHour += 12;
//         } else if (selectedAMPM === "AM" && selectedHour === 12) {
//             selectedHour = 0;
//         }
//         return selectedHour;
//     }

//     Comprobar si la hora seleccionada ya ha pasado
//     function isAlarmTimeValid(currentDate, selectedHour, selectedMinute) {
//         return (
//             currentDate.getHours() < selectedHour ||
//             (currentDate.getHours() === selectedHour &&
//                 currentDate.getMinutes() < selectedMinute)
//         );
//     }

//     function resetAlarm() {
//         Restablecer la alarma a los valores predeterminados
//         alarmTime = "";
//         ringtone.pause();
//         content.classList.remove("disable");
//         setAlarmBtn.innerText = "Ajustar Alarma";
//         isAlarmRinging = false;

//         Restablecer valores seleccionados a los valores predeterminados
//         for (let select of selectMenu) {
//             select.value = select.firstElementChild.value;
//         }
//         isAlarmSet = false;
//     }

//     let isAlarmSet = alarmTime !== "";

//     if (isAlarmSet) {
//         resetAlarm();
//         return;
//     }

//     const selectedHour24 = convertTo24Hour(selectedHour, selectedAMPM);

//     if (!isAlarmTimeValid(currentDate, selectedHour24, selectedMinute)) {
//         return alert("No se puede configurar una alarma para una hora que ya ha pasado.");
//     }

//     const time = `${selectedHour}:${selectedMinute} ${selectedAMPM}`;

//     if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
//         return alert("Por favor, seleccione una hora válida para configurar la alarma!");
//     }

//     alarmTime = time;
//     content.classList.add("disable");
//     setAlarmBtn.innerText = "Borrar alarma";
// }

// setAlarmBtn.addEventListener("click", setAlarm);
