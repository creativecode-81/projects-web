let container = document.querySelector('.container');
const btnX = container.querySelector('.options .player_X'),
    btnO = container.querySelector('.options .player_O'),
    board = document.querySelector('.board'),
    players = document.querySelector('.players'),
    allBox = document.querySelectorAll('section span'),
    result = document.querySelector('.result'),
    text = result.querySelector('.text'),
    btnReiniciar = result.querySelector('button');

let playerXIcon = "fas fa-xmark",
    playerOIcon = "far fa-circle",
    playerSign = 'X',
    runBot = true;

document.addEventListener('DOMContentLoaded', () => {
    allBox.forEach(box => {
        box.addEventListener('click', () => clickedBox(box));
    });
});

btnX.addEventListener('click', () => {
    container.classList.add('hide');
    board.classList.add('show');
});

btnO.addEventListener('click', () => {
    container.classList.add('hide');
    board.classList.add('show');
    players.setAttribute('class', 'players active player');
});


function clickedBox(box) {
    if (players.classList.contains("player")) {
        playerSign = 'O';
        box.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove('active');
        box.setAttribute('id', playerSign);
    } else {
        box.innerHTML = `<i class="${playerXIcon}"></i>`;
        box.setAttribute('id', playerSign);
        players.classList.add('active');
    }
    winner();
    box.style.pointerEvents = 'none';
    board.style.pointerEvents = 'none';
    let randomTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomTime);
}


function bot() {
    let array = [];
    if (runBot) {
        playerSign = 'O';
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = 'X';
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute('id', playerSign);
                players.classList.add('active');
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove('active');
                allBox[randomBox].setAttribute('id', playerSign);
            }
            winner();
        }
        allBox[randomBox].style.pointerEvents = 'none';
        board.style.pointerEvents = 'auto';
        playerSign = 'X';
    }
}

function getIdVal(classname) {
    return document.querySelector('.box' + classname).id;
}

function checkIdSign(v1, v2, v3, sign) {
    if (getIdVal(v1) == sign && getIdVal(v2) == sign && getIdVal(v3) == sign) {
        return true;
    }
}

function winner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            result.classList.add('show');
            board.classList.remove('show');
        }, 300);
        text.innerHTML = `¡Ganador! <p>${playerSign}</p>`;
    } else {
        if (getIdVal(1) != '' && getIdVal(2) != '' && getIdVal(3) != '' && getIdVal(4) != '' && getIdVal(5) != '' && getIdVal(6) != '' && getIdVal(7) != '' && getIdVal(8) != '' && getIdVal(9) != '') {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                result.classList.add('show');
                board.classList.remove('show');
            }, 300);
            text.textContent = '¡Empate!';
        }
    }
}

btnReiniciar.onclick = () => {
    window.location.reload();
}


