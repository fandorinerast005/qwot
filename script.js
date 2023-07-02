// JavaScript код для изменения цвета фона и текста
const navLinks = document.querySelectorAll('nav ul li a');
const body = document.body;
const sections = document.querySelectorAll('section:not(.header-section)');
const title = document.querySelector('header h1');

// Добавляем обработчик клика для ссылок навигационного меню
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение ссылки

    const randomColor = getRandomColor();
    body.style.backgroundColor = randomColor;
    setContrastText(randomColor);

    // Прокручиваем к якорю
    const href = link.getAttribute('href');
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setContrastText(color) {
  const brightness = getBrightness(color);
  const textColor = brightness > 127.5 ? '#000' : '#FFF';
  body.style.color = textColor;
  title.style.color = '#000'; // Устанавливаем черный цвет для заголовка

  sections.forEach((section) => {
    const sectionText = section.querySelectorAll('h2, p, li');
    sectionText.forEach((text) => {
      text.style.color = textColor;
    });
  });
}

function getBrightness(color) {
  const rgb = hexToRgb(color);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness;
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}