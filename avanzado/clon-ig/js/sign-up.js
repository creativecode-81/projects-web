const btn_register = document.querySelector('.btn_regiter'),
    number_email = document.querySelector('.numberOrEmail'),
    full_names = document.querySelector('.names'),
    user_name = document.querySelector('.username'),
    pass = document.querySelector('.password'),
    msge = document.querySelector(".msge");

// Mensajes de error y éxito
const MESSAGES = {
    invalidRegister: 'El usuario ya esta registado',
    invalideFields: 'Todos los campos son obligatorios.',
    invalidPhoneEmail: 'Por favor, ingrese un número de teléfono o un correo electrónico válido.',
    invalidFullname: 'Por favor, ingrese un nombre de usuario válido.',
    invalidUsername: "Nombre de usuario inválido, por favor ingrese un nombre de usuario válido.",
    invalidPassword: "La contraseña debe tener al menos 8 caracteres."
};

// Función para validar la longitud de los campos de entrada
const isValidLength = (number_email, username, password) => {
    return number_email.length >= 3 && username.length >= 3 && password.length >= 6;
};

// Validación de entradas para habilitar/deshabilitar el botón de register
const validateInputs = () => {
    const isValid = isValidLength(number_email.value, user_name.value, pass.value);
    btn_register.disabled = !isValid;
    btn_register.classList.toggle('enabled', isValid); // Agrega o quita la clase 'enabled'
};

btn_register.addEventListener('click', (e) => {
    e.preventDefault();

    const numberOrEmail = number_email.value.trim();
    const names = full_names.value.trim();
    const username = user_name.value.trim();
    const password = pass.value.trim();

    // Validar si es un número de teléfono o un correo electrónico
    const namesPattern = /^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+(51))? ?\d{9}$/;
    const usernamePattern = /^[a-z0-9_]+$/;

    if (!isValidLength(numberOrEmail, username, password)) return; // Habilita el botón

    // const Users = JSON.parse(localStorage.getItem('users')) || [];
    // const isUserRegistered = Users.find(user => user.numberOrEmail === numberOrEmail || user.username === username);

    // Verificación de si el usuario ya está registrado
    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailRegistered = Users.find(user => user.numberOrEmail === numberOrEmail);
    const isUsernameRegistered = Users.find(user => user.username === username);
    
    if (isEmailRegistered) {
        alert(MESSAGES.invalidRegister);
        return number_email.focus();
    } else if (isUsernameRegistered) {
        alert(MESSAGES.invalidRegister);
        return user_name.focus();
    } else if (!numberOrEmail || !names || !username || !password) { // Verificar si algún campo está vacío
        alert(MESSAGES.invalideFields);
        return full_names.focus();
    } else if (!(emailPattern.test(numberOrEmail) || phonePattern.test(numberOrEmail))) {
        alert(MESSAGES.invalidPhoneEmail);
        return number_email.focus();
    } else if (!(namesPattern.test(names))) {
        //alert('Por favor, ingrese un nombre de usuario válido.');
        alert(MESSAGES.invalidFullname);
        return full_names.focus();
    } else if (!(usernamePattern.test(username))) {
        //alert('Nombre de usuario inválido, por favor ingrese un nombre de usuario válido.');
        alert(MESSAGES.invalidUsername);
        return user_name.focus();
    } else if (password.length < 8) {
        alert(MESSAGES.invalidPassword);
        return pass.focus();
    }

    // Si todas las validaciones pasan, registrar al usuario
    Users.push({numberOrEmail: numberOrEmail, names: names, username: username, password: password});
    localStorage.setItem('users', JSON.stringify(Users));
    alert('Registro Exitoso!');
    window.location.href = 'sign-in.html';

});

// Eventos para validar entradas y manejar el inicio de sesión
number_email.addEventListener('input', validateInputs);
user_name.addEventListener('input', validateInputs);
pass.addEventListener('input', validateInputs);