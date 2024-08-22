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
let current = 1;  // Controla el paso actual
let enterKeyEnabled = true;  // Controla el estado del evento "keydown"

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
function goToNextStep(button) {
    // Verifica si estamos en el último paso
    if (current > bullet.length) {
        return;  // No avanzamos más si hemos completado todos los pasos
    }

    button.click();
}

// Evento para detectar Enter en el primer paso
// inputField.addEventListener("keydown", function (event) {
//     if (event.key === "Enter" && enterKeyEnabled) {
//         validateAndAdvance(nextBtnFirst);
//     }
// });

function validateAndAdvance(button) {
    switch (current) {
        case 1:
            inputValue = inputField.value.trim();
            if (inputValue !== "" && !/\s/.test(inputValue) && /^(?:[1-9][0-9]{0,3}|5000)$/.test(inputValue) && parseInt(inputValue) >= 1 && parseInt(inputValue) <= 5000) {
                advanceStep(button);
            } else {
                showError("Cantidad Inválida", "Por favor, ingrese una cantidad válida (solo números entre 1 y 5000).", inputField);
            }
            break;
        case 2:
            // Valida el segundo paso (nombre y correo)
            if (validateStep2()) {
                advanceStep(button);
            }
            break;
        case 3:
            // Valida el tercer paso (método de pago)
            if (validateStep3()) {
                advanceStep(button);
            }
            break;
        case 4:
            // No avanzar más allá del último paso
            break;
    }
}

function advanceStep() {
    slidePage.style.marginLeft = `-${(current * 25)}%`;
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;

    // Desactiva la tecla Enter después de avanzar el primer paso
    enterKeyEnabled = false;
}

function showError(title, text, inputToFocus) {
    swal({
        title: title,
        text: text,
        icon: "error",
        button: "Aceptar",
        closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
    }).then(function () {
        // Enfocar en el input especificado después de que se cierre la alerta
        if (inputToFocus) {
            inputToFocus.focus();
        }
    });
}

let inputUser = '';
let inputEmail = '';

function validateStep2() {
    let isValid = true;
    let inputs = document.querySelectorAll(".page:nth-child(2) input");

    inputs.forEach(function (input) {
        if (input.type === "email") {
            inputEmail = input.value.trim();
            if (inputEmail === "") {
                isValid = false;
                showError("Datos Incompletos", "Por favor, complete todos los campos.", document.querySelector("input[type='email']"));
            } else if (!isValidEmail(inputEmail)) {
                isValid = false;
                showError("Correo Inválido", "Por favor, ingrese un correo electrónico válido.", document.querySelector("input[type='email']"));
            }
        } else {
            inputUser = input.value.trim();
            if (inputUser === "") {
                isValid = false;
                showError("Datos Incompletos", "Por favor, complete todos los campos.", document.querySelector("input[name='username']"));
            } else if (!isValidUsername(inputUser)) {
                isValid = false;
                showError("Nombre de Usuario Inválido", "Por favor, ingrese un nombre de usuario válido.", document.querySelector("input[name='username']"));
            }
        }

        // if (input.type === "text") {
        //     inputUser = input.value.trim();
        //     if (inputUser === "") {
        //         isValid = false;
        //         showError("Datos Incompletos", "Por favor, complete todos los campos.", document.querySelector("input[name='username']"));
        //     } else if (!isValidUsername(inputUser)) {
        //         isValid = false;
        //         showError("Nombre de Usuario Inválido", "Por favor, ingrese un nombre de usuario válido.", document.querySelector("input[name='username']"));
        //     }
        // } else {
        //     if (input.type === "email") {
        //         inputEmail = input.value.trim();
        //         if (inputEmail === "") {
        //             isValid = false;
        //             showError("Datos Incompletos", "Por favor, complete todos los campos.", document.querySelector("input[type='email']"));
        //         } else if (!isValidEmail(inputEmail)) {
        //             isValid = false;
        //             showError("Correo Inválido", "Por favor, ingrese un correo electrónico válido.", document.querySelector("input[type='email']"));
        //         }
        //     }
        // }
    });

    return isValid;
}

function validateStep3() {
    const radioInputs = document.querySelectorAll("input[type='radio']");
    let isRadioSelected = false;
    for (let i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            isRadioSelected = true;
            break;
        }
    }

    if (!isRadioSelected) {
        showError("Seleccione una Opción", "Por favor, seleccione una opción de pago.");
        return false;
    }

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
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

function isValidUsername(username) {
    const usernameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,20}$/;
    return usernameRegex.test(username);
}

nextBtnFirst.addEventListener("click", function (event) {
    event.preventDefault();
    validateAndAdvance(nextBtnFirst);
});

nextBtnSec.addEventListener("click", function (event) {
    event.preventDefault();
    validateAndAdvance(nextBtnSec);
});

nextBtnThird.addEventListener("click", function (event) {
    event.preventDefault();
    validateAndAdvance(nextBtnThird);
});

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (current <= bullet.length) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;

        // Proceso de la barra de progreso y transferencia
        startTransferProcess();
    }
});

function startTransferProcess() {
    const btnProgressBar = document.querySelector('.submit');
    function setButtonProgress(button, percent) {
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
                    }, 500);
                });
            }, 1000);
        }
    }

    let progress = 0;
    const progressInterval = setInterval(function() {
        setButtonProgress(btnProgressBar, progress);
        progress += 10;
    }, 500);
}

// Función para retroceder al paso anterior
function goToPrevStep(button) {
    if (current === 1) return; // No se puede retroceder desde el primer paso

    current -= 1;  // Decrementa el contador de pasos
    slidePage.style.marginLeft = `-${(current - 1) * 25}%`; // Ajusta el margen para mostrar el paso anterior

    // Actualiza la barra de progreso y los checks
    bullet[current].classList.remove("active");
    progressCheck[current].classList.remove("active");
    progressText[current].classList.remove("active");

    // Reactiva el evento "Enter" si estamos de vuelta en el primer paso
    if (current === 1) {
        enterKeyEnabled = true;
    }
}

// Manejo de los botones "Regresar"
prevBtnSec.addEventListener("click", function (event) {
    event.preventDefault();
    goToPrevStep(prevBtnSec);
});

prevBtnThird.addEventListener("click", function (event) {
    event.preventDefault();
    goToPrevStep(prevBtnThird);
});

prevBtnFourth.addEventListener("click", function (event) {
    event.preventDefault();
    goToPrevStep(prevBtnFourth);
});
