const navLinks = document.querySelectorAll('nav ul li a');
const body = document.body;
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const randomColor = getRandomColor();
    body.style.backgroundColor = randomColor;
    setContrastText(randomColor);
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

function setContrastText(backgroundColor) {
  const brightness = getBrightness(backgroundColor);
  const textColor = brightness > 127.5 ? '#000' : '#FFF';
  body.style.color = textColor;
  header.style.color = textColor;
  navLinks.forEach(link => {
    link.style.color = textColor;
  });
  sections.forEach(section => {
    const sectionText = section.querySelectorAll(':not(h2)');
    sectionText.forEach(text => {
      text.style.color = textColor;
    });
  });
  footer.style.color = textColor;
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

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const scrollDown = document.querySelector('.scroll-down');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  // Плавная прокрутка к разделу по нажатию на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      smoothScrollTo(targetSection.offsetTop);
    });
  });

  // Показать кнопку прокрутки при достижении конца страницы
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      scrollDown.classList.add('fade-in');
    } else {
      scrollDown.classList.remove('fade-in');
    }
  });

  // Плавная прокрутка при нажатии на кнопку прокрутки
  scrollDown.addEventListener('click', () => {
    const firstSection = sections[0];
    smoothScrollTo(firstSection.offsetTop);
  });

  // Анимация при прокрутке
  window.addEventListener('scroll', () => {
    const { scrollTop, clientHeight } = document.documentElement;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollTop + clientHeight > sectionTop) {
        section.classList.add('fade-in', 'active');
      } else {
        section.classList.remove('active');
      }
    });
  });

  // Функция плавной прокрутки
  function smoothScrollTo(to) {
    const duration = 1000;
    const start = window.pageYOffset;
    const distance = to - start;
    let startTime = null;

    function scrollAnimation(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }
      const elapsedTime = currentTime - startTime;
      const scrollY = easeInOutQuad(elapsedTime, start, distance, duration);
      window.scrollTo(0, scrollY);
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scrollAnimation);
  }
});