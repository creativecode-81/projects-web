const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".btn-number");
const clearButton = document.getElementById("clear");
const okButton = document.getElementById("ok");
const usePIN = document.querySelector(".usePIN");
const digit = document.querySelector(".digit");

/* Modo Dark and Ligth */
const themeToggleBtn = document.querySelector(".theme-toggler");
const pattern_lock = document.querySelector(".pattern_lock");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;

// Inicializar variables
let currentValue = "";
let pin = "";

// Función para manejar los clicks en los botones de números
function handleNumberClick(e) {
    const number = e.target.textContent;
    currentValue += number;
    display.textContent = currentValue.replace(/[0-9]/g, '*');
    pin = currentValue;
}

// Función para manejar el click en el botón "Clear"
function handleClearClick() {
    // Eliminar el último carácter de la cadena currentValue
    currentValue = currentValue.slice(0, -1);

    // Actualizar el valor del display
    display.textContent = currentValue.replace(/[0-9]/g, '*');

    // Restablecer el valor del display si currentValue es vacío
    if (currentValue === '') {
        display.textContent = '';
        usePIN.style.display = "block";
        digit.style.display = "block";
    }
    // Ocultar las etiquetas de clase .usePIN y .digit
    else {
        usePIN.style.display = "none";
        digit.style.display = "none";
    }
}

// Función para actualizar el valor del display a una cadena vacía
function clearDisplay() {
    currentValue = ''; // Limpiar el valor de currentValue
    display.textContent = ''; // Limpiar el valor del display
}

// Función para manejar el click en el botón "OK"
function handleOkClick() {
    // Verificar que se haya ingresado un PIN
    if (currentValue === '') {
        alert("No se ingresó ningún PIN.");
        return;
    }

    // Verificar que el PIN tenga al menos 4 dígitos
    if (pin.length < 4) {
        alert("El PIN debe tener al menos 4 dígitos.");
    } else {
        // Mostrar mensaje de éxito y redireccionar a otra página
        alert("Ingreso exitoso!");
        clearDisplay(); // Limpiar el valor del display
    }
}

// Función para ocultar las etiquetas de clase .usePIN y .digit
function hideLabels() {
    usePIN.style.display = "none";
    digit.style.display = "none";
}

// Agregar event listeners a los botones
numberButtons.forEach((button) => button.addEventListener("click", handleNumberClick));

clearButton.addEventListener("click", handleClearClick);

okButton.addEventListener("click", handleOkClick);

// Si se presiona un botón de PIN, ocultar las etiquetas de clase .usePIN y .digit
numberButtons.forEach((button) => button.addEventListener("click", hideLabels));

// Agregar event listener al documento para manejar los eventos del teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Verificar si la tecla presionada es un número
    if (!isNaN(parseInt(key))) {
        currentValue += key;
        display.textContent = currentValue.replace(/[0-9]/g, '*');
        pin = currentValue;
    }

    // Verificar si la tecla presionada es "Backspace"
    if (key === 'Backspace') {
        handleClearClick();
    }

    // Verificar si la tecla presionada es "Enter"
    if (key === 'Enter') {
        handleOkClick();
    }
});

/* Modo Dark and Ligth */
themeToggleBtn.onclick = () => {
    pattern_lock.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark = !isDark;
};


