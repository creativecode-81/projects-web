const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;
let enterKeyEnabled = true; // Variable para controlar el estado del evento "keydown"

// Código para la selección automática de los radio buttons
const cardRadio = document.getElementById("card");
const accountRadio = document.getElementById("account");

document.querySelectorAll(".card, .account").forEach(function (element) {
    element.addEventListener("click", function () {
        if (this.classList.contains("card")) {
            cardRadio.checked = true;
            accountRadio.checked = false;
        } else if (this.classList.contains("account")) {
            cardRadio.checked = false;
            accountRadio.checked = true;
        }
    });
});

const inputField = document.querySelector(".slide-page input[type='text']");
let inputValue = '';

// Función para avanzar al siguiente paso
function goToNextStep(e, button) {
    e.preventDefault();
    button.click();
}

// Evento para detectar Enter en el primer paso
inputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && enterKeyEnabled) {
        goToNextStep(e, nextBtnFirst);
    }
});

nextBtnFirst.addEventListener("click", function (e) {
    e.preventDefault();
    inputValue = inputField.value.trim();
    // Expresión regular que permite ingresar solo números entre 1 y 5000
    // Sin letras, espacios ni caracteres especiales.

    if (inputValue !== "" && !/\s/.test(inputValue) && /^(?:[1-9][0-9]{0,3}|5000)$/.test(inputValue) && parseInt(inputValue) >= 1 && parseInt(inputValue) <= 5000) {
        slidePage.style.marginLeft = "-25%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;

        // Deshabilitar el evento "keydown" para evitar que avance incorrectamente
        enterKeyEnabled = false;
    } else {
        swal({
            title: "Cantidad Inválida",
            text: "Por favor, ingrese una cantidad válida (solo números entre 1 y 5000).",
            icon: "error",
            button: "Aceptar",
            closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
        });
        
    }
});

let inputs = document.querySelectorAll(".page:nth-child(2) input");
let inputUser = '';
let inputEmail = '';

nextBtnSec.addEventListener("click", function (e) {
    e.preventDefault();

    isValid = true; // Reinicia la variable isValid a true antes de la validación

    inputs.forEach(function (input) {
        if (input.type === "email") {
            inputEmail = input.value.trim();
            if (inputEmail === "") {
                isValid = false;
                // Realiza alguna acción en caso de que el campo de correo esté vacío
                swal({
                    title: "Datos Incompletos",
                    text: "Por favor, complete todos los campos.",
                    icon: "error",
                    button: "Aceptar",
                    closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
                });
            } else if (!isValidEmail(inputEmail)) {
                isValid = false;
                // Realiza alguna acción en caso de que el campo de correo no tenga un formato válido
                swal({
                    title: "Correo Inválido",
                    text: "Por favor, ingrese un correo electrónico válido.",
                    icon: "error",
                    button: "Aceptar",
                    closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
                });
            }
        } else {
            inputUser = input.value.trim();
            if (inputUser === "") {
                isValid = false;
                // Realiza alguna acción en caso de que algún campo esté vacío
                swal({
                    title: "Datos Incompletos",
                    text: "Por favor, complete todos los campos.",
                    icon: "error",
                    button: "Aceptar",
                    closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
                });
            } else if (!isValidUsername(inputUser)) {
                isValid = false;
                // Realiza alguna acción en caso de que el nombre de usuario no cumpla con el formato deseado
                swal({
                    title: "Nombre de Usuario Inválido",
                    text: "Por favor, ingrese un nombre de usuario válido.",
                    icon: "error",
                    button: "Aceptar",
                    closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
                });
            }
        }
    });

    if (isValid) {
        slidePage.style.marginLeft = "-50%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
         // Deshabilitar el evento "keydown" para evitar que avance incorrectamente
         enterKeyEnabled = false;
    }
});

function isValidEmail(email) {
    // Expresión regular para validar el formato de un correo electrónico
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

function isValidUsername(username) {
    // Expresión regular para validar un nombre de usuario que contenga solo letras (con tildes) 
    // y cumpla con una longitud mínima de 3 y máxima de 20 caracteres, permitiendo espacios entre palabras.
    const usernameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,20}$/;
    return usernameRegex.test(username);
}


nextBtnThird.addEventListener("click", function (e) {
    e.preventDefault();

    // Verificar si se ha seleccionado una opción de radio
    const radioInputs = document.querySelectorAll("input[type='radio']");
    let isRadioSelected = false;
    for (let i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            isRadioSelected = true;
            break;
        }
    }

    if (!isRadioSelected) {
        swal({
            title: "Seleccione una Opción",
            text: "Por favor, seleccione una opción de pago.",
            icon: "warning",
            button: "Aceptar",
            closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
        });
        return;
    }

    slidePage.style.marginLeft = "-75%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    
    const spanElement = document.querySelector(".cant span");
    spanElement.textContent = inputValue;

    // Formatear el tipo de moneda y mostrarlo en el elemento <span>
    const cantidad = parseFloat(inputValue); // Convertir el valor de texto a un número
    const cantidadFormateada = cantidad.toLocaleString('es-PE', {
        style: 'currency',
        currency: 'PEN',
    });
    spanElement.textContent = cantidadFormateada;

    // Mostrar el nombre de usuario y correo electrónico en los elementos de <span>
    const spanUser = document.querySelector(".user span");
    const spanEmail = document.querySelector(".mail span");

    spanUser.textContent = inputUser;
    spanEmail.textContent = inputEmail;

    // Mostrar el método de pago seleccionado en el elemento <span>
    const selectedMethodId = document.querySelector("input[type='radio']:checked").id;
    const label = document.querySelector(`label[for='${selectedMethodId}']`);
    const spanPaymentMethod = document.querySelector(".pay span");

    spanPaymentMethod.textContent = label.textContent;

});


submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevenir la recarga de la página
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;

    // Agrega el código de la barra de progreso aquí
    const btnProgressBar = document.querySelector('.submit');
    function setButtonProgress (button, percent) {
        const textElement = document.querySelector('.button_text');
        button.querySelector('.button_progress').style.width = `${percent}%`;

        if (percent >= 0) {
            textElement.textContent = button.dataset.progressText;
        }

        if (percent >= 100) {
            textElement.textContent = button.dataset.completeText;
            clearInterval(progressInterval);

            setTimeout(function () {
                swal({
                    title: "Transferencia completada",
                    text: "Gracias por confiar en nosotros",
                    icon: "success",
                    button: "Aceptar",
                    closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
                }).then(function () {
                    setTimeout(function () {
                        document.location.reload();
                    }, 500); // Retrasa la recarga de la página durante 1 segundo
                });
            }, 1000); // Retrasa la aparición del SweetAlert durante 1 segundo
        }
    }

    let progress = 0;
    const progressInterval = setInterval(function() {
        setButtonProgress(btnProgressBar, progress);
        progress += 10; // Incrementa el progreso en un valor determinado (puedes ajustarlo según tus necesidades)
    }, 500); // Ajusta el intervalo de tiempo (en milisegundos) para cada incremento de progreso
});



prevBtnSec.addEventListener("click", function (e) {
    e.preventDefault();
    slidePage.style.marginLeft = "0%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

prevBtnThird.addEventListener("click", function (e) {
    e.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

prevBtnFourth.addEventListener("click", function (e) {
    e.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});