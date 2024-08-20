const container = document.querySelector('.container'),
  btnRefresh = document.querySelector('.btn_refresh');

const MAX_PALETTE = 90,
  COLORS_PER_PAGE = 12;

let startIndex = 0;

const generateColorElement = async (hexValue) => {
  const color = document.createElement('li');
  const box = document.createElement('div');
  const name = document.createElement('span');
  const hex = document.createElement('span');
  color.classList.add('color');
  box.classList.add('box');
  box.style.background = hexValue;
  hex.classList.add('hex_value');
  hex.textContent = hexValue;
  name.classList.add('name_value');

  try {
    // Haciendo una llamada a la API para obtener el nombre del color
    const response = await fetch(`https://www.thecolorapi.com/id?hex=${hexValue.slice(1)}`);
    const data = await response.json();
    name.textContent = data.name.value;
  } catch (error) {
    console.log('Error:', error);
    name.textContent = 'Error al obtener el nombre del color';
  }

  color.append(box, name, hex);
  color.addEventListener('click', () => copyColor(color, hexValue));
  return color;
};

const generatePalette = async () => {
  container.innerHTML = '';
  for (let i = startIndex; i < startIndex + COLORS_PER_PAGE && i < MAX_PALETTE; i++) {
    const randomHex = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
    const colorElement = await generateColorElement(randomHex);
    container.appendChild(colorElement);
  }
};

const copyColor = (colorElement, hexValue) => {
  navigator.clipboard.writeText(hexValue).then(() => {
    const hexElement = colorElement.querySelector('.hex_value');
    hexElement.textContent = 'Copiado';
    setTimeout(() => (hexElement.textContent = hexValue), 1000);
  }).catch(() => alert('Error al copiar el código de color!')); // Mostramos la alerta
};

btnRefresh.addEventListener('click', (e) => {
  e.preventDefault();
    startIndex += COLORS_PER_PAGE;
  if (startIndex >= MAX_PALETTE) {
    startIndex = 0;
  }
  generatePalette();
});

generatePalette();


