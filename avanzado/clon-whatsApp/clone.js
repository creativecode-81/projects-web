const backButton = document.querySelector('.back');
const chatBox = document.querySelector('.chatBox');
const openButton = document.querySelector('.open');

/* Estados */
const closeButton = document.querySelector('.close');
const statusBox = document.querySelector('.statusBox');
const pensilIcon = document.querySelector('.pencil');

/* Ocultar Icon mic por send */
const micIcon = document.querySelector('.mic');
const sendIcon = document.querySelector('.send');
const textarea = document.querySelector('textarea');

/* Dar click al icono de la paleta de colores */
const statusHeader = document.querySelector('.statusHeader');
const paletteIcon = document.querySelector('.palette');

// Ocultar la sección de chat al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    chatBox.classList.add('hide');
    statusBox.classList.add('hide');
});

backButton.addEventListener('click', function () {
    chatBox.classList.add('hide');
});

openButton.addEventListener('click', function () {
    chatBox.classList.remove('hide');
});


/* Estados */

closeButton.addEventListener('click', function () {
    swal({
        title: "¿Desea descartar el texto?",
        text: "",
        // text: "¡Una vez descartado, no podrá recuperar este estado!",
        icon: "warning",
        buttons: ['Cancelar', 'Descartar'],
        dangerMode: true,
        closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
    }).then((willDelete) => {
        if (willDelete) {
            statusBox.classList.add('hide');
            // swal("¡Poof! Su estado ha sido descartado correctamente.", {
            //     icon: "success",
            // });
        } else {
            swal("¡Su estado está a salvo!");
        }
    });
});

pensilIcon.addEventListener('click', function () {
    statusBox.classList.remove('hide');
});

/* Ocultar Icon mic por send */

textarea.addEventListener('input', () => {
    if (textarea.value.trim() !== '') {
        micIcon.classList.add('hidden');
        sendIcon.classList.remove('hidden');
    } else {
        micIcon.classList.remove('hidden');
        sendIcon.classList.add('hidden');
    }
});


/* Dar click al icono de la paleta de colores */

const colors = ['#cd5c5c', '#00ff00', '#fa8072', '#ffff00', '#ff00ff', '#00ffff', '#f29ab6', '#bd87bb', '#c3a492', '#58c3bb', '#fce4ca', '#8b9068', '#f8e469', '#2d7aco', '#cob99d', '#06d755'];

paletteIcon.addEventListener('click', function () {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    textarea.style.background = randomColor;
    statusHeader.style.backgroundColor = randomColor;
    statusHeader.classList.remove(...colors.map(color => color.slice(1)));
    const colorClass = colors.find(color => color === randomColor);
    if (colorClass) {
        statusHeader.classList.add(colorClass.slice(1));
    }
});

