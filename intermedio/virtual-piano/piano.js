const pianoKeys = document.querySelectorAll('.piano .key'),
volume = document.querySelector('.volume input'),
checkBox = document.querySelector('.checkbox input');

let allKeys = [],
audio = new Audio(`sounds/a.wav`); // El tono 'a' es por defecto

const playTunes = (key) => {
    audio.src = `sounds/${key}.wav`; // Pasar src de audio en función de la tecla pulsada
    audio.play(); // Reproducir audio

    const clickKey = document.querySelector(`[data-key="${key}"]`);
    clickKey.classList.add('active');
    setTimeout(() => {
        clickKey.classList.remove('active');
    }, 150);
    
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // Añadir valor de data-key a allKeys
    // Llamada a la función playTune pasando el valor data-key como argumento
    key.addEventListener('click', () => playTunes(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // Pasando el valor del deslizador de rango 
}

const showHideKeys = (e) => {
    // Ocultar clase de cada tecla en la casilla de verificación
    pianoKeys.forEach(key => key.classList.toggle('hide'));
}

const pressedKeys = (e) => {
    // Si la tecla pulsada está en la matriz allkeys, sólo se llama a playTune
    if(allKeys.includes(e.key)) playTunes(e.key);
}

checkBox.addEventListener('click', showHideKeys);
volume.addEventListener('input', handleVolume);
document.addEventListener('keydown', pressedKeys);