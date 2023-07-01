  // Плавная прокрутка к якорным ссылкам при клике на них
  document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('nav ul li a');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        var targetId = link.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          var offsetTop = targetElement.offsetTop;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  });

  // JavaScript код для изменения цвета фона и текста
  const navLinks = document.querySelectorAll('nav ul li a');
  const header = document.querySelector('header');
  const body = document.body;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
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

  function setContrastText(color) {
    const brightness = getBrightness(color);
    const textColor = brightness > 127.5 ? '#000' : '#FFF';
    body.style.color = textColor;
    header.style.color = textColor;

    // Изменяем цвет текста внутри каждой секции, кроме футера и шапки
    const sections = document.querySelectorAll('section:not(#section4)');
    sections.forEach(section => {
      const sectionText = section.querySelectorAll('h2, p, li');
      sectionText.forEach(text => {
        text.style.color = textColor;
      });
    });

    // Изменяем цвет текста внутри секции "Контакты"
    const contactSection = document.querySelector('#section4');
    const contactText = contactSection.querySelectorAll('h2, p');
    contactText.forEach(text => {
      text.style.color = textColor;
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