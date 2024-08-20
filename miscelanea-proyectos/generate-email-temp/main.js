const generateEmailBtn = document.querySelector(".generateEmailBtn");
const generateEmail = document.getElementById("generateEmail");

const domains = [
  "example.com",
  "test.com",
  "tempmail.com",
  "ubinert.com",
  "correo.com",
]; // Lista de dominios válidos

generateEmailBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Evita el comportamiento predeterminado del formulario

  const username = document.getElementById("user").value.trim(); // Obtiene el valor del input y elimina espacios en blanco al principio y al final
  if (username === "") {
    // Realiza alguna acción en caso de que algún campo esté vacío
    swal({
      title: "Nombre de Usuario Incorrecto",
      text: "Por favor, ingrese un nombre de usuario antes de generar el correo.",
      icon: "warning",
      button: "Aceptar",
      closeOnClickOutside: false, // Evita que se cierre haciendo clic fuera del cuadro de diálogo
    });
  } else if (!isValidUsername(username)) {
    // Realiza alguna acción en caso de que el nombre de usuario no cumpla con el formato deseado
    swal({
      title: "Nombre de Usuario Inválido",
      text: "Ingrese un nombre de usuario válido, por ejemplo: Jhon_",
      icon: "error",
      button: "Aceptar",
      closeOnClickOutside: false, // Evita que se cierre haciendo clic fuera del cuadro de diálogo
    });
  }
  else {
    // Resto del código cuando el nombre de usuario es válido
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const generatedEmail = `${username}${Math.floor(Math.random() * 10000)}@${randomDomain}`;
    generateEmail.innerText = `Correo temporal generado: ${generatedEmail}`;
  }
});

function isValidUsername(username) {
  // Expresión regular para validar un nombre de usuario que contenga solo letras (con tildes),
  // permita guiones bajos y cumpla con una longitud mínima de 3 y máxima de 20 caracteres.
  const usernameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ]([a-zA-ZáéíóúÁÉÍÓÚ]*(_[a-zA-ZáéíóúÁÉÍÓÚ]+)?)?_?$/;
  return usernameRegex.test(username) && username.length >= 3 && username.length <= 20;
}




