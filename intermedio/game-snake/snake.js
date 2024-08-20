const board = document.querySelector('.board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high_score');
const controls = document.querySelectorAll('.controls i');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snake_Body = [];
let setIntervalId;
let score = 0;

// Obtener puntaje alto del almacenamiento local
let highScore = localStorage.getItem('high_score') || 0;
highScoreElement.innerText = `Máx. Puntaje: ${highScore}`;

const updateFoodPosition = () => {
    // Pasar un valor aleatorio 1 - 30 como posición de comida
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Borrando el temporizador y mostrando la alerta de SweetAlert al terminar el juego
    clearInterval(setIntervalId);
    swal({
        title: "¡Juego terminado!",
        text: "Presiona OK para continuar",
        icon: "success",
        button: "Ok",
        closeOnClickOutside: false // Evita que se cierre haciendo clic fuera del cuadro de diálogo
    }).then(() => {
        // Recargando la página después de que el usuario presione OK
        location.reload();
    });
}


const changeDirection = e => {
    // Cambiando el valor de velocidad basado en la pulsación de tecla
    if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

//Llamar a changeDirection en cada clic clave y pasar el valor del conjunto de datos clave
controls.forEach(button => {
    button.addEventListener('click', () => changeDirection({ key: button.dataset.key }));
});

const initGame = () => {
    if (gameOver) return handleGameOver();
    //let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}; height: 15px; width: 15px; border-radius: 50%;"></div>`;
    // Comprobando si la serpiente golpeó la comida
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snake_Body.push([foodY, foodX]); // Empujando la posición de la comida a la matriz del cuerpo de la serpiente
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high_score', highScore);
        scoreElement.innerText = `Puntaje: ${score}`;
        highScoreElement.innerText = `Máx. Puntaje: ${highScore}`;
        // Código para reproducir el sonido 
        const audio = new Audio('sound/audio_snake.mp3');
        audio.play();
    }

    // Actualización de la posición de la cabeza de la serpiente en función de la velocidad actual
    snakeX += velocityX;
    snakeY += velocityY;

    // Desplazando hacia adelante los valores de los elementos en el cuerpo de la serpiente en uno
    for (let i = snake_Body.length - 1; i > 0; i--) {
        snake_Body[i] = snake_Body[i - 1];
    }
    snake_Body[0] = [snakeX, snakeY]; // Configuración del primer elemento del cuerpo de la serpiente.

    // Comprobando si la cabeza de la serpiente está fuera de la pared, si es así configuramos gameOver
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snake_Body.length; i++) {
        // Agregando un div para cada parte del cuerpo de la serpiente
        html += `<div class="head" style="grid-area: ${snake_Body[i][1]} / ${snake_Body[i][0]}"></div>`;
        // Comprobando si la cabeza de la serpiente golpeó el cuerpo, si es así, establezca gameOver en verdadero
        if (i !== 0 && snake_Body[0][1] === snake_Body[i][1] && snake_Body[0][0] === snake_Body[i][0]) {
            gameOver = true;
        }
    }
    board.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener('keyup', changeDirection);