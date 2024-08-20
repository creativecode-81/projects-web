let hor = document.querySelector("#hor");
let min = document.querySelector("#min");
let seg = document.querySelector("#seg");

setInterval(() => {
  let day = new Date();
  let hs = day.getHours() * 30;
  let ms = day.getMinutes() * 6;
  let sg = day.getSeconds() * 6;

  hor.style.transform = `rotateZ(${hs + ms / 12}deg)`;
  min.style.transform = `rotateZ(${ms}deg)`;
  seg.style.transform = `rotateZ(${sg}deg)`;

  /* Reloj Digital */

  let hours = document.getElementById("hours");
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let ampm = document.getElementById("ampm");

  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();

  let am = h >= 12 ? "PM" : "AM";

  // Convertir reloj de 24 horas a reloj de 12 horas
  if (h > 12) {
    h = h - 12;
  }

  // Agregue cero antes del número de un solo dígito
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hours.innerHTML = h;
  minutes.innerHTML = m;
  seconds.innerHTML = s;
  ampm.innerHTML = am;
});
