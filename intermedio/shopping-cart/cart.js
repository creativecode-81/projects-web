//Variable que mantiene el estado visible del carrito
let carritoVisible = false;

//Esperamos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}


function ready() {
  const botonesEliminarItem = document.querySelectorAll(".btn-eliminar");
  const botonesSumarCantidad = document.querySelectorAll(".sumar-cantidad");
  const botonesRestarCantidad = document.querySelectorAll(".restar-cantidad");
  const botonesAgregarAlCarrito = document.querySelectorAll(".btn-item");

  // Funcionalidad a los botones eliminar del carrito
  botonesEliminarItem.forEach(button => {
    button.addEventListener("click", eliminarItemCarrito);
  });

  // Funcionalidad al botón sumar cantidad
  botonesSumarCantidad.forEach(button => {
    button.addEventListener("click", sumarCantidad);
  });

  // Funcionalidad al botón restar cantidad
  botonesRestarCantidad.forEach(button => {
    button.addEventListener("click", restarCantidad);
  });

  // Funcionalidad al botón Agregar al carrito
  botonesAgregarAlCarrito.forEach(button => {
    button.addEventListener("click", agregarAlCarritoClicked);
  });

  //Agregamos funcionalidad al botón comprar
  document.querySelector(".btn-pagar").addEventListener("click", pagarClicked);
}

//Función que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
  const carritoItems = document.querySelector(".carrito-items");
  if (!carritoItems || !carritoItems.hasChildNodes()) {
    const carrito = document.querySelector(".carrito");
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    const items = document.querySelector(".contenedor-items");
    items.style.width = "100%";
  }
}

//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
  swal({
    title: "Compra Exitosa",
    text: "Gracias por su compra",
    icon: "success",
    button: "Aceptar",
    closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
  });

  //Elimino todos los elmentos del carrito
  const carritoItems = document.querySelectorAll(".carrito-items");
  carritoItems.forEach(item => item.innerHTML = "");
  actualizarTotalCarrito();
  ocultarCarrito();
}

// Función que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
  const button = event.target;
  const item = button.closest(".item");
  const titulo = item.querySelector(".titulo-item").innerText;
  const precio = item.querySelector(".precio-item").innerText;
  const imagenSrc = item.querySelector(".img-item").src;

  agregarItemAlCarrito(titulo, precio, imagenSrc);
  hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
  carritoVisible = true;
  let carrito = document.querySelector(".carrito");
  carrito.style.marginRight = "0";
  carrito.style.opacity = "1";

  let items = document.querySelector(".contenedor-items");
  items.style.width = "60%";
}

//Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  const itemsCarrito = document.querySelector(".carrito-items");

  // Controlamos que el item que intenta ingresar no se encuentre en el carrito
  const nombresItemsCarrito = itemsCarrito.querySelectorAll(".carrito-item-titulo");
  for (const nombreItem of nombresItemsCarrito) {
    if (nombreItem.innerText === titulo) {
      swal({
        title: "",
        text: "El item ya se encuentra en el carrito",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }
  }

  const item = document.createElement("div");
  item.classList.add("item");

  const itemCarritoContenido = `
    <div class="carrito-item">
      <img src="${imagenSrc}" width="80px" alt="">
      <div class="carrito-item-detalles">
        <span class="carrito-item-titulo">${titulo}</span>
        <div class="selector-cantidad">
          <i class="fa-solid fa-minus restar-cantidad"></i>
          <input type="text" value="1" class="carrito-item-cantidad" disabled>
          <i class="fa-solid fa-plus sumar-cantidad"></i>
        </div>
        <span class="carrito-item-precio">${precio}</span>
      </div>
      <button class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  // Agregamos la funcionalidad eliminar al nuevo item
  const botonEliminar = item.querySelector(".btn-eliminar");
  botonEliminar.addEventListener("click", eliminarItemCarrito);

  // Agregamos la funcionalidad restar cantidad del nuevo item
  const botonRestarCantidad = item.querySelector(".restar-cantidad");
  botonRestarCantidad.addEventListener("click", restarCantidad);

  // Agregamos la funcionalidad sumar cantidad del nuevo item
  const botonSumarCantidad = item.querySelector(".sumar-cantidad");
  botonSumarCantidad.addEventListener("click", sumarCantidad);

  // Actualizamos total
  actualizarTotalCarrito();
}

//Aumento en 1 la cantidad del elemento seleccionado
function sumarCantidad(event) {
  const buttonClicked = event.target;
  const selector = buttonClicked.parentElement;
  const cantidadInput = selector.querySelector(".carrito-item-cantidad");
  let cantidadActual = parseInt(cantidadInput.value);
  cantidadActual++;
  cantidadInput.value = cantidadActual;
  actualizarTotalCarrito();
}

//Resto en 1 la cantidad del elemento seleccionado
function restarCantidad(event) {
  const buttonClicked = event.target;
  const selector = buttonClicked.parentElement;
  const cantidadInput = selector.querySelector(".carrito-item-cantidad");
  let cantidadActual = parseInt(cantidadInput.value);
  cantidadActual--;
  if (cantidadActual >= 1) {
    cantidadInput.value = cantidadActual;
    actualizarTotalCarrito();
  }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();

  //Actualizamos el total del carrito
  actualizarTotalCarrito();

  //la siguiente función controla si hay elementos en el carrito, si no hay, lo elimino del carrito
  ocultarCarrito();
}

/**************************** */

//Actualizamos el total de Carrito
function obtenerPrecioDelItem(item) {
  const precioElemento = item.querySelector(".carrito-item-precio");
  const precio = parseFloat(precioElemento.innerText.replace("S/", "").replace(",", ""));
  return precio;
}

function obtenerCantidadDelItem(item) {
  const cantidadItem = item.querySelector(".carrito-item-cantidad");
  const cantidad = cantidadItem.value;
  return cantidad;
}

function actualizarTotalCarrito() {
  const carritoItems = document.querySelectorAll(".carrito-item");
  let total = 0;

  for (const item of carritoItems) {
    const precio = obtenerPrecioDelItem(item);
    const cantidad = obtenerCantidadDelItem(item);
    total += precio * cantidad;
  }

  total = Math.round(total * 100) / 100;

  const totalCarritoElement = document.querySelector(".carrito-precio-total");
  totalCarritoElement.innerText = "S/ " + total.toLocaleString("es") + ".00";
}


