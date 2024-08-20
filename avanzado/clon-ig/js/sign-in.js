const user_name = document.querySelector(".user"),
  pass = document.querySelector('.password'),
  logBtn = document.querySelector(".btn_login"),
  msge = document.querySelector(".msge"),
  images = document.querySelectorAll('.main img');

// Asignar el año actual
document.getElementById("currentYear").textContent = new Date().getFullYear();

/* LOGIN */

// Mensajes de error y éxito
const MESSAGES = {
  invalidUsername: "Usuario, número o correo incorrecto. Vuelva a verificar.",
  invalidPassword: "Contraseña incorrecta. Vuelva a verificar."
};

// Validación de longitud de los campos
const isValidLength = (user, pass) => user.length >= 3 && pass.length >= 6;

// Mostrar mensajes de error o éxito
const displayMessage = (message, type) => {
  msge.textContent = message;
  msge.className = `msge ${type}`;
};

// Manejar errores
const handleError = (message, focusField) => {
  displayMessage(message, "error");
  focusField.focus();
};

// Validar entradas y habilitar/deshabilitar el botón de login
const validateInputs = () => {
  const isValid = isValidLength(user_name.value, pass.value);
  logBtn.disabled = !isValid;
  logBtn.classList.toggle('enabled', isValid);
};

// Función para manejar el inicio de sesión 
logBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const identifier =  user_name.value.trim().toLowerCase(); // Puede ser username, número o correo
  const password = pass.value.trim();

  if (!isValidLength(identifier, password)) return; // Habilita el botón

  const Users = JSON.parse(localStorage.getItem('users')) || [];
  const validUser = Users.find(user => user.username === identifier || user.numberOrEmail === identifier);
  
  if(!validUser){ // Si el identificador no existe
    return handleError(MESSAGES.invalidUsername, user_name);
  } else if (validUser.password !== password) { // Si la contraseña es incorrecta
    return handleError(MESSAGES.invalidPassword, pass);
  } else { // Si el identificador y la contraseña son correctos
    alert(`Bienvenido ${validUser.names}`);
    localStorage.setItem('login_success', JSON.stringify(validUser));
    window.location.href = 'home.html'; // Redirige a la página home.html
  }
});

// Eventos para validar entradas y manejar el inicio de sesión
user_name.addEventListener('input', validateInputs);
pass.addEventListener('input', validateInputs);

// Slider de imágenes
let currentIndex = 0;

const changeImage = () => {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
};

setInterval(changeImage, 5000);