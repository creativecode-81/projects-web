//Variables para controlar en que estado esta el menu lateral
let isBigMenu = true;
let isModeOverlay = false;

// Obtener elementos DOM de búsqueda y barra de menú
const searchInput = document.getElementById('buscar'),
    bigMenu = document.getElementById('big-menu'),
    littleMenu = document.getElementById('little-menu'),
    barLateral = document.getElementById('bar-lateral'),
    videos = document.getElementById('videos'),
    iconBar = document.getElementById('icono-bar'),
    icon = document.querySelector('.icono');
let anchoViewport = window.innerWidth;

// Controlar el ancho de la pantalla al cargar la página
setScreenMode();

//Detecto cuando se hace clic en la barra de busqueda
// para agregar el icono de buscar y colocar el borde del
// input con algo de estilo en el borde.

searchInput.addEventListener('focus', function () {
    icon.style.display = "flex";
    searchInput.parentNode.style.border = "1px solid #0a59b2";
});
searchInput.addEventListener('focusout', function () {
    icon.style.display = "none";
    searchInput.parentNode.style.border = "1px solid #ccc";
});


// Agrego funcionalidad al icono bar para ocultar o mostrar el menu

iconBar.addEventListener('click', function () {
    //controlamos si el ancho de la screen es < a 1100 para establecer
    //la forma que se mostrara la barra leteral.
    //tomo el ancho de la ventana

    if (anchoViewport <= 1100) {
        //si el menu no esta superpuesto
        if (!isModeOverlay) {
            bigMenu.classList.remove('ocultar');
            bigMenu.classList.add('is-mode-overlay');
            barLateral.style.width = '240px';
            barLateral.style.zIndex = '7';
            bigMenu.style.backgroundColor = '#fff';
            isModeOverlay = true;
        } else {
            bigMenu.classList.remove('is-mode-overlay');
            bigMenu.classList.add('ocultar');
            isModeOverlay = false;
        }
    } else {
        //Si el menu esta en modo grande
        if (isBigMenu) {
            bigMenu.classList.add('ocultar');
            littleMenu.classList.remove('ocultar');
            barLateral.style.width = '70px';
            videos.classList.add('max-width-videos');
            isBigMenu = false;
        } else {
            bigMenu.classList.remove('ocultar');
            littleMenu.classList.add('ocultar');
            barLateral.style.width = '240px';
            videos.classList.remove('max-width-videos');
            isBigMenu = true;
        }
    }
})


// Agregamos atributo onmouseover y onmouseleav a cada item
const items = document.querySelectorAll('.item');
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.addEventListener('mouseenter', () => bigItem(item));
    item.addEventListener('mouseleave', () => normalItem(item));
}

let tiempoSobreElemento = 0; // Inicializa el tiempo que el mouse ha estado sobre el elemento a cero
const tiempoLimite = 2000; // Define el tiempo límite en milisegundos (en este ejemplo, 2000 ms = 2 segundos)
function bigItem(item) {
    // Cuando el mouse entra en el elemento, inicia el temporizador
    tiempoSobreElemento = setTimeout(() => {
        // Si el tiempo sobre el elemento ha alcanzado el tiempo límite, ejecuta la acción deseada
        //console.log("El mouse ha estado sobre el elemento durante " + tiempoLimite + "ms");
        item.classList.add('on-hover');

    }, tiempoLimite);

}

// Función para volver al tamaño normal del ítem
function normalItem(item) {
    clearTimeout(tiempoSobreElemento);
    tiempoSobreElemento = 0;
    item.classList.remove('on-hover');
}


// Detectar cuando se redimensiona la ventana para adaptar el menú lateral
window.addEventListener("resize", () => setScreenMode());

//Controlo si el ancho de la ventana es menor a 1100px
function setScreenMode() {
    //console.log("El ancho del viewport es ahora: " + anchoViewport + "px");
    if (anchoViewport <= 1100) {
        bigMenu.classList.add('ocultar');
        littleMenu.classList.remove('ocultar');
        barLateral.style.width = '70px';
        videos.classList.add('max-width-videos');
        isBigMenu = false;
    } else {
        bigMenu.classList.remove('ocultar');
        barLateral.style.width = '240px';
        videos.classList.remove('max-width-videos');
        isBigMenu = true;
        littleMenu.classList.add('ocultar');
    }
}

