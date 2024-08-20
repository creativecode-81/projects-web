let btn_start = document.querySelector(".btn-start button");
let info_box = document.querySelector(".info-box");
let btn_exit = info_box.querySelector(".buttons .quit");
let btn_continue = info_box.querySelector(".buttons .continue");
let quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".result-box");
let list_option = document.querySelector(".option-list");
let time_line = document.querySelector("header .time-line");
let timeText = document.querySelector(".time .time-left-txt");
let timeCount = document.querySelector(".time .time-sec");

// Si se hace clic en el botón starQuiz
btn_start.onclick = () => {
  info_box.classList.add("activeInfo"); // Mostrar cuadro de prueba
};

// Si se hace clic en el botón exitQuiz
btn_exit.onclick = () => {
  info_box.classList.remove("activeInfo"); // Ocultar cuadro de prueba
};

// Si se hace clic en el botón Continuar

btn_continue.onclick = () => {
  info_box.classList.remove("activeInfo"); // Ocultar cuadro de prueba
  quiz_box.classList.add("activeQuiz"); // Mostrar cuadro de prueba
  showQuestions(0); // Llamando a la función showQuestions
  QuestionCounter(1); // Llamando a la función queCounter
  startTimer(20); // Llamando a la función startTimer
  startTimerLine(0); // Llamando a la función startTimerLine
};

let ques_count = 0;
let ques_number = 1;
let timeValue = 20;
let userScore = 0;
let widthValue = 0;
let count;
let countLine;

let continue_quiz = result_box.querySelector(".buttons .continue");
let quit_quiz = result_box.querySelector(".buttons .quit");

// If Contine Button clicked
continue_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); // Mostrar cuadro de prueba
  result_box.classList.remove("activeResult"); // Ocultar cuadro de prueba
  timeValue = 20;
  ques_count = 0;
  ques_number = 1;
  userScore = 0;
  widthValue = 0;
  showQuestions(ques_count);
  QuestionCounter(ques_number);
  clearInterval(count);
  clearInterval(countLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Tiempo Restante";
  btn_next.classList.remove("show");
};

// Si se hace clic en el botón quitQuiz
quit_quiz.onclick = () => {
  window.location.reload(); // Recargar la ventana actual
};

let btn_next = document.querySelector("footer .btn-next");
let btn_ques_counter = document.querySelector("footer .total-ques");

// Si se hace clic en el botón Siguiente
btn_next.onclick = () => {
  if (ques_count < questions.length - 1) {
    ques_count++;
    ques_number++;
    showQuestions(ques_count);
    QuestionCounter(ques_number);
    clearInterval(count);
    clearInterval(countLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Tiempo Restante";
    btn_next.classList.remove("show"); // Oculta el botón siguiente
  } else {
    clearInterval(count);
    clearInterval(countLine);
    showResult(); // Llamamos a la funcion
  }
};

// Obtenemos preguntas y opciones de un array
function showQuestions(index) {
  const txt_ques = document.querySelector(".txt-ques");

  // Creando un nuevo span y div para las preguntas y opciones
  let tag_ques = "<span>" + questions[index].number + ". " + questions[index].question + "</span>";
  let option_tag = '<div class="option"><span>' + questions[index].options[0] + "</span></div>" 
  + '<div class="option"><span>' + questions[index].options[1] + "</span></div>" 
  + '<div class="option"><span>' + questions[index].options[2] + "</span></div>" 
  + '<div class="option"><span>' + questions[index].options[3] + "</span></div>";
  txt_ques.innerHTML = tag_ques;
  list_option.innerHTML = option_tag;

  const option = list_option.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Creando un nuevo div para los iconos
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// Si el usuario da click en la opcion
function optionSelected(answer) {
  clearInterval(count);
  clearInterval(countLine);
  let userAns = answer.textContent;
  let correctAns = questions[ques_count].answer;
  const allOptions = list_option.children.length;

  if (userAns === correctAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    console.log("Respuesta Correcta");
    console.log("Tus respuestas correctas " + userScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    console.log("Respuesta Incorrecta");

    for (i = 0; i < allOptions; i++) {
      if (list_option.children[i].textContent == correctAns) {
        list_option.children[i].setAttribute("class", "option correct");
        list_option.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Respuesta correcta seleccionada automáticamente.");
        break;
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    list_option.children[i].classList.add("disabled");
  }
  btn_next.classList.add("show");
}

function showResult() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score");
  if (userScore > 3) {
    // Si el usuario puntuó más de 3
    let scoreTag = "<span>Felicitaciones, tienes <p>" + userScore + "</p>/<p>" + questions.length + "</p>puntos</span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag = "<span>Genial, tienes <p>" + userScore + "</p>/<p>" + questions.length + "</p>puntos</span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = "<span>Lo siento, Solo tienes <p>" + userScore + "</p>/<p>" + questions.length + "</p>puntos</span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  count = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--; // Disminuimos el valor del tiempo
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //Agrega un 0 antes del valor de tiempo
    }
    if (time < 0) {
      clearInterval(count);
      timeText.textContent = "Fuera de Tiempo";
      const allOptions = list_option.children.length;
      let correctAns = questions[ques_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (list_option.children[i].textContent == correctAns) {
          list_option.children[i].setAttribute("class", "option correct");
          list_option.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          console.log("Tiempo fuera: respuesta correcta seleccionada automáticamente.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        list_option.children[i].classList.add("disabled");
      }
      btn_next.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  countLine = setInterval(timer, 40);
  function timer() {
    time += 1; // Actualizar valor de tiempo con 1
    time_line.getElementsByClassName.width = time + "px";
    if (time > 399) { // Si el valor de time es mayor a 399, se cancela el intervalo
      clearInterval(countLine);
    }
  }
}

function QuestionCounter(index) {
  let totalQueCounTag = "<span><p>" + index + "</p> de <p>" + questions.length + "</p>Preguntas</span>";
  btn_ques_counter.innerHTML = totalQueCounTag; // Agregamos un nuevo span
}
