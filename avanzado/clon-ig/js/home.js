const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'sign-in.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Cerrando sesión...')
    localStorage.removeItem('login_success')
    window.location.href = 'sign-in.html'
})

// Selección del ícono del corazón y los elementos de cantidad de likes
let heartIcons = document.querySelectorAll('#heart-icon'),
    likesElements = document.querySelectorAll('.likes');

// Array para almacenar las cantidades actuales de likes
let likesCounts = [10800, 5800, 3800];

// Función para actualizar los elementos HTML con las cantidades de likes
function updateLikes() {
    likesElements.forEach((element, index) => {
        element.textContent = likesCounts[index] + ' Me gusta';
    });
}

// Función para manejar el evento de clic en el ícono del corazón
function like(event) {
    let index = Array.from(heartIcons).indexOf(event.target);
    if (index >= 0) {
        if (heartIcons[index].classList.contains('far')) {
            heartIcons[index].classList.remove('far');
            heartIcons[index].classList.add('fas');
            heartIcons[index].style.color = 'red';
            likesCounts[index]++;
        } else {
            heartIcons[index].classList.remove('fas');
            heartIcons[index].classList.add('far');
            heartIcons[index].style.color = '';
            likesCounts[index]--;
        }
        updateLikes();
    }
}

// Asignación del manejador de eventos de clic a cada ícono del corazón
heartIcons.forEach(icon => {
    icon.addEventListener('click', like);
});

// Llama a la función inicialmente para establecer los valores iniciales
updateLikes();



